Feature: Bro Workout Users page
    As a Bro Workout user
    I want to open the users page
    So that i can see the list of users

    Scenario: HU001.1 Should have a list Users navBar
        Given I am on the home page
        When I go to users page by navBar
        Then the users table should be visible
        And I should see a user and his features
