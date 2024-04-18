Feature: Paymaart -Admin Web -Bank accounts view
    As a Super/finance/admin, I want an option to view paymaart bank accounts, so that I can update the necessary data to function the platform
    Conditions of Satisfaction
    1.There should be an option to view all the Paymaart Bank accounts listed
    Information to be displayed
    Paymaart Trust bank account
    Paymaart main capital account
    Paymaart Suspense account
    Paymaart transaction fee and commission account
    Paymaart TAX account

    Scenario: view list all the banks
        Given I navigate to banks listing
        Then I should view all the trust banks