Feature: Paymaart - Admin Web - Active/Deactive merchants account
	As an Super/admin, I want the ability to activate or deactivate an merchant account based on operational needs.
	Conditions of Satisfaction
	A confirmation prompt should be displayed before the action is performed.
	If the user has logged in and the account has been deactivated, the user should be automatically logged out of the application.
	When a user is deactivated, the system should prevent the user from logging in.
	When a user is deactivated or activated, they should receive an email notification.
 
    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_merchant
    Scenario: Cancel Deactivate merchant User
        Given I navigate to merchant users listing screen
        When I search for the recently created merchant user
        * I click on view for particular merchant user
        * I should view all the basic details
        * I click on deactivate "Merchant user"
        Then I should see a confirmation prompt for deactivating "Merchant user"
        When I click on cancel button
        Then The merchant user record must remain in the system with its previous status

    Scenario: Deactivate merchant User 
        Given I navigate to merchant users listing screen
        When I search for the recently created merchant user
        * I click on view for particular merchant user
        * I should view all the basic details
        * I click on deactivate "Merchant user"
        Then I should see a confirmation prompt for deactivating "Merchant user"
        When I click on confirm button
        Then I should read a message stating that "Merchant deactivated successfully"

    Scenario: Cancel Activate merchant User
        Given I navigate to merchant users listing screen
        When I search for the recently created merchant user
        When I click on view for particular merchant user
        When I should view all the basic details
        When I click on activate "Merchant user"
        Then I should see a confirmation prompt for activate "Merchant user"
        When I click on cancel button
        Then The merchant user record must remain in the system with its previous status

    Scenario: Activate merchant User
        Given I navigate to merchant users listing screen
        When I search for the recently created merchant user
        When I click on view for particular merchant user
        When I should view all the basic details
        When I click on activate "Merchant user"
        Then I should see a confirmation prompt for activate "Merchant user"
        When I click on confirm button
        Then I should read a message stating that "Merchant activated successfully"