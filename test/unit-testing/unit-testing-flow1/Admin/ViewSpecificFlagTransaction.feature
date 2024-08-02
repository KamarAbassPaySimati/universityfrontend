Feature: Paymaart - Admin Web- View specific Flagged Transaction
  By default the list should be in a chronological order
  There should be an option to filter using flagged reasons
  Pagination is required if there are more than 10 flagged transactions.
  There should be an option to see the total number of records eg: 10/100
  A confirmation prompt should be displayed before the action is performed.
  There should be an option to enter the comment which is a free text for approval/rejection/refund.
  When a flagged transaction is approved, rejected, or refunded the system should resolve the flag.
  When a refund action is taken, e-money is to be refunded fully to the respective sender.
  Notification to be sent to the relevant parties. based on the membership type

  @add_admin_user @create_new_user_and_login @create_transactions
  Scenario: flaging specific Transaction
    Given I navigate to Transaction History Page
    When I click on the view button for first transaction in list
    Then I should be redirected to transaction details page
    When I click on flag transaction button
    When I select the reason for flag transaction as "Transaction & System Failures"
    When I click on confirm button
    Then I should read a message stating that "Transaction flagged successfully"

  @delete_admin_account @delete_transaction
  Scenario: List all the Flaged transaction
    Given I am on the flagged transaction page
    When I click on the view button for first flagged transaction in list
    Then I should be redirected to flagged transaction details page
