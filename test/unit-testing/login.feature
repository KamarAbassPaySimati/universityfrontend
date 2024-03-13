@1.1 @Login
Feature: Paymaart - Admin Web - Login
    As a Super/finance/support/admin, I want an option to log in so that I can access the application.
    Conditions of Satisfaction:
    User should be able to log in using a registered email address and password.
    If the admin enters an invalid email address or password, an appropriate error message should be displayed.
    The valid email address should be provided by paymaart which should have domain name paymaart.net/ .com
    Once the admin enters the valid email address and password users logging in should be prompted to enter the generated code from their MFA(google authenticator) in addition to their password.
    The system should verify the entered MFA code for authentication.
    After a successful login, the admin will be redirected to the homepage.
    The scan QR code for MFA authentication should be shown only for the first-time login, later it is only the OTP to be received.

    Scenario Outline: Admin login with invalid credentials
        Given I am on the login screen
        When I enter the email address as <email_address> and password as <password>
        When I submit the login form
        Then I should read a message stating that <message>
        Examples:
            | email_address            | password   | message                   |
            | ""                       | "Test@123" | "This field is mandatory" |
            | "bharath.shet@7edge.com" | ""         | "This field is mandatory" |
            | "bharath.shet7edge.com"  | ""         | "Invalid email"           |
            | "bharath"                | "12345"    | "Invalid credentials"     |

    Scenario: Admin User login with valid credentials
        Given I am on the login screen
        When I enter the email address as "bharath.shet+admin@7edge.com" and password as "Admin@123"
        Then I submit the login form
        Then I should be presented with the authenticator QR Code

    Scenario: Admin User login for the first time
        Given I am presented with the authenticator QR Code
        When I click on the proceed to authenticate button
        Then I should be navigated to the TOTP screen
        And I click on the scan QR code again
        Then I should be presented with the authenticator QR Code
        When I scan the QR code
        And I click on the proceed to authenticate button
        Then I should be navigated to the TOTP screen

    Scenario Outline: Admin User enters invalid TOTP
        Given I am on the TOTP screen
        When I enter TOTP as <TOTP>
        And I submit the TOTP form
        Then I should read a message stating that <message>
        Examples:
            | TOTP     | message        |
            | "0"      | "Invalid code" |
            | "111111" | "Invalid code" |

    Scenario: Admin User enters valid TOTP
        Given I am on the TOTP screen
        When I enter a valid TOTP
        And I submit the TOTP form
        Then I should be redirected to the '/dashboard' page

    @perform_logout @wait
    Scenario: Admin User login with valid credentials for the second time using email
        Given I am on the login screen
        When I enter the email address as "bharath.shet+admin@7edge.com" and password as "Admin@123"
        And I submit the login form
        Then I should be navigated to the TOTP screen
        When I enter the TOTP obtained from the previously scanned device
        And I submit the TOTP form
        Then I should be redirected to the '/dashboard' page