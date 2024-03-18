@1.1
Feature: Paymaart - Admin Web -Profile View
    As an Super/finance/support/admin I want an option to view my profile so that I can access the profile details.
    Conditions of Satisfaction:
    There should be an option to view user Paymaart name, Paymaart ID,Phone number,Email,Role(Admin/Super Admin)
    Paymaart ID This is a unique identified for each customer merchant and agent and starts with 3 letters followed by digits. So, PMT 5 digits for Admin/Super Admin
    The profile picture should be consisting of first letters of First name,middle name,and Surname inside a lozenges

    @add_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Admin View profile
        Given I am logged into the application
        When I navigate to my profile page
        Then I should see my profile card information
        And I should see my name
        And I should see my email address
        And I should see my role
        And I should see my paymaart ID
        And I should see my phone number
        And I should see the option to update my password