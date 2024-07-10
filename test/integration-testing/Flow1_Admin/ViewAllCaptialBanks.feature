    
Feature: Paymaart - Admin Web - Capital Bank View
    As an Super/finance admin I want to view the Paymaart capital bank account, so that I can manage the e-money generation in the platform
    Condition of Satisfaction
    There should be a default bank created named Paymaart Capital Bank account
    Information to be displayed
    Bank details
    1.Bank Name
    2.Bank Account purpose
    3.Balance
    4.Action(view)

    @perform_logout
    @wait
    @add_admin_user
    @create_new_user_and_login
    Scenario: List all the capital banks
        Given I navigate to capital bank listing
        Then I should see table header containing '["Ref. No","Name","Purpose","Last Update Date / Time, CAT","Balance"]'
