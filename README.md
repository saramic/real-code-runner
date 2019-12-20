# README

## Running

```
make
rails server
```

* http://localhost:3000/admin
* http://localhost:3000/demo

## Deploying

```
RAILS_MASTER_KEY=`cat config/master.key` \
  RUNNER_SECRET=secret_runner            \
  HEROKU_APP_NAME=stg-real-code-runner   \
  make deploy
```

## Todo

- [ ] sort out bootstrap in production last time fell back to using a CDN
  version
  [link](https://github.com/saramic/interactive-slide-show/commit/9dc66a3069725d478c89bbf3ceeb77f1c3f039d5)

- [ ] post process an uploaded zip file for a challenge in a worker

```
  require "zip"
  challenge = Challenge.find("...")

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

## Contributing

1. run `make` and see the limited tests pass
1. run `rails server` and see [admin](https://localhost:3000/admin) and
   [demo](https://localhost:3000/demo)
1. upload a demo challenge
  ```
  git clone https://github.com/saramic/real-code-challenge-blog
  cd real-code-challenge-blog
  # export ~ 3Mb
  git archive master --format zip --output ../real-code-challenge-blog.zip
  # upload
  open ..
  open http://localhost:3000/admin/challenges/new
  ```
1. manually process an uploaded challenge - see post process in TODO section.
1. confirm that you have access to credentials
  ```
  rails credentials:edit
  ```
  you will need the file `config/master.key`
1. check out the running version on heroku
  * https://stg-real-code-runner.herokuapp.com/admin
  * https://stg-real-code-runner.herokuapp.com/demo
1. do a deploy
  ```
  RAILS_MASTER_KEY=`cat config/master.key` \
    RUNNER_SECRET=secret_runner            \
    HEROKU_APP_NAME=stg-real-code-runner   \
    make deploy
  ```
1. access heroku
  * `heroku logs --tail`
  * `heroku run rails console`
  * `echo "puts User.all.pluck(:email)" | heroku run console --app=stg-real-code-runner --no-tty`
1. checkout the build
  * team https://circleci.com/team/gh/saramic
  * signup here https://circleci.com/signup/
1. add something to the TODO that you are working on 💥

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
