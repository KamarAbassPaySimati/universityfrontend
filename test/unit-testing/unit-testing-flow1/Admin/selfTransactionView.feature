Feature: Paymaart - Admin Web - Self Transaction list View
    As a super/finance/admin, I want to see a complete list of all my transactions for reference and tracking.
    Conditions of satisfaction
    By default the list should be in a chronological order
    Pagination is required if there are more than 10 transactions
    There should be an option to see the total number of records eg: 10/100
    Users should be able to see a complete list of all transactions with various, pay-ins (agents, customers),G2P Bank for reference and tracking
    There should be an option to filter using time period
    There should be an option to export the data in .csv
    There should be an option to search the transaction using transaction ID ,recipient paymaart ID

  @add_admin_user @create_new_user_and_login @create_transactions
  Scenario: View All Transactions list
    Given I navigate to Transaction History Page
    Then I should see table header containing '["Service Code","Date/ Time","Beneficiary Paymaart ID","Transaction ID","Type","Amount"]'

  Scenario: Search for non existing record
    Given I navigate to Transaction History Page
    When I search for particular transaction as "88732914"
    Then I should read a message stating that "No data found"
    And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"

  Scenario: Filter transactions by date
    Given I navigate to Transaction History Page
    When I click on filter tab
    Then I should see filter popup modal
    And I select start date as "08-Jan-2023"
    And I select end date as "07-Jan-2023"
    Then I click on the apply filter button
    Then I should read a message stating that "Start date cannot be greater than end date"
    And I select start date as "08-Jan-2023"
    And I select end date as "07-Nov-2024"
    Then I click on the apply filter button
    Then I should see list of transactions where between "08 Jan 2023" and "07 Nov 2024"

  Scenario: Exporting transaction list
    Given I navigate to Transaction History Page
    When I click on export button for transaction History
    Then I should read a message stating that "Transaction details exported successfully"

  Scenario: Filter transactions by Transaction type
    Given I navigate to Transaction History Page
    When I click on filter tab
    Then I should see filter popup modal
    And I select filter by Transaction type as "Pay-out"
    Then I should see list of transactions where transaction type is "Pay-out"
    When I click on clear filter
    Then I should see filter popup modal closed

  @delete_admin_account @delete_transaction
  Scenario: Checking Pagination
    Given I navigate to Transaction History Page
    When I click on paginate next page
    Then I should be navigated to page 2
    When I click on paginate to previous page
    Then I should be navigated to page 1
