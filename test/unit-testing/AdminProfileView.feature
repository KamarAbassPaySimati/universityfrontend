@1.1
Feature: Paymaart - Admin Web -Profile View
    As an Super/finance/support/admin I want an option to view my profile so that I can access the profile details.
    Conditions of Satisfaction:
    There should be an option to view user Paymaart name, Paymaart ID,Phone number,Email,Role(Admin/Super Admin)
    Paymaart ID (This is a unique identified for each customer merchant and agent and starts with 3 letters followed by digits. So, PMT 5 digits for Admin/Super Admin
    The profile picture should be consisting of first letters of First name,middle name,and Surname inside a lozenges

    Scenario: Admin View profile
        Given I am logged into the application
        When I navigate to my profile page
        Then I should see my profile card information
        And I should see my name as "Bharath D SHET"
        And I should see my email address as "bharath.shet+admin@7edge.com"
        And I should see my role as "Admin"
        And I should see my phone number as "+265 974129299"
        And I should see the option to update my password