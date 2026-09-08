@HU001
Feature: HU001 - Users

    @HU001.1 @regression
    Scenario: 01 Should have a list Users navBar
        Given The user is on the home page
        When The user goes to users page by navBar
        Then The users table should be visible
        And The user should see a user and his features

    @HU001.2 @regression
    Scenario: 02 Should have a list Users card
        Given The user is on the home page
        When The user goes to users page by card
        Then The users table should be visible
        And The user should see a user and his features

    @HU001.3 @regression
    Scenario: 03 Should add workout to User
        Given The user is on the users page
        When The user clicks to create workout
        And The user fills the form
        And The user submits the form
        Then Workout should be visible
