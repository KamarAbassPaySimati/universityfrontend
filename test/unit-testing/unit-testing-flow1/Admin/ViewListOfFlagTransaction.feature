Feature: Paymaart - Admin Web- View List of Flagged Transaction
        As an super admin, I want the ability to view all flagged transactions by merchants, agents, admins and customers in case of suspected fraud or user queries

        Conditions of satisfaction

        By default the list should be in a chronological order
        There should be an option to filter using flagged reasons
        Pagination is required if there are more than 10 flagged transactions.
        There should be an option to see the total number of records eg: 10/100
        A confirmation prompt should be displayed before the action is performed.
        There should be an option to enter the comment which is a free text for approval/rejection/refund.
        When a flagged transaction is approved, rejected, or refunded the system should resolve the flag.
        When a refund action is taken, e-money is to be refunded fully to the respective sender.
    Notification to be sent to the relevant parties. based on the membership type

    @add_admin_user @create_new_user_and_login @create_transactions  @delete_transaction
    Scenario: Viewing specific Transaction
        Given I navigate to Transaction History Page
        Then I should see table header containing '["Service Code","Date/ Time, CAT","Beneficiary Paymaart ID","Transaction ID","Type","Amount"]'
        When I click on the view button for first transaction in list
        Then I should be redirected to transaction details page
        When I click on flag transaction button
        When I select the reason for flag transaction as "Transaction & System Failures"
        When I click on confirm button
        Then I should read a message stating that "Transaction flagged successfully"

    Scenario: List all the Flaged transaction
        Given I am on the flagged transaction page
        Then I should see table header containing '["Date/Time In, CAT","Transaction ID","Flagged by","Beneficiary Paymaart ID","Reversal Admin", "Reason", "Amount (MWK)", "Status"]'

    Scenario: Search for non existing record
        Given I am on the flagged transaction page
        When I search for particular agent as "AGT88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your filter or search to find what you’re looking for"
        When I click on clear search
        Then I should see list of table records

    Scenario: Filter customer users by status
        Given I am on the flagged transaction page
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by status as "Transaction & System Failures"
        Then I should see list of customers where status is "Transaction & System Failures"
        When I click on clear filter
        Then I should see filter popup modal closed

    @delete_admin_account
    Scenario: Checking Pagination
        Given I am on the flagged transaction page
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1
