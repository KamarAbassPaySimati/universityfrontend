Feature: Paymaart - Admin Web- Add Transaction to Transaction Fee & Commission Bank Transaction
    As an super/finance admin, I want to add transaction  in the Paymaart transaction fee and commission bank account, so that I can move e-money to capital account
    Conditions of Satisfaction
    There should be an option to move the e-money from account to capital account
    There should be dropdown with list of the selection for add transaction
    There should be an option to enter the money
    equivalent e-money to be removed from current bank and moved to destination bank

    @add_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Navigating to Transaction fee and commission banks add transactions screen
        Given I navigate to Transaction fee and commision bank listing
        Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time","Balance"]'
        When I click on view button for bank details
        Then I should see prefilled fields for Transaction fee and commision bank details for transaction
        Then I should see table header containing '["Service codes","Date/Time","Type","Entry by","Transaction ID", "Transaction POP Ref. No", "Transaction POP", "Amount", "Closing Balance"]'
        When I click on add Transaction for Transaction fee and commission bank
        Then I should be redirected to add transaction for Transaction fee and commission banks page

    Scenario: Add transaction for Transaction fee and commission banks with valid details for Balance EM Excess Return to Paymaart Main Capital Account for Float
        When I select the transaction type as "Balance EM Excess Return to Paymaart Main Capital Account for Float" for Transaction fee and commission banks
        When I enter the transaction amount as "10000" for Transaction fee and commission banks transactions
        When I should see the entry by field should be disabled for Transaction fee and commission banks 
        When I enter the valid transaction POP Ref.No for Transaction fee and commission banks 
        When I upload the transaction POP document as "document_back.png" for Transaction fee and commission banks 
        When I submit the Transaction fee and commission banks form
        Then I should read a message stating that "Transaction details added successfully"

     Scenario Outline: Add transaction for Transaction fee and commission banks with invalid details for Balance EM Excess Return to Paymaart Main Capital Account for Float
        When I select the transaction type as "Balance EM Excess Return to Paymaart Main Capital Account for Float" for Transaction fee and commission banks
        When I enter the transaction amount as <amount> for Transaction fee and commission banks transactions
        When I should see the entry by field should be disabled for Transaction fee and commission banks 
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no> for Transaction fee and commission banks
        When I upload the transaction POP document as <POP_document> for Transaction fee and commission banks 
        When I submit the Transaction fee and commission banks form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message                                       |
            # | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "1200" | ""                     | "document_back.png" | "Required field"                              |
            # | "1200" | "TRASACTION9910284"    | "document_back.png" | "Agent with this Paymaart ID does not exists" |

    Scenario: Add transaction for Transaction fee and commission banks with valid details for Balance EM Excess Return to Paymaart Main Capital Account for Payout
        When I select the transaction type as "Balance EM Excess Return to Paymaart Main Capital Account for Payout" for Transaction fee and commission banks
        When I enter the transaction amount as "10000" for Transaction fee and commission banks transactions
        When I should see the entry by field should be disabled for Transaction fee and commission banks 
        When I enter the valid transaction POP Ref.No for Transaction fee and commission banks 
        When I upload the transaction POP document as "document_back.png" for Transaction fee and commission banks 
        When I submit the Transaction fee and commission banks form
        Then I should read a message stating that "Transaction details added successfully"

     Scenario Outline: Add transaction for Transaction fee and commission banks with invalid details for Balance EM Excess Return to Paymaart Main Capital Account for Payout
        When I select the transaction type as "Balance EM Excess Return to Paymaart Main Capital Account for Payout" for Transaction fee and commission banks
        When I enter the transaction amount as <amount> for Transaction fee and commission banks transactions
        When I should see the entry by field should be disabled for Transaction fee and commission banks 
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no> for Transaction fee and commission banks
        When I upload the transaction POP document as <POP_document> for Transaction fee and commission banks 
        When I submit the Transaction fee and commission banks form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message                                       |
            | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "1200" | ""                     | "document_back.png" | "Required field"                              |
            | "1200" | "TRASACTION9910284"    | "document_back.png" | "Agent with this Paymaart ID does not exists" |




















    # Scenario: Filter accounts by date
    #     When I click on filter tab
    #     Then I should see filter popup modal
    #     And I select start date as "08-Jan-2023"
    #     And I select end date as "07-Jan-2023"
    #     Then I click on the apply filter button
    #     Then I should read a message stating that "Start date cannot be greater than end date"  
    #     And I select start date as "08-Jan-2023"
    #     And I select end date as "07-Nov-2024"
    #     Then I click on the apply filter button
    #     Then I should see list of transactions where between "08 Jan 2023" and "07 Nov 2024"

    # Scenario: Checking Pagination
    #     When I click on paginate next page
    #     Then I should be navigated to page 2
    #     When I click on paginate to previous page
    #     Then I should be navigated to page 1