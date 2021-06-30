import gql from 'graphql-tag';

export const GET_ALL_ADMIN = gql`
  query {
    getAdminList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        adminList {
          id
          name
          phone
          email
          designation
          adminType
          adminStatus
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

export const CREATE_ADMIN = gql`
  mutation createAdmin(
    $name: String!
    $phone: String!
    $email: String!
    $password: String!
    $designation: String!
    $adminType: AdminType!
  ) {
    createAdmin(
      admin: {
        name: $name
        phone: $phone
        email: $email
        password: $password
        designation: $designation
        adminType: $adminType
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
        phone
        email
        designation
        adminType
        adminStatus
      }
    }
  }
`;

export const UPDATE_ADMIN = gql`
  mutation updateAdmin(
    $id: String!
    $name: String!
    $phone: String!
    $password: String!
    $email: String!
    $designation: String!
    $adminType: AdminType!
  ) {
    updateAdmin(
      admin: {
        id: $id
        name: $name
        phone: $phone
        email: $email
        designation: $designation
        adminType: $adminType
        password: $password
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
        phone
        email
        designation
        adminType
        adminStatus
      }
    }
  }
`;

export const UPDATE_ADMIN_STATUS = gql`
  mutation updateAdminStatus($id: String!, $adminStatus: AdminStatus!) {
    updateAdminStatus(admin: { id: $id, adminStatus: $adminStatus }) {
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
        phone
        email
        designation
        adminType
        adminStatus
      }
    }
  }
`;
