# Feature: Paymaart - Admin web - Customer Transaction History and Wallet Balance View
#   As an super/admin, I want the ability to view all the transaction history and wallet balance of the customer's
#   Condition of satisfaction
#   There should be an option to view the Customer's last updated wallet balance with the last updated date and time
#   By default the list should be in a chronological order
#   There should be an option to search the transaction using the transaction ID and recipient Paymaart ID
#   There should be an option to filter using time period and transaction type
#   Pagination is required if there are more than 10 transactions.
#   There should be an option to see the total number of records eg: 10/100
#   There should be an option to export the data as .csv and only by super/finance admin
#   There should be an option to flag the transaction.

#     @add_admin_user
#     @create_new_user_and_login
#     Scenario: Login as super admin and view customer transactions
#         Given I navigate to customer users listing screen
#         When I click on transaction history icon
#         Then I should be navigated to transaction history page
#         Then I should see table header containing '["Service Code","Date/ Time, CAT","Transaction ID","Beneficiary Paymaart ID", "Type","Amount"]'
#         And I should see wallet balance

#     Scenario: Filter transactions by date
#         Given I navigate to customer users listing screen
#         When I click on transaction history icon
#         When I click on filter tab
#         Then I should see filter popup modal
#         And I select start date as "08-Jan-2023"
#         And I select end date as "07-Jan-2023"
#         Then I click on the apply filter button
#         Then I should read a message stating that "Start date cannot be greater than end date"  
#         And I select start date as "08-Jan-2023"
#         And I select end date as "07-Nov-2025"
#         Then I click on the apply filter button
#         Then I should see list of transactions where between "08 Jan 2023" and "07 Nov 2025"

#     # need api for this scenario
#     # Scenario Outline: Filter transactions by transaction type
#     #     Given I navigate to customer users listing screen
#     #     When I click on transaction history icon
#     #     Then I should be navigated to transaction history page
#     #     When I click on filter tab
#     #     Then I should see filter popup modal
#     #     And I select filter by transaction type as <type>
#     #     Then I should see list of transactions where type is <filter_type>
#     #     Examples:
#     #         | type               |filter_type               |
#     #         | "Pay-in"           |"Pay-in"                  |
#     #         | "Cash-in"          |"Cash-in"                 |
#     #         | "Cash-out"         |"Cash-out"                |
#     #         | "Interest Earned"  |"Interest Earned"         |
#     #         | "Pay-Paymaart"     |"Pay-Paymaart"            |
#     #         | "Pay-Afrimax"      |"Pay-Afrimax"             |
#     #         | "Pay-Merchant"     |"Pay-Merchant"            |
#     #         | "Refund"           |"Refund"                  |
#     #         | "Pay Person"       |"Pay Person"              |
#     #         | "Pay G2P"          |"Pay G2P"                 |

#     Scenario: Exporting transaction list
#         Given I navigate to customer users listing screen
#         When I click on transaction history icon
#         When I click on export button for transaction History
#         Then I should read a message stating that "Transaction details exported successfully"


#     @delete_admin_account
#     Scenario: Checking Pagination
#         Given I navigate to customer users listing screen
#         When I click on paginate next page
#         Then I should be navigated to page 2
#         When I click on paginate to previous page
#         Then I should be navigated to page 1

    