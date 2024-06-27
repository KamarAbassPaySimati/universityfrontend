Feature: Paymaart - Admin Web - Completed Agent Pending KYC
    As an Super/admin, I want the ability to Complete Pending KYC details of a agent to keep their information accurate and up-to-date.
    Conditions of Satisfaction
    The user should be navigated to the screen where the user has the pending update to be completed.
    There should be an option to view the information on the KYC requirements
    there should be an option to skip the screen.
    The user should fill all the information in the selected section, partially filled information is not captured.
    Upon filling in all the KYC details, the request goes to admin.

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_agent
    Scenario: View specific agent KYC
        Given I navigate to agent users listing screen
        When I search for recently created agent
        When I click on view agent
        Then I should view agent information
        And I click on complete pending KYC
        Then I should be redirected to KYC verification screen

    Scenario: Navigate to KYC verification
        When I select the citizenship type as "Non-Malawi"
        And I select the KYC type as "Full KYC"
        When I click on proceed button
        Then I should be redirected to KYC address details screen

    Scenario: Enter KYC Address details with invalid credentails
        Given I am in KYC address details screen
        When I click on save and continue button
        Then I should read a message stating that "Required field"

    Scenario: Enter valid KYC Address details
        Given I am in KYC address details screen
        When I enter street name as "M1"
        When I select the Nationality
        Then I should see the town and district field getting pre-filled with google API data
        And I should select the internal Address as "US"
        When I click on save and continue button
        Then I should be redirected to KYC identity details screen

    Scenario: Upload invalid ID document details
        Given I am in KYC identity document details screen
        When I select the ID document as "Passport"
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
        When I select the ID document as "Passport"
        When I select the nature of permit as "Single/Multiple entry visa"
        And I enter the reference number as "8379128393"
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
        When I select the verification document as "Drivers licence"
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
        When I select the verification document as "Drivers licence"
        And I upload the front image of document as "document_front.png"
        And I upload the back image of document as "document_back.png"
        Then I should be able to view the preview of the document front and back
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
        When I select valid monthly income and monthly withdrawal
        When I click on save and continue button
        Then I should read a message stating KYC submission successful
        And I should view the status of the KYC as "In review"