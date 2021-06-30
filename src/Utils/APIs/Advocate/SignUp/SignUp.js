import gql from 'graphql-tag';

export const VERIFY_OTP = gql`
  mutation verifyAdvocateAccount($id: String!, $code: String!) {
    verifyAdvocateAccount(advocateId: $id, code: $code) {
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
`;

export const RESEND_OTP = gql`
  mutation resendEmailVerificationOTP($advocateId: String!) {
    resendEmailVerificationOTP(advocateId: $advocateId) {
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
`;
