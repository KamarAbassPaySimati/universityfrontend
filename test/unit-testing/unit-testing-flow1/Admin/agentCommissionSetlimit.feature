Feature: Paymaart - Admin Web- Agent Commision Set Limit
  As a Super admin, I want to define the basis for calculating agent commissions.
  Conditions of satisfaction
  There should be an option to view the commission settlement date made by admin to the agent
  There should be an option to update the two settlement date as per the admin requirement
  The agents should be notified on the change made in the commission settlement date through an email
  currently settlement date to set as 1st and 15th of the month

  @add_admin_user
  @create_new_user_and_login
  Scenario: Viewing prefilled commission convertion duration for agents
    Given I navigate to agent commission setting screen
    Then I should see the commission conversion duration fields prefilled

  Scenario Outline: Updating the commission convertion duration for agents
    Given I navigate to agent commission setting screen
    And I click the update commission setting
    When I enter <first date> in first field and <second date> in second field
    And I submit the update commission setting
    Then I should read a message stating that <message>

    Examples:
      | first date | second date | message                                 |
      | ""         | "15"        | "Required field(s)"                        |
      | "3"        | ""          | "Required field(s)"                        |
      | "-"        | "17"        | "Required field(s)"                        |
      | "2"        | "-"         | "Required field(s)"                        |
      | "5"        | "25"        | "Agent commission updated successfully" |



