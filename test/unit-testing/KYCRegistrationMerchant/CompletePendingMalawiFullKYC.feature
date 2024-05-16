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
    @register_new_merchant
    Scenario: View specific merchant
        Given I navigate to merchant users listing screen
        When I search for recently created merchant
        When I click on view merchant
        Then I should view merchant information
        And I click on complete pending KYC
        Then I should be redirected to KYC verification screen

    Scenario: Navigate to KYC verification
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
        When I select the ID document as "National ID"
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
        When I select the ID document as "National ID"
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

    Scenario: Upload verification document
        Given I am in KYC identity document details screen
        When I click on verification documents tab
        When I select the verification document as "Drivers License"
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
        When I click on verification documents tab
        When I select the verification document as "Drivers License"
        And I upload the front image of document as "document_front.png"
        And I upload the back image of document as "document_back.png"
        Then I should be able to view the preview of the document front and back
        When I click on view document front preview
        Then I should view the preview of the uploaded document

    Scenario: Navigate to trading details screen
        Given I am in KYC identity document details screen
        When I click on save and continue button
        Then I should be redirected to KYC trading details screen

    Scenario: KYC tranding details with invalid details
        Given I am in KYC trading document details screen
        When I click on save and continue button
        Then I should read a message stating that "Required field"
        When I enter trading street name as "M1"
        Then I should see the trading town and district field getting pre-filled with google API data
        When I click on save and continue button
        Then I should read a message stating that "Required field"

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
        When I select valid monthly income and monthly withdrawal
        When I click on save and continue button
        Then I should read a message stating KYC submission successful
        And I should view the status of the KYC as "In review"