import gql from 'graphql-tag';

export const UPDATE_BASIC_INFO = gql`
  mutation updateAdvocateBasicInformation(
    $name: String!
    $phone: String!
    $email: String!
    $designation: String!
    $chamberName: String!
  ) {
    updateAdvocateBasicInformation(
      advocate: {
        name: $name
        phone: $phone
        email: $email
        designation: $designation
        chamberName: $chamberName
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
        phone
        email
        designation
        chamberName
        bloodGroup
        picture
      }
    }
  }
`;
