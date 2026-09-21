@HU004
Feature: @HU004 - Exercises

    @HU004.1 @regression
    Scenario: 01 Verify the edit button is displayed
        When The user is on the "Exercises" page
        Then The "Edit" button is displayed on the exercises grid

    @HU004.2 @regression
    Scenario: 02 Verify the delete button is displayed
        When The user is on the "Exercises" page
        Then The "Delete" button is displayed on the exercises grid

    @HU004.3 @regression
    Scenario: 03 Do not display the video link for an exercise without a video
        Given The user navigates to "exercises" page
        When The user creates an exercise without a video
        Then The new exercise should be visible on the grid
        And The created exercise should not display the "Assistir Vídeo" link

    @HU004.5 @regression
    Scenario: 05 Display the registered image to the left of the exercise name
        Given The user navigates to "exercises" page
        When The user creates an exercise with only an "image"
        Then The new exercise should be displayed on the list
        And The registered image should be displayed to the left of the created exercise name
