@1.1
Feature: Paymaart - Admin Web - Onboard Admin
  As a super admin, I want an option to onboard admin/super admin/finance admin/support admin users to the platform so that they can log in and use the application.
  Conditions of Satisfaction
  There should be an option to add Admin/Super admin/finance/support admin Name, Email, Phone number
  There should be an option to select the access privilege/role from the predefined list.
  An email to be sent to the added user.
  Information to be displayed
  Role: Support  admin
  Finance admin
  Super admin
  Admin

  @perform_logout
  @wait
  Scenario: Finance Admin User login with valid credentials and validate access permission for register admin
    Given I am on the login screen
    When I enter the email address as "bharath.shet+finance_admin@7edge.com" and password as "Admin@123"
    And I submit the login form
    Then I should be navigated to the TOTP screen
    When I enter the TOTP obtained from the previously scanned device
    And I submit the TOTP form
    Then I should be redirected to the '/dashboard' page
    When I navigate to onboard admin user
    Then I should view "404" page not found screen

  Scenario: View Admin Profile as admin finance admin
    Given I navigate to admin users listing screen
    Then I should see view admin users button is hidden

  @perform_logout
  @wait
  Scenario: Support Admin User login with valid credentials and validate access permission for register admin
    Given I am on the login screen
    When I enter the email address as "bharath.shet+support_admin@7edge.com" and password as "Admin@123"
    And I submit the login form
    Then I should be navigated to the TOTP screen
    When I enter the TOTP obtained from the previously scanned device
    And I submit the TOTP form
    Then I should be redirected to the '/dashboard' page
    When I navigate to onboard admin user
    Then I should view "404" page not found screen

  Scenario: View Admin Profile as support admin
    Given I navigate to admin users listing screen
    Then I should see view admin users button is hidden

  @perform_logout
  @wait
  Scenario: Admin User login with valid credentials and validate access permission for register admin
    Given I am on the login screen
    When I enter the email address as "bharath.shet+normal_admin@7edge.com" and password as "Admin@123"
    And I submit the login form
    Then I should be navigated to the TOTP screen
    When I enter the TOTP obtained from the previously scanned device
    And I submit the TOTP form
    Then I should be redirected to the '/dashboard' page
    When I navigate to onboard admin user
    Then I should view "404" page not found screen

  Scenario: View Admin Profile as admin
    Given I navigate to admin users listing screen
    Then I should see view admin users button is hidden

  @perform_logout
  @wait
  Scenario: Super Admin User login with valid credentials
    Given I am on the login screen
    When I enter the email address as "bharath.shet+super_admin@7edge.com" and password as "Admin@123"
    And I submit the login form
    Then I should be navigated to the TOTP screen
    When I enter the TOTP obtained from the previously scanned device
    And I submit the TOTP form
    Then I should be redirected to the '/dashboard' page

  Scenario: Add admin users with invalid credentials
    Given I navigate to onboard admin user
    When I enter first name as <first_name> for admin onboarding
    When I enter middle name as <middle_name> for admin onboarding
    When I enter last name as <last_name> for admin onboarding
    When I enter email address as <email> for admin onboarding
    When I enter phone number as <phone_number> for admin onboarding
    When I select the role as <role>
    When I submit the onboard admin form
    Then I should read a message stating that <message>

    Examples:
      | first_name | middle_name | last_name | email                    | phone_number | role          | message                |
      | ""         | "D"         | "Shet"    | "bharath.shet@7edge.com" | "9741292993" | "Super Admin" | "Required field"       |
      | "Bharath"  | ""          | "Shet"    | "bharath.shet@7edge.com" | "9741292993" | "Super Admin" | "Required field"       |
      | "Bharath"  | "D"         | ""        | "bharath.shet@7edge.com" | "9741292993" | "Super Admin" | "Required field"       |
      | "Bharath"  | "D"         | "Shet"    | ""                       | "9741292993" | "Super Admin" | "Required field"       |
      | "Bharath"  | "D"         | "Shet"    | "bharath.shet@7edge.com" | ""           | "Super Admin" | "Required field"       |
      | "Bharath"  | "D"         | "Shet"    | "bharath.shet@7edge.com" | "97412929"   | "Super Admin" | "Invalid phone number" |
      | "Bharath"  | "D"         | "Shet"    | "bharath.shet7edge.com"  | "9741292994" | "Super Admin" | "Invalid email"        |

  @add_admin_user
  @delete_admin_account
  Scenario: Validate onboarding admin with already existing email address
    Given I navigate to onboard admin user
    When I enter valid basic details for admin onboarding
    When I enter already existing <field>
    When I select the role as <role>
    When I submit the onboard admin form
    Then I should read a message stating that <message>

    Examples:
      | field          | role          | message                       |
      | "Email"        | "Super admin" | "Email already exists"        |
      | "Phone Number" | "Super admin" | "Phone number already exists" |

  Scenario Outline: Onboard admin with different roles
    Given I navigate to onboard admin user
    When I enter valid basic details for admin onboarding
    When I enter valid email address for admin onboarding
    When I enter valid phone number for admin onboarding
    When I select the role as <role>
    When I submit the onboard admin form
    Then I should read a message stating that <message>

    Examples:
      | role            | message                                 |
      | "Super admin"   | "Super admin registered successfully"   |
      | "Admin"         | "Admin registered successfully"         |
      | "Finance admin" | "Finance admin registered successfully" |
      | "Support admin" | "Support admin registered successfully" |