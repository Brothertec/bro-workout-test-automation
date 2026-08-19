Feature: Bro Workout exercises page
  As a Bro Workout user
  I want to manage exercises
  So that exercises without a video do not display the video link

  Scenario: Do not display the video link for an exercise without a video
    Given I access the exercises page from the home page
    When I create an exercise without a video
    Then I should see the created exercise in the exercises list
    And the created exercise should not display the "Assistir Vídeo" link
    