Feature: Paymaart - Admin Web - Specific View G2P Customer
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
      # When I click on view excel sheet overview
      # Then I should view a viewer modal of excel sheet
      # When I click on close image viewer 
      # Then I should see the image viewer modal of excel sheet getting closed

# Scenario: Admin deleting a specific excel sheet
#     Given I navigate to G2P customer listing page
#       When I click on the view button for customer details
#       Then I should view G2P customer details
#       Then I should see table header containing '["Sheet Name","Uploaded  Date","Uploaded By","Transferred Amount"]'
#       When I click on the delete sheet button
#       Then I should see a confirmation prompt for deleting excel sheet
#       When I click on confirm button
#       Then I should read a message stating that "Sheet deleted successfully"

Scenario: Checking Pagination
      Given I navigate to G2P customer listing page
      When I click on paginate next page
      Then I should be navigated to page 2
      When I click on paginate to previous page
      Then I should be navigated to page 1
      