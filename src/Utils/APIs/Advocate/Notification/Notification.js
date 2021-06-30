import gql from 'graphql-tag';

export const GET_ALL_NOTIFICATION = gql`
  query {
    getMyNotificationInformation {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        advocateNotificationInformationList {
          id
          advocate {
            id
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
          }
          caseInfo {
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
            client {
              id
            }
            judgeNameList
            actList
            transferredCourtName
            arisingOutOfList
            witnessList
            description
            newCaseNumber
          }
          message
          seen
          seenAt
          expiryTime
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

export const SEEN_ALL_NOTIFICATION = gql`
  {
    seenAllMyUnseenNotificationInformation {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        advocateNotificationInformationList {
          id
          advocate {
            id
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
          }
          caseInfo {
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
            client {
              id
            }
            judgeNameList
            actList
            transferredCourtName
            arisingOutOfList
            witnessList
            description
            newCaseNumber
          }
          message
          seen
          seenAt
          expiryTime
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
