Feature: Paymaart - Admin Web- Approve/Reject Flagged Transaction
  By default the list should be in a chronological order
  There should be an option to filter using flagged reasons
  Pagination is required if there are more than 10 flagged transactions.
  There should be an option to see the total number of records eg: 10/100
  A confirmation prompt should be displayed before the action is performed.
  There should be an option to enter the comment which is a free text for rejection.
  When a flagged transaction is approved, rejected,  system should resolve the flag.
  When a reject action is taken, e-money is to be refunded fully to the respective sender and entry to be reflected in customer Refund status list.
  Notification to be sent to the relevant parties. based on the membership type

   @add_admin_user @create_new_user_and_login @create_transactions @delete_admin_account @delete_transaction
    Scenario: flaging specific Transaction
        Given I navigate to Transaction History Page
        When I click on the view button for first transaction in list
        Then I should be redirected to transaction details page
        When I click on flag transaction button
        When I select the reason for flag transaction as "Transaction & System Failures"
        When I click on confirm button
        Then I should read a message stating that "Transaction flagged successfully"

    Scenario: Approving flagged transaction
        Given I am on the flagged transaction page  
        When I click on the view button for first flagged transaction in list
        Then I should be redirected to flagged transaction details page
        When I click on approve "Flag Transaction"
        Then I should see a confirmation prompt for approving "Flag Transaction"
        Then I should read a message stating "Flagged transaction approved successfully" for flag transaction

    Scenario: Rejectin flagged transaction
        Given I am on the flagged transaction page  
        When I click on the view button for first flagged transaction in list
        Then I should be redirected to flagged transaction details page
        When I click on reject "Flag Transaction"
        Then I should see a confirmation prompt for reject "Flag Transaction"
        Then I should read a message stating "Flagged transaction rejected successfully" for flag transaction    