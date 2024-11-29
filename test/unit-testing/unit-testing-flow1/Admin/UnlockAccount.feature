Feature: Paymaart - Admin Web - Unlock account
As a Super Admin,
I want to unlock a user’s account(Customer,Agent,Merchant)
So that they can access the Paymaart Application.
Conditions of Satisfaction
An "Unlock" option must be available in the admin application.
When the "Unlock" option is selected, random security questions should be displayed.
The admin must enter responses provided by the user.
If the admin provides two correct answers, the system will display a “Forgot PIN/Password” reset link.
When clicked, the reset link should be sent to the user’s registered email.
If incorrect answers are provided for all five questions, the account will be locked again for 24hours.

@add_admin_user
@create_new_user_and_login
@register_new_agent
@locking_agent_account
Scenario: Login as super admin and view list all the agent users to unlock account
    Given I navigate to agent users listing screen
    Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date, CAT", "Status"]'
    When I search for recently created agent
    When I click on the unlock button for first account in the list
    Then I should see a popup modal asking security questions
    When I enter the security question answer for agent
    When I click on Request Reset Link
    Then I should read a message stating that "Check your email for a password reset link. The link will be active for 10 minutes"

@register_new_customer
@locking_customer_account
Scenario: View list of customers and unlock account
    Given I navigate to customer users listing screen
    Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date, CAT", "Status"]'
    When I search for recently created customer
    When I click on the unlock button for first account in the list
    Then I should see a popup modal asking security questions
    When I enter the security question answer for customer
    When I click on Request Reset Link
    Then I should read a message stating that "Check your email for a password reset link. The link will be active for 10 minutes"

@register_new_merchant
@locking_merchant_account
Scenario: View list of merchants and unlock account
    Given I navigate to merchant users listing screen
    Then I should see table header containing '["Paymaart ID","Name","Trading Name","Created Date, CAT","Till Number","Location","Status"]'
    When I search for recently created merchant
     When I click on the unlock button for first account in the list
    Then I should see a popup modal asking security questions
    When I enter the security question answer for merchant
    When I click on Request Reset Link
    Then I should read a message stating that "Check your email for a password reset link. The link will be active for 10 minutes"


