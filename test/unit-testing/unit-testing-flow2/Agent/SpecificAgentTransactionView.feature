Feature: Paymaart - Admin Web - Specific Agent Transaction View

    As an super/admin, I want to view specific transaction,so that I can get the insights

    Conditions of satisfaction
    1.There should be an option to view the complete transaction details 
    2.There should be an option to flag the transaction.

    @add_admin_user
    @create_new_user_and_login
    Scenario: Search for non existing record
        Given I navigate to agent users listing screen
        When I search for a agent 
        When I click on view agent transaction
        Then I should be redirected to transaction view page 
        And I should be able to view the wallet balance 
        And I should be able to view the gross agent commission
        When I search invalid beneficiary paymaart id 
        Then I should read a message stating that "No data found"

    Scenario: Filter agent transaction by transaction type
        Given I navigate to agent users listing screen
        When I search for a agent 
        When I click on view agent transaction
        Then I should be redirected to the transaction view page 
        And I should be able to view the wallet balance 
        And I should be able to view the gross agent commission
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by status as "Pay-in"
        Then I should see list of agent transaction where status is "Pay-in"
        When I click on clear filter
        Then I should see filter popup modal closed

    Scenario: View specific transaction by agent 
        Given I navigate to agent users listing screen
        When I search for a agent 
        When I click on view agent transaction
        Then I should be redirected to the transaction view page 
        And I should be able to view the wallet balance 
        And I should be able to view the gross agent commission
        When I click on view transaction for most recent transaction
        Then I should see the transaction recipt 
        Then I should see the flag transaction and share button

    
