Feature: Paymaart - Admin Web- Customer Listing
    As an Super/finance/support/admin, I want an option to view all the customers.
    Conditions of Satisfaction
    By default the list should be in a chronological order
    There should an option to search the customer user using Name, paymaart id, phone number
    There should be an option to sort using Name and filter using status
    Pagination is required if there are more than 10 customers.
    There should be an option to see the total number of records eg: 10/100
    Information to be displayed:
    1.Paymaart ID
    2.Name
    3.Phone number
    4. Created Date
    6.Status(Active/Deactived)
    7.Action(View,Edit,Payin)

    Scenario: Login as super admin and view list all the customer users
        Given I navigate to customer users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date, CAT", "Status"]'

    Scenario: Search for non existing record
        Given I navigate to customer users listing screen
        When I search for particular customer as "customer 88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"
        When I click on clear search
        Then I should see list of table records

    Scenario: Sort functionality
        Given I navigate to customer users listing screen
        When I click on the sort by "Customer Name"
        Then I should see the customers sorted in ascending order based on "Customer Name"
        * I click on the sort by "Customer Name"
        And I should see the customers sorted in descending order based on "Customer Name"

    Scenario: Filter customer users by status
        Given I navigate to customer users listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by status as "active"
        Then I should see list of customers where status is "Active"
        When I click on clear filter
        Then I should see filter popup modal closed

    Scenario: Checking Pagination
        Given I navigate to customer users listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1
