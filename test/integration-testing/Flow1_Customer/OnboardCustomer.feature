Feature: Paymaart - Admin Web- Onboard Customer
    As an Super/support/admin, I want the ability to register new Customer
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
    10. Welcome message to be displayed on the screen from which the user can be navigated to the login screen
    11. There should be an option to select the country code
    12.Paymaart ID generation should be in sequential order
    13.There should be an option to upload a profile picture, which is from the system files(profile picture is optional)
    14.There should be an option to ask users whether the picture can be displayed publicly.
    Note: Resend can be allowed to 3 limit
    Information to be displayed
    SECURITY QUESTIONS (Select 3 of 4)
    What was your childhood nickname?
    What was the make and model of your first car?
    What was the name of your favourite childhood teacher?
    What is the name of the place you first visited outside your home town?
    Notes:
    Please provide unique and memorable answers that are easy to remember, even years later.
    Answers should be clear and exact (preferably a single word), but they don't need to be truthful. Indeed, it's best to use fake answers for security questions to enhance security.
    Paymaart ID format:
    CMR+8 for Customer

    @add_admin_user
    @create_new_user_and_login
    Scenario: Validate invalid email address
        Given I navigate to customer onboarding screen
        When I upload the customer profile picture as "profile.png"
        When I enter a valid first name for customer registration
        When I enter a valid middle name for customer registration
        When I enter a valid last name for customer registration
        When I enter a valid email address for customer registration
        When I enter a valid phone number for customer registration
        When I answer the security question one as "Answer1"
        When I answer the security question two as "Answer2"
        When I answer the security question three as "Answer3"
        When I answer the security question four as "Answer4"
        When I agree to the terms and conditions
        When I submit the customer registration form
        Then I should read a message stating that "Please verify your email address"
        Then I should read a message stating that "Please verify your phone number"
        When I click on verify email address
        Then I should read a message stating that "Verification code has been sent to customer’s email. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I click on verify phone number
        Then I should read a message stating that "Verification code has been sent to customer’s phone number. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify phone number button text changed to "VERIFIED"
        When I submit the customer registration form
        Then I should read a message stating customer registration successfully