Feature: Paymaart- Admin Web- Onboard merchant- Registration
    As an Super/support/admin, I want the ability to register new Merchants
    Conditions of Satisfaction
    There should be an option to input their firstname, middle name, surname,email and phone number
    There should be an option to view and accept the terms and condition, and privacy policy
    There should a disclaimer given below email and phone number stating: enter the email and phone number correctly as a verification code will be sent.
    Users should receive an OTP (One-Time Password) via SMS to the provided mobile number for verification of phone number.
    Users should receive an OTP via a registered email address to confirm the verification of email
    6.If the Verification entered OTP is incorrect an error message needs to be displayed
    OTP resent option needs to be enabled after 2 min
    Users should complete security questions so that when update their phone number or email these questions are asked.
    The user should answer 3 questions out of 4 sets of questions provided.
    Users should receive a system-generated unique PIN through email once the Registration is completed, along with Paymaart ID, Email, and Phone number.
    10. Welcome message to be displayed on the screen from which the user can be navigated to the KYC registrtaion screen
    11. There should be an option to select the country code
    12.Paymaart ID generation should be in sequential order
    Note: Resend can be allowed to 3 limit
    Information to be displayed:
    SECURITY QUESTIONS (Select 3 of 4)
    What was your childhood nickname?
    What was the make and model of your first car?
    What was the name of your favourite childhood teacher?
    What is the name of the place you first visited outside your home town?
    Notes:
    Please provide unique and memorable answers that are easy to remember, even years later.
    Answers should be clear and exact (preferably a single word), but they don't need to be truthful. Indeed, it's best to use fake answers for security questions to enhance security.
    Paymaart ID format:
    MCT+7 for Merchant

    @add_admin_user
    @create_new_user_and_login
    Scenario: List all the merchant users
        Given I navigate to merchant users listing screen
        Then I should see table header containing '["Paymaart ID","Name","Phone Number","Created Date", "Status"]'

    Scenario Outline: Register user with invalid details
        Given I navigate to merchant onboarding screen
        When I enter the first name as <first_name> for merchant registration
        When I enter the middle name as <middle_name> for merchant registration
        When I enter the last name as <last_name> for merchant registration
        When I enter the email address as <email> for merchant registration
        When I enter the phone number as <phone> for merchant registration
        When I agree to the terms and conditions
        When I submit the merchant registration form
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
        Given I navigate to merchant onboarding screen
        When I answer the security question one as <answer_1>
        When I answer the security question two as <answer_2>
        When I answer the security question three as <answer_3>
        When I answer the security question four as <answer_4>
        When I submit the merchant registration form
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
        Given I navigate to merchant onboarding screen
        When I enter the first name as "John" for merchant registration
        When I enter the middle name as "D" for merchant registration
        When I enter the last name as "Tyson" for merchant registration
        When I enter the email address as "bharath.shet7edge.com" for merchant registration
        When I enter the phone number as "9741292994" for merchant registration
        When I agree to the terms and conditions
        When I click on verify email address
        Then I should read a message stating that "Invalid email"

    Scenario: Validate invalid phone number
        Given I navigate to merchant onboarding screen
        When I enter the first name as "John" for merchant registration
        When I enter the middle name as "D" for merchant registration
        When I enter the last name as "Tyson" for merchant registration
        When I enter a valid email address for merchant registration
        When I agree to the terms and conditions
        When I click on verify email address
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I enter the phone number as "974129" for merchant registration
        When I click on verify phone number
        Then I should read a message stating that "Invalid phone number"

    Scenario: Validate already existing email address/phone number
        Given I navigate to merchant onboarding screen
        When I enter a valid first name for merchant registration
        When I enter a valid middle name for merchant registration
        When I enter a valid last name for merchant registration
        When I enter the email address as "bharath.shet+merchant@7edge.com" for merchant registration
        When I click on verify email address
        Then I should read a message stating that "Email already exists"
        When I enter a valid email address for merchant registration
        When I click on verify email address
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I enter the phone number as "9741292994" for merchant registration
        When I click on verify phone number
        Then I should read a message stating that "Phone number already exists"

    Scenario: Validate invalid OTP verification
        Given I navigate to merchant onboarding screen
        When I enter a valid first name for merchant registration
        When I enter a valid middle name for merchant registration
        When I enter a valid last name for merchant registration
        When I enter a valid email address for merchant registration
        When I enter a valid phone number for merchant registration
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


    Scenario: Super admin onboard the merchant with valid information
        Given I navigate to merchant onboarding screen
        When I enter a valid first name for merchant registration
        When I enter a valid middle name for merchant registration
        When I enter a valid last name for merchant registration
        When I enter a valid email address for merchant registration
        When I enter a valid phone number for merchant registration
        When I answer the security question one as "Answer1"
        When I answer the security question two as "Answer2"
        When I answer the security question three as "Answer3"
        When I answer the security question four as "Answer4"
        When I agree to the terms and conditions
        When I submit the merchant registration form
        Then I should read a message stating that "Please verify your email address"
        Then I should read a message stating that "Please verify your phone number"
        When I click on verify email address
        Then I should read a message stating that "Verification code has been sent to merchant’s email. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I click on verify phone number
        Then I should read a message stating that "Verification code has been sent to merchant’s phone number. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify phone number button text changed to "VERIFIED"
        When I submit the merchant registration form
        Then I should read a message stating merchant registration successfully


    @perform_logout
    @wait
    @add_finance_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Finance Admin User login with valid credentials
        When I navigate to merchant onboarding screen
        Then I should view "404" page not found screen

    @perform_logout
    @wait
    @add_support_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Support Admin User login with valid credentials and onboard the merchant with valid information
        Given I navigate to merchant onboarding screen
        When I enter a valid first name for merchant registration
        * I enter a valid middle name for merchant registration
        * I enter a valid last name for merchant registration
        * I enter a valid email address for merchant registration
        * I enter a valid phone number for merchant registration
        * I answer the security question one as "Answer1"
        * I answer the security question two as "Answer2"
        * I answer the security question three as "Answer3"
        * I answer the security question four as "Answer4"
        * I agree to the terms and conditions
        * I submit the merchant registration form
        Then I should read a message stating that "Please verify your email address"
        Then I should read a message stating that "Please verify your phone number"
        When I click on verify email address
        Then I should read a message stating that "Verification code has been sent to merchant’s email. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I click on verify phone number
        Then I should read a message stating that "Verification code has been sent to merchant’s phone number. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify phone number button text changed to "VERIFIED"
        When I submit the merchant registration form
        Then I should read a message stating merchant registration successfully

    @perform_logout
    @wait
    @add_normal_admin_user
    @create_new_user_and_login
    @delete_admin_account
    Scenario: Admin User login with valid credentials and onboard the merchant with valid information
        Given I navigate to merchant onboarding screen
        When I enter a valid first name for merchant registration
        * I enter a valid middle name for merchant registration
        * I enter a valid last name for merchant registration
        * I enter a valid email address for merchant registration
        * I enter a valid phone number for merchant registration
        * I answer the security question one as "Answer1"
        * I answer the security question two as "Answer2"
        * I answer the security question three as "Answer3"
        * I answer the security question four as "Answer4"
        * I agree to the terms and conditions
        * I submit the merchant registration form
        Then I should read a message stating that "Please verify your email address"
        Then I should read a message stating that "Please verify your phone number"
        When I click on verify email address
        Then I should read a message stating that "Verification code has been sent to merchant’s email. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I click on verify phone number
        Then I should read a message stating that "Verification code has been sent to merchant’s phone number. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify phone number button text changed to "VERIFIED"
        When I submit the merchant registration form
        Then I should read a message stating merchant registration successfully