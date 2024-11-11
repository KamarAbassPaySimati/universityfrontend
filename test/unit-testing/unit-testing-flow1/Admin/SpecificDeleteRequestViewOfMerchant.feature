Feature: Paymaart - Admin Web- Specific Delete Account View(Merchant)
    As a Super Admin, I want an option to view the Account Deletion request
    Conditions of satisfaction
    There should be an option to view details of account deletion request
    When click on delete notification in the admin notification it should be redirected to the view page

    @add_admin_user
    @create_new_user_and_login
    @register_new_merchant_and_send_delete_request_for_that_merchant
    Scenario: View delete request of merchant
        Given I navigate to merchant delete request listing screen
        When I click on view delete request of merchant
        Then I should view merchant information

