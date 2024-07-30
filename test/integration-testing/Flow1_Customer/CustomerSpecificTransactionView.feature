Feature: Paymaart- Admin Web - Customer Specific Transaction View
  As an super/ admin, I want to view specific transaction of customer,so that I can get the insights
  Condition of satisfaction
  There should be an option to view the complete transaction details

    @add_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as super admin and view customer transactions
        Given I navigate to customer users listing screen
        When I click on transaction history icon
        Then I should be navigated to transaction history page
        Then I should see table header containing '["Service Code","Date/ Time, CAT","Transaction ID","Beneficiary Paymaart ID", "Type","Amount"]'
        And I should see wallet balance
        When I click on view transaction for most recent transaction
        Then I should see the transaction receipt