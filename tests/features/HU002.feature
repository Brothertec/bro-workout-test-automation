@HU002
Feature: HU002 - Users

    @HU002.1 @regression
    Scenario Outline: Validate required fields when creating a user
        Given The user is on the users page
        When The user submits the form without filling in the "<field>" field
        Then The Warning message is displayed correctly on "<field>"

        Examples:
            | field    |
            | name     |
            | email    |
            | password |
