require "zip"

namespace :setup do
  desc "Update user to be an admin [user@email.com]"
  task :admin_user, [:email] => :environment do |_task, args|
    raise "supply a user email" unless args[:email]

    user = User.find_or_create_by(email: args[:email])
    user.user_actions = {
      "admin": { "can_administer": true },
      "users": { "can_edit": true },
    }
    user.save!
  end

  namespace :process do
    desc "Manual process of challenges"
    task challenges: :environment do
      %w[Introduction Blog].each do |title|
        challenge = Challenge.find_by(title: title)

        challenge.helper_images = challenge.feature_files = []
        challenge.save!

        challenge.test_case.blob.open do |file|
          Zip::File.open(file) do |zipfiles|
            zipfiles.each do |entry|
              if entry.name =~ %r{helper_images/.*\.jpg}
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
              end
            end
          end
        end
        challenge.save!
      end
    end
  end
end
