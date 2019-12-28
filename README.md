# README

## Running

```
make
rails server
```

- http://localhost:3000/admin
- http://localhost:3000/demo

setup a user, under `/admin` choose to **Sign up**

```
# give user admin privelages
rake setup:admin_user[saramic@gmail.com]
```

upload an **Introduction** and **Blog** challenge and manually process the
files

```
rake setup:process:challenges
```

## Deploying

```
RAILS_MASTER_KEY=`cat config/master.key` \
  RUNNER_SECRET=secret_runner            \
  HEROKU_APP_NAME=stg-real-code-runner   \
  make deploy
```

## TODO

- [ ] worker for processing - post process an uploaded zip file for a challenge
      in a worker

  **Note:** this should now work! at least in developement due to the change to
  config/environments/development.rb to `config.active_job.queue_adapter = :inline`

  as part of commit https://github.com/saramic/real-code-runner/commit/bd55a9224d16c4a9b2564760fa0b32cdd304ea62

  similar to `rake setup:process:challenges` in file
  `lib/tasks/process_challenges.rake`

```ruby
  require "zip"
  challenge = Challenge.find_by(title: "Introduction")

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
        if entry.name =~ /README.md/
          challenge.metadata ||= {}
          challenge.metadata["readme"] = entry.get_input_stream.read
        end
      end
    end
  end
  challenge.save!
```

- [ ] worker for processing runs
- [ ] fix BDD terminology in challenges
- [ ] file upload widget using JWT

**Top of mind**

- [ ] log to file in shared dir between local and docker not to have to strip
      out docker service name but had issues with `|` in `CMD` section of docker
  ```
  ADD log /var/log
  CMD .... | tee /var/log/output.txt
  ```
- [ ] what is `ActiveSupport::MessageVerifier::InvalidSignature` error
- [ ] move the manifest finding code into a `non-cached` main.js
- [ ] use signed keys not the actual JWT
- [ ] change the JWT to have a known secret
- [ ] can we just use a plain old form?
- [ ] run a docker command from rails, look at coloring, etc

```ruby
require 'zip'

challenge = Challenge.find_by(title: "Introduction")
submission = Submission.create!(challenge: challenge, external_user_identifier: 'demo_user')
run = Run.create(submission: submission)
Dir.mktmpdir do |dir|
  challenge.test_case.blob.open do |test_case|
    Zip::File.open(test_case) do |zipfile|
      zipfile.each do |entry|
        filepath = File.join(dir, entry.name)
        FileUtils.mkdir_p(File.dirname(filepath))
        zipfile.extract(entry, filepath) unless File.exist?(filepath)
      end
    end
  end
  docker_compose_path = `find #{dir} -name docker-compose.yml`
  raise "no docker-compose.yml file found" if docker_compose_path.empty?

  filepath = File.dirname(docker_compose_path)
  run.result ||= {}
  run.result["output"] = `cd #{filepath} && docker-compose up | sed -e $"s/^.* |.... //g"`
  run.save
end
```

**Bugs**

- [ ] need a readme otherwise GraphQL query fails

**Product vision**

- [ ] **MM** introduce the concept - text, images and video
- [ ] **MM** how to find a challenge
- [ ] **MM** how challenges are displayed
- [ ] **MM** submission feedback
- [ ] **MM** user onboarding flow - github signup, email confirmation, simple
      get started challenge - place a form on a public webpage

**Tech**

- [ ] **MM** make submission visible based on external user identifier
- [ ] **MM** does a user see a submission or a run? or is a run a submission? only reason to
      hold mutli runs is to allow for flakys and re-run?
- [ ] **MM** submit a submission (URL, text, file) via widget embedded in form
- [ ] **MM** docker run submission and capture output ActiveJob
- [ ] **MM** set width of console output based on number of characters in submission output
- [ ] **MM** run a submission, run docker, configure between docker-compose
      files, metadata as part of submission, kubernetes cluster, spit output out to
      S3 bucket, other?
- [ ] **MM** sort out issue with post processing `helper_images`
- [1/2] **MM** user management on `/admin`
  ~~extra things are hidden but still need to lock them down~~
  they are locked down complete the test that that is the case
- [ ] **MM** login mandatory for `/demo` and bring back auth on `/graphql`
- [ ] **MM** better describe problems based on other sites: difficulty,
      category, progress, tags
- [ ] **MM**

- [ ] **MM** - run dockerised runner build on circleCI
      https://circleci.com/docs/2.0/browser-testing/

- [ ] sort out bootstrap in production last time fell back to using a CDN
      version
      [link](https://github.com/saramic/interactive-slide-show/commit/9dc66a3069725d478c89bbf3ceeb77f1c3f039d5)

- [ ] work out how to better style the markdown as per https://rexxars.github.io/react-markdown/
- [ ] evaluate https://codemirror.net/ for code editing

## DONE

- [x] **MM** display console control characters in HTML output
- [x] API to make image and feature file available
  ```
    challenge.feature_files.map do |feature_file|
      Rails.application.routes.url_helpers.rails_blob_path(feature_file, only_path: true)
    end
    challenge.helper_images.each do |helper_image|
      Rails.application.routes.url_helpers.rails_blob_path(helper_image, only_path: true)
    end
  ```
- [x] **MM** - dockerise a simple submission
- [x] **MM** - dockerise a challenge
- [x] **MM** - dockerise the runner build
  - influenced by [ruby on whales evilmartians
    blog](https://evilmartians.com/chronicles/ruby-on-whales-docker-for-ruby-rails-development)
    look at more optimisations here around `node_modules` etc.

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

- https://stg-real-code-runner.herokuapp.com/admin
- https://stg-real-code-runner.herokuapp.com/demo

1. do a deploy

```
RAILS_MASTER_KEY=`cat config/master.key` \
  RUNNER_SECRET=secret_runner            \
  HEROKU_APP_NAME=stg-real-code-runner   \
  make deploy
```

1. access heroku

- `heroku logs --tail`
- `heroku run rails console`
- `echo "puts User.all.pluck(:email)" | heroku run console --app=stg-real-code-runner --no-tty`

1. checkout the build

- team https://circleci.com/team/gh/saramic
- signup here https://circleci.com/signup/

1. add something to the TODO that you are working on 💥

## Docker

```
docker-compose build
docker-compose up

# and probably
docker-compose run --rm web bin/rails db:create db:migrate
docker-compose run --rm web yarn

# and probably need to restart the web container
docker-compose up --detach web

# finally
docker-compose exec web bundle exec cucumber
```

**Note:** _currently after running rails_ the yarn integrity check is out :(
should work out how to keep the integrity separate for the dockerized web.

This fires up

- web (rails server)
- webpack_dev_server
  (TODO: currently running one off `webpack` due to fingerprint issues
  with dev server vs rails)
- database (postgresql)
- webdriver_chrome

running cucumber fires up a test server on port 4000 under the `web`
container.

**Note:** there is a need for the `back` network to allow `cucumber` from
`web` to talk to `webdriver_chrome`.

**Note:** the `webpack_dev_server` container is currently running
`webpack` as otherwise the fingerprint on packs does not match up.
