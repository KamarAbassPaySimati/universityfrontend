@1.1
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

    @add_admin_user
    @create_new_user_and_login
    Scenario: Login as super admin and view specific admin profile
        Given I am viewing the admin user profile
        Then I should view my paymaart ID and name
        And I should view basic details

    @delete_admin_account
    Scenario: View non existing record
        Given I view a non-existing admin user profile
        Then I should view "404" page not found screen

    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as finance admin and view admin profile
        Given I navigate to view admin profile
        Then I should view "404" page not found screen

    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as support admin and view admin profile
        Given I navigate to view admin profile
        Then I should view "404" page not found screen

    @perform_logout
    @wait
    @add_normal_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as normal admin and view admin profile
        Given I navigate to view admin profile
        Then I should view "404" page not found screen
