Feature: Paymaart- Admin Web- Onboard Agent- Simplified KYC
    As an Super/support/admin, I want the ability to onboard new agents and complete Simplified KYC for Malawi agent
    Conditions of Satisfaction
    Clear instructions and guidance should be provided on the required documents and in which format.
    There should be an option to select whether a user is Malawi 
    If user is a Malawi then user should be having the option to select as Personal or as Business agent
    If user is a Personal user there should be an option to select Simplified KYC 
    5.The business user is an upcoming feature which needs to be shown with tag as coming soon
    Agent should be able to upload relevant documents, such as Location details ID details and Personal details, during the onboarding process, according to their KYC selection.
    The platform should have a progress indicator to show agent how far users are in the onboarding process.
    A live selfie should be captured according to predefined rules during the onboarding process.
    Agents should be able to save their progress and return to complete the onboarding if necessary.
    Upon successful submission of details the request goes to the admin for verification.
    If there are any issues with the submission, clear instructions on what needs to be corrected should be provided by admin.
    Email and SMS notifications should be sent to agents at different stages of the onboarding process, such as confirmation of submission and approval/rejection.
    The user should be able to see the documents to be submitted on each screen as information
    The user should upload document in any of the mentioned formats such as .png,.jpg.jpeg.gif from phone documents or camera
    Users should be able to skip to the next screen if required or come back to the previous screen for any updates/changes.
    The location details to be fetched from Google API
    The user should mandatorily fill in street, town, and district under location details 
    The user should be able to upload the front and back of the document(multiple uploads)
    The user should be given the option to remove and reupload the documents.
    The system should show the user the path chosen in KYC selection such as for eg: Malawi Citizen>Personal agent>Simplified KYC
    There should be an option to enter the Banking information(optional)

    @add_admin_user
    @create_new_user_and_login
    Scenario: Onboard new agent and navigate to KYC verification
        Given I navigate to agent onboarding screen
        When I enter a valid first name for agent registration
        * I enter a valid middle name for agent registration
        * I enter a valid last name for agent registration
        * I enter a valid email address for agent registration
        * I enter a valid phone number for agent registration
        * I answer the security question one as "Answer1"
        * I answer the security question two as "Answer2"
        * I answer the security question three as "Answer3"
        * I answer the security question four as "Answer4"
        * I agree to the terms and conditions
        * I submit the agent registration form
        Then I should read a message stating that "Please verify your email address"
        Then I should read a message stating that "Please verify your phone number"
        When I click on verify email address
        Then I should read a message stating that "Verification code has been sent to agent’s email. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I click on verify phone number
        Then I should read a message stating that "Verification code has been sent to agent’s phone number. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify phone number button text changed to "VERIFIED"
        When I submit the agent registration form
        Then I should read a message stating registration successfully

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
        When I select the ID document as "Drivers licence"
        And I upload the front image of document as <image_front>
        Then I should read a message stating that <message>
        And I upload the back image of document as <image_back>
        Then I should read a message stating that <message>
        Examples:
            | image_front       | image_back        | message                                                   |
            | "15MBImage.jpg"   | "15MBImage.jpg"   | "Upload failed. Unsupported format or file size exceeded" |
            | "10_MB_DOCX.docx" | "10_MB_DOCX.docx" | "Upload failed. Unsupported format or file size exceeded" |

    Scenario: Upload valid ID document details
        Given I am in KYC identity document details screen
        When I select the ID document as "Drivers licence"
        And I upload the front image of document as "document_front.png"
        And I upload the back image of document as "document_back.png"
        Then I should be able to view the preview of the document front and back
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

    Scenario: Upload verification document with invalid details
        Given I am in KYC identity document details screen
        When I click on verification documents tab
        When I select the verification document as "Employer letter"
        And I upload the front image of document as <image_front>
        Then I should read a message stating that <message>
        Examples:
            | image_front       | message                                                   |
            | "15MBImage.jpg"   | "Upload failed. Unsupported format or file size exceeded" |
            | "10_MB_DOCX.docx" | "Upload failed. Unsupported format or file size exceeded" |

    Scenario: Upload valid ID document details
        Given I am in KYC identity document details screen
        When I click on verification documents tab
        When I select the verification document as "Employer letter"
        And I upload the front image of document as "document_front.png"
        Then I should be able to view the preview of the document front
        When I click on view document front preview
        Then I should view the preview of the uploaded document

    Scenario: Navigate to personal details screen
        Given I am in KYC identity document details screen
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