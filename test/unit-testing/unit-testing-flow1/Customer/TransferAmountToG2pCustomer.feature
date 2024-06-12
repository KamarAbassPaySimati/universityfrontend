Feature: Paymaart - Admin Web - Transfer amount to G2P Customer
    As a Super/finance,I want the capability to distribute payments to multiple users in one bulk transfer,So that I can efficiently manage G2P (Government-to-Person) services and disburse funds to a group of recipients.
    Conditions of satisfaction
    There should be an option to upload a excel sheet that includes Paymaart ID(if any), Name, Phone number, and Amount
    If the G2P amount and Excel sheet summed-up amount do not match, there should be an error thrown
    After the successful credit of G2P amount to the mentioned users(customer,merchant, agent,admin, unregistered user), the relevance G2P credited e-money to be deducted from the capital account.
    There should be an option to upload and save the draft.
    There should be an option to save the records of the previously transacted Excel sheet.
    The number of lines is restricted to 100.
    There should be an option to delete the existing excel saved sheet.

    @add_admin_user
@create_new_user_and_login
Scenario: View list all G2P customers
      Given I navigate to G2P customer listing page
      Then I should see table header containing '["G2P Customer Name","Paymaart ID","Created Date","Amount"]'
      
Scenario: View G2P customer details screen
      Given I navigate to G2P customer listing page
      When I click on the view button for customer details
      Then I should view G2P customer details
      Then I should see table header containing '["Sheet Name","Uploaded Date","Uploaded By","Transferred Amount"]'
      When I click on transfer amount button
      Then I should see a confirmation prompt to execute payment
      When I click on confirm button for transfer
      And I should read a message stating "Sheet transferred successfully" for transfer
