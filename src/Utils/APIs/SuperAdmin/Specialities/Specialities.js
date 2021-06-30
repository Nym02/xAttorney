import gql from 'graphql-tag';

export const GET_ALL_SPECIALITIES = gql`
  query {
    getSpecialitiesList(size: 5000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        specialitiesList {
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

export const CREATE_SPECIALITIES = gql`
  mutation createSpecialities($name: String!) {
    createSpecialities(specialities: { name: $name }) {
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

export const UPDATE_SPECIALITIES = gql`
  mutation updateSpecialities($id: String!, $name: String!) {
    updateSpecialities(specialities: { id: $id, name: $name }) {
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

export const DELETE_SPECIALITIES = gql`
  mutation deleteSpecialities($specialitiesId: String!) {
    deleteSpecialities(specialitiesId: $specialitiesId) {
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
