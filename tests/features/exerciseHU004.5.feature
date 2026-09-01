@HU004
Feature: @HU004 - Bro Workout exercises page
  As a Bro Workout user
  I want to register exercises with images
  So that I can visually identify them in the exercises list

  @HU004.5
  Scenario: Display the registered image to the left of the exercise name
    Given the user accesses the exercises page from the home page
    When the user creates an exercise with an image
    Then the user should see the created exercise in the exercises list
    And the registered image should be displayed to the left of the created exercise name
