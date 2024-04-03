Feature: Paymaart - Admin Web - Active/Deactive admin
    As a super admin, I want an option to activate or deactivate a admin/super admin user.
    Conditions of Satisfaction
    confirmation prompt should be displayed before the action is performed.
    If the user has logged in and the account has been deactivated, the user should be automatically logged out of the application.
    user is deactivated, the system should prevent the user from logging in.
    user is deactivated or activated, they should receive an email notification.
    Information to be displayed
    Email
 
    @add_admin_user
    @create_new_user_and_login
    Scenario: Admin View profile
        Given I am viewing the admin user profile
        Then I should view my paymaart ID and name
        And I should view basic details
        When I should see the deactivate "Admin user" button is hidden

    @add_admin_user
    Scenario: Cancel Deactivate admin User
        Given I navigate to admin users listing screen
        When I search for the recently created admin user
        * I click on view for particular admin user
        * I should view all the basic details
        * I click on deactivate "Admin user"
        Then I should see a confirmation prompt for deactivating "Admin user"
        When I click on cancel button
        Then The admin user record must remain in the system with its previous status

    Scenario: Deactivate admin User
        Given I navigate to admin users listing screen
        When I search for the recently created admin user
        * I click on view for particular admin user
        * I should view all the basic details
        * I click on deactivate "Admin user"
        Then I should see a confirmation prompt for deactivating "Admin user"
        When I click on confirm button
        Then I should read a message stating that "Admin user deactivated successfully"

    Scenario: Cancel Activate admin User
        Given I navigate to admin users listing screen
        When I search for the recently created admin user
        When I click on view for particular admin user
        When I should view all the basic details
        When I click on activate "Admin user"
        Then I should see a confirmation prompt for activate "Admin user"
        When I click on cancel button
        Then The admin user record must remain in the system with its previous status

    Scenario: Activate admin User
        Given I navigate to admin users listing screen
        When I search for the recently created admin user
        When I click on view for particular admin user
        When I should view all the basic details
        When I click on activate "Admin user"
        Then I should see a confirmation prompt for activate "Admin user"
        When I click on confirm button
        Then I should read a message stating that "Admin user activated successfully"

    @delete_admin_account
    Scenario: Deactivate admin user and login try login to that account
        Given I navigate to admin users listing screen
        When I search for the recently created admin user
        * I click on view for particular admin user
        * I should view all the basic details
        * I click on deactivate "Admin user"
        Then I should see a confirmation prompt for deactivating "Admin user"
        When I click on confirm button
        Then I should read a message stating that "Admin user deactivated successfully"
        When I log out from the application
        When I am on the login screen
        When I enter valid email address and password
        When I submit the login form
        Then I should read a message stating that "Account is deactivated."