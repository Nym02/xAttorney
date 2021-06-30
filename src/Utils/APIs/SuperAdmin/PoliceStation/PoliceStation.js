import gql from 'graphql-tag';

export const GET_ALL_POLICE_STATION = gql`
  query {
    getPoliceStationList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        policeStationList {
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

export const CREATE_POLICE_STATION = gql`
  mutation {
    createPoliceStation(
      policeStation: {
        name: "Barguna Police Super Office"
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
export const UPDATE_POLICE_STATION = gql`
  mutation {
    updatePoliceStation(
      policeStation: {
        id: "60971bd922ef6ba67452a597"
        name: "Barguna Police Super Officefdf"
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
export const DELETE_POLICE_STATION = gql`
  mutation deletePoliceStation($policeStationId: String!) {
    deletePoliceStation(policeStationId: $policeStationId) {
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
