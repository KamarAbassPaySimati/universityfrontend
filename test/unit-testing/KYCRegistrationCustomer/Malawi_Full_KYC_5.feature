Feature: Paymaart - Customer Mobile - Self KYC - Malawi Full ID - Passport, Verification Doc - Institution letter, Occupation - Self Employed
    As an Super/support/admin, I want the ability to perform KYC Registration for Malawi Full new Customer
    Conditions of Satisfaction
    Clear instructions and guidance should be provided on what documents are required and in which format. 
    There should be an option to select whether an user is Malawi or Non-Malawi citizen
    If user is a Malawi then user should be having the option to select as Personal or as Business customer
    If user is a Personal customer there should be an option to select Full KYC or Simplified KYC
    The business Customer is an upcoming feature which needs to be shown with tag as coming soon
    Customers should be able to upload relevant documents, such as Location details ID details and Personal details, during the onboarding process, according to their KYC selection.
    The platform should have a progress indicator to show customers how far users are in the onboarding process.
    A live selfie should be captured according to predefined rules during the onboarding process. 
    Customers should be able to save their progress and return to complete the onboarding if necessary.
    Upon successful submission of details, the request goes to the admin for verification. 
    If there are any issues with the submission, clear instructions on what needs to be corrected should be provided by admin
    Email and SMS notifications should be sent to customers at different stages of the onboarding process, such as confirmation of submission and approval/rejection. 
    The user should be able to see the documents to be submitted on each screen as information
    The user should upload document in any of the mentioned formats such as .png,.jpg.jpeg. from documents
    Users should be able to skip to the next screen if required or come back to previous screen for any updates/changes.
    The location details to be fetched from Google APIs
    The user should mandatorily fill in street, town, and district under location details
    The user should be able to upload the front and back of the document(multiple uploads)
    User should be given the option to remove and reupload the documents
    The system should show the user's the path chosen in KYC selection such as for eg:Malawi Citizen>Personal Customer>Full KYC 

    Information to be displayed

    Malawi Nation- Personal - Full KYC 

    Location details

    a.P.O Box NO/Town, 
    b. House Name and/or Number, 
    c.Street Name, 
    d.Landmark, 
    e.Town/Village/Traditional Authority, 
    f. District

    ID details

    2a. ID Documents options(select and upload)
    a. Valid National ID card issued by the National Registration Bureau or 
    b. Valid Passport issued by the Department of Immigration and 
    c. Biometrics|Live selfie
    2b. Verification Documents Options(select any one and upload)
    a. Valid Driver’s Licence issued by an appropriate authority
    b. Valid Traffic Register card issued by an appropriate authority
    c. Birth Certificate
    d. A stamped letter with verifiable particulars of an employer signed by the head of the employer 
    e. A stamped letter with verifiable particulars of a learning institution signed by the head of the institution

    Personal details

    3a.Gender 
    a. Male 
    b. Female
    c. Undisclosed
    3b.Date of birth
    3c.Occupation or source of fund
    a. Employed
    i.Administrative/Clerical
    ii .Trainee/Intern/Apprentice
    iii .Professionals/Technical/Managerial
    iv. Executive/Director
    v.Board level/Non-Executive Director
    vi.Full Name of the employer
    vii.Industory Sector(drop down)
    viii. Town/District
    b.Self Employed(Please specify within 100 characters)
    c. In full time education(Choose from the list)
    d.Seeking employement
    e. Ritired/Pensioner
    f.Others(Please specify within 200characters) 
    3d.Purpose and intended nature of business(Tick all applicable)
    a.Send and/or received e-payments to/from individuals and enterprises and/or groups pf individuals and/or enterprises
    b.Accept e-payments in connection with the sale of goods and/or services
    c. Distribute e-payments to 3rd party individuals and/or enterprises
    d. Recruite customers/end users, agents and merchants to enroll on the e-payments platform.
    3e. Incomes status
    a.montly income
    i. Upto 300,000.00 MWK
    ii. Upto 1,000,000.00 MWK
    iii. 1,000,000.00 to 2,500,000.00 MWK
    iv. 2,500,000.00 to 5,000,000.00 MWK
    v. 5,000,000.00 to 10,000,000.00 MWK
    vi.Over 1 Million MWK
    b.montly withdrawal
    i. Upto 300,000.00 MWK
    ii. Upto 1,000,000.00 MWK
    iii. 1,000,000.00 to 2,500,000.00 MWK
    iv. 2,500,000.00 to 5,000,000.00 MWK
    v. 5,000,000.00 to 10,000,000.00 MWK
    vi.Over 1 Million MWK
    
    @perform_logout
    @add_admin_user
    @create_new_user_and_login
    Scenario: Super admin onboard the customer with valid information
        Given I navigate to customer onboarding screen
        When I upload the customer profile picture as "profile.png"
        When I enter a valid first name for customer registration
        When I enter a valid middle name for customer registration
        When I enter a valid last name for customer registration
        When I enter a valid email address for customer registration
        When I enter a valid phone number for customer registration
        When I answer the security question one as "Answer1"
        When I answer the security question two as "Answer2"
        When I answer the security question three as "Answer3"
        When I answer the security question four as "Answer4"
        When I agree to the terms and conditions
        When I submit the customer registration form
        Then I should read a message stating that "Please verify your email address"
        Then I should read a message stating that "Please verify your phone number"
        When I click on verify email address
        Then I should read a message stating that "Verification code has been sent to customer’s email. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify email address button text changed to "VERIFIED"
        When I click on verify phone number
        Then I should read a message stating that "Verification code has been sent to customer’s phone number. It's valid for 10 minutes"
        When I enter the valid OTP and verify
        Then I should see the verify phone number button text changed to "VERIFIED"
        When I submit the customer registration form
        Then I should read a message stating customer registration successfully

    Scenario: Navigate to KYC verification
        Given I click on verify KYC
        Then I should be redirected to KYC verification screen
        When I click on proceed button
        Then I should be redirected to KYC address details screen

    Scenario: Enter valid KYC Address details
        Given I am in KYC address details screen
        When I enter street name as "M1"
        Then I should see the town and district field getting pre-filled with google API data
        When I click on save and continue button
        Then I should be redirected to KYC identity details screen

    Scenario: Upload valid ID document details and Capture selfie
        Given I am in KYC identity document details screen
        When I select the ID document as "Passport"
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

    Scenario: Upload verification document
        Given I am in KYC identity document details screen
        When I click on verification documents tab
        When I select the verification document as "Institute letter"
        And I upload the front image of document as <image_front>
        Then I should read a message stating that <message>
        Examples:
            | image_front       | message                                                   |
            | "15MBImage.jpg"   | "Upload failed. Unsupported format or file size exceeded" |
            | "10_MB_DOCX.docx" | "Upload failed. Unsupported format or file size exceeded" |

    Scenario: Upload valid ID document details
        Given I am in KYC identity document details screen
        When I click on verification documents tab
        When I select the verification document as "Institute letter"
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
        When I select the Occupation as "Self Employed"
        When I enter the other self employed occupation as "Self Bussiness"
        When I select the applicable purpose and nature of business
        When I select valid monthly income and monthly withdrawal
        When I click on save and continue button
        Then I should read a message stating KYC submission successful
        And I should view the status of the KYC as "In review"