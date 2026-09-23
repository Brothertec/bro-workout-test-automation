@HU003
Feature: HU003 - Users

    @HU003.1 @regression
    Scenario: 01 Should add workout to User
        Given The user is created
        And The user is on the users page
        When The user creates a new workout
        Then The created workout should be visible
        And The created workout is deleted