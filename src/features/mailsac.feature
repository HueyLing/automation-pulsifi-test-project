Feature: Mailsac Mailbox Check

  Scenario: Check mailbox creation and verify email
    Given I navigate to the Mailsac website
    When I enter a formatted mailbox name and click check email button    
    Then I should see the correct mailbox address on the redirected page

  Scenario: Check empty mailbox creation and verify invalid email
    Given I navigate to the Mailsac website
    When I enter an empty mailbox and click check email button    
    Then I should see validation error "This field cannot be blank"