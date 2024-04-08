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

  @add_admin_user
  @create_new_user_and_login
  Scenario: List all the agent users
    Given I navigate to agent users listing screen
    Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date", "Status"]'

  Scenario Outline: Register user with invalid details
    Given I navigate to agent onboarding screen
    When I enter the first name as <first_name> for agent registration
    When I enter the middle name as <middle_name> for agent registration
    When I enter the last name as <last_name> for agent registration
    When I enter the email address as <email> for agent registration
    When I enter the phone number as <phone> for agent registration
    When I agree to the terms and conditions
    When I submit the agent registration form
    Then I should read a message stating that <message>

    Examples:
      | first_name | last_name | middle_name | email                    | phone        | message                            |
      | ""         | "Tyson"   | "D"         | "bharath.shet@7edge.com" | "9741292994" | "Required field"                   |
      | "John"     | ""        | "Mike"      | "bharath.shet@7edge.com" | "9741292994" | "Required field"                   |
      | "John"     | "Tyson"   | ""          | "bharath.shet@7edge.com" | "9741292994" | "Required field"                   |
      | "John"     | "Tyson"   | "D"         | ""                       | "9741292994" | "Required field"                   |
      | "John"     | "Tyson"   | "D"         | "bharath.shet@7edge.com" | ""           | "Required field"                   |
      | "John"     | "Tyson"   | "D"         | "ajeeb@7edge.com"        | "9742994"    | "Please verify your email address" |

  Scenario Outline: Answer security questions
    Given I navigate to agent onboarding screen
    When I answer the security question one as <answer_1>
    When I answer the security question two as <answer_2>
    When I answer the security question three as <answer_3>
    When I answer the security question four as <answer_4>
    When I submit the agent registration form
    Then I should read a message stating that "Answer at least 3 questions"

    Examples:
      | answer_1 | answer_2     | answer_3 | answer_4    |
      | "John"   | "i10"        | ""       | ""          |
      | ""       | "Lamborgini" | "Mike"   | ""          |
      | ""       | ""           | "Mike"   | "Bangalore" |
      | ""       | "Lamborgini" | ""       | "Bangalore" |
      | "John"   | ""           | ""       | "Bangalore" |
      | ""       | "Lamborgini" | ""       | "Malawi"    |

  Scenario: Validate invalid email address
    Given I navigate to agent onboarding screen
    When I enter the first name as "John" for agent registration
    When I enter the middle name as "D" for agent registration
    When I enter the last name as "Tyson" for agent registration
    When I enter the email address as "bharath.shet7edge.com" for agent registration
    When I enter the phone number as "9741292994" for agent registration
    When I agree to the terms and conditions
    When I click on verify email address
    Then I should read a message stating that "Invalid email"

  Scenario: Validate invalid phone number
    Given I navigate to agent onboarding screen
    When I enter the first name as "John" for agent registration
    When I enter the middle name as "D" for agent registration
    When I enter the last name as "Tyson" for agent registration
    When I enter a valid email address for agent registration
    When I agree to the terms and conditions
    When I click on verify email address
    When I enter the valid OTP and verify
    Then I should see the verify email address button text changed to "VERIFIED"
    When I enter the phone number as "974129" for agent registration
    When I click on verify phone number
    Then I should read a message stating that "Invalid phone number"

  Scenario: Validate already existing email address/phone number
    Given I navigate to agent onboarding screen
    When I enter a valid first name for agent registration
    When I enter a valid middle name for agent registration
    When I enter a valid last name for agent registration
    When I enter the email address as "bharath.shet+agent@7edge.com" for agent registration
    When I click on verify email address
    Then I should read a message stating that "Email already exists"
    When I enter a valid email address for agent registration
    When I click on verify email address
    When I enter the valid OTP and verify
    Then I should see the verify email address button text changed to "VERIFIED"
    When I enter the phone number as "9741292994" for agent registration
    When I click on verify phone number
    Then I should read a message stating that "Phone number already exists"

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
  Scenario: Finance Admin User login with valid credentials
    Given I am on the login screen
    When I enter the email address as "bharath.shet+finance_admin@7edge.com" and password as "Admin@123"
    And I submit the login form
    Then I should be navigated to the TOTP screen
    When I enter the TOTP obtained from the previously scanned device
    And I submit the TOTP form
    Then I should be redirected to the '/dashboard' page
    When I navigate to agent onboarding screen
    Then I should view "404" page not found screen

  @perform_logout
  @wait
  Scenario: Support Admin User login with valid credentials and onboard the agent with valid information
    Given I am on the login screen
    When I enter the email address as "bharath.shet+support_admin@7edge.com" and password as "Admin@123"
    And I submit the login form
    Then I should be navigated to the TOTP screen
    When I enter the TOTP obtained from the previously scanned device
    And I submit the TOTP form
    Then I should be redirected to the '/dashboard' page
    When I navigate to agent onboarding screen
    * I enter a valid first name for agent registration
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
  Scenario: Admin User login with valid credentials and onboard the agent with valid information
    Given I am on the login screen
    When I enter the email address as "bharath.shet+normal_admin@7edge.com" and password as "Admin@123"
    And I submit the login form
    Then I should be navigated to the TOTP screen
    When I enter the TOTP obtained from the previously scanned device
    And I submit the TOTP form
    Then I should be redirected to the '/dashboard' page
    When I navigate to agent onboarding screen
    * I enter a valid first name for agent registration
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