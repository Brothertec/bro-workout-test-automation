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
        Given I access the exercises page from the home page
        When I create an exercise without a video
        Then I should see the created exercise in the exercises list
        And the created exercise should not display the "Assistir Vídeo" link
