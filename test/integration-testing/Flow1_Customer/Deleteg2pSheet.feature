Feature: Paymaart - Admin Web - Delete G2P Sheet
    As a Super/finance,I want the capability to distribute payments to multiple users in one bulk transfer,So that I can efficiently manage G2P (Government-to-Person) services and disburse funds to a group of recipients.
    Conditions of satisfaction
    There should be an option to upload a excel sheet that includes Paymaart ID(if any), Name, Phone number, and Amount
    If the G2P amount and Excel sheet summed-up amount do not match, there should be an error thrown
    After the successful credit of G2P amount to the mentioned users(customer,merchant, agent,admin, unregistered user), the relevance G2P credited e-money to be deducted from the capital account.
    There should be an option to upload and save the draft.
    There should be an option to save the records of the previously transacted Excel sheet.
    The number of lines is restricted to 100.
    There should be an option to delete the existing excel saved sheet.

  @get_customer_completed_kyc_list
  Scenario: Add transaction for trust bank with valid details for Pay-in by G2P Customer to PTBA1 | RMcredit
    Given I navigate to banks listing
    When I click on view button for bank details
    When I click on add trust bank transaction
    When I select the transaction type as "Pay-in by G2P Customer to PTBA1 | RMcredit"
    When I enter valid customer paymaart ID
    When I enter the transaction amount as "10000" for trust bank transaction
    When I should see the entry by field should be disabled for add trust bank transaction
    When I enter the valid transaction POP Ref.No
    When I upload the transaction POP document as "document_back.png"
    When I submit the add trust bank transaction form
    Then I should read a message stating that "Transaction details added successfully"

  Scenario: Admin deleting a specific excel sheet
    Given I navigate to G2P customer listing page
    When I click on the view button for customer details
    Then I should view G2P customer details
    When I upload the valid excel sheet as "ValidSheetIntegration.xlsx"
    And I should read a message stating that "Successfully Uploaded G2P sheet"
    Then I should see table header containing '["File Name","Uploaded Date, CAT","Uploaded By","Transferred Amount"]'
    When I click on the delete sheet button
    Then I should see a confirmation prompt for deleting excel sheet
    When I click on confirm button
    Then I should read a message stating that "Sheet deleted successfully"
