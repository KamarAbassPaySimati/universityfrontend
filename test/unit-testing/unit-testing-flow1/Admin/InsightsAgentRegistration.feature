Feature: Paymaart- Admin Web- Insights of Agent Registartion
    As an Super/finance admin, I want to viewthe insights on Agent Registrations on the application.
    Condition of satisfaction
    There should be an option to view the graph with filters such as time period 
    There should be an option to hover over the data points to see specific values.
    There should be an option to export the data in.csv
    If greater than 60days time range selcted in filter , it should be shown in months range

  @add_admin_user
  @create_new_user_and_login
  @register_new_agent
  Scenario: Viewing Insights of Agent Registration
    Given I navigate to dashboard page
    Then I should see "Agent Registration" graph

  Scenario: Exporting insights of agent registration
    Given I navigate to dashboard page
    When I click on export button for export
    Then I should read a message stating that "Exported successfully" 

  
    

  

