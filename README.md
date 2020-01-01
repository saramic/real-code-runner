# README

## Running

### Install required tools

```bash
make install_tools
make check_tools
make build
```

- Install and start Docker

### Quick start reset db and get some data

Assuming you have tools setup, start from scratch by reseting the database,
creating a user and adding a challenge.

**Note:**

- to run the submission you will need docker running.
- first time it is run the docker image needs to be built and the last step
  will take minutes to complete (~18 mins via rake task or ~8 mins with a
  `docker-compose build` on my machine/network)

replace email with an email you like to login to in development mode with
password: `password`

```
make setup email=saramic@gmail.com

rails server
```

Now you should be able to view the challenge and submission

- http://localhost:3000/admin - to manage users, challenges and view
  submissions and runs
- http://localhost:3000/demo - a demo of what the frontend for submitting
  submissions might look like
- http://localhost:3000/prototype - for external users to use runner as API

---

### Admin priveledges for a user

```bash
rake setup:admin_user[saramic@gmail.com]
```

### Manual tasks

to be replaced by **BACKGROUND WORKERS**

When a challenge is first created it's state is `uploaded`. Any challenge that
is `uploaded` needs to be `processed` to extract: features, readme,
metadata.json and helper_images. This processing can be done any time to all
`uploaded` challenges idempotently using:

```
rake process:challenges
```

When a submission is updated it's state is `uploaded`. Any submission in the
state `uploaded` can be processed by running the associated `challenge` against
the `submission` in a `run` using the following task:

```
rails process:submissions
```

### Deploying

assuming you have access to `config/master.key` you can deploy to
https://stg-real-code-runner.herokuapp.com/admin using

```
make deploy
```

### Heroku staging

- https://stg-real-code-runner.herokuapp.com/admin
- https://stg-real-code-runner.herokuapp.com/demo
- https://stg-real-code-runner.herokuapp.com/prototype

**Handy Heroku commands**

- `heroku git:remote --app stg-real-code-runner` attach to Heroku app
- `heroku logs --tail`
- `heroku run rails console`
- `echo "puts User.all.pluck(:email)" | heroku run console --app=stg-real-code-runner --no-tty`

### CI

_need to make CI run actual JS integration specs_

- team https://circleci.com/team/gh/saramic
- signup here https://circleci.com/signup/

---

## TODO

**Background Workers**

- [ ] worker for post processing an uploaded challenge `test_case` zip file
      extract: features, readme, metadata.json and helper_images. basically to run
      `lib/tasks/process_challenges.rake`
  ```
  rake process:challenges
  ```
  - worker should be triggered any time `status` is set to `uploaded` (new
    record and update to test_case)
- [ ] worker for running a submission against a challenge. For submissions in status `uploaded`
      basically to run `lib/tasks/process_submissions.rake`
  ```
  rails process:submissions
  ```
  - worker should be triggered any time `status` is set to `uploaded` (new
    record and update to text)
- [ ] setup workers in Heroku
- [ ] do all the other background worker things: retries, deal with errors, a status dasboard, etc

**Product vision**

- [ ] fix BDD terminology in challenges

* [ ] **MM** introduce the concept - text, images and video
* [ ] **MM** how to find a challenge
* [ ] **MM** how challenges are displayed
* [ ] **MM** submission feedback
* [ ] **MM** user onboarding flow - github signup, email confirmation, simple
      get started challenge - place a form on a public webpage
* [ ] **MM** all the best features - competitions, follow up emails, initial
      success, more of the hooked model

**Top of mind**

- [ ] widgetized form need to get the host and port from the server and not
      from where they are displayed `window.location.pathname`
- [ ] make submission runner more generic
- [ ] fix frontend to actually allow submissions
  - [ ] update frontend to make use of metadata
  - [ ] decide NOT to store the run output in submission
  - [ ] persist result on tab changes, maybe even save in between?
  - [ ] show previous submission
  - [ ] show status
  - [ ] reload to see most up to date info
  - [ ] nav between feature, submission and result
- [ ] solution to support URL & token
- [ ] solution to support zip file & runner command
- [ ] log to file in shared dir between local and docker not to have to strip
      out docker service name but had issues with `|` in `CMD` section of docker
  ```
  ADD log /var/log
  CMD .... | tee /var/log/output.txt
  ```
- [ ] move the manifest finding code into a `non-cached` main.js
- [ ] use signed keys not the actual JWT
- [ ] change the JWT to have a known secret
- [ ] add graphQL add submission to `/prototype`

**Bugs**

- [ ] need a readme otherwise GraphQL query fails
- [ ] links from markdown README in /demo go to the wrong place - either
      redirect or somehow overwrite them in the raw README text or the
      markdown parser?
- [ ] delete_all on Submission still has problems with cascading deletes of
      runs?

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

- [x] status for Challenge and update both for re-processing
- [x] UUID and BigInt mismatch led down false path to inline processing image in development
      but still seems necessary
      config/environments/development.rb to `config.active_job.queue_adapter = :inline`
      as part of commit
      [bd55a92](https://github.com/saramic/real-code-runner/commit/bd55a9224d16c4a9b2564760fa0b32cdd304ea62)
      as tested in rails console with
      ```
      rails console

      require 'rake'
      Rails.application.load_tasks
      Rake::Task['process:challenges'].invoke
      ```

- [x] solution to support text
- [x] run a docker command from rails, look at coloring, etc
      `rails process:submissions`
- [x] file upload widget using JWT
- [x] can we just use a plain old form? - yes
- [x] what is `ActiveSupport::MessageVerifier::InvalidSignature` error - need
      enctype to be multipart
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
