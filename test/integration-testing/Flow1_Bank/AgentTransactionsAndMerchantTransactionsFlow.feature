Feature: Paymaart - Admin Web- View list of Merchant transaction and Agent transactions

    Scenario: Login as super admin and view list of transaction history
        Given I navigate to agent users listing screen
        When I click on transaction history icon
        Then I should be navigated to transaction history page
        Then I should see table header containing '["Service Code","Date/ Time, CAT","Transaction ID","Beneficiary Paymaart ID", "Type","Amount"]'

    Scenario: Search for non existing record
        Given I navigate to agent users listing screen
        When I click on transaction history icon
        When I search for particular transaction as "transaction 88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"

    Scenario: Filter transactions by date
        Given I navigate to agent users listing screen
        When I click on transaction history icon
        When I click on filter tab
        Then I should see filter popup modal
        And I select start date as "08-Jan-2023"
        And I select end date as "07-Jan-2023"
        Then I click on the apply filter button
        Then I should read a message stating that "Start date cannot be greater than end date"
        And I select start date as "08-Jan-2023"
        And I select end date as "07-Nov-2026"
        Then I click on the apply filter button
        Then I should see list of transactions where between "08 Jan 2023" and "07 Nov 2026"

    # need api for this scenario
    # Scenario Outline: Filter transactions by transaction type
    #     Given I navigate to agent users listing screen
    #     When I click on transaction history icon
    #     Then I should be navigated to transaction history page
    #     When I click on filter tab
    #     Then I should see filter popup modal
    #     And I select filter by transaction type as <type>
    #     Then I should see list of transactions where type is <filter_type>
    #     Examples:
    #         | type             |filter_type       |
    #         | "Pay-in"         |"Pay-in"          |
    #         | "Pay-out"        |"Pay-out"         |
    #         | "Cash-in"        |"Cash-in"         |
    #         | "Cash-out"       |"Cash-out"        |
    #         | "Pay-Paymaart"   |"Pay-Paymaart"    |
    #         | "Pay-Afrimax"    |"Pay-Afrimax"     |
    #         | "Pay-Merchant"   |"Pay-Merchant"    |
    #         | "Other"          |"Other"           |

    Scenario: Exporting transaction list
        Given I navigate to agent users listing screen
        When I click on transaction history icon
        When I click on export button for transaction History
        Then I should read a message stating that "Transaction details exported successfully"

    Scenario: Checking Pagination
        Given I navigate to agent users listing screen
        When I click on transaction history icon
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    Scenario: View specific transaction by agent
        Given I navigate to agent users listing screen
        When I click on transaction history icon
        Then I should be navigated to transaction history page
        When I click on view transaction for most recent transaction
        Then I should see the transaction receipt of agent
        Then I should see the flag transaction and share button


 Scenario: Login as super admin and view list of transaction history
        Given I navigate to merchant users listing screen
        When I click on transaction history icon in merchant
        Then I should be navigated to transaction history page
        Then I should see table header containing '["Service Code","Date/ Time, CAT","Transaction ID","Beneficiary Paymaart ID", "Type","Amount"]'

    Scenario: Search for non existing record
        Given I navigate to merchant users listing screen
        When I click on transaction history icon in merchant
        When I search for particular transaction as "transaction 88732914"
        Then I should read a message stating that "No data found"
        And I should read a message stating that "Try adjusting your search or filter to find what you’re looking for"

    Scenario: Filter transactions by date
        Given I navigate to merchant users listing screen
        When I click on transaction history icon in merchant
        When I click on filter tab
        Then I should see filter popup modal
        And I select start date as "08-Jan-2023"
        And I select end date as "07-Jan-2023"
        Then I click on the apply filter button
        Then I should read a message stating that "Start date cannot be greater than end date"
        And I select start date as "08-Jan-2023"
        And I select end date as "07-Nov-2026"
        Then I click on the apply filter button
        Then I should see list of transactions where between "08 Jan 2023" and "07 Nov 2026"


    Scenario: Exporting transaction list
        Given I navigate to merchant users listing screen
        When I click on transaction history icon in merchant
        When I click on export button for transaction History
        Then I should read a message stating that "Transaction details exported successfully"

    Scenario: Checking Pagination
        Given I navigate to merchant users listing screen
        When I click on transaction history icon in merchant
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1
        
    @delete_admin_account
    Scenario: View specific transaction by agent
        Given I navigate to merchant users listing screen
        When I click on transaction history icon in merchant
        Then I should be navigated to transaction history page
        When I click on view transaction for most recent transaction
        Then I should see the transaction receipt of merchant
        Then I should see the flag transaction and share button



