import gql from 'graphql-tag';

export const GET_ALL_SERVICE_AREA = gql`
  query {
    getServiceAreaList(size: 5000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        serviceAreaList {
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

export const CREATE_SERVICE_AREA = gql`
  mutation createServiceArea($name: String!) {
    createServiceArea(serviceArea: { name: $name }) {
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

export const UPDATE_SERVICE_AREA = gql`
  mutation updateServiceArea($id: String!, $name: String!) {
    updateServiceArea(serviceArea: { id: $id, name: $name }) {
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

export const DELETE_SERVICE_AREA = gql`
  mutation deleteServiceArea($serviceAreaId: String!) {
    deleteServiceArea(serviceAreaId: $serviceAreaId) {
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
