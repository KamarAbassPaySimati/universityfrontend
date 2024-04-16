Feature: Paymaart -Admin Web - Add Trust Bank
    As a Super/admin/finance I want to add the Paymaart Trust bank account so that I can manage the real money inflow
    Conditions of Satisfaction
    There should be an option to add bank name from the pre-defined list, bank account number, bank account purpose(optional)
    There should be a maximum of three trust bank accounts added.
    There should be an option to enter the bank account purpose within the 100characters
    Information to be displayed
    Paymaart List Name
    CDH Investment Bank
    Ecobank
    FDH Bank
    First Capital Bank
    National Bank
    NBS Bank
    Standard Bank
    Centenary Bank

    @perform_logout
    @wait
    @add_admin_user
    @create_new_user_and_login
    Scenario: Login as super admin and navigate to add trust banks
        Given I navigate to banks listing
        Then I should view all the trust banks
        When I click on add new trust bank
        Then I should be redirected to add new trust bank screen

    Scenario Outline: Login as super admin and navigate to add trust banks
        Given I navigate to onboard trust bank
        When I select valid bank ref no.
        When I select bank name as <bank_name>
        When I enter bank account number as <bank_account_number>
        When I submit the onboard bank form
        Then I should read a message stating that <message>
        Examples:
            | bank_name | bank_account_number | message          |
            | ""        | "BNK7421993004"     | "Required field" |
            | ""        | ""                  | "Required field" |

    @delete_trust_bank
    @delete_admin_account
    Scenario: Add bank with valid details
        Given I navigate to onboard trust bank
        When I select valid bank ref no.
        When I select bank name as "FDH Bank"
        When I enter valid bank account number
        When I submit the onboard bank form
        Then I should read a message stating that "Trust bank added successfully"