Feature: Paymaart - Admin Web- Add Transaction to Transaction Fee & Commission Bank Transaction
    As an super/finance admin, I want to add transaction  in the Paymaart transaction fee and commission bank account, so that I can move e-money to capital account
    Conditions of Satisfaction
    There should be an option to move the e-money from account to capital account
    There should be dropdown with list of the selection for add transaction
    There should be an option to enter the money
    equivalent e-money to be removed from current bank and moved to destination bank

  @add_admin_user @create_new_user_and_login
  Scenario: Navigating to Transaction fee and commission banks add transactions screen
    Given I navigate to Transaction fee and commision bank listing
    Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time, CAT","Balance"]'
    When I click on view button for bank details
    Then I should see prefilled fields for Transaction fee and commision bank details for transaction
    Then I should see table header containing '["Service codes","Date/Time, CAT","Type","Entry by","Transaction ID", "Transaction POP Ref. No", "Transaction POP", "Amount", "Closing Balance"]'
    When I click on add Transaction for Transaction fee and commission bank
    Then I should be redirected to add transaction for Transaction fee and commission banks page

  Scenario Outline: Add transaction for Transaction fee and commission banks with invalid details for Balance EM Excess Return to Paymaart Main Capital Account for Float
    Given I am in Add transaction Page for Transaction Fee and Commission Bank
    When I select the transaction type as "Balance EM Excess Return to Paymaart Main Capital Account for Float" for Transaction fee and commission banks
    When I enter the transaction amount as <amount> for Transaction fee and commission banks transactions
    When I should see the entry by field should be disabled for Transaction fee and commission banks
    When I enter the transaction POP Ref.No as <transaction_pop_ref_no> for Transaction fee and commission banks
    When I upload the transaction POP document as <POP_document> for Transaction fee and commission banks
    When I submit the Transaction fee and commission banks form
    Then I should read a message stating that <message>

    Examples:
      | amount | transaction_pop_ref_no | POP_document        | message          |
      | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
      | "1200" | ""                     | "document_back.png" | "Required field" |

  Scenario Outline: Add transaction for Transaction fee and commission banks with invalid details for Balance EM Excess Return to Paymaart Main Capital Account for Payout
    Given I am in Add transaction Page for Transaction Fee and Commission Bank
    When I select the transaction type as "Balance EM Excess Return to Paymaart Main Capital Account for Payout" for Transaction fee and commission banks
    When I enter the transaction amount as <amount> for Transaction fee and commission banks transactions
    When I should see the entry by field should be disabled for Transaction fee and commission banks
    When I enter the transaction POP Ref.No as <transaction_pop_ref_no> for Transaction fee and commission banks
    When I upload the transaction POP document as <POP_document> for Transaction fee and commission banks
    When I submit the Transaction fee and commission banks form
    Then I should read a message stating that <message>

    Examples:
      | amount | transaction_pop_ref_no | POP_document        | message          |
      | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
      | "1200" | ""                     | "document_back.png" | "Required field" |

  Scenario: Add transaction for Transaction fee and commission banks with valid details for Balance EM Excess Return to Paymaart Main Capital Account for Float
    Given I am in Add transaction Page for Transaction Fee and Commission Bank
    When I select the transaction type as "Balance EM Excess Return to Paymaart Main Capital Account for Float" for Transaction fee and commission banks
    When I enter the transaction amount as "10000" for Transaction fee and commission banks transactions
    When I should see the entry by field should be disabled for Transaction fee and commission banks
    When I enter the valid transaction POP Ref.No for Transaction fee and commission banks
    When I upload the transaction POP document as "document_back.png" for Transaction fee and commission banks
    When I submit the Transaction fee and commission banks form
    Then I should read a message stating that "Transaction details added successfully"

  @delete_admin_account
  Scenario: Add transaction for Transaction fee and commission banks with valid details for Balance EM Excess Return to Paymaart Main Capital Account for Payout
    Given I am in Add transaction Page for Transaction Fee and Commission Bank
    When I select the transaction type as "Balance EM Excess Return to Paymaart Main Capital Account for Payout" for Transaction fee and commission banks
    When I enter the transaction amount as "10000" for Transaction fee and commission banks transactions
    When I should see the entry by field should be disabled for Transaction fee and commission banks
    When I enter the valid transaction POP Ref.No for Transaction fee and commission banks
    When I upload the transaction POP document as "document_back.png" for Transaction fee and commission banks
    When I submit the Transaction fee and commission banks form
    Then I should read a message stating that "Transaction details added successfully"
