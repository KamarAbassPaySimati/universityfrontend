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

    @create_new_admin_account
    @delete_admin_account
    Scenario: Admin View profile
        Given I am viewing the admin user profile
        Then I should view my paymaart ID and name
        And I should view basic details
    
    Scenario: View non existing record
        Given I view a non-existing admin user profile
        Then I should be redirected back to admin user listing