import gql from 'graphql-tag';

export const CREATE_DIVISION = gql`
  mutation createDivision($name: String!, $country: String!) {
    createDivision(division: { name: $name, country: $country }) {
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
        country
      }
    }
  }
`;

export const UPDATE_DIVISION = gql`
  mutation updateDivision($id: String!, $name: String!, $country: String!) {
    updateDivision(division: { id: $id, name: $name, country: $country }) {
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
        country
      }
    }
  }
`;

export const DELETE_DIVISION = gql`
  mutation deleteDivision($divisionId: String!) {
    deleteDivision(divisionId: $divisionId) {
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

export const GET_ALL_DIVISION = gql`
  query {
    getDivisionList(size: 5000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        divisionList {
          id
          name
          country
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

export const GET_DIVISION_BY_ID = gql`
  query getDivisionById($divisionId: String!) {
    getDivisionById(divisionId: $divisionId) {
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
        country
      }
    }
  }
`;
