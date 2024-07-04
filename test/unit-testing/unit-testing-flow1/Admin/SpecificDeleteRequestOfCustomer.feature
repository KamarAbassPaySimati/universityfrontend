# Feature: Paymaart - Admin Web- Specific Delete Account View(Customer)

# As a Super Admin, I want an option to view the Account Deletion request

# Conditions of satisfaction
# There should be an option to view details of account deletion request
# When click on delete notification in the admin notification it should be redirected to the view page

# @add_admin_user
# @create_new_user_and_login
# @register_new_agent_and_send_delete_request_for_that_agent
# Scenario: View delete request of customer
#     Given I navigate to customer delete request listing screen
#     When I click on view delete request of customer
#     Then I should view customer information