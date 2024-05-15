Feature: Paymaart - Admin Web - Update Existing Agent details(Non-Malawi KYC)
    As an Super/admin, I want the ability to update and modify the details of an agent to keep their information accurate and up-to-date.

    Conditions of Satisfaction

    There should be an option to receive OTP when the admin tries to edit the agent KYC.

    The 6-digit OTP is to be sent to the registered SMS/email for an agent.

    There should be an option to enter the OTP received

    There should be an option to resent the OTP(Max 3 attempts)

    Upon entering the valid OTP, the user will be navigated to edit the KYC screen
    If the OTP is invalid the error message needs to be displayed

    Upon selecting the existing KYC, There should be an option to view and edit the KYC based on section selected.
    If any section is changed/edited the old values needs to be removed and new details should be added, upon admin confirming the approval on changes, those changes will be reflecting on the user KYC details.
    There should be information about the KYC requirements on all the KYC screen
    Upon successfully updating the details, the request goes to admin as a re-KYC request, and the KYC status to changed to In progress

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_agent
    Scenario: Complete Agent Non Malawi Full KYC
        Given I navigate to agent KYC registration screen
        When I select the citizenship type as "Non-Malawi"
        And I select the KYC type as "Full KYC"
        When I click on proceed button
        Then I should be redirected to KYC address details screen
        And I am in KYC address details screen
        When I enter street name as "M1"
        When I select the Nationality
        Then I should see the town and district field getting pre-filled with google API data
        When I click on save and continue button
        Then I should be redirected to KYC identity details screen
        When I select the ID document as "Passport"
        When I select the nature of permit as "Single/Multiple entry visa"
        And I enter the reference number as "8379128393"
        And I upload the front image of document as "document_front.png"
        And I upload the back image of document as "document_back.png"
        Then I should be able to view the preview of the document front and back
        When I click on view document front preview
        Then I should view the preview of the uploaded document
        Given I am in KYC identity document details screen
        When I click on capture
        Then I should view the selfie capture modal
        When I click on capture selfie
        Then I should view re-capture or submit button
        When I click on re-capture button
        Then I should view selfie capture again
        And I click on capture selfie
        And I click on selfie looks good button
        Then I should view the image getting captured
        Given I am in KYC identity document details screen
        When I click on verification documents tab
        When I select the verification document as "Drivers licence"
        And I upload the front image of document as "document_front.png"
        And I upload the back image of document as "document_back.png"
        Then I should be able to view the preview of the document front and back
        When I click on view document front preview
        Then I should view the preview of the uploaded document
        Given I am in KYC identity document details screen
        When I click on save and continue button
        Then I should be redirected to KYC personal details screen
        Given I am in KYC personal details screen
        When I select gender as "male"
        When I select the date of birth as "04-Aug-1999"
        When I select the Occupation as "In Full time education"
        When I search and select institution as "Other"
        And I enter the other institution name as "BDD institute"
        When I select the applicable purpose and nature of business
        When I select valid monthly income and monthly withdrawal
        When I click on save and continue button
        Then I should read a message stating KYC submission successful
        And I should view the status of the KYC as "In review"
    
    Scenario: View specific agent
        Given I navigate to agent users listing screen
        When I search for recently created agent
        When I click on view agent
        Then I should view agent information
        Then I should view basic details of agent
        And I should view the identification details of agent
        And I should view the personal details of agent
        And I should view option to activate or update a agent

    Scenario: Navigate to update agent KYC Screen, and Update
        Given I click on update "Update Agent"
        Then I should view a modal asking for the OTP
        When I enter the OTP as "355948"
        And I click on submit TOTP form
        Then I should be redirected to agent basic details screen
        And I should view first name, middle name, last name is disabled
        When I click on save and continue button
        Then I should be redirected to KYC address details screen
        And I should view the street name, district, town are already prefilled
        When I click on save and continue button
        Then I should be redirected to KYC identity details screen
        When I select the ID document as "Refugee ID"
        And I upload the front image of document as "document_front.png"
        Then I should be able to view the preview of the document front
        When I click on view document front preview
        Then I should view the preview of the uploaded document
        When I click on verification documents tab
        When I select the verification document as "Employer letter"
        And I upload the front image of document as "document_front.png"
        Then I should be able to view the preview of the document front
        When I click on view document front preview
        Then I should view the preview of the uploaded document
        Given I am in KYC identity document details screen
        When I click on save and continue button
        Then I should be redirected to KYC personal details screen
        Given I am in KYC personal details screen
        When I enter the OTP as "355948"
        And I click on submit TOTP form
        When I select gender as "male"
        When I select the date of birth as "04-Aug-1999"
        When I should view the occupation field prefilled
        When I should view the monthly income and withdrawal prefilled
        When I click on save and continue button
        Then I should read a message stating that "Agent details updated successfully"
