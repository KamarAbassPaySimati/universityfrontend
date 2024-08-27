Feature: Paymaart- Admin Web- Insights of Agent Cash-in /Cash-out

    As an Super/finance admin, I want to view the Insights on Agent Cash-in/cash-out transactions

    Condition of satisfaction
    There should be an option to view the graph with filters such as time period
    There should be an option to hover over the data points to see specific values.
    There should be an option to export the data in.csv

    @add_admin_user
    @create_new_user_and_login
    @register_new_agent
    Scenario: Viewing Insights of Agent Registration
        Given I navigate to dashboard page
        Then I should see "Agent Cash-in; Cash-out" graph

        Scenario: Exporting insights of agent registration
        Given I navigate to dashboard page
        When I click on export button for "Agent Cash-in; Cash-out"
        Then I should read a message stating that "Your transactions are being processed. Once exported, you will receive an email notification" 