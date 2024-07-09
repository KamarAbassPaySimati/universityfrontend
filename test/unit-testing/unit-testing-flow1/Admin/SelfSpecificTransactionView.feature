Feature: Paymaart- Admin Web- Self Specific transaction view
    As a super admin/finance/admin, I want to see the complete details of a specific transaction
    Conditions of satisfaction
    There should be an option to see the payment status 
    Transaction details should be share able through watsapp, email,pdf etc 
    There should be an option to flag the transaction

  @add_admin_user @create_new_user_and_login @create_transactions @delete_admin_account @delete_transaction
  Scenario: Viewing specific Transaction
    Given I navigate to Transaction History Page
    Then I should see table header containing '["Service Code","Date/ Time","Beneficiary Paymaart ID","Transaction ID","Type","Amount"]'
    When I click on the view button for first transaction in list
    Then I should be redirected to transaction details page


