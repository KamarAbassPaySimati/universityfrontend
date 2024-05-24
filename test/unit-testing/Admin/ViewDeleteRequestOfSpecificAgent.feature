Feature: Paymaart - Admin Web- Specific Delete Account View(Agent)
    As a Super Admin, I want an option to view the Account Deletion request

    Conditions of satisfaction

    There should be an option to view details of account deletion request

    Information to be display

    1.Paymaart ID
    2.Name
    3.Email 
    4.Phone number(country code)
    5.Status(pending,approved ,rejected)
    6.Reason

    7.Approve/Reject

    @add_admin_user
    @create_new_user_and_login
    @register_new_agent_and_send_delete_request_for_that_agent
    Scenario: View delete request
        Given I navigate to agent delete request listing screen
        When I click on view delete request
        Then I should view agent information