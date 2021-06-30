import gql from 'graphql-tag';

export const GET_ALL_POST_OFFICE = gql`
  query {
    getPostOfficeList(size: 5000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        postOfficeList {
          id
          name
          postCode
          subDistrict {
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

export const DELETE_POST_OFFICE = gql`
  mutation deletePostOffice($postOfficeId: String!) {
    deletePostOffice(postOfficeId: $postOfficeId) {
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
