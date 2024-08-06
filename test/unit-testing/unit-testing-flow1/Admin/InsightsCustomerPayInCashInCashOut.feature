Feature: Paymaart- Admin Web- Insights of Customer Pay-in/Cash-in/Cash-out
  As an Super/finance/admin, I want to viewthe insights on Customer Cash-in/Pay-in/cash-out transactions.
  Condition of satisfaction
  There should be an option to view the graph with filters such as time period
  There should be an option to hover over the data points to see specific values.
  There should be an option to export the data in.csv

  @add_admin_user
  @create_new_user_and_login
  @register_new_agent
  Scenario: Viewing Insights of Customer Pay-in, cash-in and Pay-out
    Given I navigate to dashboard page
    Then I should see "Customer Pay-in; Cash-in; Cash-out" graph

  Scenario: Exporting insights of agent Pay-in, cash-in and Pay-out
    Given I navigate to dashboard page
    When I click on export button for "Customer Pay-in; Cash-in; Cash-out"
    Then I should read a message stating that "Exported successfully" 