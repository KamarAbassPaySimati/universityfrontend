Feature: Paymaart - Admin Web - Specific Agent Transaction View

    As an super/admin, I want to view specific transaction,so that I can get the insights

    Conditions of satisfaction
    1.There should be an option to view the complete transaction details 
    2.There should be an option to flag the transaction.

    @add_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: View specific transaction by agent 
       Given I navigate to agent users listing screen
        When I click on transaction history icon
        Then I should be navigated to transaction history page
        When I click on view transaction for most recent transaction
        Then I should see the transaction recipt 
        Then I should see the flag transaction and share button

    
