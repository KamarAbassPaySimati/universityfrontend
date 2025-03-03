Feature: Paymaart- merchant Web- View all merchant list and List all reported merchants, View reported merchants
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

    @perform_logout
    @wait
    @add_admin_user
    @create_new_user_and_login
    Scenario: Login as super admin and view list all the merchant users
        Given I navigate to merchant users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Trading Name","Created Date, CAT","Till Number","Location","Status"]'

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

    Scenario: Checking Pagination
        Given I navigate to merchant users listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1


    Scenario: Login as super admin and view list all the reported merchant users
        Given I navigate to reported merchant users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Phone Number","Email","Reported Date"]'

    Scenario Outline: Sort functionality
        Given I navigate to reported merchant users listing screen
        When I click on the sort by "<sort_by>"
        Then I should see the merchant user sorted in ascending order based on "<sort_by>"
        When I click on the sort by "<sort_by>"
        And I should see the merchant user sorted in descending order based on "<sort_by>"
        Examples:
            | sort_by       |
            | Merchant Name |
            | Reported Date |

    Scenario Outline: Search functionality
        Given I navigate to reported merchant users listing screen
        When  I search reported merchant users by "<search_term>"
        Then  I should see the reported merchant user based on the "<search_term>"
        Examples:
            | search_term   |
            | paymaart ID   |
            | Merchant Name |
            | Phone Number  |
            | Email         |

    Scenario: Checking Pagination
        Given I navigate to reported merchant users listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    @delete_admin_account
    Scenario: View Particular Reported Merchant
        Given I navigate to reported merchant users listing screen
        When  I click on view reported merchant
        Then  I should see all the valid details of reported merchant
