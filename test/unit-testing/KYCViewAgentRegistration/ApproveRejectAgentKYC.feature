Feature: Paymaart - Admin Web -Approve/Reject Agent KYC
    As a super/admin, I want the ability to approve or reject the KYC of agent
    Conditions of Satisfaction
    There should be an option to approve or reject the KYC verification request
    A confirmation prompt should be displayed before the action is performed.
    when a request is approved /rejected(completed/ further info required), relevant parties should receive a notification (email/SMS/push)
    Upon rejection, there should be an option to select the rejection reason from the predefined list(multi- select)
    From the predefined list, if any data is asked, there should be an option for free text to fill in and submit
    All approved and rejected KYCs should be present in the list

    Information to be displayed

    Predefined list as below
    Incorrect or unreadable personal information: Your <full name> or <date of birth> on the profile is incorrect, missing, or unreadable. Please update.
    Unacceptable/incomplete address: Your physical address does not meet our requirements for completeness and/or traceability. Please update.
    Mismatched information: The information provided in your submission does not match information elsewhere in your submission and/or in our records. Please update.
    Incomplete or inaccurate KYC documents: Your submission is missing the following document and/or information: <full name>; <full address>; <etc…>
    Original documents not provided: Your uploaded document <named document> appears not to be the original. Please upload the original version of this document.
    Expiration of document validity period: Your <named document> is expired and cannot be accepted for KYC registration. Please upload a valid document.
    Incomplete or inaccurate KYC documents: Your <named document> is incomplete and/or inaccurate. Please provide a full, accurate version of this document
    Note: Except  the  documents the remaining fields are auto filled by the system when the reason is selected for rejection

    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    @register_new_agent
    Scenario: Complete Agent Malawi Full KYC
        Given I navigate to agent KYC registration screen
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

    Scenario: View specific agent KYC and approve kyc
        Given I navigate to agent KYC listing screen
        When I search for recently created agent
        When I click on view agent KYC
        Then I should view agent details
        Then I should view basic details of agent KYC
        And I should view the identification details of agent KYC
        And I should view the personal details of agent KYC
        * I click on approve "Agent KYC"
        Then I should see a confirmation prompt for approving "Agent KYC"
        When I click on confirm button
        Then I should read a message stating that "KYC approved successfully"
        And I should see the KYC status changed to "Completed"

    @register_new_agent
    Scenario: Complete Agent Malawi Full KYC
        Given I navigate to agent KYC registration screen
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

    Scenario: View specific agent KYC and do not reject
        Given I navigate to agent KYC listing screen
        When I search for recently created agent
        When I click on view agent KYC
        Then I should view agent details
        Then I should view basic details of agent KYC
        And I should view the identification details of agent KYC
        And I should view the personal details of agent KYC
        * I click on reject "Agent KYC"
        Then I should see a confirmation prompt for reject "Agent KYC"
        When I click on cancel button
        Then I should see the agent KYC status remain as "In-Progress"

    Scenario: View specific agent KYC and reject
        Given I navigate to agent KYC listing screen
        When I search for recently created agent
        When I click on view agent KYC
        Then I should view agent details
        Then I should view basic details of agent KYC
        And I should view the identification details of agent KYC
        And I should view the personal details of agent KYC
        * I click on reject "Agent KYC"
        Then I should see a confirmation prompt for reject "Agent KYC"
        When I select the reasons for rejection as "Incorrect or unreadable personal information"
        And I select the reasons for rejection as "Unacceptable/incomplete address"
        And I select the reasons for rejection as "Mismatched information"
        When I click on confirm button
        Then I should read a message stating that "KYC rejected successfully"
        And I should see the KYC status changed to "Further information Required"