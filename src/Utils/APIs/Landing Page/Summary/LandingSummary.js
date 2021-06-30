import gql from 'graphql-tag';

export const GET_ALL_LANDING_PAGE_SUMMARY = gql`
  query {
    getLandingPageSummary {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        totalUserCount
        totalCases
        totalAdvocates
        totalChambers
      }
    }
  }
`;
