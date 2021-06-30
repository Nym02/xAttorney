import gql from 'graphql-tag';

export const GET_ALL_DISTRICT = gql`
  query {
    getDistrictList(size: 5000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        districtList {
          id
          name
          division {
            id
            name
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

// create district query
export const CREATE_DISTRICT = gql`
  mutation createDistrict($name: String!, $id: String!) {
    createDistrict(name: $name, division: { id: $id }) {
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
        division {
          id
          name
          country
        }
      }
    }
  }
`;

// update district query
export const UPDATE_DISTRICT = gql`
  mutation updateDistrict($id: String!, $name: String!, $divisionId: ID!) {
    updateDistrict(
      district: { id: $id, name: "Test", division: { id: $divisionId } }
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
        division {
          id
          name
          country
        }
      }
    }
  }
`;
// delete district query
export const DELETE_DISTRICT = gql`
  mutation deleteDistrict($districtId: String!) {
    deleteDistrict(districtId: $districtId) {
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
