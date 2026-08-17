Feature: Bro Workout home page
  As a Bro Workout user
  I want to open the home page
  So that I can navigate to user management

  Scenario: Display the home page and go to the users list
    Given I am on the home page
    Then the page title should be "Bro Workout"
    And I should see the heading "Bem-vindo ao Bro Workout"
    And I should see the card "Gerenciar Usuários"
    When I open the users list from the home page
    Then I should be on the users page
    And the users table should be visible
