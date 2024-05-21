Feature: Paymaart - Admin Web - Active/Deactive customer user
    As an Super/admin,I want an option to activate or deactivate a customer.
    Condition of satisfaction
    A confirmation prompt should be displayed before the action is performed.
    When a customer is deactivated, the system should prevent the customer from logging in and performing any activities on the platform.

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_customer
    Scenario: Cancel Deactivate customer User
        Given I navigate to customer users listing screen
        When I search for the recently created customer user
        * I click on view for particular customer user
        * I should view all the basic details
        * I click on deactivate "Customer user"
        Then I should see a confirmation prompt for deactivating "Customer user"
        When I click on cancel button
        Then The customer user record must remain in the system with its previous status

    Scenario: Deactivate customer User
        Given I navigate to customer users listing screen
        When I search for the recently created customer user
        * I click on view for particular customer user
        * I should view all the basic details
        * I click on deactivate "Customer user"
        Then I should see a confirmation prompt for deactivating "Customer user"
        When I click on confirm button
        Then I should read a message stating that "Customer user deactivated successfully"

    Scenario: Cancel Activate customer User
        Given I navigate to customer users listing screen
        When I search for the recently created customer user
        When I click on view for particular customer user
        When I should view all the basic details
        When I click on activate "Customer user"
        Then I should see a confirmation prompt for activate "Customer user"
        When I click on cancel button
        Then The customer user record must remain in the system with its previous status

    Scenario: Activate customer User
        Given I navigate to customer users listing screen
        When I search for the recently created customer user
        When I click on view for particular customer user
        When I should view all the basic details
        When I click on activate "Customer user"
        Then I should see a confirmation prompt for activate "Customer user"
        When I click on confirm button
        Then I should read a message stating that "Customer user activated successfully"
