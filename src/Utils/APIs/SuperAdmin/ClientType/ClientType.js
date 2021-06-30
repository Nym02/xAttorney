import gql from 'graphql-tag';

export const GET_ALL_CLIENT_TYPE = gql`
  query {
    getClientTypeList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        clientTypeList {
          id
          name
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
export const CREATE_CLIENT_TYPE = gql`
  mutation createClientType($name: String!) {
    createClientType(clientType: { name: $name }) {
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
      }
    }
  }
`;
export const UPDATE_CLIENT_TYPE = gql`
  mutation updateClientType($id: String!, $name: String!) {
    updateClientType(clientType: { id: $id, name: $name }) {
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
      }
    }
  }
`;
export const DELETE_CLIENT_TYPE = gql`
  mutation deleteClientType($clientTypeId: String!) {
    deleteClientType(clientTypeId: $clientTypeId) {
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
