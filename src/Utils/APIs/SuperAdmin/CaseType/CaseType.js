import gql from 'graphql-tag';

export const GET_ALL_CASE_TYPE = gql`
  query {
    getCaseTypeList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        caseTypeList {
          id
          name
          court {
            id
            name
            country
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
export const CREATE_CASE_TYPE = gql`
  mutation {
    createCaseType(
      caseType: {
        name: "Test Case Type"
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

export const UPDATE_CASE_TYPE = gql`
  mutation {
    updateCaseType(
      caseType: {
        id: "60a2534a22ef6bb0b26eb46d"
        name: "Test Test Case Type"
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

export const DELETE_CASE_TYPE = gql`
  mutation deleteCaseType($caseTypeId: String!) {
    deleteCaseType(caseTypeId: $caseTypeId) {
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
