Feature: Paymaart- agent Web- View all Agent list
    As an Super/finance/support/admin, I want to view a comprehensive list of all agents
    Condition of satisfaction
    By default the list should be in a chronological order
    There should an option to search the agent user using Name,paymaart id,phone number
    There should be an option to sort using Name and filter using status
    Pagination is required if there are more than 10 agents.
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
    Scenario: Login as super admin and view list all the agent users
        Given I navigate to agent users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date", "Status"]'

    Scenario: Search for non existing record
        Given I navigate to agent users listing screen
        When I search for particular agent as "agent 88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"
        When I click on clear search
        Then I should see list of table records

    Scenario: Sort functionality
        Given I navigate to agent users listing screen
        When I click on the sort by "Agent Name"
        Then I should see the agent user sorted in ascending order based on "Agent Name"
        * I click on the sort by "Agent Name"
        And I should see the agent user sorted in descending order based on "Agent Name"

    Scenario: Filter agent users by status
        Given I navigate to agent users listing screen
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by status as "active"
        Then I should see list of agent users where status is "Active"
        When I click on clear filter
        Then I should see filter popup modal closed

    @delete_admin_account
    Scenario: Checking Pagination
        Given I navigate to agent users listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as finance admin and view list of agents
        Given I navigate to agent users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date", "Status"]'

    @perform_logout
    @wait
    @add_normal_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as normal admin and view list of agents
        Given I navigate to agent users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date", "Status"]'

    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as support admin and view list of agents
        Given I navigate to agent users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date", "Status"]'
