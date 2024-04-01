@1.3
Feature: Paymaart - Admin Web- Specific Admin view
    As a super admin, I want an option to view the details of an all  admin.
    Conditions of Satisfaction
    There should be an option to view user basic profile details

    Information to be displayed

    1.Paymaart ID
    2.Name
    3.Email
    4.Phone number
    5.Role(Admin/Super Admin/finance/support)
    6. created date
    6.Last Logged in(Date & Time/Online)
    7. Actions (edit / payin)
    8.Status(Active/ inactive)

    @perform_logout
    @wait
    Scenario: Super Admin User login with valid credentials
        Given I am on the login screen
        When I enter the email address as "bharath.shet+super_admin@7edge.com" and password as "Admin@123"
        And I submit the login form
        Then I should be navigated to the TOTP screen
        When I enter the TOTP obtained from the previously scanned device
        And I submit the TOTP form
        Then I should be redirected to the '/dashboard' page


    Scenario: Admin View profile
        Given I navigate to admin users listing screen
        When I click on view for particular admin user
        And I should view all the basic details

    Scenario: View non existing record
        Given I view a non-existing admin user profile
        Then I should view "404" page not found screen