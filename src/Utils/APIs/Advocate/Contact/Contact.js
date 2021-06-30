import gql from 'graphql-tag';

export const GET_ALL_ADVOCATE_CONTACT = gql`
  query {
    getContactList(size: 50000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        contactList {
          id
          advocate {
            id
            name
            phone
            email
          }
          name
          phoneList
          emailList
          designation
          company
          details
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

// export const GET_CONTACT_BY_CONTACT_ID = gql`
//   query {
//     getContactById(contactId: "60a556a422ef6b4f306e4279") {
//       status
//       code
//       errors {
//         code
//         field
//         message
//         description
//       }
//       data {
//         id
//         advocate {
//           id
//           name
//           phone
//           email
//         }
//         name
//         phoneList
//         emailList
//         designation
//         company
//         details
//       }
//     }
//   }
// `;

export const CREATE_ADVOCATE_CONTACT = gql`
  mutation {
    createContact(
      contact: {
        advocate: { id: "60a4f9c122ef6b91b56c9f67" }
        name: "Test Contact"
        phoneList: ["01997157535"]
        emailList: ["shihabhossain611@gmail.com"]
        designation: "Programmer"
        company: "Project X Ltd."
        details: "This is a test details"
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
        advocate {
          id
        }
        name
        phoneList
        emailList
        designation
        company
        details
      }
    }
  }
`;

export const UPDATE_ADVOCATE_CONTACT = gql`
  mutation {
    updateContact(
      contact: {
        id: "60a555eb22ef6b4f306e4275"
        advocate: { id: "60a4f9c122ef6b91b56c9f67" }
        name: "Test Contact"
        phoneList: ["01997157535"]
        emailList: ["shihabhossain611@gmail.com"]
        designation: "Software Engineer"
        company: "Project X Ltd."
        details: "This is a test details"
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
        advocate {
          id
        }
        name
        phoneList
        emailList
        designation
        company
        details
      }
    }
  }
`;

export const DELETE_ADVOCATE_CONTACT = gql`
  mutation deleteContact($contactId: String!) {
    deleteContact(contactId: $contactId) {
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
