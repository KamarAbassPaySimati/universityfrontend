Feature: Paymaart- Admin Web- Flag transaction(Customer, agent and admin)

    As an super admin, I want the ability to flag transactions for merchants, agents, and customers for in case of suspected fraud

    Condition of satisfaction
    There should be an option to view all the transactions of merchants, agents, and customers
    There should be an option to flag a specific transaction, including situations where there is a user query, a reversal request, or suspicion of fraudulent activity.
    Email notifications should be sent to customers, agents, and merchants when a transaction is flagged.
    There should be an option to flag the transaction for Payments made with afrimax, paymaart, merchant

    Flag reasons:

    Flag 1: Transaction & System Failures
    Transaction failure due to security measures
    Inadequate communication about declined payments
    System errors and outages

    Flag 2: Policy Clarity & Customer Support
    Lack of acceptable payment options
    Unclear terms and conditions regarding returns or chargebacks
    Recurring billing complications

    Flag 3: Service Quality & Marketing Accuracy
    Privacy breach incidents
    Discrepancies between advertisements and purchased products

    Flag 4: User Experience Challenges
    Password threats and phishing attacks
    Insufficient privacy protection practices
    Refund denials or delays

    @add_admin_user
    @create_new_user_and_login
    Scenario: Flag transaction for admin
        Given I navigate to specific admin transaction
        When I click on view transaction for most recent transaction
        Then I should see the transaction recipt
        When I click on flag transaction button
        Then I should see a select flag transaction reason pop up 
        When I click confirm flag transaction button 
        Then I should read a message stating that "Select atleast one"
        When I select the reason for flag transaction as <reason>
        And  click confirm flag transaction button
        Then I should see a message stating that "Transaction flagged successfully"
        Then I should see the flag transaction button disabled 
        Examples:
        | reason |
        |"Transaction & System Failures"|
        |"Policy Clarity & Customer Support"|
        |"Service Quality & Marketing Accuracy"|
        |"User Experience Challenges"|

    @add_admin_user
    @create_new_user_and_login
    Scenario: Flag transaction for agent
        Given I navigate to specific agent transaction
        When I click on view transaction for most recent transaction
        Then I should see the transaction recipt
        When I click on flag transaction button
        Then I should see a select flag transaction reason pop up 
        When  click confirm flag transaction button 
        Then I should read a message stating that "Select atleast one"
        When I select the reason for flag transaction as <reason>
        And  click confirm flag transaction button
        Then I should see a message stating that "Transaction flagged successfully"
        Then I should see the flag transaction button disabled 
        Examples:
        | reason |
        |"Transaction & System Failures"|
        |"Policy Clarity & Customer Support"|
        |"Service Quality & Marketing Accuracy"|
        |"User Experience Challenges"|  


    @add_admin_user
    @create_new_user_and_login
    Scenario: Flag transaction for customer
        Given I navigate to specific customer transaction
        When I click on view transaction for most recent transaction
        Then I should see the transaction recipt
        When I click on flag transaction button
        Then I should see a select flag transaction reason pop up 
        When  click confirm flag transaction button
        Then I should read a message stating that "Select atleast one"
        When I select the reason for flag transaction as <reason>
        And  click confirm flag transaction button
        Then I should see a message stating that "Transaction flagged successfully"
        Then I should see the flag transaction button disabled 
        Examples:
        | reason |
        |"Transaction & System Failures"|
        |"Policy Clarity & Customer Support"|
        |"Service Quality & Marketing Accuracy"|
        |"User Experience Challenges"|