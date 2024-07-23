Feature: Paymaart - Admin Web - Update Customer Details(Simplified to Full)
    As a Super/Admin, I want an option to Update Customer to FULL KYC

    Conditions of Satisfaction

    If the user selects the Full KYC option , only the ID details and Income section should be displayed to add details, and upload documents, the remaining fields should be auto-filed by the system and editable.

    Upon successfully performing the updation of the user KYC, it should be submitted to the admin for verification.

    This option is enable only if simplified KYC is approved

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_customer
    Scenario: Complete Customer Malawi Simplified KYC
        Given I navigate to customer KYC registration screen
        When I select the citizenship type as "Malawi"
        And I select the KYC type as "Simlified"
        When I click on proceed button
        Then I should be redirected to KYC address details screen
        And I am in KYC address details screen
        When I enter street name as "M1"
        Then I should see the town and district field getting pre-filled with google API data
        When I click on save and continue button
        Then I should be redirected to KYC identity details screen
        When I select the ID document as "Drivers licence"
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
        When I select the verification document as "Employer letter"
        And I upload the front image of document as "document_front.png"
        Then I should be able to view the preview of the document front
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
        When I should view monthly income and monthly withdrawal selected as "Up to 300,000.00 MWK"
        When I click on save and continue button
        Then I should read a message stating KYC submission successful
        And I should view the status of the KYC as "In review"

    # @perform_logout
    # @add_admin_user
    # @create_new_user_and_login
    # Scenario: Search and update customer
    #     Given I navigate to customer KYC listing screen
    #     When I search for recently created customer
    #     When I click on view customer KYC
    #     Then I should view customer details
    #     Then I should view basic details of customer KYC
    #     And I should view the identification details of customer KYC
    #     And I should view the personal details of customer KYC
    #     * I click on approve "Customer KYC"
    #     Then I should see a confirmation prompt for approving "Customer KYC"
    #     When I click on confirm button
    #     Then I should read a message stating that "KYC approved successfully"
    #     And I should see the KYC status changed to "Completed"
    #     Given I navigate to customer users listing screen
    #     When I search for recently created customer
    #     When I click on update "Customer From Listing"
    #     Then I should view a modal asking for the OTP
    #     When I enter the OTP as "355948" for update KYC
    #     And I click on submit TOTP form
    #     Then I should be redirected to customer basic details screen
    #     And I should view first name, middle name, last name is disabled
    #     When I upload the customer profile picture as "profile.png"
    #     When I click on save and continue button
    #             Then I click on edit simplified KYC
    #     Then I should be redirected to KYC address details screen
    #             And I should view the street name, district, town are already prefilled
    #     When I click on save and continue button
    #     Then I should be redirected to KYC identity details screen
    #     Then I should be able to view the preview of the document front and back
    #     When I click on view document front preview
    #     Then I should view the preview of the uploaded document
    #     When I click on verification documents tab
    #     When I select the verification document as "Religious Institution/ District Commissioner Letter"
    #     And I upload the front image of document as "document_front.png"
    #     Then I should be able to view the preview of the document front
    #     When I click on view document front preview
    #     Then I should view the preview of the uploaded document
    #     Given I am in KYC identity document details screen
    #     When I click on save and continue button
    #     Then I should be redirected to KYC personal details screen
    #     Given I am in KYC personal details screen
    #     When I enter the OTP as "355948" for update KYC
    #     And I click on submit TOTP form
    #     When I select gender as "male"
    #     When I select the date of birth as "04-Aug-1999"
    #     When I should view the occupation field prefilled
    #     When I should view the monthly income and withdrawal prefilled with value "Up to 300,000.00 MWK"
    #     When I click on save and continue button
    #     Then I should read a message stating that "Customer details updated successfully"

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    Scenario: Navigate to update customer KYC Screen, and Upgrade the simplified KYC to Full when it is approved by the Admin
        Given I navigate to customer KYC listing screen
        When I search for recently created customer
        When I click on view customer KYC
        Then I should view customer details
        Then I should view basic details of customer KYC
        And I should view the identification details of customer KYC
        And I should view the personal details of customer KYC
        * I click on approve "Customer KYC"
        Then I should see a confirmation prompt for approving "Customer KYC"
        When I click on confirm button
        Then I should read a message stating that "KYC approved successfully"
        And I should see the KYC status changed to "Completed"
        Given I navigate to customer users listing screen
        When I search for recently created customer
        When I click on update "Customer From Listing"
        Then I should view a modal asking for the OTP
        When I enter the OTP as "355948" for update KYC
        And I click on submit TOTP form
        Then I should be redirected to customer basic details screen
        And I should view first name, middle name, last name is disabled
        When I click on save and continue button
        Then I click on upgrade to full KYC
        Then I should be redirected to KYC address details screen
        And I should view the KYC status changed to "Malawi Full KYC"
        And I should view the street name, district, town are already prefilled
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
        Then I should be redirected to KYC personal details screen
        Given I am in KYC personal details screen
        When I enter the OTP as "355948" for update KYC
        And I click on submit TOTP form
        When I select valid monthly income and monthly withdrawal
        When I click on save and continue button
        Then I should read a message stating that "Customer details updated successfully"