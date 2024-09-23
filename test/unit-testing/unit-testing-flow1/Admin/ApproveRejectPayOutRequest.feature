Feature: Paymaart- Admin Web-Approve/Reject Pay-out Request
  As a Super Admin/finance admin, I want to review and approve/reject pay-out transactions initiated by Agent or merchant
  Conditions of satisfaction
  Super Admins should have the authority to approve or reject a pay-out transaction based on their assessment of its legitimacy.
  Once approved, the pay-out should be reflected in the recipient's bank account, and the transaction status should be updated to Approved.
  If rejected, the transaction status should be updated to Rejected and there should be an option to enter the reason for rejection
  appropriate notifications (email/sms/push notiifcation)should be sent to the agent/merchant as per the membership type
  The system should maintain a clear audit trail of all debit transactions, including their approval status and any related actions taken by Super Admins.
  The approved and rejected transactions to be present in the list
  Once approved the transaction ID should be changed from MCR to MCT and AGR to AGT
  Before approval or rejection there should be a confirmation prompt.

    @add_admin_user
    @create_new_user_and_login
    @send_payout_request
    Scenario: View specific payout request and approve
      Given I navigate to agent pay-out request listing screen
      When I click on view pay-out request 
      Then I should view Pay-out Request Details
      When I click on approve Agent Pay-out request
      Then I should see a confirmation prompt for approving Agent Pay-out request
      When I select the type as <type>
      When I enter the transaction POP ref. no as "Transaction7382" for payout request
      When I upload the valid transaction POP file as "document_front.png"
      When I click on confirm button for approving
      Then I should read a message stating that "Pay-out request approved successfully"

      Examples:
      | type                                                | 
      | "Pay-out to Agent from PTBA1 EM credit to PMCAT"    | 
      | "Pay-out to Agent from PTBA2 EM credit to PMCAT"    | 
      # | "Pay-out to Agent from PTBA3 EM credit to PMCAT"    | 

    @send_payout_request
    Scenario: View specific payout request and approve
       Given I navigate to agent pay-out request listing screen
       When I click on view pay-out request 
       Then I should view Pay-out Request Details
       When I click on reject "Agent Pay-out request"
       Then I should see a confirmation prompt for reject "Agent Pay-out request"
       When I enter the reason for rejecting as "BDD Test"
       When I click on reject button for confirming
       Then I should read a message stating that "Pay-out request rejected successfully"

