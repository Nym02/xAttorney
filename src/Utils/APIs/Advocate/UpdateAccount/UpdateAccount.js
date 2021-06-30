import gql from 'graphql-tag';

export const UPDATE_ACCOUNT = gql`
  mutation {
    updateAdvocateContactAndOthersInformation(
      advocate: {
        picture: "fjdlskfdjslfkj"
        phone: "01997157535"
        fax: "fsdlkfjdslfk"
        website: "fjldkfjdlsk"
        address: {
          streetAddress: "Test Street Adress"
          postOffice: { id: "6097007722ef6b8c89ee37df" }
          subDistrict: { id: "6096f47f22ef6b7a821c1d49" }
          district: { id: "6096e82a22ef6b6f11e9c0e6" }
          country: "Bangladesh"
        }
        designation: "ADVOCATE"
        chamberName: "Test Chamber"
        membershipList: [
          { barCouncil: { id: "6097ba0622ef6b8bb91b3a6a" }, memberId: "121" }
        ]
        serviceAreaList: [{ id: "6097cd8222ef6ba0d69c40d4" }]
        specialitiesList: [{ id: "609a4d5622ef6b5eac61aa63" }]
        affiliationsList: [{ id: "609a556822ef6b8d0943f936" }]
        branchList: ["fdlskfslkf"]
        legalAidServices: true
        proBonoServices: true
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
