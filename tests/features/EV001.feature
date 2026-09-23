
   @EV001
Feature: EV001 - Users

    @EV001.1 @regression
    Scenario Outline: 01 Should sort the users in the grid
        Given The user navigates to "users" page
        When The user click on "<buttonName>" button on column "Nome"
        Then The users in the grid are displayed in the new order
        Examples:
            | buttonName   |
            | Sort By ASC  |
            | Sort By DESC |
            | Unsort       |

    @EV001.2 @regression
    Scenario Outline: 02 Should filter the users in the grid
        Given The user navigates to "users" page
        When The user click on "<buttonName>" button on column "Email"
        Then The users in the grid are displayed in the new order
        Examples:
            | buttonName   |
            | Sort By ASC  |
            | Sort By DESC |
            | Unsort       |

    @EV001.3 @regression
    Scenario Outline: 03 Sort the users in the grid using the "sort" button
        Given The user navigates to "users" page
        When The user click on "<buttonSort>" button sort on column "Nome"
        Then The users in the grid are displayed in the new order
        Examples:
            | buttonSort |
            | Ascending  |
            | Descending |
            | Unsort     |

    @EV001.4 @regression
    Scenario Outline: 04 Sort the users in the grid using the "sort" button
        Given The user navigates to "users" page
        When The user click on "<buttonSort>" button sort on column "Email"
        Then The users in the grid are displayed in the new order
        Examples:
            | buttonSort |
            | Ascending  |
            | Descending |
            | Unsort     |
