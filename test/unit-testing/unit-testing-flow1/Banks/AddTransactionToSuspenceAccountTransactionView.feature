Feature: Paymaart- Admin Web - Add transaction to Suspense Account Transaction View
    As an super/finance admin, I want to add the transactions in the Suspense bank account, so that  e-money transaction to capital bank
    Condition of satisfaction
    There should be an add transaction button to add transaction
    The type should have a dropdown to select and move the e-money
    There should be field to enter the amount

    Background: Navigate to add suspense account transaction
        Given I am in the add transaction for suspense account page

    @add_admin_user @create_new_user_and_login @get_agent_completed_kyc_list
    Scenario: Add transaction for trust bank with valid details for Pay-out to Agent Post DEL/DEACT from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Agent Post DEL/DEACT from PTBA1 | EM credit to PMCAT"
        When I enter valid agent paymaart ID
        When I enter the transaction amount as "10000" for trust bank transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add trust bank transaction form
        Then I should read a message stating that "Transaction details added successfully"