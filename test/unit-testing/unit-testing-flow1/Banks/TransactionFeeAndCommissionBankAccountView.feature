Feature: Paymaart - Admin Web - Transaction Fee & Commission Bank Account View
    As an super/finance admin I want to view the Paymaart transaction fee and commision bank account, so that I can manage the e-money that are earned by agents as commision and e-money earned by transactions made by agents,customer and merchants(collect-cash)
    Condition of satisfaction
    There should be a default bank created named Paymaart transaction fee and commision Bank account

    @add_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: List all the Transaction fee and commision banks
        Given I navigate to Transaction fee and commision bank listing
        Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time, CAT","Balance"]'

    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as finance admin and navigate to Transaction fee and commision bank listing
        Given I navigate to Transaction fee and commision bank listing
        Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time, CAT","Balance"]'


    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as support admin and navigate to Transaction fee and commision bank listing
        Given I navigate to Transaction fee and commision bank listing
        And I should read a message stating that "We can’t find the page you’re looking for"
