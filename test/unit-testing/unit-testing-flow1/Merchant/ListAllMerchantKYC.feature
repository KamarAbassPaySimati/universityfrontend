Feature: Paymaart - Admin Web -Merchant KYC verification Listing Page
    Description
    As a super admin/admin, I want the ability to view a list of agents awaiting manual KYC verification.
    Condition of Satisfaction
    By default, the list should be in a chronological order
    There should be an option to search based on Paymaart ID and Name
    There should be an option to sort based on date and time and filter based on KYC type and status
    Pagination is required if there are more than 10 KYC lists.
    There should be an option to see the total number of records eg: 10/100
    The queue should categorize customers, agents, and merchants separately for clear identification.

    Information to be displayed:
    Paymaart ID
    Paymaart Name
    Submission date
    KYC type( full, simplified)
    Status( In-progress, completed, further information required)
    Action(view)

    @add_admin_user
    @create_new_user_and_login
    Scenario: List all the KYC
        Given I navigate to merchant KYC listing screen
        Then I should see table header containing '["Paymaart ID","Name","Submission Date, CAT","KYC Type","Status"]'

    Scenario: Search for non existing record
        Given I navigate to merchant KYC listing screen
        When I search for particular merchant as "CMR88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"

    Scenario: Sort functionality
        Given I navigate to merchant KYC listing screen
        When I click on the sort by "Submission Date"
        Then I should see the KYC sorted in ascending order based on "Submission Date"
        * I click on the sort by "Submission Date"
        And I should see the KYC sorted in descending order based on "Submission Date"

    Scenario: Filter KYC listing KYC status
        Given I navigate to merchant KYC listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by KYC status as "Full KYC In Progress"
        Then I should see list of KYC where status is "In-Progress"

    @delete_admin_account
    Scenario: Checking Pagination
        Given I navigate to merchant KYC listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as finance admin and navigate to KYC listing screen
        Given I navigate to merchant KYC listing screen
        Then I should read a message stating that "Page Not Found"
        And I should read a message stating that "We can’t find the page you’re looking for"

    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as support admin and navigate to KYC listing screen
        When I navigate to merchant KYC listing screen
        Then I should read a message stating that "Page Not Found"
        And I should read a message stating that "We can’t find the page you’re looking for"

    @perform_logout
    @wait
    @add_normal_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as normal admin and view admin listing
        When I navigate to merchant KYC listing screen
        Then I should see table header containing '["Paymaart ID","Name","Submission Date, CAT","KYC Type","Status"]'
        