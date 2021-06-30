import gql from 'graphql-tag';

export const LOGIN = gql`
  mutation login(
    $username: String!
    $password: String!
    $rememberMe: Boolean!
  ) {
    login(
      # username: "shihabhossain.works@gmail.com"
      # password: "Abc123"
      # rememberMe: true
      username: $username
      password: $password
      rememberMe: $rememberMe
    ) {
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
