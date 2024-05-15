Feature: Paymaart - Admin Web - View Specific Merchant details(simplfied kyc)
    As an Super/admin, I want to access comprehensive details of a specific merchant

    Conditions of Satisfaction

    1.There should an option to view the see the profile picture,Paymaart ID, Paymaart Name,Trading Name,Till Number,Location,and KYC status and type

    There should be an option to Edit the KYC or Complete the KYC

    3.If the KYC is completed ,the complete KYC section should not be visible, only Edit option to be present.

    Information to be displayed:

    All information of KYC and registartion

    KYC type :

    a.Full KYC
    b.Simplified KYC

    KYC status

    2a.Not started if KYC verification is not started.
    2b.Inprogress if the KYC verification is in progress.
    2c. Completed if the KYC verification is completed and successful.
    2d. “Further information required” if the KYC verification has been reviewed and rejected.

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_merchant
    Scenario: Complete Merchant Non-Malawi Full KYC
        Given I navigate to merchant KYC registration screen
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

    @delete_admin_account
    Scenario: View specific merchant KYC
        Given I navigate to merchant users listing screen
        When I search for recently created merchant
        When I click on view merchant
        Then I should view merchant information
        Then I should view basic details of merchant
        And I should view the identification details of merchant KYC
        And I should view the personal details of merchant KYC
        And I should view the trading details of merchant KYC
        And I should view option to activate or update a merchant
        And I should view the KYC status as "In-Progress"
        And I should view the KYC type as "Full KYC, Non-Malawi citizen"