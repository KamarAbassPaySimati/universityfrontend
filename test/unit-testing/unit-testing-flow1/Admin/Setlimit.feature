Feature: Paymaart - Admin Web - Set Limit(Transaction and Balance)
    As a super admin I want the ability to set the maximum account balance and transaction limit based on KYC type selected for agent,merchant and customer
    Condition of satisfaction
    There should be an option to set the daily transaction limit based on the RBM guidelines.
    There should be an option to set the daily maximum account balance limit based on RBM  guidelines
    The updated transaction limit should reflect immediately in the user's account settings.
    Information to be displayed
    Maximum account balance
    1.Agent
    2.Merchant
    3.Customer
    Daily transaction limit
    1.Full KYC(agent,merchant,customer)
    2.Simplified KYC(agent,merchant,customer)

    @add_admin_user
    @create_new_user_and_login
  Scenario: Viewing prefilled maximum account balances
    Given I navigate to set limit screen
    Then I should see the Maximum Account Balance field for "Agent" prefilled
    And I should see the Maximum Account Balance field for "Merchant" prefilled
    And I should see the Maximum Account Balance field for "Customer" prefilled

  Scenario: Viewing prefilled transaction limits in Full KYC
    Given I navigate to set limit screen
    When I select the Full KYC tab
    Then I should see a static text stating "*Full KYC is daily maximum transaction limit"
    And I should see the Transaction Limit field for "Agent" prefilled
    And I should see the Transaction Limit field for "Merchant" prefilled
    And I should see the Transaction Limit field for "Customer" prefilled

  Scenario: Viewing prefilled transaction limits in Simplified KYC
    Given I navigate to set limit screen
    When I select the Simplified KYC tab
    Then I should see a static text stating "*Simplified KYC is monthly maximum withdrawal limit"
    And I should see the Transaction Limit field for "Agent" prefilled
    And I should see the Transaction Limit field for "Merchant" prefilled
    And I should see the Transaction Limit field for "Customer" prefilled 

  Scenario: Updating maximum account balances with invalid limits
    Given I navigate to set limit screen
    When I click the update set limit button
    When I update the Maximum Account Balance field for "Agent" to ""
    And I update the Maximum Account Balance field for "Merchant" to ""
    And I update the Maximum Account Balance field for "Customer" to ""
    And I submit the update transaction limit form
    Then I should read a message stating that "Required field" 
    When I update the Maximum Account Balance field for "Agent" to "-"
    And I update the Maximum Account Balance field for "Merchant" to "-"
    And I update the Maximum Account Balance field for "Customer" to "-"
    And I submit the update transaction limit form
    Then I should read a message stating that "Required field" 

  Scenario: Updating maximum account balances
    Given I navigate to set limit screen
    When I click the update set limit button
    When I update the Maximum Account Balance field for "Agent" to "56,000,000.00"
    And I update the Maximum Account Balance field for "Merchant" to "121,000,000.00"
    And I update the Maximum Account Balance field for "Customer" to "6,000,000.00"
    And I submit the update transaction limit form
    Then I should read a message stating that "Transaction Limit updated successfully"  

  Scenario: Updating transaction limits in Full KYC with invalid limit
    Given I navigate to set limit screen
    And I click the update set limit button
    When I select the Full KYC tab
    Then I should see a static text stating "*Full KYC is daily maximum transaction limit"
    And I update the Transaction Limit field for "Agent" to ""
    And I update the Transaction Limit field for "Merchant" to ""
    And I update the Transaction Limit field for "Customer" to ""
    And I submit the update transaction limit form
    Then I should read a message stating that "Required field"
    And I update the Transaction Limit field for "Agent" to "-"
    And I update the Transaction Limit field for "Merchant" to "-"
    And I update the Transaction Limit field for "Customer" to "-"
    And I submit the update transaction limit form
    Then I should read a message stating that "Required field"

  Scenario: Updating transaction limits in Full KYC
    Given I navigate to set limit screen
    And I click the update set limit button
    When I select the Full KYC tab
    Then I should see a static text stating "*Full KYC is daily maximum transaction limit"
    And I update the Transaction Limit field for "Agent" to "12,000,000.00"
    And I update the Transaction Limit field for "Merchant" to "11,000,000.00"
    And I update the Transaction Limit field for "Customer" to "34,000.00"
    And I submit the update transaction limit form
    Then I should read a message stating that "Transaction Limit updated successfully"

  Scenario: Updating transaction limits in Simplified KYC with invalid limit
    Given I navigate to set limit screen
    And I click the update set limit button
    When I select the Simplified KYC tab
    Then I should see a static text stating "*Simplified KYC is monthly maximum withdrawal limit"
    And I update the Transaction Limit field for "Agent" to ""
    And I update the Transaction Limit field for "Merchant" to ""
    And I update the Transaction Limit field for "Customer" to ""
    And I submit the update transaction limit form
    Then I should read a message stating that "Required field"
    And I update the Transaction Limit field for "Agent" to "-"
    And I update the Transaction Limit field for "Merchant" to "-"
    And I update the Transaction Limit field for "Customer" to "-"
    And I submit the update transaction limit form
    Then I should read a message stating that "Required field"

  Scenario: Updating transaction limits in Simplified KYC
    Given I navigate to set limit screen
    And I click the update set limit button
    When I select the Simplified KYC tab
    Then I should see a static text stating "*Simplified KYC is monthly maximum withdrawal limit"
    When I update the Transaction Limit field for "Agent" to "100,000,000.00"
    And I update the Transaction Limit field for "Merchant" to "100,000,000.00"
    And I update the Transaction Limit field for "Customer" to "100,100,000.00"
    And I submit the update transaction limit form
    Then I should read a message stating that "Transaction Limit updated successfully"
