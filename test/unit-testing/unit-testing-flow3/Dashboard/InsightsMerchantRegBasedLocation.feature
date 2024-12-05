Feature: Paymaart- Admin Web- Insights on Merchant Reg based Location
  As an Super/finace admin, I want to view the Insights on Merchant Registrations on the application.based on location
  Condition of satisfaction
  There should be an option to view the graph with merchants based on location
  There should be an option to hover over the data points to see specific values.
  Filter based on district
  Download the PDF/CSV.

  @add_admin_user
  @create_new_user_and_login
  @register_new_merchant
  Scenario: Viewing Insights of Merchant Registration
    Given I navigate to dashboard page
    Then I should see "Merchant Based on Location" graph

  @delete_admin_account
  Scenario: Exporting insights of Merchant registration
    Given I navigate to dashboard page
    When I click on export button for "Merchant Based on Location"
    Then I should read a message stating that "Your transactions are being processed. Once exported, you will receive an email notification" 