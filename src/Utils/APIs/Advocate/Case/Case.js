import gql from 'graphql-tag';

export const GET_ALL_CASE = gql`
  query {
    getCaseList(size: 5000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        caseList {
          id
          disposed
          caseStatus
          district {
            id
            name
          }
          caseType {
            id
            name
          }
          caseNumber
          year
          primaryResult {
            id
            name
          }
          primaryResultDate
          reminderForExtension
          caseCategory {
            id
            name
          }
          courtName {
            id
            name
            court {
              id
              name
            }
          }
          caseUpdates {
            courtName {
              id
            }
            nextDate
            nextStep
            description
            orderDate
            caseStatus
          }
          caseFeeList {
            date
            fee
            cost
          }
          filingDate
          judgementDate
          judgementResult {
            id
            name
          }
          bellOnStayFor
          wakalatnamaList {
            number
            entryDate
          }
          judgeNameList
          actList
          transferredCourtName
          arisingOutOfList
          witnessList
          description
          newCaseNumber
          clientBehalf {
            id
            name
          }
          clientType {
            id
            name
          }
          client {
            id
            name
            phoneList
          }
          assignTo {
            id
            name
          }
          reference
          fileNumber
          opponentList {
            name
            phoneList
          }
          opponentAdvocate {
            name
          }
          opponentWitnessList
          policeStation {
            id
            name
          }
          fir
          investigationOfficerList {
            name
            phoneList
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

export const GET_CASE_BY_ID = gql`
  mutation {
    getCaseById(caseId: "60ad18ff22ef6bf1bb39496f") {
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
        district {
          id
          name
        }
        caseType {
          id
          name
        }
        caseNumber
        year
        primaryResult {
          id
          name
        }
        primaryResultDate
        reminderForExtension
        caseCategory {
          id
          name
        }
        courtName {
          id
          name
        }
        filingDate
        judgementDate
        judgementResult {
          id
          name
        }
        bellOnStayFor
        wakalatnamaList {
          number
          entryDate
        }

        judgeNameList
        actList
        transferredCourtName
        arisingOutOfList
        witnessList
        description
        newCaseNumber
      }
    }
  }
`;

export const NO_NEXT_DATE = gql`
  mutation updateCaseNoNextDateStatus($caseId: String!, $noNextDate: Boolean!) {
    updateCaseNoNextDateStatus(caseId: $caseId, noNextDate: $noNextDate) {
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
        disposed
        noNextDate
        caseStatus
      }
    }
  }
`;

export const CASE_DISPOSED = gql`
  mutation updateCaseDisposedStatus($caseId: String!, $disposed: Boolean!) {
    updateCaseDisposedStatus(caseId: $caseId, disposed: $disposed) {
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
        disposed
        caseStatus
      }
    }
  }
`;

export const DELETE_CASE = gql`
  mutation deleteCase($caseId: String!) {
    deleteCase(caseId: $caseId) {
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
