@EV001
Feature: EV001 - Users

    @EV001.1 @skip
    #Test Case With skip tag: Test to be implemented
    Scenario Outline: 01 Should sort the users in the grid
        Given The user navigates to the "users" page
        When The user click on "<buttonName>" button on column "name"
        Then The users in the grid are displayed in the new order
        Examples:
            | buttonName   |
            | Sort By ASC  |
            | Sort By DESC |
            | Unsort       |

    @EV001.2 @skip
    #Test Case With skip tag: Test to be implemented
    Scenario Outline: 02 Should filter the users in the grid
        Given The user navigates to the "users" page
        When The user click on "<buttonName>" button on column "email"
        Then The users in the grid are displayed in the new order
        Examples:
            | buttonName   |
            | Sort By ASC  |
            | Sort By DESC |
            | Unsort       |

    @EV001.3 @skip
    #Test Case With skip tag: Test to be implemented
    Scenario Outline: 03 Sort the users in the grid using the "sort" button
        Given The user navigates to the "users" page
        When The user click on "<buttonSort>" button on column "Name"
        Then The users in the grid are displayed in the new order
        Examples:
            | buttonSort |
            | Ascending  |
            | Descending |
            | Unsort     |

    @EV001.4 @skip
    #Test Case With skip tag: Test to be implemented
    Scenario Outline: 04 Sort the users in the grid using the "sort" button
        Given The user navigates to the "users" page
        When The user click on "<buttonSort>" button on column "Email"
        Then The users in the grid are displayed in the new order
        Examples:
            | buttonSort |
            | Ascending  |
            | Descending |
            | Unsort     |
