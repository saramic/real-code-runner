require "zip"

namespace :process do
  desc "process all challenges"
  task challenges: :environment do
    Challenge.all.each do |challenge|
      challenge.helper_images = challenge.feature_files = []
      challenge.save!

      challenge.test_case.blob.open do |file|
        Zip::File.open(file) do |zipfiles|
          zipfiles.each do |entry|
            if entry.name =~ %r{helper_images/.*\.(jpg|png)}
              challenge.helper_images.attach(
                io: StringIO.new(entry.get_input_stream.read),
                filename: entry.name,
              )
            elsif entry.name =~ %r{features/.*\.feature}
              challenge.feature_files.attach(
                io: StringIO.new(entry.get_input_stream.read),
                filename: entry.name,
              )
            elsif entry.name =~ /README.md/
              challenge.metadata = {} if challenge.metadata == "null"
              challenge.metadata ||= {}
              challenge.metadata["readme"] = entry.get_input_stream.read
            elsif entry.name =~ /metadata.json/
              challenge.metadata = {} if challenge.metadata == "null"
              challenge.metadata ||= {}
              file_contents_json = JSON.parse(entry.get_input_stream.read)
              challenge.metadata["metadata"] = file_contents_json
            end
          end
        end
      end
      challenge.save!
    end
  end
end
