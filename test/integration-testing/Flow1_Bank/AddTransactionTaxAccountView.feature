Feature: Paymaart- Admin Web- Add transaction for Tax Account(VAT)
As an super/finance admin, I want to add the transactions in the Paymaart tax bank accoun, so that I can remove e-money 

Condition of Satisfaction
By default, the transactions should be listed in reverse chronological order.
There should be an option to filter based on the selected time frame
Pagination option should be present if more than 10 transactions(number of records/total number of pages)
4.There should be an option to move the e-money from account to capital account

    
  @add_admin_user @create_new_user_and_login
  Scenario: Adding transaction for tax account with valid data
    Given I navigate to tax account listing
    Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time, CAT","Balance"]'
    When I click on view button for bank details
    Then I should see prefilled fields for bank details for transaction
    Then I should see table header containing '["Service codes","Date/Time, CAT","Type","Entry by","Transaction ID", "Transaction POP Ref. No", "Transaction POP", "Amount", "Closing Balance"]'
    When I click on add transaction button
    Then I should see the enter by field is prefilled
    When I select the "Balance EM Excess Return to Paymaart Main Capital Account for Float" of transaction
    When I enter the transaction amount as "200"
    When I enter the transaction POP ref. no as "uweoewyuew27382"
    When I upload the valid transaction POP file as "document_front.png"
    When I click on add button
    Then I should read a message stating that "Transaction details added successfully"

  Scenario: Adding transaction for tax account with valid data
    Given I navigate to tax account listing
    Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time, CAT","Balance"]'
    When I click on view button for bank details
    Then I should see prefilled fields for bank details for transaction
    Then I should see table header containing '["Service codes","Date/Time, CAT","Type","Entry by","Transaction ID", "Transaction POP Ref. No", "Transaction POP", "Amount", "Closing Balance"]'
    When I click on add transaction button
    Then I should see the enter by field is prefilled
    When I select the "Balance EM Excess Return to Paymaart Main Capital Account for Payout" of transaction
    When I enter the transaction amount as "200"
    When I enter the transaction POP ref. no as "uweoewyuew27382"
    When I upload the valid transaction POP file as "document_front.png"
    When I click on add button
    Then I should read a message stating that "Transaction details added successfully"

  