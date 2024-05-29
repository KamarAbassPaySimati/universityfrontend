Feature: Paymaart - Admin Web - Notification Page
    As an Super/finance/support/admin/, I want to have a notification page where I can view important updates relevant to the platform, so that I can stay informed about any critical events or changes that may impact the system or users.

    Conditions of Satisfaction

    The notification page should display a list of notifications sorted by date, with the most recent notifications appearing at the top.

    Each notification should include relevant details such as the date/time it was posted, the type of notification and a brief description or summary.

    The notification page should support pagination or infinite scrolling to accommodate a large number of notifications.

    There should be an option to view the notification and perform the necessary action

    On the tap of notification it should be redirected to the respective notification page

    Once notification is performed with any action then the notification will be removed.

    @add_admin_user
    @create_new_user_and_login
    @register_new_agent_and_send_delete_request_for_that_agent
    Scenario: View list of notification and redirection
        Given I navigate to admin users listing screen
        When I click on notification bell
        Then I should view list of notifications
        When I click on view agent delete request notification
        Then I should be redirected to view delete request screen
        When I click on notification bell
        Then I should view list of notifications
        When I click on view KYC request notification
        Then I should be redirected to view KYC screen