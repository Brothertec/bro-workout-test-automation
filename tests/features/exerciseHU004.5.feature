Feature: Bro Workout exercises page
  As a Bro Workout user
  I want to register exercises with images
  So that I can visually identify them in the exercises list

  Scenario: Display the registered image to the left of the exercise name
    Given I access the exercises page from the home page
    When I create an exercise with an image
    Then I should see the created exercise in the exercises list
    And the registered image should be displayed to the left of the created exercise name