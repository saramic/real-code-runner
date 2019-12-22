Feature: user actions to limit what you can do in admin

  @javascript
  Scenario: Nathan is a plain user
    Given "Nathan" signs up and is anointed with
      | user_actions | {} |
    Then "he" gets message "Welcome! You have signed up successfully."

    When "he" looks at "Users"
    Then "he" sees the header
      | text | Users |
    And "he" only sees action types
      | actions | action-show |
    
    # TODO: can still execute the actions!!!
    When "he" visits "/admin/users/new" directly
    Then "he" sees the header
      | text | New Users Back |

    When "he" looks at "Challenges"
    Then "he" sees the header
      | text | Challenges |

    When "he" looks at "Submissions"
    Then "he" sees the header
      | text | Submissions |

    When "he" looks at "Runs"
    Then "he" sees the header
      | text | Runs |

  @javascript
  Scenario: Taya can administer
    Given "Taya" signs up and is anointed with
      | user_actions | { "admin": { "can_administer": true }, "users": { "can_edit": false } } |
    Then "she" gets message "Welcome! You have signed up successfully."

    When "she" looks at "Users"
    Then "she" sees the header
      | text | Users |
    And "she" only sees action types
      | actions | action-show |

    When "she" looks at "Challenges"
    Then "she" sees the header
      | text | Challenges New challenge |

    When "she" looks at "Submissions"
    Then "she" sees the header
      | text | Submissions New submission |

    When "she" looks at "Runs"
    Then "she" sees the header
      | text | Runs New run |

  @javascript
  Scenario: Michael can administer and user edit
    Given "Michael" signs up and is anointed with
      | user_actions | { "admin": { "can_administer": true }, "users": { "can_edit": true } } |
    Then "he" gets message "Welcome! You have signed up successfully."

    When "he" looks at "Users"
    Then "he" sees the header
      | text | Users New user |
    And "he" only sees action types
      | actions | action-show action-edit text-color-red |

    When "he" looks at "Challenges"
    Then "he" sees the header
      | text | Challenges New challenge |

    When "he" looks at "Submissions"
    Then "he" sees the header
      | text | Submissions New submission |

    When "he" looks at "Runs"
    Then "he" sees the header
      | text | Runs New run |
