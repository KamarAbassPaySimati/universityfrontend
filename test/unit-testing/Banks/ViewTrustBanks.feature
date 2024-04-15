Feature: Paymaart -Admin Web -Bank accounts view
    As a Super/finance/admin, I want an option to view paymaart bank accounts, so that I can update the necessary data to function the platform
    Conditions of Satisfaction
    1.There should be an option to view all the Paymaart Bank accounts listed
    Information to be displayed
    Paymaart Trust bank account
    Paymaart main capital account
    Paymaart Suspense account
    Paymaart transaction fee and commission account
    Paymaart TAX account

    @add_admin_user
    @create_new_user_and_login
    Scenario: Login as super admin and view list all the banks
        Given I navigate to banks listing
        Then I should view all the trust banks
    
    @delete_admin_account
    Scenario: View Paymaart bank overview
        Given I navigate to banks listing
        Then I should view all the trust banks
        When I click on view bank overview
        Then I should view a image viewer modal
        When I click on close image viewer
        Then I should see the image viewer modal getting closed

    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as finance admin and navigate to list all the banks
        Given I navigate to banks listing
        Then I should view all the trust banks

    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as support admin and navigate to list all the banks
        Given I navigate to banks listing
        Then I should read a message stating that "Page Not Found"
        And I should read a message stating that "We can’t find the page you’re looking for"

    @perform_logout
    @wait
    @add_normal_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as normal admin and view admin listing
        Given I navigate to banks listing
        Then I should view all the trust banks