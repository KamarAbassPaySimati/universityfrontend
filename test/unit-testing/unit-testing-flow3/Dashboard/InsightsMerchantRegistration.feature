Feature: Paymaart - Admin Web- Insights of Merchant Registartion
    As an Super/finace admin, I want to view the Insights on Merchant Registrations on the application.
    Condition of satisfaction
    There should be an option to view the graph with filters such as time period and membership type
    There should be an option to export the data in.csv

  @add_admin_user
  @create_new_user_and_login
  @register_new_merchant
  Scenario: Viewing Insights of Merchant Registration
    Given I navigate to dashboard page
    Then I should see "Merchant Registrations" graph

  @delete_admin_account
  Scenario: Exporting insights of Merchant registration
    Given I navigate to dashboard page
    When I click on export button for "Merchant Registrations"
    Then I should read a message stating that "Your transactions are being processed. Once exported, you will receive an email notification" 