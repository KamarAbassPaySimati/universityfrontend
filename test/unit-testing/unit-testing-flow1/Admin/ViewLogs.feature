Feature: Paymaart- Admin Web- log view

    As a Super Admin/Admin, I want the ability to view user log so that I can monitor user activities

    Conditions of satisfaction
    By default the list should be in a chronological order
    2 There should be an option to view the admin action taken on user requests such as Pay-in, Pay-out, 
    There should be an option to search based on transaction ID
    4.There should be an option to sort based on date and time
    Pagination is required if there are more than 10 log.
    There should be an option to see the total number of records eg: 10/100

    @add_admin_user
    @create_new_user_and_login
    Scenario: View the pay in list transaction view
        Given I am in transactions log page 
        When I click on pay in tab 
        Then I should see table header containing '["Date/Time","Transaction ID","Beneficiary Paymaart ID","Entry Admin","Bank Name", "Transaction POP", "Amount"]'
        
    @add_admin_user
    @create_new_user_and_login
    Scenario: View the pay out list transaction view
        Given I am in transactions log page 
        When I click on pay out tab 
        Then I should see table header containing '["Date/Time","Transaction ID","Beneficiary Paymaart ID","Entry","Bank Name", "Transaction POP", "Amount","Status"]'

    @add_admin_user
    @create_new_user_and_login
        Scenario: Search for non existing record in pay in transaction log
            Given I am in transactions log page 
            When I click on pay in tab
            When I search for particular transaction log as "00000000000"
            Then I should read a message stating that "No data found"
            And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"

    @add_admin_user
    @create_new_user_and_login
    Scenario: Search for non existing record in pay out transaction log
        Given I am in transactions log page 
        When I click on pay out tab
        When I search for particular transaction log as "00000000000"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"

    @add_admin_user
    @create_new_user_and_login
    Scenario: Sort functionality for pay in
        Given I am in transactions log page 
        When I click on pay in tab
        When I click on the sort by "Submission Date"
        Then I should see the transaction log sorted in ascending order based on "Submission Date"
        * I click on the sort by "Submission Date"
        And I should see the transaction log sorted in descending order based on "Submission Date"

    @add_admin_user
    @create_new_user_and_login
    Scenario: Sort functionality for pay out 
        Given I am in transactions log page 
        When I click on pay out tab
        When I click on the sort by "Submission Date"
        Then I should see the transaction log sorted in ascending order based on "Submission Date"
        * I click on the sort by "Submission Date"
        And I should see the transaction log sorted in descending order based on "Submission Date"

    @add_admin_user
    @create_new_user_and_login
    Scenario: Checking Pagination for pay in
        Given I am in transactions log page 
        When I click on pay in tab
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    @add_admin_user
    @create_new_user_and_login
    Scenario: Checking Pagination for pay out 
        Given I am in transactions log page 
        When I click on pay out tab
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1
