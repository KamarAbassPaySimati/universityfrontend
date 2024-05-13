Feature: Paymaart - Admin Web- Update Merchant details(full)
    As an Super/admin, I want the ability to update and modify the details of an merchant to keep their information accurate and up-to-date.

    Conditions of Satisfaction

    There should be an option to receive OTP when the admin tries to edit the merchant KYC.

    The 6-digit OTP to be sent to the registered SMS/email based on merchant membership.

    There should be an option to enter the OTP received

    4.There should be an option to resent the OTP(Max 3 attempts)
    5 Upon entering the valid OTP, the user will be navigated to edit KYC screen
    6.If the OTP invalid the error message need to be displayed
    7.If the merchant is has done simplified KYC ,then there should be an option to move from simplified to FULL KYC or continue with existing KYC
    8.Upon selecting existing KYC, There should be an option to view the sections of KYC, and edit the KYC based on section selected.
    9.The admin should be allowed to view the merchants' existing KYC details.
    10.Upon selecting FULL KYC, There should an option to update ID details and Income status.
    11. There should be an information about the KYC requirements on all the KYC screen
    12.Upon successfully updating the details, the request goes to admin as re-KYC request, and KYC status to changed as In progress
    
    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_merchant
    Scenario: Complete Merchant Malawi Full KYC
        Given I navigate to merchant KYC registration screen
        When I click on proceed button
        Then I should be redirected to KYC address details screen
        And I am in KYC address details screen
        When I enter street name as "M1"
        Then I should see the town and district field getting pre-filled with google API data
        When I click on save and continue button
        Then I should be redirected to KYC identity details screen
        When I select the ID document as "National ID"
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
        Then I should be redirected to KYC trading details screen
        Given I am in KYC trading document details screen
        When I enter trading street name as "M1"
        Then I should see the trading town and district field getting pre-filled with google API data
        When I select the trading types as "Hotels & Resorts"
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

    Scenario: View specific merchant KYC
        Given I navigate to merchant KYC listing screen
        When I search for recently created merchant
        When I click on view merchant KYC
        Then I should view merchant details
        Then I should view basic details of merchant KYC
        And I should view the identification details of merchant KYC
        And I should view the personal details of merchant KYC
        And I should view the trading details of merchant KYC

    Scenario: Navigate to update merchant KYC Screen, and Update
        Given I click on update "Update Merchant"
        Then I should view a modal asking for the OTP
        When I enter the OTP as "35598"
        And I click on submit TOTP form
        Then I should read a message stating that "Invalid code"
        When I enter the OTP as "355948"
        And I click on submit TOTP form
        Then I should be redirected to merchant basic details screen
        And I should view first name, middle name, last name is disabled
        When I click on save and continue button
        Then I should be redirected to KYC address details screen
        And I should view the street name, district, town are already prefilled
        When I click on save and continue button
        Then I should be redirected to KYC identity details screen
        Then I should be able to view the preview of the document front and back
        When I click on view document front preview
        Then I should view the preview of the uploaded document
        When I click on verification documents tab
        Then I should be able to view the preview of the document front and back
        When I click on view document front preview
        Then I should view the preview of the uploaded document
        Given I am in KYC identity document details screen
        When I click on save and continue button
        Then I should be redirected to KYC trading details screen
        Given I am in KYC trading document details screen
        When I should view the trading street name, district, town are already prefilled
        When I should see the trading types selected
        When I click on save and continue button
        Then I should be redirected to KYC personal details screen
        Given I am in KYC personal details screen
        When I select gender as "male"
        When I select the date of birth as "04-Aug-1999"
        When I should view the occupation field prefilled
        When I should view the monthly income and withdrawal prefilled
        When I click on save and continue button
        Then I should read a message stating that "Merchant details updated successfully"
