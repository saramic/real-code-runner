require "zip"

namespace :process do
  desc "process any submissions that have not yet been run"
  task submissions: :environment do
    Submission
      .where(status: "uploaded")
      .each do |submission|
      run = Run.create(submission: submission)
      Dir.mktmpdir do |dir|
        submission.challenge.test_case.blob.open do |test_case|
          Zip::File.open(test_case) do |zipfile|
            zipfile.each do |entry|
              filepath = File.join(dir, entry.name)
              FileUtils.mkdir_p(File.dirname(filepath))
              zipfile.extract(entry, filepath) unless File.exist?(filepath)
            end
          end
        end
        submission_filepath = nil
        docker_compose_path = `find #{dir} -name docker-compose.yml`
        raise "no docker-compose.yml file found" if docker_compose_path.empty?

        filepath = File.dirname(docker_compose_path)

        Dir.mktmpdir(nil, filepath) do |dir_submission|
          submission_filepath = File.join(dir_submission, "submission_text.txt")
          File.open(submission_filepath, "w") do |file|
            file.puts submission.text
          end

          submission_relative_filepath = submission_filepath.sub(filepath, ".")
          run.result ||= {}
          build_docker_command = [
            "cd #{filepath}",
            "&&",
            "ENTRY_POINT='' docker-compose build",
          ].join(" ")
          _build_docker_output = `#{build_docker_command}`

          command = [
            "cd #{filepath}",
            "&&",
            "ENTRY_POINT=#{submission_relative_filepath} docker-compose up",
            "|",
            'sed -e $"s/^[^|]* |.\[0m //g"',
          ].join(" ")
          run.result["output"] = `#{command}`
          run.save!
          color_free_output = run.result["output"].gsub(/\x1b\[[0-9;]*m/, "")
          scenario_matches = /(\d+) scenarios? \((.*)\)$/
                             .match(color_free_output)
          step_matches = /(\d+) steps \((.*)\)$/.match(color_free_output)
          submission.update!(
            status: "processed",
            result: {
              scenario: {
                total: scenario_matches[1],
                output: scenario_matches[2],
              },
              step: {
                total: step_matches[1],
                output: step_matches[2],
              },
              exit_code: color_free_output[/exited with code (\d+)$/, 1],
            },
          )
        end
      end
    end
  end
end
