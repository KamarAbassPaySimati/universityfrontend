Feature: Paymaart - Admin Web -Admin List
    As a super admin/admin, I want an option to view all the admin users added to the platform.
    Conditions of Satisfaction
    By default the list should be in a chronological order
    There should an option to search the admin/super admin user using Name,email,paymaart id,phone number
    There should be an option to sort using Name
    There should be an option to filter based on roles and status
    Pagination is required if there are more than 10 admin/super admin users.
    There should be an option to see the total number of records eg: 10/100
    Information to be displayed
    1.Paymaart ID( eg:PMT12345)
    2. Name
    3.Email
    4.Phone number
    5.Role(Admin/Super Admin)
    6.Last Logged in(Date & Time/Online)
    7.Actions(View & Edit)

    Scenario: List all the admin users
        Given I navigate to admin users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Email","Phone Number","Role","Last Logged In", "Status"]'

    Scenario: Search for non existing record
        Given I navigate to admin users listing screen
        When I search for particular admin as "Admin 88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"

    Scenario: Sort functionality
        Given I navigate to admin users listing screen
        When I click on the sort by "Admin Name"
        Then I should see the admin user sorted in ascending order based on "Admin Name"
        * I click on the sort by "Admin Name"
        And I should see the admin user sorted in descending order based on "Admin Name"

    Scenario Outline: Filter admin users by role
        Given I navigate to admin users listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by admin role as <role>
        Then I should see list of admin users where role is <filter_role>
        Examples:
            | role            | filter_role     |
            | "Admin"         | "Admin"         |
            | "Super admin"   | "Super Admin"   |
            | "Support admin" | "Support Admin" |
            | "Finance admin" | "Finance Admin" |

    Scenario: Checking Pagination
        Given I navigate to admin users listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1