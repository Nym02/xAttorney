import gql from 'graphql-tag';

export const GET_ADMIN_SUMMARY = gql`
  query {
    getAdminDashboardSummary {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        adminDashBoardInformationList {
          totalSale
          totalIncome
          totalActiveUser
          newUserCount
          summaryRange
        }
        admin {
          id
          name
          phone
          email
          designation
          adminType
          adminStatus
        }
      }
    }
  }
`;
