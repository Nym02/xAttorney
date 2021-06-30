import gql from 'graphql-tag';

export const GET_ALL_SUB_DISTRICT = gql`
  query {
    getSubDistrictList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        subDistrictList {
          id
          name
          district {
            id
            name
            division {
              id
              name
              country
            }
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

export const SUB_DISTRICT_BY_ID = gql`
  query getSubDistrictListByDistrictId($districtId: String!) {
    getSubDistrictListByDistrictId(
      districtId: $districtId
      size: 10000
      offset: 0
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
        subDistrictList {
          id
          name
          district {
            id
            name
            division {
              id
              name
              country
            }
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

export const CREATE_SUB_DISTRICT = gql`
  mutation {
    createSubDistrict(
      subDistrict: {
        name: "Barguna Sadar"
        district: { id: "6096d9dd22ef6b5134ddae6d" }
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
        district {
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
  }
`;

export const UPDATE_SUB_DISTRICT = gql`
  mutation {
    updateSubDistrict(
      subDistrict: {
        id: "6096f47f22ef6b7a821c1d49"
        name: "Barguna Sadar"
        district: { id: "6096e82a22ef6b6f11e9c0e6" }
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
        district {
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
  }
`;

export const DELETE_SUB_DISTRICT = gql`
  mutation deleteSubDistrict($subDistrictId: String!) {
    deleteSubDistrict(subDistrictId: $subDistrictId) {
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
