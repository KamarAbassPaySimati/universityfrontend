Feature: Paymaart- Admin Web - List of Pay-out Request(Agent)
    As a Super Admin/finance admin, I want an option to View all the Pay-out request intitated by the Admin to agents and merchants
    Conditions of satisfaction
    By default the list should be in a chronological order
    There should an option to search the agent/merchant using Paymaart id
    There should be an option to sort using timestamps
    Pagination is required if there are more than 10 pay-out request
    There should be an option to see the total number of records eg: 10/100

    @add_admin_user
    @create_new_user_and_login
    # api for send pay out req
    Scenario: List all agent pay-out request
      Given I navigate to agent pay-out request listing screen
      Then I should see table header containing '["Pay-out Request ID","Recipient Paymaart ID","Amount","Date/Time","Status"]'

    @delete_admin_account
    Scenario: Checking Pagination
      Given I navigate to agent pay-out request listing screen
      When I click on paginate next page
      Then I should be navigated to page 2
      When I click on paginate to previous page
      Then I should be navigated to page 1    