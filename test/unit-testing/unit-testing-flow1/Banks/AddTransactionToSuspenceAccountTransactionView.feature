Feature: Paymaart- Admin Web - Add transaction to Suspense Account Transaction View
    As an super/finance admin, I want to add the transactions in the Suspense bank account, so that  e-money transaction to capital bank
    Condition of satisfaction
    There should be an add transaction button to add transaction
    The type should have a dropdown to select and move the e-money
    There should be field to enter the amount

    Background: Navigate to add suspense account transaction
        Given I am in the add transaction for suspense account page

    @add_admin_user @create_new_user_and_login
    Scenario: Add transaction for suspence account with valid details for Pay-out to Agent Post Deactivation from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Agent Post Deactivation from PTBA1 | EM credit to PMCAT"
        When I enter the paymaart ID as "AGT941188" for suspense account transaction
        When I enter the transaction amount as "1" for suspense account transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add trust bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for suspence account with invalid details for Pay-out to Agent Post Deactivation from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Agent Post Deactivation from PTBA1 | EM credit to PMCAT"
        When I enter the paymaart ID as <paymaart_id> for suspense account transaction
        When I enter the transaction amount as <amount> for suspense account transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add trust bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | paymaart_id | amount | transaction_pop_ref_no | POP_document        | message          |
            | ""          | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "AGT887631" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "AGT887631" | "1200" | ""                     | "document_back.png" | "Required field" |

    Scenario: Add transaction for suspence account with valid details for Pay-out to Customer Post Deactivation from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Customer Post Deactivation from PTBA1 | EM credit to PMCAT"
        When I enter the paymaart ID as "CMR72951797" for suspense account transaction
        When I enter the transaction amount as "1" for suspense account transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add trust bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for suspence account with invalid details for Pay-out to Customer Post Deactivation from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Customer Post Deactivation from PTBA1 | EM credit to PMCAT"
        When I enter the paymaart ID as <paymaart_id> for suspense account transaction
        When I enter the transaction amount as <amount> for suspense account transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add trust bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | paymaart_id | amount | transaction_pop_ref_no | POP_document        | message          |
            | ""          | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "AGT887631" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "AGT887631" | "1200" | ""                     | "document_back.png" | "Required field" |

    Scenario: Add transaction for suspence account with valid details for Pay-out to Agent Post Deletion from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Agent Post Deletion from PTBA1 | EM credit to PMCAT"
        When I enter the paymaart ID as "AGT941188" for suspense account transaction
        When I enter the transaction amount as "1" for suspense account transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add trust bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for suspence account with invalid details for Pay-out to Agent Post Deletion from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Agent Post Deletion from PTBA1 | EM credit to PMCAT"
        When I enter the paymaart ID as <paymaart_id> for suspense account transaction
        When I enter the transaction amount as <amount> for suspense account transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add trust bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | paymaart_id | amount | transaction_pop_ref_no | POP_document        | message          |
            | ""          | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "AGT887631" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "AGT887631" | "1200" | ""                     | "document_back.png" | "Required field" |

    Scenario: Add transaction for suspence account with valid details for Pay-out to Customer Post Deletion from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Customer Post Deletion from PTBA1 | EM credit to PMCAT"
        When I enter the paymaart ID as "CMR72951797" for suspense account transaction
        When I enter the transaction amount as "1" for suspense account transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add trust bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for suspence account with invalid details for Pay-out to Customer Post Deletion from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Pay-out to Customer Post Deletion from PTBA1 | EM credit to PMCAT"
        When I enter the paymaart ID as <paymaart_id> for suspense account transaction
        When I enter the transaction amount as <amount> for suspense account transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add trust bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | paymaart_id | amount | transaction_pop_ref_no | POP_document        | message          |
            | ""          | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "AGT887631" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "AGT887631" | "1200" | ""                     | "document_back.png" | "Required field" |