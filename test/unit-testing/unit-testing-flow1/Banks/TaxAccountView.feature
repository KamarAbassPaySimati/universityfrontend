Feature: Paymaart- Admin Web- Tax Account View
    As an super/finance admin I want to view the Paymaart tax bank account, so that I can manage the e-money that is earned by VAT and WHT
    Condition of Satisfaction
    There should be a default bank created named Paymaart tax Bank account

    @add_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: List all the tax accounts
        Given I navigate to tax account listing
        Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time","Balance"]'

    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as finance admin and navigate to tax account listing
        Given I navigate to tax account listing
        Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time","Balance"]'

    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Login as support admin and navigate to tax account listing
        Given I navigate to tax account listing
        And I should read a message stating that "We can’t find the page you’re looking for"
