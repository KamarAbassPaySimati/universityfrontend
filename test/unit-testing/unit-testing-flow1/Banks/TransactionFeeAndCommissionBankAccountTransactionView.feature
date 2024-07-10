Feature: Paymaart - Admin Web- Transaction Fee & Commission Bank Transaction View
  As an super/finance admin, I want to view all the transactions in the Paymaart transaction fee and commision bank account, so that I have an insight into the e-money transaction histroy
  Conditions of Satisfaction
  By default, the transactions should be listed in chronological order.
  There should be an option to filter based on the selected time frame
  Pagination option should be present if more than 10 transactions(number of records/total number of pages)
  There should be an option to move the e-money from account to capital account

    @add_admin_user
    @create_new_user_and_login
    Scenario: Viewing Transaction fee and commision banks transactions
        Given I navigate to Transaction fee and commision bank listing
        Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time","Balance"]'
        When I click on view button for bank details
        Then I should see prefilled fields for Transaction fee and commision bank details for transaction
        Then I should see table header containing '["Service codes","Date/Time","Type","Entry by","Transaction ID", "Transaction POP Ref. No", "Transaction POP", "Amount", "Closing Balance"]'

    Scenario: Filter accounts by date
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

    @delete_admin_account
    Scenario: Checking Pagination
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1
