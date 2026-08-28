@HU005
Feature: HU005 - Exercises

@HU005.2 @regression
Scenario: 02 Create a exercise without a name
        Given The user is on the home page
        When The user goes to exercises page by card
        And The user clicks on the button "Adicionar Exercício"
        And The user clicks on the button "Criar"
        Then A warning of fail pops
