import gql from 'graphql-tag';

export const GET_ALL_STAFF = gql`
  query {
    getStaffList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        staffList {
          id
          advocate {
            id
            name
            phone
            email
            designation
            chamberName
          }
          name
          designation
          phoneList
          emailList
          bloodGroup
          education
          address {
            streetAddress
            postOffice {
              id
              name
              postCode
            }
            subDistrict {
              id
              name
            }
            district {
              id
              name
            }
            country
          }
          description
          emergencyContactPerson {
            name
            phoneList
            emailList
            relation
          }
          staffStatus
          createdTime
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

export const DELETE_STAFF = gql`
  mutation deleteStaff($staffId: String!) {
    deleteStaff(staffId: $staffId) {
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
