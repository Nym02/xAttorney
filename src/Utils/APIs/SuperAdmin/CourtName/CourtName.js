import gql from 'graphql-tag';

export const GET_ALL_COURT_NAME = gql`
  query {
    getCourtNameList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        courtNameList {
          id
          name
          court {
            id
            name
            country
          }
          caseType {
            id
            name
          }
          caseCategory {
            id
            name
          }
        }
        offset
        limit
        numberOfElements
        totalElements
        totalPages
        first
        last
      }
    }
  }
`;
export const CREATE_COURT_NAME = gql`
  mutation {
    createCourtName(
      courtName: {
        name: "Test Court Name"
        court: { id: "609adbd222ef6b678d4af565" }
      }
    ) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        id
        name
        court {
          id
        }
      }
    }
  }
`;

export const UPDATE_COURT_NAME = gql`
  mutation {
    updateCourtName(
      courtName: {
        id: "609aeebd22ef6b803ef05583"
        name: "Test Test Court Name"
        court: { id: "609adbd222ef6b678d4af565" }
      }
    ) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        id
        name
        court {
          id
        }
      }
    }
  }
`;

export const DELETE_COURT_NAME = gql`
  mutation deleteCourtName($courtNameId: String!) {
    deleteCourtName(courtNameId: $courtNameId) {
      status
      code
      errors {
        code
        field
        message
        description
      }
    }
  }
`;
