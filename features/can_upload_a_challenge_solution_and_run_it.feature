Feature: can upload a challenge, solution and run it

  @javascript
  Scenario: Michael runs a solution for a challenge
    Given "Michael" signs up and is anointed an admin

    When "Michael" uploads a challenge
      | Title | Description          |
      | Blog  | a blog in 3 features |

    Then he gets message "Challenge was successfully created."

    When "Michael" uploads a submission to "blog"
      | Challenge | External user identifier |
      | Blog      | michael_abc_123          |

    Then he gets message "Submission was successfully created."

    When "he" runs his submission against the challenge

    Then he gets message "Run was successfully created."

