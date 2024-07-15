Feature: Paymaart - Admin Web- View List of Flagged Transaction
    As an super admin, I want the ability to view all flagged transactions by merchants, agents, admins and customers in case of suspected fraud or user queries

    Conditions of satisfaction

    By default the list should be in a chronological order
    There should be an option to filter using flagged reasons
    Pagination is required if there are more than 10 flagged transactions.
    There should be an option to see the total number of records eg: 10/100
    A confirmation prompt should be displayed before the action is performed.
    There should be an option to enter the comment which is a free text for approval/rejection/refund.
    When a flagged transaction is approved, rejected, or refunded the system should resolve the flag.
    When a refund action is taken, e-money is to be refunded fully to the respective sender.
    Notification to be sent to the relevant parties. based on the membership type

    @add_admin_user
    @create_new_user_and_login
    @create_flag_transactions
    Scenario: Searching for invalid data
        Given I am on the flagged transaction page
        When I search for an invalid flagged <id>
        Then I should read a message stating that "No data found"
        Examples:
        | id |
        |"222222"|
        |"11111111111111"|

    @add_admin_user
    @create_new_user_and_login
    @create_flag_transactions
    Scenario: Checking Pagination
        Given I am on the flagged transaction page
        When I click on paginate next page
        Then I should be navigated to page 2
        When I click on paginate to previous page
        Then I should be navigated to page 1

    @add_admin_user
    @create_new_user_and_login
    @create_flag_transactions
    Scenario: Filter flagged transaction by any one reason
        Given I am on the flagged transaction page
        When I click on filter tab
        Then I should see filter popup modal
        And I select filter by flagged reason as <reason>
        And I click on apply button
        Then I should see list of flagged transaction of reason <reason>
        Examples:
        | reason |
        |"Transaction & System Failures"|
        |"Policy Clarity & Customer Support"|
        |"Service Quality & Marketing Accuracy"|
        |"User Experience Challenges"|

    # @add_admin_user
    # @create_new_user_and_login
    # Scenario: Filter flagged transaction by any two reason
    #     Given I am on the flagged transaction page
    #     When I click on filter tab
    #     Then I should see filter popup modal
    #     And I select filter by flagged reason as <reasonOne>
    #     And I select filter by flagged reason as <reasonTwo>
    #     And I click on apply button
    #     Then I should see list of flagged transaction of reason <allReasons>
    #     Examples:
    #     | reasonOne |reasonOne|allReasons|
    #     |"Transaction & System Failures"|"Service Quality & Marketing Accuracy"|"Transaction & System Failures, Service Quality & Marketing Accuracy"|
    #     |"Policy Clarity & Customer Support"|"User Experience Challenges"|"Policy Clarity & Customer Support, User Experience Challenges"|
    #     |"Transaction & System Failures"|"User Experience Challenges"|"Transaction & System Failures, User Experience Challenges"|
    #     |"Policy Clarity & Customer Support"|"Service Quality & Marketing Accuracy"|"Policy Clarity & Customer Support, Service Quality & Marketing Accuracy"|

    # @add_admin_user
    # @create_new_user_and_login
    # Scenario: Filter flagged transaction by all reason
    #     Given I am on the flagged transaction page
    #     When I click on filter tab
    #     Then I should see filter popup modal
    #     And I select filter by flagged reason as "Transaction & System Failures"
    #     And I select filter by flagged reason as "Policy Clarity & Customer Support"
    #     And I select filter by flagged reason as "Service Quality & Marketing Accuracy"
    #     And I select filter by flagged reason as "User Experience Challenges"
    #     And I click on apply button
    #     Then I should see list of flagged transaction of reason "Transaction & System Failures, Policy Clarity & Customer Support, Service Quality & Marketing Accuracy, User Experience Challenges"

    @add_admin_user
    @create_new_user_and_login
    @create_flag_transactions
    Scenario: Searching for valid flagged paymaart id
        Given I am on the flagged transaction page
        When I search for an valid flagged paymaart id
        And I click on view most recent for flagged transaction  
        Then I should see the transaction recipt of flagged transaction

    @add_admin_user
    @create_new_user_and_login
    @create_flag_transactions
    Scenario: Approve the flagged transaction
        Given I am on the flagged transaction page
        When I search for an valid flagged paymaart id
        And I click on view most recent for flagged transaction  
        Then I should see the transaction recipt of flagged transaction
        When I click on approve button 
        Then I should read a message stating that "Flagged transaction approved successfully"

    @add_admin_user
    @create_new_user_and_login
    @create_flag_transactions
    Scenario: Reject the flagged transaction
        Given I am on the flagged transaction page
        When I search for an valid flagged paymaart id
        And I click on view most recent for flagged transaction  
        Then I should see the transaction recipt of flagged transaction
        When I click on reject button
        When I enter the reason for rejecting as "BDD" 
        When I click on reject button
        Then I should read a message stating that "Flagged transaction rejected successfully"