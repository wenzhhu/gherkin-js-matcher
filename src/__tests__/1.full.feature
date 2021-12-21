@fTag1
@fTag2
Feature: 1. Full Feature
  This is a full feature file

  Background:
    Given BG1
    And BG2

  @soTag1
  Scenario Outline: SO2 <col1> and <col2> and <Col3>
    # log out the app
    When Step 1 <col1>
    And Step 2 <col2>
    Examples:
      | Col1      | Col2      | Col3      |
      | Col1_Row1 | Col2_Row1 | Col3_Row1 |
      | Col1_Row2 | Col2_Row2 | Col3_Row2 |
      | Col1_Row3 | Col2_Row3 | Col3_Row3 |

  Scenario: S3
    When Step 1