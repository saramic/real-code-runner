PROJECT := real-code-runner

default: usage

usage:
	bin/makefile/usage

reset_db: check_reset_db
	rails db:drop db:create db:reset

check_reset_db:
	@echo -n "RESET DB - Are you sure? [y/N] " && read ans && [ $${ans:-N} = y ]

setup: reset_db zip_demo
	rails setup:admin_user[$(or $(email),$(error must specify an email: "make setup email=user@email.com"))]
	rails runner 'challenge = Challenge.create!(title: "Introduction", description: "An introduction to real code problems."); challenge.test_case.attach(io: StringIO.new(File.open("demo/challenge-introduction.zip").read), filename: "demo/challenge-introduction.zip")'
	rails process:challenges
	rails runner 'challenge = Challenge.find_by(title: "Introduction"); Submission.create!(challenge_id: challenge.id, external_user_identifier: "demo_user", text: "<h1>some title</h1>")'
	rails process:submissions

zip_demo:
	pushd demo && zip challenge-introduction.zip -r introduction && popd

.PHONY: build
build:
	bin/full-build

.PHONY: check_tools
check_tools:
	bin/check-tools

.PHONY: install_tools
install_tools:
	bin/install-tools

.PHONY: deploy
deploy:
	RAILS_MASTER_KEY=`cat config/master.key` \
		RUNNER_SECRET=secret_runner \
		HEROKU_APP_NAME=stg-real-code-runner \
		bin/heroku-create

