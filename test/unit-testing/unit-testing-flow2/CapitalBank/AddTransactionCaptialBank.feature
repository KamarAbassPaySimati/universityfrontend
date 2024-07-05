Feature: Paymaart- Admin Web- Add Capital Bank Transactions
    As an super/finance admin, I want to add the transactions in the Capital bank account, so that I can generate the e-money manually

    Condition of Satisfaction

    There should be an option to add entries to the capital bank accounts based on the capital bank account entry

    There should be an option to enter the amount and description

    There should be an option to view the added transaction in the transaction history list

    There should be an option to auto-match the money that has been inserted in the capital bank

    Background: Navigate to add capital bank
        Given I navigate to add captial bank transaction screen

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    Scenario: Add transaction for capital bank with valid details for Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add capital bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for capital bank with invalid details for Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT
        When I select the transaction type as "Outflow for excess Float withdrawal from PTBA1 | EM credit to PMCAT"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message          |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "1200" | ""                     | "document_back.png" | "Required field" |

    Scenario Outline: Add transaction for capital bank with invalid details for Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT
        When I select the transaction type as "Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message          |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "1200" | ""                     | "document_back.png" | "Required field" |

    Scenario: Add transaction for capital bank with valid details for Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT
        When I select the transaction type as "Outflow for excess Float withdrawal from PTBA2 | EM credit to PMCAT"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add capital bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for capital bank with invalid details for Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT
        When I select the transaction type as "Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message          |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
            | "1200" | ""                     | "document_back.png" | "Required field" |

    Scenario: Add transaction for capital bank with valid details for Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT
        When I select the transaction type as "Outflow for excess Float withdrawal from PTBA3 | EM credit to PMCAT"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add capital bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

@get_agent_completed_kyc_list
    # Merchant Biller ID is Afrimax
    Scenario: Add transaction for capital bank with valid details for Settlement to Merchant Biller from PTBA1| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA1| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Afrimax | MCT24680"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add captial bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for capital bank with invalid details for Settlement to Merchant Biller from PTBA1| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA1| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Afrimax | MCT24680"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message                                       |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "1200" | ""                     | "document_back.png" | "Required field"                              |

    Scenario: Add transaction for capital bank with valid details for Settlement to Merchant Biller from PTBA2| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA2| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Afrimax | MCT24680"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add captial bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for capital bank with invalid details for Settlement to Merchant Biller from PTBA2| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA2| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Afrimax | MCT24680"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message                                       |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "1200" | ""                     | "document_back.png" | "Required field"                              |

    Scenario: Add transaction for capital bank with valid details for Settlement to Merchant Biller from PTBA3| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA3| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Afrimax | MCT24680"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add captial bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for capital bank with invalid details for Settlement to Merchant Biller from PTBA3| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA3| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Afrimax | MCT24680"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message                                       |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "1200" | ""                     | "document_back.png" | "Required field"                              |

    # merchant biller Id is Paymaart
    Scenario: Add transaction for capital bank with valid details for Settlement to Merchant Biller from PTBA1| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA1| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Paymaart | MCT13579"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add captial bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for capital bank with invalid details for Settlement to Merchant Biller from PTBA1| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA1| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Paymaart | MCT13579"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message                                       |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "1200" | ""                     | "document_back.png" | "Required field"                              |

    Scenario: Add transaction for capital bank with valid details for Settlement to Merchant Biller from PTBA2| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA2| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Paymaart | MCT13579"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add captial bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for capital bank with invalid details for Settlement to Merchant Biller from PTBA2| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA2| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Paymaart | MCT13579"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message                                       |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "1200" | ""                     | "document_back.png" | "Required field"                              |

    Scenario: Add transaction for capital bank with valid details for Settlement to Merchant Biller from PTBA3| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA3| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Paymaart | MCT13579"
        When I enter the transaction amount as "100" for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the valid transaction POP Ref.No
        When I upload the transaction POP document as "document_back.png"
        When I submit the add captial bank transaction form
        Then I should read a message stating that "Transaction details added successfully"

    Scenario Outline: Add transaction for capital bank with invalid details for Settlement to Merchant Biller from PTBA3| EM credit to PMCAT
        When I select the transaction type as "Settlement to Merchant Biller from PTBA3| EM credit to PMCAT"
        When I select valid merchant biller paymaart ID as "Paymaart | MCT13579"
        When I enter the transaction amount as <amount> for capital bank transaction
        When I should see the entry by field should be disabled for add capital bank transaction
        When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
        When I upload the transaction POP document as <POP_document>
        When I submit the add capital bank transaction form
        Then I should read a message stating that <message>
        Examples:
            | amount | transaction_pop_ref_no | POP_document        | message                                       |
            | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field"                              |
            | "1200" | ""                     | "document_back.png" | "Required field"                              |

#     Scenario Outline: Add transaction for capital bank with invalid details for Charge for Bank Services or Transactions by PTBA1 |  EM credit to PMCAT
#         When I select the transaction type as "Charge for Bank Services or Transactions by PTBA1 |  EM credit to PMCAT"
#         When I enter the transaction amount as <amount> for capital bank transaction
#         When I should see the entry by field should be disabled for add capital bank transaction
#         When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
#         When I upload the transaction POP document as <POP_document>
#         When I submit the add capital bank transaction form
#         Then I should read a message stating that <message>
#         Examples:
#             | amount | transaction_pop_ref_no | POP_document        | message          |
#             | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
#             | "1200" | ""                     | "document_back.png" | "Required field" |
#             | "1200" | "TRASACTION9910284"    | ""                  | "Required field" |
#
#     Scenario: Add transaction for capital bank with valid details for Charge for Bank Services or Transactions by PTBA1 |  EM credit to PMCAT
#         When I select the transaction type as "Charge for Bank Services or Transactions by PTBA1 |  EM credit to PMCAT"
#         When I enter the transaction amount as "100" for capital bank transaction
#         When I should see the entry by field should be disabled for add capital bank transaction
#         When I enter the valid transaction POP Ref.No
#         When I upload the transaction POP document as "document_back.png"
#         When I submit the add capital bank transaction form
#         Then I should read a message stating that "Transaction details added successfully"
#
#     Scenario Outline: Add transaction for capital bank with invalid details for Charge for Bank Services or Transactions by PTBA2 |  EM credit to PMCAT
#         When I select the transaction type as "Charge for Bank Services or Transactions by PTBA2 |  EM credit to PMCAT"
#         When I enter the transaction amount as <amount> for capital bank transaction
#         When I should see the entry by field should be disabled for add capital bank transaction
#         When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
#         When I upload the transaction POP document as <POP_document>
#         When I submit the add capital bank transaction form
#         Then I should read a message stating that <message>
#         Examples:
#             | amount | transaction_pop_ref_no | POP_document        | message          |
#             | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
#             | "1200" | ""                     | "document_back.png" | "Required field" |
#             | "1200" | "TRASACTION9910284"    | ""                  | "Required field" |
#
#     Scenario: Add transaction for capital bank with valid details for Charge for Bank Services or Transactions by PTBA2 |  EM credit to PMCAT
#         When I select the transaction type as "Charge for Bank Services or Transactions by PTBA2 |  EM credit to PMCAT"
#         When I enter the transaction amount as "100" for capital bank transaction
#         When I should see the entry by field should be disabled for add capital bank transaction
#         When I enter the valid transaction POP Ref.No
#         When I upload the transaction POP document as "document_back.png"
#         When I submit the add capital bank transaction form
#         Then I should read a message stating that "Transaction details added successfully"
#
#     Scenario Outline: Add transaction for capital bank with invalid details for Charge for Bank Services or Transactions by PTBA3 |  EM credit to PMCAT
#         When I select the transaction type as "Charge for Bank Services or Transactions by PTBA3 |  EM credit to PMCAT"
#         When I enter the transaction amount as <amount> for capital bank transaction
#         When I should see the entry by field should be disabled for add capital bank transaction
#         When I enter the transaction POP Ref.No as <transaction_pop_ref_no>
#         When I upload the transaction POP document as <POP_document>
#         When I submit the add capital bank transaction form
#         Then I should read a message stating that <message>
#         Examples:
#             | amount | transaction_pop_ref_no | POP_document        | message          |
#             | ""     | "TRASACTION9910284"    | "document_back.png" | "Required field" |
#             | "1200" | ""                     | "document_back.png" | "Required field" |
#             | "1200" | "TRASACTION9910284"    | ""                  | "Required field" |
#
#     Scenario: Add transaction for capital bank with valid details for Charge for Bank Services or Transactions by PTBA3 |  EM credit to PMCAT
#         When I select the transaction type as "Charge for Bank Services or Transactions by PTBA3 |  EM credit to PMCAT"
#         When I enter the transaction amount as "100" for capital bank transaction
#         When I should see the entry by field should be disabled for add capital bank transaction
#         When I enter the valid transaction POP Ref.No
#         When I upload the transaction POP document as "document_back.png"
#         When I submit the add capital bank transaction form
#         Then I should read a message stating that "Transaction details added successfully"