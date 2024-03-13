@1.1
Feature: Paymaart -Admin Web - Forgot Password
    As an Super/finance/support/admin. who forgot the password, I want an option to reset my password so 
    that I can set a new password and log in
    Conditions of Satisfaction:
    The user should enter their registered email associated with the account
    If entered email is not as per registered email ,error will be shown
    After providing their email , the user should receive a link via email with instructions on reset password
    The email link should be only active for10min
    The link should redirect the user to forgot password page where the user should have an option to enter New Password and Confirm Password according to password criteria
    There should an error message prompted if New and Confirm Password doesnot match
    After successfully resetting the Password, the system should redirect user to login screen where the user should be performing MFA
    The scan QR code for MFA authentication should be shown only once for the requested account.
    After the successful validation of the OTP given , the user should be redirected to Login Page.
    Information to be displayed:
    PAYMAART PASSWORD RULES
    Length:
    a. 8-12 characters (minimum and maximum, respectively)
    Mix of characters:
    a. Mix of uppercase letters, lowercase letters, numbers, and special characters.
    Spaces and punctuation marks:
    a. No spaces allowed
    b. No punctuation marks (such as stop, exclamation/question marks) allowed
    Personal Information
    a. Exclude easily guessed information such as your name, birthdate, or common words.
    Common Patterns:
    a. Exclude simple patterns like 12345678, 22446688, password, or sequential
    keyboard patterns like qwerty
    Randomness:
    a. Require random combinations of characters.

    @reset_password
    Scenario: Request Forgot password
        Given I am on the login screen
        And I click on forgot password
        When I enter the email address as "bharath.shet+admin@7edge.com" 
        Then I should read a message stating that "Check your email for a password reset link. The link will be active for 10 minutes."
        And I click on go back to login screen
        Then I should be redirected to login
    
    @request_reset_password
    Scenario Outline: Passwords do not match
        Given I open a reset password link
        Then I should see option to enter my new password
        When I enter password as <password> and confirm password as <confirm_password>
        And I submit the forgot password form
        Then I should read a message stating that <message>
        Examples:
            | password        | confirm_password | message                   |
            | "1234@bharathB" | "1234@bharathBc" | "Password does not match" |

    Scenario: Check for password requirement
        Given I am in reset password page
        When I enter password as <password> and confirm password as <confirm_password>
        And I submit the forgot password form
        Then I should forgot password submit button as disabled
        Examples:
            | password      | confirm_password |
            | "abcpassword" | "abcpassword"    |
            | "1"           | "1"              |
            | "c"           | "c"              |
            | "@"           | "@"              |
            | "bharath@"    | "bharath@"       |
            | "B"           | "B"              |
            | "Ba"          | "Ba"             |
            | "Ba1"         | "Ba1"            |
            | "Pass!1"      | "Pass!1"         |

    Scenario: Set New Password with valid information
        Given I am in reset password page
        When I enter password as "Admin@1234" and confirm password as "Admin@1234"
        And I submit the forgot password form
        Then I should read a message stating that "Your password has been successfully changed"
        
    Scenario: Link Expired
        Given I reopen the reset password link
        Then I should read a message stating that "404 Link has expired or Invalid"

    @perform_logout @wait
    Scenario: Admin User login with valid credentials after reseting password
        Given I am on the login screen
        When I enter the email address as "bharath.shet+admin@7edge.com" and password as "Admin@1234"
        And I submit the login form
        Then I should be navigated to the TOTP screen
        When I enter the TOTP obtained from the previously scanned device
        And I submit the TOTP form
        Then I should be redirected to the '/dashboard' page

    @request_reset_password
    Scenario: Set password to previous password
        Given I open a reset password link
        When I enter password as "Admin@1234" and confirm password as "Admin@1234"
        And I submit the forgot password form
        Then I should read a message stating that "Your password has been successfully changed"