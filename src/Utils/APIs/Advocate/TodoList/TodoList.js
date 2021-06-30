import gql from 'graphql-tag';

export const GET_ALL_TODO = gql`
  query {
    getToDoList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        toDoList {
          id
          advocate {
            id
            name
            phone
            email
            designation
            chamberName
          }
          description
          phone
          createdTime
          completed
          completedTime
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

export const CREATE_TODO = gql`
  mutation {
    createToDo(
      toDo: {
        advocate: { id: "60a4f9c122ef6b91b56c9f67" }
        description: "This is a test todo"
        phone: "01997157535"
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
        description
        phone
        createdTime
        completed
        completedTime
      }
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation {
    updateToDo(
      toDo: {
        id: "60a650f122ef6bc0c46c7e41"
        advocate: { id: "60a4f9c122ef6b91b56c9f67" }
        description: "This is a test test todo"
        phone: "01997157535"
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
        description
        phone
        createdTime
        completed
        completedTime
      }
    }
  }
`;

export const UPDATE_TODO_COMPLETE_STATUS = gql`
  mutation updateToDoCompletedStatus($toDoId: String!, $completed: Boolean!) {
    updateToDoCompletedStatus(toDoId: $toDoId, completed: $completed) {
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
        description
        phone
        createdTime
        completed
        completedTime
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation deleteTodo($toDoId: String!) {
    deleteToDo(toDoId: $toDoId) {
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
