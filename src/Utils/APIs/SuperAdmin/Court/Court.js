import gql from 'graphql-tag';

export const GET_ALL_COURT = gql`
  query {
    getCourtList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        courtList {
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

export const CREATE_COURT = gql`
  mutation createCourt($name: String!, $country: String!) {
    createCourt(court: { name: $name, country: $country }) {
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
export const UPDATE_COURT = gql`
  mutation updateCourt($id: String!, $name: String!, $country: String!) {
    updateCourt(court: { id: $id, name: $name, country: $country }) {
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
export const DELETE_COURT = gql`
  mutation deleteCourt($courtId: String!) {
    deleteCourt(courtId: $courtId) {
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
