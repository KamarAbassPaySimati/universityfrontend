Feature: Paymaart - Admin Web -Customer KYC verification Listing Page
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

    Scenario: List all the KYC
        Given I navigate to customer KYC listing screen
        Then I should see table header containing '["Paymaart ID","Name","Submission Date, CAT","KYC Type","Status"]'

    Scenario: Search for non existing record
        Given I navigate to customer KYC listing screen
        When I search for particular customer as "CMR88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"

    Scenario: Sort functionality
        Given I navigate to customer KYC listing screen
        When I click on the sort by "Submission Date"
        Then I should see the KYC sorted in ascending order based on "Submission Date"
        * I click on the sort by "Submission Date"
        And I should see the KYC sorted in descending order based on "Submission Date"

    Scenario: Filter KYC listing KYC status
        Given I navigate to customer KYC listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by KYC status as "Full KYC In Progress"
        Then I should see list of KYC where status is "In-Progress"

    Scenario: Filter KYC listing KYC status
        Given I navigate to customer KYC listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by KYC status as "Simplified KYC In Progress"
        Then I should see list of KYC where status is "In-Progress"

    Scenario: Filter KYC listing Non Malawi Citizenship
        Given I navigate to customer KYC listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by citizenship as "Non Malawi Citizen"
        Then I should see list of KYC where citizenship is "Non Malawi"

    Scenario: Filter KYC listing Citizenship
        Given I navigate to customer KYC listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by citizenship as "Malawi Citizen"
        And I select filter by KYC status as "Full KYC In Progress"
        Then I should see list of KYC where status is "In-Progress"
        Then I should see list of KYC where KYC type is "Malawi Full KYC"

    Scenario: Checking Pagination
        Given I navigate to customer KYC listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    