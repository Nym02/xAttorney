import gql from 'graphql-tag';

export const GET_ALL_ADVOCATE = gql`
  query {
    getAdvocateList(size: 10000, offset: 0) {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        advocateList {
          id
          advocateStatus
          name
          phone
          email
          designation
          chamberName
          address {
            streetAddress
            postOffice {
              id
            }
            subDistrict {
              id
            }
            district {
              id
            }
            country
          }
          bloodGroup
          picture
          phoneVerified
          phoneVerifiedTime
          emailVerified
          emailVerifiedTime
          phoneList {
            number
            verified
            verifiedOn
          }
          emailList {
            address
            verified
            verifiedOn
          }
          fax
          website
          membershipList {
            barCouncil {
              id
              name
            }
            memberId
          }
          serviceAreaList {
            id
            name
          }
          specialitiesList {
            id
            name
          }
          affiliationsList {
            id
            name
          }
          latestPricingPlan {
            id
            name
            planMode
            featureList
            benefitList
            price
            discountedAmount
            inactive
          }
          branchList
          legalAidServices
          proBonoServices
          pushNotification
          sendAutoSmsToClient
          sendAutoEmailToClient
          newsletterSubscription
          createdAt
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

export const CHANGE_ADVOCATE_STATUS = gql`
  mutation updateAdvocateStatusAsAnAdmin(
    $advocateId: String!
    $activeAdvocateStatus: Boolean!
  ) {
    updateAdvocateStatusAsAnAdmin(
      advocateId: $advocateId
      activeAdvocateStatus: $activeAdvocateStatus
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
        chamberName
        bloodGroup
        picture
        advocateStatus
      }
    }
  }
`;
