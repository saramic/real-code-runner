Feature: Get started with web app testing some basic HTML

  Scenario: Get some text on a page
    Given a static file

    Then it has some pieces of text on the page
      | text                                                                       |
      | Welcome to Real Code Problems                                              |
      | Real code problems help you learn how to code while solving real problems. |

  Scenario: Put the text in appropriate tags `h1` and a `p` tag
    Given a static file

    Then it has a "h1" with the text "Welcome to Real Code Problems"
    And the following elements with text
      | tag | text                                                                       |
      | h1  | Welcome to Real Code Problems                                              |
      | p   | Real code problems help you learn how to code while solving real problems. |

  Scenario: Scope text behind page fragmets identified by data-testid's
    Given a static file

    Then it has a "h1" with the text "Welcome to Real Code Problems"
    And the following elements with text
      | fragment    | text                                                                       |
      | heading     | Welcome to Real Code Problems                                              |
      | sub-heading | Real code problems help you learn how to code while solving real problems. |
      | quote-1     | Real code problems are problems solved with web apps.                      |
      | quote-2     | Real code problems will help you build out BDD phrasing of problems.       |

