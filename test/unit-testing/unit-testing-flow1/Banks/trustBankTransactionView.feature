Feature: Paymaart - Admin Web- Trust Bank Transaction View
    As a super/finance/admin, I want to view all the transactions in the Trust bank account, so that I have an insight on the transaction history
    Conditions of Satisfaction
    There should be an option to view the selected trust bank details.
    By default, the transactions should be listed in chronological order.
    There should be an option to filter based on the selected date frame
    The pagination option should be present if more than 10 transactions(number of records/total number of page
    Information to be displayed
    Bank name
    Bank account number
    Bank account purpose
    Total available balance 
    Transactions details
    1. Book date
    2. Description(predefined list)
    3. Who uploading the details
    4. Transaction done by
    5. proof
    6.Amount(Cr/Dr)
    7. Closing balance

  @add_admin_user @create_new_user_and_login @delete_admin_account
  Scenario: Viewing Bank details
    Given I navigate to banks listing
    When I click on view button for bank details
    Then I should be navigated to bank details page
    And I should see prefilled fields for bank details
    Then I should see table header containing '["Service codes","Date/Time","Type","Entry By","Last Update Date / Time","Balance"]'

  Scenario: Filter admin users by role
    Given I navigate to banks listing
    When I click on view button for bank details
    When I click on filter tab
    Then I should see filter popup modal
    And I select start date as "08-Jan-2023"
    And I select end date as "07-Jan-2023"
    Then I click on the apply filter button
    Then I should read a message stating that "Start date cannot be greater than end date"  
    And I select start date as "08-Jan-2023"
    And I select end date as "07-Feb-2023"
    Then I click on the apply filter button
    Then I should see list of transactions where between "08-Jan-2023" and "07-Feb-2023"

    Scenario: Checking Pagination
        Given I navigate to banks listing
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1