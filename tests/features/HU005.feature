@HU005
Feature: HU005 - Exercises

@HU005.1 @regression
Scenario: HU005.1 Create a exercise without a name
        Given I am on the home page
        When I go to exercises page by card 
        And I click on the button "Adicionar Exercício"
        And I click on the button "Criar"
        Then A warning of fail pops
