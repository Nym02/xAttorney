import gql from 'graphql-tag';

export const GET_ALL_BAR_COUNCIL = gql`
  query {
    getBarCouncilList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        barCouncilList {
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

export const CREATE_BAR_COUNCIL = gql`
  mutation createBarCouncil($name: String!) {
    createBarCouncil(barCouncil: { name: $name }) {
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

export const UPDATE_BAR_COUNCIL = gql`
  mutation updateBarCouncil($id: String!, $name: String!) {
    updateBarCouncil(barCouncil: { id: $id, name: $name }) {
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

export const DELETE_BAR_COUNCIL = gql`
  mutation deleteBarCouncil($barCouncilId: String!) {
    deleteBarCouncil(barCouncilId: $barCouncilId) {
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
