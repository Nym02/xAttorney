import gql from 'graphql-tag';

export const GET_ALL_CLIENT = gql`
  query {
    getClientList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        clientList {
          id
          advocate {
            id
            name
            phone
            email
            designation
            chamberName
          }
          name
          phoneList
          emailList
          address {
            streetAddress
            postOffice {
              id
            }
            subDistrict {
              id
            }
            district {
              id
            }
            country
          }
          contactPersonList {
            name
            phoneList
            emailList
            company
            designation
            description
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

export const DELETE_CLIENT = gql`
  mutation deleteClient($clientId: String!) {
    deleteClient(clientId: $clientId) {
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
