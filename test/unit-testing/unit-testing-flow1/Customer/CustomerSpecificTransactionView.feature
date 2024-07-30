Feature: Paymaart- Admin Web - Customer Specific Transaction View
  As an super/ admin, I want to view specific transaction of customer,so that I can get the insights
  Condition of satisfaction
  There should be an option to view the complete transaction details

    @add_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as super admin and view customer transactions
        Given I navigate to customer users listing screen
        When I click on customer transaction history icon
        Then I should be navigated to transaction history page
        When I click on view transaction for most recent transaction
        Then I should see the transaction receipt
        Then I should see the flag transaction and share button