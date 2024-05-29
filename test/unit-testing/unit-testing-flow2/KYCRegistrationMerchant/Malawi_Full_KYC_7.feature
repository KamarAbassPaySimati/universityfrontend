Feature: Paymaart - Admin Web - Onboard Merchant (Malawi Full KYC)
    As an Super/support/admin, I want the ability to onboard new Merchants KYC Registartion for Malawi Full
    Conditions of Satisfaction
    KYC steps
    Clear instructions and guidance should be provided on what documents are required and in which format. 2.There should be an option to select whether an user is Malawi citizen
    If user is a Malawi then user should be having the option to select as Personal or as Business customer
    If user is a Personal customer there should be an option to select Full KYC
    5.The business Customer is an upcoming feature which needs to be shown with tag as coming soon
    Agents should be able to upload relevant documents, such as Location details ID details Business details , trading details(optional)and Personal details, during the onboarding process for merchants, according to their KYC selection.
    if the trading name is already existing there should be an error message.
    The platform should have a progress indicator to show agents how far users are in the onboarding process. 5. A live selfie should be captured according to predefined rules during the onboarding process.
    Agents should be able to save merchants KYC progress and return to complete the onboarding if necessary.
    Upon successful submission of details the request goes to the admin for verification.
    If there are any issues with the submission, clear instructions on what needs to be corrected should be provided by admin.
    Email and SMS notifications should be sent to merchants at different stages of the onboarding process, such as confirmation of submission and approval/rejection.
    10. The user should be able to see the documents to be submitted on each screen as information
    11.The user should upload document in any of the mentioned formats such as .png,.jpg.jpeg from documents
    12.Users should be able to skip to the next screen if required or come back to previous screen for any updates/changes.
    13. The location details to be fetched from Google APIs.
    14. The user should mandatorily fill in street, town, and district under location details
    15. The user should be able to upload the front and back of the document(multiple uploads)
    16. User should be given the option to remove and reupload the documents.
    17.The system should show the user's the path chosen in KYC selection such as for eg:Malawi Citizen>Personal Customer>SImplified KYC

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
        When I click on proceed button
        Then I should be redirected to KYC address details screen

    Scenario: Enter valid KYC Address details
        Given I am in KYC address details screen
        When I click on skip button
        Then I should be redirected to KYC identity details screen

    Scenario: Navigate to trading details screen
        Given I am in KYC identity document details screen
        When I click on skip button
        Then I should be redirected to KYC trading details screen

    Scenario: Navigate to personal details screen
        Given I am in KYC trading document details screen
        When I click on skip button
        Then I should be redirected to KYC personal details screen

    @delete_admin_account
    Scenario: KYC personal details with valid details
        Given I am in KYC personal details screen
        When I click on skip button
        Then I should read a message stating Complete registration
        And I should view the status of the KYC as "Not Started"