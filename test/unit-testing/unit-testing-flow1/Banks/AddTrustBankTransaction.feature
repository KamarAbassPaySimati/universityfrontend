Feature: Paymaart -Admin Web - Add Transaction for Trust Bank
    As an Super/finance/dmin, I want to add the transactions in the Trust bank account, so that I have replicate the real bank

    Conditions for satisfaction

    1.There should be an option to add entries to any one of the trust bank accounts based on the real money deposited in the real bank
    2.There should be an option to enter the amount ,who deposited money in teh bank,Who is updating in the system
    3.There should be an option to enter the description based on the transaction entry names list.
    4.There should be an option to upload proof if any in .pdf,.png,.jpeg format.
    5.There should be an option to view the added transaction in the transaction history list

    Background: Navigate to add trust bank
        Given I navigate to banks listing
        When I click on view button for bank details
        And I should see prefilled fields for bank details
        Then I should be redirected to view transaction listing screen of that trust bank
        When I click on add trust bank transaction
        Then I should be redirected to add transaction for trust bank page

    @add_admin_user @create_new_user_and_login @get_agent_completed_kyc_list
    Scenario: Add transaction for trust bank with valid details for Pay-in by Agent to PTBA1 | RM credit
        When I select the transaction type as "Pay-in by Agent to PTBA1 | RM credit"
        When I enter valid agent paymaart ID
        When I enter the transaction amount as "100" for trust bank transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add trust bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for trust bank with invalid details for Pay-in by Agent to PTBA1 | RM credit
        When I select the transaction type as "Pay-in by Agent to PTBA1 | RM credit"
        When I enter the paymaart ID as <paymaart_id> for trust bank transaction
        When I enter the transaction amount as <amount> for trust bank transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add trust bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | paymaart_id | amount | transaction_pop_ref_no | POP_document        | message                                       |
            | ""          | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "AGT887631" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "AGT887631" | "1200" | ""                     | "document_back.png" | "Required field"                              |
            # | "AGT381283" | "1200" | "TRASACTION9910284"    | "document_back.png" | "Agent with this Paymaart ID does not exists" |

    Scenario Outline: Add transaction for trust bank with invalid details for Pay-in by Standard Customer to PTBA1 | RM credit
        When I select the transaction type as "Pay-in by Standard Customer to PTBA1 | RM credit"
        When I enter the paymaart ID as <paymaart_id> for trust bank transaction
        When I enter the transaction amount as <amount> for trust bank transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add trust bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | paymaart_id   | amount | transaction_pop_ref_no | POP_document        | message                                          |
            | ""            | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field"                                 |
            | "CMR82928453" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                                 |
            | "CMR82928454" | "1200" | ""                     | "document_back.png" | "Required field"                                 |
            # | "CMR82239898" | "1200" | "TRASACTION9910284"    | "document_back.png" | "Customer with this Paymaart ID does not exists" |

    @get_customer_completed_kyc_list
    Scenario: Add transaction for trust bank with valid details for Pay-in by Standard Customer to PTBA1 | RM credit
        When I select the transaction type as "Pay-in by Standard Customer to PTBA1 | RM credit"
        When I enter valid customer paymaart ID
        When I enter the transaction amount as "100" for trust bank transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add trust bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for trust bank with invalid details for Pay-in by G2P Customer to PTBA1 | RMcredit
        When I select the transaction type as "Pay-in by G2P Customer to PTBA1 | RMcredit"
        When I enter the paymaart ID as <paymaart_id> for trust bank transaction
        When I enter the transaction amount as <amount> for trust bank transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add trust bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | paymaart_id   | amount | transaction_pop_ref_no | POP_document        | message                                          |
            | ""            | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field"                                 |
            | "CMR82928453" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                                 |
            | "CMR82928454" | "1200" | ""                     | "document_back.png" | "Required field"                                 |
            # | "CMR82239898" | "1200" | "TRASACTION9910284"    | "document_back.png" | "Customer with this Paymaart ID does not exists" |

    @get_customer_completed_kyc_list
    Scenario: Add transaction for trust bank with valid details for Pay-in by G2P Customer to PTBA1 | RMcredit
        When I select the transaction type as "Pay-in by G2P Customer to PTBA1 | RMcredit"
        When I enter valid customer paymaart ID
        When I enter the transaction amount as "100" for trust bank transaction
        When I should see the entry by field should be disabled for add trust bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add trust bank transaction form
        Then I should read a message stating that "Transaction details added successfully"


    # Scenario Outline: Add transaction for trust bank with invalid details for Pay-in by Paymaart OBO Agent to PTBA1 | RM credit
    #     When I select the transaction type as "Pay-in by Paymaart OBO Agent to PTBA1 | RM credit"
    #     When I enter the paymaart ID as <paymaart_id> for trust bank transaction
    #     When I enter the transaction amount as <amount> for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
    #     When I upload the transaction POP document as <POP_document>
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that <message>
    #     Examples:
    #         | paymaart_id | amount | transaction_pop_ref_no | POP_document        | message                                       |
    #         | ""          | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
    #         | "AGT887631" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
    #         | "AGT887631" | "1200" | ""                     | "document_back.png" | "Required field"                              |
    #         | "AGT887631" | "1200" | "TRASACTION9910284"    | ""                  | "Required field"                              |
    #         | "AGT381283" | "1200" | "TRASACTION9910284"    | "document_back.png" | "Agent with this Paymaart ID does not exists" |

    # @get_agent_completed_kyc_list
    # Scenario: Add transaction for trust bank with valid details for Pay-in by Paymaart OBO Agent to PTBA1 | RM credit
    #     When I select the transaction type as "Pay-in by Paymaart OBO Agent to PTBA1 | RM credit"
    #     When I enter valid agent paymaart ID
    #     When I enter the transaction amount as "100" for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the valid transaction POP Ref.No
    #     When I upload the transaction POP document as "document_back.png"
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that "Transaction details added successfully"

    # Scenario Outline: Add transaction for trust bank with invalid details for Pay-in by Paymaart OBO Standard Customer to PTBA1 | RM credit
    #     When I select the transaction type as "Pay-in by Paymaart OBO Standard Customer to PTBA1 | RM credit"
    #     When I enter the paymaart ID as <paymaart_id> for trust bank transaction
    #     When I enter the transaction amount as <amount> for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
    #     When I upload the transaction POP document as <POP_document>
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that <message>
    #     Examples:
    #         | paymaart_id   | amount | transaction_pop_ref_no | POP_document        | message                                          |
    #         | ""            | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field"                                 |
    #         | "CMR82928453" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                                 |
    #         | "CMR82928454" | "1200" | ""                     | "document_back.png" | "Required field"                                 |
    #         | "CMR82928455" | "1200" | "TRASACTION9910284"    | ""                  | "Required field"                                 |
    #         | "CMR82239898" | "1200" | "TRASACTION9910284"    | "document_back.png" | "Customer with this Paymaart ID does not exists" |

    # @get_customer_completed_kyc_list
    # Scenario: Add transaction for trust bank with valid details for Pay-in by Paymaart OBO Standard Customer to PTBA1 | RM credit
    #     When I select the transaction type as "Pay-in by Paymaart OBO Standard Customer to PTBA1 | RM credit"
    #     When I enter valid customer paymaart ID
    #     When I enter the transaction amount as "100" for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the valid transaction POP Ref.No
    #     When I upload the transaction POP document as "document_back.png"
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that "Transaction details added successfully"

    # Scenario Outline: Add transaction for trust bank with invalid details for Pay-in by Paymaart OBO G2P Customer to PTBA1 | RM credit
    #     When I select the transaction type as "Pay-in by Paymaart OBO G2P Customer to PTBA1 | RM credit"
    #     When I enter the paymaart ID as <paymaart_id> for trust bank transaction
    #     When I enter the transaction amount as <amount> for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
    #     When I upload the transaction POP document as <POP_document>
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that <message>
    #     Examples:
    #         | paymaart_id   | amount | transaction_pop_ref_no | POP_document        | message                                          |
    #         | ""            | "1200" | "TRASACTION9910284"    | "document_back.png" | "Required field"                                 |
    #         | "CMR82928453" | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                                 |
    #         | "CMR82928454" | "1200" | ""                     | "document_back.png" | "Required field"                                 |
    #         | "CMR82928455" | "1200" | "TRASACTION9910284"    | ""                  | "Required field"                                 |
    #         | "CMR82239898" | "1200" | "TRASACTION9910284"    | "document_back.png" | "Customer with this Paymaart ID does not exists" |

    # @get_customer_completed_kyc_list
    # Scenario: Add transaction for trust bank with valid details for Pay-in by Paymaart OBO G2P Customer to PTBA1 | RM credit
    #     When I select the transaction type as "Pay-in by Paymaart OBO G2P Customer to PTBA1 | RM credit"
    #     When I enter valid customer paymaart ID
    #     When I enter the transaction amount as "100" for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the valid transaction POP Ref.No
    #     When I upload the transaction POP document as "document_back.png"
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that "Transaction details added successfully"

    # Scenario Outline: Add transaction for trust bank with invalid details for Inflow For E-money Float/other E-Funding to PTBA1 | RM credit
    #     When I select the transaction type as "Inflow For E-money Float/other E-Funding to PTBA1 | RM credit"
    #     When I enter the transaction amount as <amount> for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
    #     When I upload the transaction POP document as <POP_document>
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that <message>
    #     Examples:
    #         | amount | transaction_pop_ref_no | POP_document        | message          |
    #         | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
    #         | "1200" | ""                     | "document_back.png" | "Required field" |
    #         | "1200" | "TRASACTION9910284"    | ""                  | "Required field" |

    # Scenario: Add transaction for trust bank with valid details for Inflow For E-money Float/other E-Funding to PTBA1 | RM credit
    #     When I select the transaction type as "Inflow For E-money Float/other E-Funding to PTBA1 | RM credit"
    #     When I enter the transaction amount as "100" for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the valid transaction POP Ref.No
    #     When I upload the transaction POP document as "document_back.png"
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that "Transaction details added successfully"

    # Scenario Outline: Add transaction for trust bank with invalid details for Inflow for Marketing Campaign Fund to PTBA1 | RM credit
    #     When I select the transaction type as "Inflow for Marketing Campaign Fund to PTBA1 | RM credit"
    #     When I enter the transaction amount as <amount> for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
    #     When I upload the transaction POP document as <POP_document>
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that <message>
    #     Examples:
    #         | amount | transaction_pop_ref_no | POP_document        | message          |
    #         | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
    #         | "1200" | ""                     | "document_back.png" | "Required field" |
    #         | "1200" | "TRASACTION9910284"    | ""                  | "Required field" |

    # Scenario: Add transaction for trust bank with valid details for Inflow for Marketing Campaign Fund to PTBA1 | RM credit
    #     When I select the transaction type as "Inflow for Marketing Campaign Fund to PTBA1 | RM credit"
    #     When I enter the transaction amount as "100" for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the valid transaction POP Ref.No
    #     When I upload the transaction POP document as "document_back.png"
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that "Transaction details added successfully"

    # Scenario Outline: Add transaction for trust bank with invalid details for Receipt of Customer Balances Interest from <PTBA1>, PTBA1 | RM credit
    #     When I select the transaction type as "Receipt of Customer Balances Interest from <PTBA1>, PTBA1 | RM credit"
    #     When I enter the transaction amount as <amount> for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
    #     When I upload the transaction POP document as <POP_document>
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that <message>
    #     Examples:
    #         | amount | transaction_pop_ref_no | POP_document        | message          |
    #         | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
    #         | "1200" | ""                     | "document_back.png" | "Required field" |
    #         | "1200" | "TRASACTION9910284"    | ""                  | "Required field" |

    # Scenario: Add transaction for trust bank with valid details for Receipt of Customer Balances Interest from <PTBA1>, PTBA1 | RM credit
    #     When I select the transaction type as "Receipt of Customer Balances Interest from <PTBA1>, PTBA1 | RM credit"
    #     When I enter the transaction amount as "100" for trust bank transaction
    #     When I should see the entry by field should be disabled for add trust bank transaction
    #     When I enter the valid transaction POP Ref.No
    #     When I upload the transaction POP document as "document_back.png"
    #     When I submit the add trust bank transaction form
    #     Then I should read a message stating that "Transaction details added successfully"