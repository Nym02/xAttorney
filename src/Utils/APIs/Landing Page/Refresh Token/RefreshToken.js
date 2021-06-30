import gql from 'graphql-tag';

export const CALL_REFRESH_TOKEN = gql`
  mutation refreshAccessToken($token: String!) {
    refreshAccessToken(token: $token) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data
    }
  }
`;
