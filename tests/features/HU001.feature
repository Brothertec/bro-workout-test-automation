@HU001
Feature: HU001 - Users

    @HU001.1 @regression
    Scenario: 01 Should have a list Users navBar
        Given The user is created
        And The user navigates to "home" page
        When The user navigates to "users" page through the "navbar"
        Then The users table should be visible
        And The user is visible on the grid

    @HU001.2 @regression
    Scenario: 02 Should have a list Users card
        Given The user is created
        And The user navigates to "home" page
        When The user navigates to "users" page through the "card"
        Then The users table should be visible
        And The user is visible on the grid
