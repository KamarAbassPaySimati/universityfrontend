@1.1
Feature: Paymaart -Admin Web - Forgot Password
    As an Super/finance/support/admin, I want an option to update the password so that I can secure my account.
    Conditions of Satisfaction:
    user should be given an option Update Password
    Users should have fields to enter Current Password, new Password and Confirm Password.
    Users must be provided with guidance on choosing a strong and secure Password during the reset process.
    Users should receive an error message upon incorrect Old Password entry
    The system should throw an error if New Password and Confirm Password does not match
    After successfully updating the Password, the system should provide a confirmation message. and user should be redirected to the Login screen
    Information to be displayed:
    PAYMAART PASSWORD RULES
    Length:
    a. 8-12 characters (minimum and maximum, respectively)
    Mix of characters:
    a. Mix of uppercase letters, lowercase letters, numbers, and special characters.
    Spaces and punctuation marks:
    a. No spaces allowed
    b. No punctuation marks (such as stop, exclamation/question marks) allowed
    Personal Informa?on:
    a. Exclude easily guessed information such as your name, birthdate, or common words.
    Common Patterns:
    a. Exclude simple patterns like 12345678, 22446688, password, or sequential
    keyboard patterns like qwerty
    Randomness:
    a. Require random combinations of characters.

    Scenario: Admin Login
        Given I am on the login screen
        When I enter the email address as "bharath.shet+admin@7edge.com" and password as "Admin@123"
        And I submit the login form
        Then I should be navigated to the TOTP screen
        When I enter the TOTP obtained from the previously scanned device
        And I submit the TOTP form
        Then I should be redirected to the '/dashboard' page

    Scenario Outline: Passwords do not match
        Given I navigate to update password page
        When I enter current password as <current_password>
        When I enter new password as <new_password> and confirm password as <confirm_password>
        When I submit the update password form
        Then I should read a message stating that <message>
        Examples:
            | current_password | new_password  | confirm_password | message                                            |
            | "Admin@123"      | "Admin@123"   | "Admin@123"      | "Old password and new password cannot be the same" |
            | "Admin!1234"     | "Admin@1235"  | "Admin@1235"     | "Incorrect Password"                               |
            | "Admin@123"      | "Admin@12354" | "Admin@12431"    | "Password does not match"                          |

    Scenario: Check for password requirement
        Given I navigate to update password page
        When I enter current password as <current_password>
        When I enter new password as <password> and confirm password as <confirm_password>
        When I submit the update password form
        Then I should read a message stating that <message>
        Examples:
            | current_password | password      | confirm_password | message                        |
            | "Admin@123"      | "abcpassword" | "abcpassword"    | "Password criteria is not met" |
            | "Admin@123"      | "1"           | "1"              | "Password criteria is not met" |
            | "Admin@123"      | "c"           | "c"              | "Password criteria is not met" |
            | "Admin@123"      | "@"           | "@"              | "Password criteria is not met" |
            | "Admin@123"      | "bharath@"    | "bharath@"       | "Password criteria is not met" |
            | "Admin@123"      | "B"           | "B"              | "Password criteria is not met" |
            | "Admin@123"      | "Ba"          | "Ba"             | "Password criteria is not met" |
            | "Admin@123"      | "Ba1"         | "Ba1"            | "Password criteria is not met" |
            | "Admin@123"      | "Pass!1"      | "Pass!1"         | "Password criteria is not met" |

    Scenario: Set New Password with valid information
        Given I navigate to update password page
        When I enter current password as "Admin@123"
        When I enter new password as "Admin@12354" and confirm password as "Admin@12354"
        And I submit the update password form
        Then I should read a message stating that "Your password has been updated successfully"
        Then I should be redirected to login

    Scenario: Admin User login with valid credentials after reseting password
        Given I am on the login screen
        When I enter the email address as "bharath.shet+admin@7edge.com" and password as "Admin@12354"
        And I submit the login form
        Then I should be navigated to the TOTP screen
        When I enter the TOTP obtained from the previously scanned device
        And I submit the TOTP form
        Then I should be redirected to the '/dashboard' page

    Scenario: Set password to previous password
        Given I navigate to update password page
        When I enter current password as "Admin@12354"
        When I enter new password as "Admin@123" and confirm password as "Admin@123"
        And I submit the update password form
        Then I should read a message stating that "Your password has been updated successfully"
        Then I should be redirected to login
    