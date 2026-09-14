@HU004
Feature: @HU004 - Exercises

  @HU004.5 @regression
  Scenario: 05 Display the registered image to the left of the exercise name
    Given The user accesses the exercises page from the home page
    When The user creates an exercise with an image
    Then The user should see the created exercise in the exercises list
    And The registered image should be displayed to the left of the created exercise name
