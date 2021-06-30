import gql from 'graphql-tag';

export const GET_ALL_REQUEST_FOR_CONTACT = gql`
  query {
    getRequestForContactList(size: 5000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        requestForContactList {
          id
          name
          email
          phone
          subject
          message
          contactTime
          ipAddress
          callStatus
          note
          callStatusChangeTime
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

export const CREATE_REQUEST_FOR_CONTACT = gql`
  mutation createRequestForContact(
    $name: String!
    $phone: String!
    $email: String!
    $subject: String!
    $message: String!
  ) {
    createRequestForContact(
      requestForContact: {
        name: $name
        phone: $phone
        email: $email
        subject: $subject
        message: $message
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
        email
        phone
        subject
        message
        contactTime
        ipAddress
        callStatus
        note
        callStatusChangeTime
      }
    }
  }
`;

export const UPDATE_REQUEST_FOR_CONTACT = gql`
  mutation createRequestForContact(
    $id: String!
    $name: String!
    $phone: String!
    $email: String!
    $subject: String!
    $message: String!
    $contactTime: String!
    $note: String!
  ) {
    updateRequestForContact(
      requestForContact: {
        id: $id
        name: $name
        phone: $phone
        email: $email
        subject: $subject
        message: $message
        contactTime: $contactTime
        note: $note
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
        email
        phone
        subject
        message
        contactTime
        ipAddress
        callStatus
        note
        callStatusChangeTime
      }
    }
  }
`;

export const UPDATE_CALL_STATUS_OF_REQUEST_FOR_CONTACT = gql`
  mutation updateRequestForContactCallStatus(
    $id: String!
    $callStatus: CallStatus!
    $note: String!
  ) {
    updateRequestForContactCallStatus(
      requestForContact: { id: $id, callStatus: $callStatus, note: $note }
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
        email
        phone
        subject
        message
        contactTime
        ipAddress
        callStatus
        note
        callStatusChangeTime
      }
    }
  }
`;
