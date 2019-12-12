Feature: can upload a challenge, solution and run it

  @javascript
  Scenario: Michael runs a solution for a challenge
    Given "Michael" is admin

    When "Michael" uploads a challenge
    | Title | Description          |
    | Blog  | a blog in 3 features |

    Then he gets message "Challenge was successfully created."
