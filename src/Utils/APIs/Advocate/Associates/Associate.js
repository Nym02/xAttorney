import gql from 'graphql-tag';

export const GET_ALL_ASSOCIATE = gql`
  query {
    getAssociateList(size: 100000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        associateList {
          id
          name
          phone
          email
          designation
          address {
            streetAddress
            postOffice {
              id
              name
              postCode
            }
            subDistrict {
              id
              name
            }
            district {
              id
              name
            }
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

export const UPDATE_ASSOCIATE = gql`
  mutation updateAssociateBasicInformation(
    $id: String!
    $name: String!
    $phone: String
    $email: String!
    $designation: String!
  ) {
    updateAssociateBasicInformation(
      associate: {
        id: $id
        name: $name
        phone: $phone
        email: $email
        designation: $designation
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
      }
    }
  }
`;
export const DELETE_ASSOCIATE = gql`
  mutation deleteAssociate($associateId: String!) {
    deleteAssociate(associateId: $associateId) {
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
