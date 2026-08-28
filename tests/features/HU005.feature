@HU005
Feature: HU005 - Exercises

@HU005.2 @regression
Scenario: 02 Create a exercise without a name
        Given The user navigates to "home" page
        When The user navigates to the "exercises" page through the card
        And The user clicks on the button "Adicionar Exercício"
        And The user clicks on the button "Criar"
        Then The user should see a failure warning
