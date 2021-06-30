import gql from 'graphql-tag';

export const NEWS_LETTER = gql`
  mutation subscribeForNewsLetter($email: String!) {
    subscribeForNewsLetter(email: $email) {
      status
      code
      errorList {
        code
        field
        message
        description
      }
      data {
        id
        email
      }
    }
  }
`;
