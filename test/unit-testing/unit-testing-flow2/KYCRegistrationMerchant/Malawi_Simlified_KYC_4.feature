Feature: Paymaart - Admin Web - Onboard Merchant(Malawi Simplified KYC)
    As an Super/support/admin, I want the ability to perform KYC Registration for Malawi Simplified new Merchant
    Conditions of Satisfaction
    Clear instructions and guidance should be provided on what documents are required and in which format
    There should be an option to select as user is Malawi or Non-Malawi citizen
    If user is a Malawi then user should be having the option to select as Personal or as Business merchant
    If user is a Personal merchant there should be an option to select Full KYC or Simplified KYC
    Merchants should be able to upload relevant documents, such as Location details ID details and Personal details, during the onboarding process, according to their KYC selection.
    The platform should have a progress indicator to show merchants how far users are in the onboarding process.
    A live selfie should be captured according to predefined rules during the onboarding process.
    Merchants should be able to save their progress and return to complete the onboarding if necessary.
    Upon successful submission of details the request goes to the admin for verification.
    If there are any issues with the submission, clear instructions on what needs to be corrected should be provided by admin.
    Email and SMS notifications should be sent to merchants at different stages of the onboarding process, such as confirmation of submission and approval/rejection.
    The user should be able to see the documents to be submitted on each screen as information
    The user should upload document in any of the mentioned formats such as .png,.jpg.jpeg.gif from phone documents or camera
    Users should be able to skip to the next screen if required or come back to previous screen for any updates/changes.
    The location details to be fetched from Google APIs.
    The user should mandatorily fill in street, town, and district under location details
    The user should be able to upload the front and back of the document(multiple uploads) 16. User should be given the option to remove and reupload the documents.
    The system should show the user's the path chosen in KYC selection such as for eg: Malawi Citizen>Personal Merchant>Simplified KYC

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    Scenario: Onboard merchant with valid details
        Given I navigate to merchant onboarding screen
        When I enter a valid first name for merchant registration
        * I enter a valid middle name for merchant registration
        * I enter a valid last name for merchant registration
        * I enter a valid email address for merchant registration
        * I enter a valid phone number for merchant registration
        * I answer the security question one as "Answer1"
        * I answer the security question two as "Answer2"
        * I answer the security question three as "Answer3"
        * I answer the security question four as "Answer4"
        * I agree to the terms and conditions
        * I submit the merchant registration form
        Then I should read a message stating that "Please verify your email address"
        Then I should read a message stating that "Please verify your phone number"
        When I click on verify email address
        Then I should read a message stating that "Verification code has been sent to merchant’s email. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I click on verify phone number
        Then I should read a message stating that "Verification code has been sent to merchant’s phone number. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify phone number button text changed to "VERIFIED"
        When I submit the merchant registration form
        Then I should read a message stating merchant registration successfully
        
    Scenario: Navigate to KYC verification
        Given I click on verify KYC
        Then I should be redirected to KYC verification screen
        When I select the citizenship type as "Malawi"
        And I select the KYC type as "Simlified"
        When I click on proceed button
        Then I should be redirected to KYC address details screen

    Scenario: Enter KYC Address details with invalid credentails
        Given I am in KYC address details screen
        When I click on save and continue button
        Then I should read a message stating that "Required field"

    Scenario: Enter valid KYC Address details
        Given I am in KYC address details screen
        When I enter street name as "M1"
        Then I should see the town and district field getting pre-filled with google API data
        When I click on save and continue button
        Then I should be redirected to KYC identity details screen

    Scenario: Upload invalid ID document details
        Given I am in KYC identity document details screen
        When I select the ID document as "Student ID"
        And I upload the front image of document as <image_front>
        Then I should read a message stating that <message>
        Examples:
            | image_front       | message                                                   |
            | "15MBImage.jpg"   | "Upload failed. Unsupported format or file size exceeded" |
            | "10_MB_DOCX.docx" | "Upload failed. Unsupported format or file size exceeded" |

    Scenario: Upload valid ID document details
        Given I am in KYC identity document details screen
        When I select the ID document as "Student ID"
        And I upload the front image of document as "document_front.png"
        Then I should be able to view the preview of the document front
        When I click on view document front preview
        Then I should view the preview of the uploaded document

    Scenario: Capture selfie
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

    Scenario: Upload valid ID document details
        Given I am in KYC identity document details screen
        When I click on verification documents tab
        When I select the verification document as "Employer letter"
        And I upload the front image of document as "document_front.png"
        Then I should be able to view the preview of the document front
        When I click on view document front preview
        Then I should view the preview of the uploaded document

    Scenario: Navigate to trading details screen
        Given I am in KYC identity document details screen
        When I click on save and continue button
        Then I should be redirected to KYC trading details screen

    Scenario: KYC tranding details with valid details
        Given I am in KYC trading document details screen
        When I enter trading street name as "M1"
        Then I should see the trading town and district field getting pre-filled with google API data
        When I select the trading types as "Hotels & Resorts"
        When I click on save and continue button
        Then I should be redirected to KYC personal details screen

    Scenario: KYC personal details with invalid details
        Given I am in KYC personal details screen
        When I click on save and continue button
        Then I should read a message stating that "Required field"

    @delete_admin_account
    Scenario: KYC personal details with invalid details
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