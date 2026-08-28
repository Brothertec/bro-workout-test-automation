@HU001
	Feature: HU001 - Users

    @HU001.1 @regression
    Scenario: 01 Should have a list Users navBar
        Given I am on the home page
        When I go to users page by navBar
        Then the users table should be visible
        And I should see a user and his features

    @HU001.2 @regression
    Scenario: 02 Should have a list Users card
        Given I am on the home page
        When I go to users page by card
        Then the users table should be visible
        And I should see a user and his features
