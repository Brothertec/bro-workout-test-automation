@HU001
Feature: HU001 - Users

    @HU001.1 @regression
    Scenario: 01 Should have a list Users navBar
        Given The user is created
        And The user navigates to "home" page
        When The user navigates to the "users" page through the "navbar"
        Then The users table should be visible
        # mudar metodo de findByEmail para Filter
        And The user is visible on the grid

    @HU001.2 @regression
    Scenario: 02 Should have a list Users card
        Given The user is created
        And The user navigates to "home" page
        When The user navigates to the "users" page through the "card"
        Then The users table should be visible
        # mudar metodo de findByEmail para Filter
        And The user is visible on the grid

    @HU001.3 @regression
    Scenario: 03 Should add workout to User
        Given The user is created
        And The user is on the users page
        When The user creates a new workout
        # Colocar metodo separado para verificar se o workout foi deletado
        Then The created workout should be visible
