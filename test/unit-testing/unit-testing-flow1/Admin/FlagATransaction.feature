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

    @add_admin_user @create_new_user_and_login @create_transactions @delete_admin_account @delete_transaction
    Scenario: Viewing specific Transaction
        Given I navigate to Transaction History Page
        Then I should see table header containing '["Service Code","Date/ Time, CAT","Beneficiary Paymaart ID","Transaction ID","Type","Amount"]'
        When I click on the view button for first transaction in list
        Then I should be redirected to transaction details page
        When I click on flag transaction button
        When I click on confirm button
        Then I should read a message stating that "Select at least 1"
        When I select the reason for flag transaction as "Transaction & System Failures"
        When I click on confirm button
        Then I should read a message stating that "Transaction flagged successfully"