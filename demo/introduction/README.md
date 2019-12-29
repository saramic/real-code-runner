# Real Code Challenge - Introduction

An introduction to the concepts to Real Code Challenges.

The Introduction will take you through the process of becoming accustomed to
the format of the challenge and assciated tests. In no time you will be solving
BDD (Behaviour Driven Development) test cases to develop a working web app.

This will include:

- providing a text based answer
- running the test cases locally
_comming soon:_
  - getting accustomed to page fragments and identifying parts of the working
    app using `data-testid`'s
  - submitting a hosted solution using a URL
  - submitting a fully standalone ZIP of a working solution
  - more advanced work to predefine state of data in your solution

## Test cases

1. [Feature 01 get some static text on a web page](./features/feature_01_get_some_static_text_on_a_web_page.feature)

## Running

once downloaded locally run it locally against a solution

``` sh
ENTRY_POINT=solutions/index_5.html make build
```

or run using docker-compose
``` sh
ENTRY_POINT=solutions/index_5.html docker-compose up
# OR
ENTRY_POINT=solutions/index_5.html docker-compose run --rm features
# OR
docker-compose run --rm -e ENTRY_POINT=solutions/index_5.html features
```

