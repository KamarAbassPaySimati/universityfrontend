Feature: Paymaart - Admin Web - View Specific Customer details(Non-Malawi full kyc)
    As an Super/admin,I want an option to view the details of a customer so that I can know about the customer.

    Conditions of Satisfaction

    1.There should an option to view the see the profile picture,Paymaart ID, Paymaart Name,Phone number,and KYC status and type
    2.Phone number to be viewed if the search is made using phone number,else user phon enumber to be masked

    There should be an option to Edit the KYC or Complete the KYC

    3.If the KYC is completed ,the complete KYC section should not be visible, only Edit option to be present.

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_customer
    Scenario: Complete Customer Non-Malawi Full KYC
        Given I navigate to customer KYC registration screen
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

    @delete_admin_account
    Scenario: View specific customer KYC
        Given I navigate to customer users listing screen
        When I search for recently created customer
        When I click on view customer
        Then I should view customer information
        Then I should view basic details of customer
        And I should view the identification details of customer KYC
        And I should view the personal details of customer KYC
        And I should view option to activate or update a customer
        And I should view the KYC status as "In-Progress"
        And I should view the KYC type as "Full KYC, Non-Malawi citizen"