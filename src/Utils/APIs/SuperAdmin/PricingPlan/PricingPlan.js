import gql from 'graphql-tag';

export const GET_ALL_PRICING_PLAN = gql`
  query {
    getPricingPlanList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        pricingPlanList {
          id
          name
          planMode
          featureList
          benefitList
          price
          discountedAmount
          inactive
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

// export const CREATE_PRICING_PLAN = gql`
//   query {
//     getPricingPlanById(pricingPlanId: "609ac94f22ef6b43589d5434") {
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
//         name
//         planMode
//         featureList
//         benefitList
//         price
//         discountedAmount
//         inactive
//       }
//     }
//   }
// `;
