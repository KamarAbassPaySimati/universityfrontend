Feature: Paymaart- Admin Web- Insights of Customer e-payments
  As an Super/finance/admin, I want to viewthe insights on Customer e-payments(except Cas-in/pay-in/cash-out)
  COndition of satisfaction
  There should be an option to view the graph with filters such as time period and transaction type2. There should be an option to hover over the data points to see specific values.
  There should be an option to export the data in.csv

  @add_admin_user
  @create_new_user_and_login
  @register_new_agent
  Scenario: Viewing Insights of Customer e-payments
    Given I navigate to dashboard page
    Then I should see "Customer e-Payments" graph

  Scenario: Exporting insights of Customer e-payments
    Given I navigate to dashboard page
    When I click on export button for "Customer e-Payments"
    Then I should read a message stating that "Your transactions are being processed. Once exported, you will receive an email notification"