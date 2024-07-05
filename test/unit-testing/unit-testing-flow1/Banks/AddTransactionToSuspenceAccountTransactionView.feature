Feature: Paymaart- Admin Web - Add transaction to Suspense Account Transaction View

As an super/finance admin, I want to add the transactions in the Suspense bank account, so that  e-money transaction to capital bank

Condition of satisfaction

There should be an add transaction button to add transaction 

The type should have a dropdown to select and move the e-money

There should be field to enter the amount

@add_admin_user @create_new_user_and_login
Scenario: Add transaction to suspense account with valid data and pay-out to agent/customer post delete or deactivate 
    Given I am in the add transaction for suspense account page
    Then I should see the enter by field is prefilled
    When I click on add button 
    Then I should read a message stating that "Required field"
    When I select the transaction type as <transaction_type> for suspense transaction
    When I enter invalid beneficiary paymaart id as <paymaart_id>
    When I enter the transaction amount as "100.99"
    When I enter the transaction POP ref. no as "47865hdsjdskfv"
    When I upload the valid transaction POP file as "document_front.png"
    When I click on add button
    Then I should read a message stating that "Invalid Paymaart ID"
    Examples:
        | transaction_type |paymaart_id|
         |"Pay-out to Agent Post DEL/DEACT from PTBA1 EM credit to PMCAT"|"00000"|
         |"Pay-out to Customer Post DEL/DEACT from PTBA1 EM credit to PMCAT"|"00000000"|

@add_admin_user @create_new_user_and_login
Scenario: Add transaction to suspense account with valid data and pay-out to RBM for RBM Unclaimed FI Funds
    Given I am in the add transaction for suspense account page
    When I select the transaction type as <transaction_type>
    When I enter the transaction amount as <amount>
    When I enter the transaction POP ref. no as "47865hdsjdskfv"
    When I upload the valid transaction POP file as "document_front.png"
    Then I should read a message stating that "Transaction details added successfully"
    Examples:
        | transaction_type                                                     | amount |
        |"Pay-out to RBM for RBM Unclaimed FI Funds Account EM credit to PTBA1"|"1000"|
        |"Pay-out to RBM for RBM Unclaimed FI Funds Account EM credit to PTBA2"|"1000.00"|
        |"Pay-out to RBM for RBM Unclaimed FI Funds Account EM credit to PTBA3"|"100.85"|

@add_admin_user @create_new_user_and_login
Scenario: Add transaction to suspense account with valid data and pay-out to agent post delete or deactivate 
    Given I am in the add transaction for suspense account page
    Then I should see the enter by field is prefilled
    When I click on add button 
    Then I should read a message stating that "Required field"
    When I select the transaction type as <transaction_type>
    Then I should see the paymaart id prefix as "AGT"
    When I enter valid beneficiary paymaart id as <paymaart_id>
    When I enter the transaction amount as <amount>
    When I enter the transaction POP ref. no as "47865hdsjdskfv"
    When I upload the valid transaction POP file as "document_front.png"
    Then I should read a message stating that "Transaction details added successfully"
    Examples:
        | transaction_type |paymaart_id| amount |
        |"Pay-out to Agent Post DEL/DEACT from PTBA1 EM credit to PMCAT"|"188420"|"1000"|
        |"Pay-out to Agent Post DEL/DEACT from PTBA2 EM credit to PMCAT"|"581073"|"1000.00"|
        |"Pay-out to Agent Post DEL/DEACT from PTBA3 EM credit to PMCAT"|"734288"|"100.85"|

@add_admin_user @create_new_user_and_login
Scenario: Add transaction to suspense account with valid data and pay-out to customer post delete or deactivate 
    Given I am in the add transaction for suspense account page
    Then I should see the enter by field is prefilled
    When I click on add button 
    Then I should read a message stating that "Required field"
    When I select the transaction type as <transaction_type>
    Then I should see the paymaart id prefix as "CMR"
    When I enter valid beneficiary paymaart id as <paymaart_id>
    When I enter the transaction amount as <amount>
    When I enter the transaction POP ref. no as "47865hdsjdskfv"
    When I upload the valid transaction POP file as "document_front.png"
    Then I should read a message stating that "Transaction details added successfully"
    Examples:
        | transaction_type |paymaart_id| amount |
        |"Pay-out to Customer Post DEL/DEACT from PTBA1 EM credit to PMCAT"|"48179665"|"1000"|
        |"Pay-out to Customer Post DEL/DEACT from PTBA2 EM credit to PMCAT"|"33801114"|"1000.00"|
        |"Pay-out to Customer Post DEL/DEACT from PTBA3 EM credit to PMCAT"|"18126263"|"100.85"|


    






