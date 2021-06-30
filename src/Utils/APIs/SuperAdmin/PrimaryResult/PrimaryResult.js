import gql from 'graphql-tag';

export const GET_ALL_PRIMARY_RESULT = gql`
  query {
    getPrimaryResultList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        primaryResultList {
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

export const CREATE_PRIMARY_RESULT = gql`
  mutation {
    createPrimaryResult(
      primaryResult: {
        name: "Test Primary Result"
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
export const UPDATE_PRIMARY_RESULT = gql`
  mutation {
    updatePrimaryResult(
      primaryResult: {
        id: "609ae04322ef6b678d4af566"
        name: "TestTest Primary Result"
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
export const DELETE_PRIMARY_RESULT = gql`
  mutation deletePrimaryResult($primaryResultId: String!) {
    deletePrimaryResult(primaryResultId: $primaryResultId) {
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
