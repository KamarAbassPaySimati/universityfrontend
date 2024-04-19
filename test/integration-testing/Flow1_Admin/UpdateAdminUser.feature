@1.4
Feature: Paymaart - Admin Web- Update admin profile
    As a super admin, I want an option to update the admin/super admin user information.
    Conditions of Satisfaction
    There should be an option to update the Name and access privileges
    The Role should be automatically updated as per access privilege selection
    There should be an option to confirm the changes before submitting the request
    The email notification should be sent user on the changes made.
    Information to be displayed
    Access privilage list
    Email template

    @perform_logout
    @wait
    @add_admin_user
    @create_new_user_and_login
    Scenario: Admin View profile
        Given I am viewing the admin user profile
        Then I should view my paymaart ID and name
        And I should view basic details
        When I should see the update "Admin user" button is hidden

    @add_admin_user
    Scenario: Update admin user with valid details
        Given I navigate to admin users listing screen
        When I search for the recently created admin user
        * I click on view for particular admin user
        * I should view all the basic details
        * I click on update "Admin user"
        Then I should be be navigated to update admin user
        And I should see update email address and phone number fields to be disabled
        When I enter valid firstname, middle name, last name for update admin user
        When I submit the update admin form
        Then I should read a message stating that "Admin profile updated successfully"