import gql from 'graphql-tag';

export const GET_ALL_JUDGEMENT_RESULT = gql`
  query {
    getJudgmentResultList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        judgmentResultList {
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
export const CREATE_JUDGEMENT_RESULT = gql`
  mutation {
    createJudgmentResult(
      judgmentResult: {
        name: "Test Judgment Result"
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

export const UPDATE_JUDGEMENT_RESULT = gql`
  mutation {
    updateJudgmentResult(
      judgmentResult: {
        id: "609ae8e622ef6b77831ae22b"
        name: "Test Judgment Result"
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
export const DELETE_JUDGEMENT_RESULT = gql`
  mutation deleteJudgmentResult($judgmentResultId: String!) {
    deleteJudgmentResult(judgmentResultId: $judgmentResultId) {
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
