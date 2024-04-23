Feature: Paymaart- Admin Web- Onboard Agent- Registration
  As an Super/support/admin, I want the ability to onboard new agents
  Condition of satisfaction
  There should be an option to input their firstname, middle name, surname,email and phone number
  There should be an option to view and accept the terms and conditions, and privacy policy
  There should be a disclaimer given below email and phone number stating: enter the email and phone number correctly as a verification code will be sent.
  Users should receive an OTP (One-Time Password) via SMS to the provided mobile number for verification of phone number.
  Users should receive an OTP via a registered email address to confirm the verification of email
  If the Verification entered OTP is incorrect an error message needs to be displayed
  OTP resent option needs to be enabled after 2 min
  Users should complete security questions so that when update their phone number or email these questions are asked.
  The user should answer 3 questions out of 4 sets of questions provided.
  Users should receive a system-generated unique PIN through email once the Registration is completed, along with Paymaart ID, Email, and Phone number.
  Welcome message to be displayed on the screen from which the admin can be navigated to KYC screen or end the step based on agent choice.
  Paymaart ID generation should be in non-sequential order
  Note: Resend can be allowed to 3 limit

  @perform_logout
  @wait
  @add_admin_user
  @create_new_user_and_login
  Scenario: Validate invalid OTP verification
    Given I navigate to agent onboarding screen
    When I enter a valid first name for agent registration
    When I enter a valid middle name for agent registration
    When I enter a valid last name for agent registration
    When I enter a valid email address for agent registration
    When I enter a valid phone number for agent registration
    When I click on verify email address
    And I enter the OTP as "001234"
    And I click on verify OTP
    Then I should read a message stating that "Invalid OTP"
    When I enter the valid OTP and verify
    Then I should see the verify email address button text changed to "VERIFIED"
    When I click on verify phone number
    And I enter the OTP as "001234"
    And I click on verify OTP
    Then I should read a message stating that "Invalid OTP"
    When I enter the valid OTP and verify
    Then I should see the verify phone number button text changed to "VERIFIED"

  Scenario: Super admin onboard the agent with valid information
    Given I navigate to agent onboarding screen
    When I enter a valid first name for agent registration
    When I enter a valid middle name for agent registration
    When I enter a valid last name for agent registration
    When I enter a valid email address for agent registration
    When I enter a valid phone number for agent registration
    When I answer the security question one as "Answer1"
    When I answer the security question two as "Answer2"
    When I answer the security question three as "Answer3"
    When I answer the security question four as "Answer4"
    When I agree to the terms and conditions
    When I submit the agent registration form
    Then I should read a message stating that "Please verify your email address"
    Then I should read a message stating that "Please verify your phone number"
    When I click on verify email address
    Then I should read a message stating that "Verification code has been sent to agent’s email. It's valid for 10 minutes"
    When I enter the valid OTP and verify
    Then I should see the verify email address button text changed to "VERIFIED"
    When I click on verify phone number
    Then I should read a message stating that "Verification code has been sent to agent’s phone number. It's valid for 10 minutes"
    When I enter the valid OTP and verify
    Then I should see the verify phone number button text changed to "VERIFIED"
    When I submit the agent registration form
    Then I should read a message stating registration successfully

  @perform_logout
  @wait
  @add_support_admin_user
  @create_new_user_and_login
  @delete_admin_account
  Scenario: Support Admin User login with valid credentials and onboard the agent with valid information
    Given I navigate to agent onboarding screen
    When I enter a valid first name for agent registration
    * I enter a valid middle name for agent registration
    * I enter a valid last name for agent registration
    * I enter a valid email address for agent registration
    * I enter a valid phone number for agent registration
    * I answer the security question one as "Answer1"
    * I answer the security question two as "Answer2"
    * I answer the security question three as "Answer3"
    * I answer the security question four as "Answer4"
    * I agree to the terms and conditions
    * I submit the agent registration form
    Then I should read a message stating that "Please verify your email address"
    Then I should read a message stating that "Please verify your phone number"
    When I click on verify email address
    Then I should read a message stating that "Verification code has been sent to agent’s email. It's valid for 10 minutes"
    When I enter the valid OTP and verify
    Then I should see the verify email address button text changed to "VERIFIED"
    When I click on verify phone number
    Then I should read a message stating that "Verification code has been sent to agent’s phone number. It's valid for 10 minutes"
    When I enter the valid OTP and verify
    Then I should see the verify phone number button text changed to "VERIFIED"
    When I submit the agent registration form
    Then I should read a message stating registration successfully

  @perform_logout
  @wait
  @add_normal_admin_user
  @create_new_user_and_login
  @delete_admin_account
  Scenario: Admin User login with valid credentials and onboard the agent with valid information
    Given I navigate to agent onboarding screen
    When I enter a valid first name for agent registration
    * I enter a valid middle name for agent registration
    * I enter a valid last name for agent registration
    * I enter a valid email address for agent registration
    * I enter a valid phone number for agent registration
    * I answer the security question one as "Answer1"
    * I answer the security question two as "Answer2"
    * I answer the security question three as "Answer3"
    * I answer the security question four as "Answer4"
    * I agree to the terms and conditions
    * I submit the agent registration form
    Then I should read a message stating that "Please verify your email address"
    Then I should read a message stating that "Please verify your phone number"
    When I click on verify email address
    Then I should read a message stating that "Verification code has been sent to agent’s email. It's valid for 10 minutes"
    When I enter the valid OTP and verify
    Then I should see the verify email address button text changed to "VERIFIED"
    When I click on verify phone number
    Then I should read a message stating that "Verification code has been sent to agent’s phone number. It's valid for 10 minutes"
    When I enter the valid OTP and verify
    Then I should see the verify phone number button text changed to "VERIFIED"
    When I submit the agent registration form
    Then I should read a message stating registration successfully