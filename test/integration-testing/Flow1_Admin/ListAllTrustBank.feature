    
Feature: Paymaart - Admin Web -Trust Bank View
    As a super/admin/finance, I want to view the Paymaart Trust bank account so that I can manage the real money inflow
    Conditions of Satisfaction
    There should be an option to view the existing trust bank details
    There should be a default bank created named Paymaart Platform Bank with all the existing bank total amount.
    Information to be displayed
    Bank details
    1.Bank Name
    2.Bank Account Number
    3.Bank Account purpose
    4.Balance
    5.Action(view)

    @perform_logout
    @wait
    @add_admin_user
    @create_new_user_and_login
    Scenario: List all the trust banks
        Given I navigate to banks listing
        Then I should see table header containing '["Ref. No","Name","Account Number","Purpose","Last Update Date / Time","Balance"]'
