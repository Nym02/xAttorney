import gql from 'graphql-tag';

export const GET_ALL_AFFELIATIONS = gql`
  query {
    getAffiliationsList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        affiliationsList {
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

export const CREATE_AFFELIATIONS = gql`
  mutation createAffiliations($name: String!) {
    createAffiliations(affiliations: { name: $name }) {
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

export const UPDATE_AFFELIATIONS = gql`
  mutation updateAffiliations($id: String!, $name: String!) {
    updateAffiliations(affiliations: { id: $id, name: $name }) {
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

export const DELETE_AFFELIATIONS = gql`
  mutation deleteAffiliations($affiliationsId: String!) {
    deleteAffiliations(affiliationsId: $affiliationsId) {
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
