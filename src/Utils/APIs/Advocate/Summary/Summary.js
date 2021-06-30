import gql from 'graphql-tag';

export const GET_ALL_SUMMARY = gql`
  query {
    getAdvocateDashboardSummary {
      status
      code
      errors {
        code
        field
        message
        description
      }
      data {
        todayCaseCount
        yesterdayCaseCount
        thisMonthCaseCount
        totalCaseCount
        totalClient
        totalAssociate
        totalStaffs
        tomorrowCaseScheduleList {
          id
          client {
            id
            advocate {
              id
              name
              phone
              email
              designation
              chamberName
            }
            name
            phoneList
            emailList
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
            contactPersonList {
              name
              phoneList
              emailList
              company
              designation
              description
            }
          }
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
          caseUpdates {
            courtName {
              id
            }
            nextDate
            nextStep
            description
            orderDate
            caseStatus
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
              judgeNameList
              actList
              transferredCourtName
              arisingOutOfList
              witnessList
              description
              newCaseNumber
            }
          }
          judgeNameList
          actList
          transferredCourtName
          arisingOutOfList
          witnessList
          description
          newCaseNumber
        }
        upcomingCaseScheduleList {
          id
          client {
            id
            advocate {
              id
              name
              phone
              email
              designation
              chamberName
            }
            name
            phoneList
            emailList
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
            contactPersonList {
              name
              phoneList
              emailList
              company
              designation
              description
            }
          }
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
          caseUpdates {
            courtName {
              id
            }
            nextDate
            nextStep
            description
            orderDate
            caseStatus
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
              judgeNameList
              actList
              transferredCourtName
              arisingOutOfList
              witnessList
              description
              newCaseNumber
            }
          }
          judgeNameList
          actList
          transferredCourtName
          arisingOutOfList
          witnessList
          description
          newCaseNumber
        }
        activeToDoList {
          id
          description
          phone
          createdTime
          completed
          completedTime
        }
        latestAdvocatePlan {
          id
          pricingPlan {
            id
            name
            planMode
            featureList
            benefitList
            price
            discountedAmount
            inactive
          }
          payMode
          activationTime
          expiryTime
        }
        latestPlanRemainingDays
        onlineTransactionList {
          id
          transactionId
          customerId
          customerName
          customerEmail
          customerStreetAddress
          customerCity
          customerCountry
          customerPhone
          totalAmount
          pricingPlan {
            id
            name
            planMode
            featureList
            benefitList
            price
            discountedAmount
            inactive
          }
          time
        }
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
          branchList
          legalAidServices
          proBonoServices
          pushNotification
          sendAutoSmsToClient
          sendAutoEmailToClient
          newsletterSubscription
        }
      }
    }
  }
`;
