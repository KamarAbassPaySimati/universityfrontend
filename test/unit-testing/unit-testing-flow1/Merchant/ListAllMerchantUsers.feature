Feature: Paymaart- merchant Web- View all merchant list
    As an Super/finance/support/admin, I want to view a comprehensive list of all merchants
    Condition of satisfaction
    By default the list should be in a chronological order
    There should an option to search the merchant user using Name,paymaart id,phone number
    There should be an option to sort using Name and filter using status
    Pagination is required if there are more than 10 merchants.
    There should be an option to see the total number of records eg: 10/100
    
    Information to be displayed:
    
    1.Paymaart ID
    2.Name
    3.Phone number
    4.Created Date
    5.Status(Active/Deactivated)
    6.Action(View,Edit,Payin)

    @add_admin_user
    @create_new_user_and_login
    Scenario: Login as super admin and view list all the merchant users
        Given I navigate to merchant users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Trading Name","Created Date","Till Number","Location","Status"]'

    Scenario: Search for non existing record
        Given I navigate to merchant users listing screen
        When I search for particular merchant as "merchant 88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"
        When I click on clear search
        Then I should see list of table records

    Scenario: Sort functionality
        Given I navigate to merchant users listing screen
        When I click on the sort by "Merchant Name"
        Then I should see the merchant user sorted in ascending order based on "Merchant Name"
        * I click on the sort by "Merchant Name"
        And I should see the merchant user sorted in descending order based on "Merchant Name"

    Scenario: Filter merchant users by status
        Given I navigate to merchant users listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by status as "active"
        Then I should see list of merchant users where status is "Active"
        When I click on clear filter
        Then I should see filter popup modal closed

    @delete_admin_account
    Scenario: Checking Pagination
        Given I navigate to merchant users listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as finance admin and view list of merchants
        Given I navigate to merchant users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Trading Name","Created Date","Till Number","Location","Status"]'

    @perform_logout
    @wait
    @add_normal_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as normal admin and view list of merchants
        Given I navigate to merchant users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Trading Name","Created Date","Till Number","Location","Status"]'

    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as support admin and view list of merchants
        Given I navigate to merchant users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Trading Name","Created Date","Till Number","Location","Status"]'
