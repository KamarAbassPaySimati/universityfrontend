Feature: Paymaart - Admin Web - Active/Deactive agents account
    As an Super/admin, I want the ability to activate or deactivate an agent's account based on operational needs.
    Conditions of Satisfaction
    A confirmation prompt should be displayed before the action is performed.
    If the user has logged in and the account has been deactivated, the user should be automatically logged out of the application.
    When a user is deactivated, the system should prevent the user from logging in.
    When a user is deactivated or activated, they should receive an email and SMS notification
 
    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_agent
    Scenario: Cancel Deactivate agent User
        Given I navigate to agent users listing screen
        When I search for recently created agent
        When I click on view agent
        Then I should view agent information
        * I click on deactivate "Agent user"
        Then I should see a confirmation prompt for deactivating "Agent user"
        When I click on cancel button
        Then The agent user record must remain in the system with its previous status

    Scenario: Deactivate agent User
        Given I navigate to agent users listing screen
        When I search for recently created agent
        When I click on view agent
        Then I should view agent information
        * I click on deactivate "Agent user"
        Then I should see a confirmation prompt for deactivating "Agent user"
        When I click on confirm button
        Then I should read a message stating that "Agent deactivated successfully"

    Scenario: Cancel Activate agent User
        Given I navigate to agent users listing screen
        When I search for recently created agent
        When I click on view agent
        Then I should view agent information
        When I click on activate "Agent user"
        Then I should see a confirmation prompt for activate "Agent user"
        When I click on cancel button
        Then The agent user record must remain in the system with its previous status

    Scenario: Activate agent User
        Given I navigate to agent users listing screen
        When I search for recently created agent
        When I click on view agent
        Then I should view agent information
        When I click on activate "Agent user"
        Then I should see a confirmation prompt for activate "Agent user"
        When I click on confirm button
        Then I should read a message stating that "Agent activated successfully"