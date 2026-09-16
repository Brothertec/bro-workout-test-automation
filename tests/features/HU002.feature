@HU002
Feature: HU002 - Users

    @HU002.1 @regression
    Scenario Outline: Validate required fields when creating a user
        Given The user is on the users page
        And The user opens the user creation form
        When The user fills the user form without the "<field>" field
        And The user submits the user creation form
        Then The user should see "O campo <fieldName> é de preenchimento obrigatório" below the "<field>" field

        Examples:
            | field    | fieldName |
            | name     | Nome      |
            | email    | Email     |
            | password | Senha     |
