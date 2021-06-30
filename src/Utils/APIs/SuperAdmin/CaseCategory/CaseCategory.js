import gql from 'graphql-tag';

export const GET_ALL_CASE_CATEGORY = gql`
  query {
    getCaseCategoryList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        caseCategoryList {
          id
          name
          court {
            id
            name
            country
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

export const CREATE_CASE_CATEGORY = gql`
  mutation {
    createCaseCategory(
      caseCategory: {
        name: "Test Case Category"
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

export const UPDATE_CASE_CATEGORY = gql`
  mutation {
    updateCaseCategory(
      caseCategory: {
        id: "60a218a822ef6b4e367d1377"
        name: "Test Test Case Category"
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

export const DELETE_CASE_CATEGORY = gql`
  mutation deleteCaseCategory($caseCategoryId: String!) {
    deleteCaseCategory(caseCategoryId: $caseCategoryId) {
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
