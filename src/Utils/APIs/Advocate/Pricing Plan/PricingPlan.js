import gql from 'graphql-tag';

export const LATEST_PRICING_PLAN = gql`
  mutation getAccessTokenAfterChangingPricingPlan($token: String!) {
    getAccessTokenAfterChangingPricingPlan(token: $token) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data
    }
  }
`;
