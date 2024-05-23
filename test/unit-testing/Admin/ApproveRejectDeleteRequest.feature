Feature: Paymaart- Admin Web -Approve/Reject Delete Account(Agent)
    As a Super Admin, I want to review and approve/reject account deletion request initiated by Agent,customer or merchant

    Conditions of satisfaction

    Super Admins should have the option to approve or reject a deletion request based on their assessment of its legitimacy.

    Once approved, the deletion request the user should be logged out from all the devices users logged in and the account will be deactivated, and data will stored as per RBM regulation for 7 years

    The amount present in the seleted account should be stored in Paymaart suspense account and processed as per RBM guidelines

    If rejected, the account will be active and can be used by the user.

    appropriate notifications (email)should be sent to the agent/merchant/customer as per the membership type

    Before approval or rejection there should be a confirmation prompt. and admin should enter the reason for both.

    Information to be display

    1.Paymaart ID
    2.Name
    3.Email 
    4.Phone number(country code)
    5.Status(approved ,rejected)
    6.Reason(super admin and agent/merchant/customer)

    @add_admin_user
    @create_new_user_and_login
    @register_new_agent_and_send_delete_request_for_that_agent
    Scenario: View specific agent and approve delete request
        Given I navigate to agent delete request listing screen
        When I click on view delete request
        Then I should view agent information
        When I click on approve "Agent Delete Request"
        Then I should see a confirmation prompt for approving "Agent Delete Request"
        When I enter the reason for approving as "BDD Test"
        When I click on confirm button
        Then I should read a message stating that "Account deletion request approved successfully "
        And I should see the delete request status changed to "Approved"

    @add_admin_user
    @create_new_user_and_login
    @register_new_agent_and_send_delete_request_for_that_agent
    Scenario: View specific agent and reject delete request
        Given I navigate to agent delete request listing screen
        When I click on view delete request
        Then I should view agent information
        When I click on reject "Agent Delete Request"
        Then I should see a confirmation prompt for reject "Agent Delete Request"
        When I enter the reason for rejecting as "BDD Test"
        When I click on confirm button
        Then I should read a message stating that "Account deletion request rejected successfully "
        And I should see the delete request status changed to "Rejected"