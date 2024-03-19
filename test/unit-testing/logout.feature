@1.1
Feature: Paymaart - Admin Web- Logout
    As a super/finance/admin/support of the application,I want to easily logout from my account So that I can ensure the security of my personal information.
    Conditions for Satisfaction
    There should be a confirmation prompt asked before logging out
    Upon selecting logout admin user should be logged out of the account immediately And all session data and authentication tokens should be cleared 
    The user should be redirected to the login page.

    @add_admin_user
    @create_new_user_and_login
    Scenario: Cancel Logout of the application
        Given I am logged into the application
        When I click on logout
        Then I should see a confirmation prompt for logout
        When I click on cancel
        Then I should not be logged out

    @delete_admin_account
    Scenario: Logout of the application
        Given I am logged into the application
        When I click on logout
        Then I should see a confirmation prompt for logout
        When I click on confirm logout
        Then I should read a message stating that "You have been logged out"
        And I should be redirected to login