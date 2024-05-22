Feature: Paymaart - Admin Web - View Delete Account List(Agent)
    As a Super Admin, I want an option to View all the Account delete request initiated by the agents, customers and merchants

    Conditions of Satisfaction

    By default the list should be in a chronological order

    Pagination is required if there are more than 10 pay-out request

    There should be an option to see the total number of records eg: 10/100

    There should an option to filter using status
    Information to be display

    1.Paymaart ID
    2.Name
    3.Email 
    4.Phone number(country code)
    5.Status(pending,approved ,rejected)
    6.Action(view)

    @add_admin_user
    @create_new_user_and_login
    @register_new_agent_and_send_delete_request_for_that_agent
    Scenario: List all the delete request
        Given I navigate to agent delete request listing screen
        Then I should see table header containing '["Paymaart ID","Name","Email","Phone Number","Status"]'

    Scenario: Filter delete request by status
        Given I navigate to agent delete request listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter the delete request as "Pending"
        Then I should see list of delete request where status is "Pending"

    @delete_admin_account
    Scenario: Checking Pagination
        Given I navigate to agent delete request listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as finance admin and navigate to delete request listing screen
        Given I navigate to agent delete request listing screen
        Then I should read a message stating that "Page Not Found"
        And I should read a message stating that "We can’t find the page you’re looking for"

    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as support admin and navigate to delete request listing screen
        Given I navigate to agent delete request listing screen
        Then I should read a message stating that "Page Not Found"
        And I should read a message stating that "We can’t find the page you’re looking for"

    @perform_logout
    @wait
    @add_normal_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as normal admin and navigate to delete request listing screen
        Given I navigate to agent delete request listing screen
        Then I should read a message stating that "Page Not Found"
        And I should read a message stating that "We can’t find the page you’re looking for"
