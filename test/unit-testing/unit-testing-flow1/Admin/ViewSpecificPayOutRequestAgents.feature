Feature: Paymaart - Admin Web -View Specific Pay-out Request(Agent)
    As a Super Admin/finacne admin, I want an option to view the Specific Pay-out request
    Conditions of satisfaction
    There should be an option to view details of pay-out request

    @add_admin_user
    @create_new_user_and_login
    @delete_admin_account
    # api call
    Scenario: View specific payout request of agent
      Given I navigate to agent pay-out request listing screen
      When I click on view pay-out request 
      Then I should view Pay-out Request Details
    
    
    