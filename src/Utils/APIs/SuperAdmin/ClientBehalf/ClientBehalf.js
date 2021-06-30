import gql from 'graphql-tag';

export const GET_ALL_CLIENT_BEHALF = gql`
  query {
    getClientBehalfList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        clientBehalfList {
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
export const CREATE_CLIENT_BEHALF = gql`
  mutation createClientBehalf($name: String!) {
    createClientBehalf(clientBehalf: { name: $name }) {
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
export const UPDATE_CLIENT_BEHALF = gql`
  mutation updateClientBehalf($id: String!, $name: String!) {
    updateClientBehalf(clientBehalf: { id: $id, name: $name }) {
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
export const DELETE_CLIENT_BEHALF = gql`
  mutation deleteClientBehalf($clientBehalfId: String!) {
    deleteClientBehalf(clientBehalfId: $clientBehalfId) {
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
