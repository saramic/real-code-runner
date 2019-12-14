# README

## Running

```
make
```

## Deploying

```
RAILS_MASTER_KEY=`cat config/master.key` \
  RUNNER_SECRET=secret_runner            \
  HEROKU_APP_NAME=stg-real-code-runner   \
  make deploy
```

## Todo

- [ ] post process an uploaded zip file for a challenge in a worker

```
  # deal with existing attachments? just delete them?
  challenge.helper_images = challenge.feature_files = []
  challenge.save!
  challenge.test_case.blob.open do |file|
    Zip::File.open(file) do |zipfiles|
      zipfiles.each do |entry|
        if entry.name =~ /helper_images\/.*\.jpg/
          challenge.helper_images.attach(
            io: StringIO.new(entry.get_input_stream.read),
            filename: entry.name
          )
        end
        if entry.name =~ /features\/.*\.feature/
          challenge.feature_files.attach(
            io: StringIO.new(entry.get_input_stream.read),
            filename: entry.name
          )
        end
      end
    end
  end
```

- [ ] API to make image and feature file available

```
  challenge.feature_files.map do |feature_file|
    Rails.application.routes.url_helpers.rails_blob_path(feature_file, only_path: true)
  end
  challenge.helper_images.each do |helper_image|
    Rails.application.routes.url_helpers.rails_blob_path(helper_image, only_path: true)
  end
```

## Other

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
