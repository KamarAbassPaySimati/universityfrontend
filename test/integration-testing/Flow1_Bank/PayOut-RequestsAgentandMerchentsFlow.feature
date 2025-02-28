Feature: PayOut-requests Flow Merchent and Agent

    @perform_logout
    @wait
    @add_admin_user
    @create_new_user_and_login
    Scenario: Login as super admin and view list all the payout requests agents
        Given I navigate to payout request agents listing screen
        Then I should see table header containing '["Pay-out Request ID","Recipient Paymaart ID","Amount","Date/Time In, CAT","Status", ""]'

    Scenario Outline: Sort functionality
        Given I navigate to payout request agents listing screen
        When I click on the sort by "<sort_by>"
        Then I should see the payout request sorted in ascending order based on "<sort_by>"
        When I click on the sort by "<sort_by>"
        And I should see the payout request sorted in descending order based on "<sort_by>"
        Examples:
            | sort_by        |
            | Requested Date |

    Scenario Outline: Search functionality
        Given I navigate to payout request agents listing screen
        When  I search reported payout request by "<search_term>"
        Then  I should see the payout request based on the "<search_term>"
        Examples:
            | search_term |
            | Paymaart ID |
            | Request ID  |

    Scenario: Checking Pagination
        Given I navigate to payout request agents listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    Scenario: View Particular Partcular Payout Requests
        Given I navigate to payout request agents listing screen
        When  I click on view payout request
        Then  I should see all the valid details of payout request

    Scenario: Login as super admin and view list all the payout requests Merchants
        Given I navigate to payout request Merchants listing screen
        Then I should see table header containing '["Pay-out Request ID","Recipient Paymaart ID","Amount","Date/Time In, CAT","Status", ""]'

    Scenario Outline: Sort functionality
        Given I navigate to payout request Merchants listing screen
        When I click on the sort by "<sort_by>"
        Then I should see the payout request sorted in ascending order based on "<sort_by>"
        When I click on the sort by "<sort_by>"
        And I should see the payout request sorted in descending order based on "<sort_by>"
        Examples:
            | sort_by        |
            | Requested Date |

    Scenario Outline: Search functionality
        Given I navigate to payout request Merchants listing screen
        When  I search reported payout request by "<search_term>"
        Then  I should see the payout request based on the "<search_term>"
        Examples:
            | search_term |
            | Paymaart ID |
            | Request ID  |

    Scenario: Checking Pagination
        Given I navigate to payout request Merchants listing screen
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    @GenerateMobileToken
    @PayOutRequestAgent
    Scenario: Approve the payout request agent
        Given I navigate to payout request agents listing screen
        When  I click on view payout request
        And  I fill all the details to approve the request of agent
        When I click on the approve
        Then I should read a message stating that "Pay-out request approved successfully"

    @GenerateMobileTokenMerchant
    @PayOutRequestMerchent
    Scenario: Approve the payout request merchant
        Given I navigate to payout request Merchants listing screen
        When  I click on view payout request
        And  I fill all the details to approve the request
        When I click on the approve
        Then I should read a message stating that "Pay-out request approved successfully"
        
    @delete_admin_account
    Scenario: View Particular Partcular Payout Requests
        Given I navigate to payout request Merchants listing screen
        When  I click on view payout request
        Then  I should see all the valid details of payout request
