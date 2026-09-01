Feature: Bro Workout exercises page
    As a Bro Workout user
    I want to open the exercises page
    So that I can navigate to Exercise library

    Scenario: HU005.2 Create a exercise without a name
        Given I am on the home page
        When I go to exercises page by card
        And I click on the button "Adicionar Exercício"
        And I click on the button "Criar"
        Then A warning of fail pops