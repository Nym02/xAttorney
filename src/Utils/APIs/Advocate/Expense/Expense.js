import gql from 'graphql-tag';

export const GET_ALL_EXPENSE = gql`
  query {
    getExpenseList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        expenseList {
          id
          invoiceId
          dateTime
          head
          amount
          details
          paymentDetails {
            payMode
            note
            bankPayment {
              name
              branch
              accountNumber
              depositSlipNumber
            }
            mobileBankingPayment {
              platform
              transactionId
              sentFromMobile
              sentToMobile
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

export const GET_THIS_MONTH_EXPENSES = gql`
  {
    getThisMonthExpenseList(size: 100000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        expenseList {
          id
          advocate {
            id
          }
          invoiceId
          dateTime
          head
          amount
          details
          paymentDetails {
            payMode
            note
            bankPayment {
              name
              branch
              accountNumber
              depositSlipNumber
            }
            mobileBankingPayment {
              platform
              transactionId
              sentFromMobile
              sentToMobile
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

export const DELETE_EXPENSE = gql`
  mutation deleteExpense($expenseId: String!) {
    deleteExpense(expenseId: $expenseId) {
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
