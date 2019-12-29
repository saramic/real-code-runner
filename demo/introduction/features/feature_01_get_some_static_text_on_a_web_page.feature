Feature: Get some static text on a web page

  Scenario: Generate a static web page with a `h1` and a `p` tag
    Given a static file

    Then it has a "h1" with the text "Welcome to Real Code Problems"
    And the following elements with text
      | tag | text                                                                       |
      | h1  | Welcome to Real Code Problems                                              |
      | p   | Real code problems help you learn how to code while solving real problems. |

