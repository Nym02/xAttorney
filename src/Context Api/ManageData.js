import axios from 'axios';
import { createContext, useEffect, useState } from 'react';
import { useToasts } from 'react-toast-notifications';

import { AdvocateApiHelper } from '../Utils/AdvocateApiHelper';
import { ApiHelper } from '../Utils/ApiHelper';
import { LandingApiHelper } from '../Utils/LandingApiHelper';
import {
  finalNewLoginToken,
  refreshAccessToken,
  userType,
} from '../Utils/UserToken';

export const DataContext = createContext();

export const ManageData = props => {
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subDistrict, setSubDistrict] = useState([]);
  const [postOffice, setPostOffice] = useState([]);
  const [policeStation, setPoliceStation] = useState([]);
  const [barCouncil, setBarCouncil] = useState([]);
  const [serviceArea, setServiceArea] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [affiliation, setAffiliation] = useState([]);
  const [pricingPlan, setPricingPlan] = useState([]);
  const [court, setCourt] = useState([]);
  const [caseType, setCaseType] = useState([]);
  const [caseCategory, setCaseCategory] = useState([]);
  const [clientBehalf, setClientBehalf] = useState([]);
  const [clientType, setClientType] = useState([]);
  const [courtName, setCourtName] = useState([]);
  const [primaryResult, setPrimaryResult] = useState([]);
  const [judgementResult, setJudgementResult] = useState([]);
  const [requestForContact, setRequestForContact] = useState([]);
  const [advocate, setAdvocate] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [dashboardSummary, setDashboardSummary] = useState([]);
  const [adminDashboardSummary, setAdminDashboardSummary] = useState([]);
  const [landingPageSummary, setLandingPageSummary] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [otp, setOtp] = useState([]);

  //advocate

  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    userType: '',
  });
  const [advocateContact, setAdvocateContact] = useState([]);
  const [advocateAssociate, setAdvocateAssociate] = useState([]);
  const [toDo, setToDo] = useState([]);
  const [staff, setStaff] = useState([]);
  const [client, setClient] = useState([]);
  const [advocateCase, setAdvocateCase] = useState([]);
  const [advocateExpense, setAdvocateExpense] = useState([]);
  const [advocateThisMonthExpense, setAdvocateThisMonthExpense] = useState([]);

  useEffect(() => {
    // -------------------------- court --------------------------
    ApiHelper.court.getCourt().then(res => {
      setCourt(res?.data?.data?.getCourtList?.data?.courtList);
    });

    // -------------------------- case type --------------------------
    ApiHelper.caseType.getCaseType().then(res => {
      setCaseType(res?.data?.data?.getCaseTypeList?.data?.caseTypeList);
    });

    // -------------------------- case category --------------------------
    ApiHelper.caseCategory.getCaseCategory().then(res => {
      console.log(
        'case category',
        res?.data?.data?.getCaseCategoryList?.data?.caseCategoryList
      );
      setCaseCategory(
        res?.data?.data?.getCaseCategoryList?.data?.caseCategoryList
      );
    });

    // -------------------------- division --------------------------
    ApiHelper.division
      .getDivision()
      .then(res => {
        setDivision(res?.data?.data?.getDivisionList?.data?.divisionList);
      })
      .catch(err => console.log(err));

    // -------------------------- district --------------------------
    ApiHelper.district
      .getDistrict()
      .then(res => {
        setDistrict(res?.data?.data?.getDistrictList?.data?.districtList);
      })
      .catch(err => console.log(err));

    // -------------------------- subdistrict --------------------------
    ApiHelper.subDistrict.getSubDistrict().then(res => {
      setSubDistrict(
        res?.data?.data?.getSubDistrictList?.data?.subDistrictList
      );
    });

    // -------------------------- post office --------------------------
    ApiHelper.postOffice.getPostOffice().then(res => {
      setPostOffice(res?.data?.data?.getPostOfficeList?.data?.postOfficeList);
    });

    // -------------------------- police station --------------------------
    ApiHelper.policeStation.getPoliceStation().then(res => {
      setPoliceStation(
        res?.data?.data?.getPoliceStationList?.data?.policeStationList
      );
    });

    //client behalf
    ApiHelper.clientBehalf.getClientBehalf().then(res => {
      setClientBehalf(
        res?.data?.data?.getClientBehalfList?.data?.clientBehalfList
      );
    });

    //client type
    ApiHelper.clientType.getClientType().then(res => {
      setClientType(res?.data?.data?.getClientTypeList?.data?.clientTypeList);
    });

    //COURT NAME

    ApiHelper.courtName.getCourtName().then(res => {
      setCourtName(res?.data?.data?.getCourtNameList?.data?.courtNameList);
    });

    //judgement result
    ApiHelper.judgementResult.getJudgementResult().then(res => {
      setJudgementResult(
        res?.data?.data?.getJudgmentResultList?.data?.judgmentResultList
      );
    });

    //primary result
    ApiHelper.primaryResult.getPrimaryResult().then(res => {
      setPrimaryResult(
        res?.data?.data?.getPrimaryResultList?.data?.primaryResultList
      );
    });

    // -------------------------- bar council --------------------------
    ApiHelper.barCouncil.getBarCouncil().then(res => {
      setBarCouncil(res?.data?.data?.getBarCouncilList?.data?.barCouncilList);
    });

    // -------------------------- affeliations --------------------------
    ApiHelper.affiliations.getAffiliations().then(res => {
      setAffiliation(
        res?.data?.data?.getAffiliationsList?.data?.affiliationsList
      );
    });

    // -------------------------- Service Area --------------------------
    ApiHelper.serviceAreas.getServiceArea().then(res => {
      setServiceArea(
        res?.data?.data?.getServiceAreaList?.data?.serviceAreaList
      );
    });

    // -------------------------- specialities --------------------------
    ApiHelper.specialities.getSpecialities().then(res => {
      setSpecialities(
        res?.data?.data?.getSpecialitiesList?.data?.specialitiesList
      );
    });

    // //----------------------- Advocate Contact ------------------------
    // AdvocateApiHelper.advContact.getAdvContact().then(res => {
    //   console.log('adv contact manage data:', res);
    //   // setAdvocateContact(res?.);
    // });

    // -------------------------- pricing plan --------------------------
    ApiHelper.pricingPlan.getPricingPlan().then(res => {
      // console.log(
      //   'Pricing plan data',
      //   res?.data?.data?.getPricingPlanList?.data?.pricingPlanList
      // );
      setPricingPlan(
        res?.data?.data?.getPricingPlanList?.data?.pricingPlanList
      );
    });

    //----------------- dashboard summary ------------------------
    if (userType?.includes('SUPER_ADMIN')) {
      ApiHelper.summary.getAdminDashboardSummary().then(res => {
        setAdminDashboardSummary(
          res?.data?.data?.getAdminDashboardSummary?.data
        );
      });
      ApiHelper.admin.getAdmin().then(res => {
        setAdmin(res?.data?.data?.getAdminList?.data?.adminList);
      });
      // -------------------------- advocate --------------------------
      ApiHelper.advocate.getAdvocate().then(res => {
        setAdvocate(res?.data?.data?.getAdvocateList?.data?.advocateList);
      });
      // -------------------------- request for contact --------------------------
      ApiHelper.requestForContact.getRequestForContact().then(res => {
        setRequestForContact(
          res?.data?.data?.getRequestForContactList?.data?.requestForContactList
        );
      });
    } else if (userType?.includes('ADVOCATE')) {
      AdvocateApiHelper.summary.getAdvocateDashboardSummary().then(res => {
        setDashboardSummary(res?.data?.data?.getAdvocateDashboardSummary?.data);
      });

      //----------------------- Advocate Contact ------------------------
      AdvocateApiHelper.advContact.getAdvContact().then(res => {
        if (res?.data?.data?.getContactList !== null) {
          const { code, data, errors } = res?.data?.data?.getContactList;
          if (code !== 200) {
            setAdvocateContact([]);
          } else {
            setAdvocateContact(
              res?.data?.data?.getContactList?.data?.contactList
            );
          }
        } else {
          setAdvocateContact([]);
        }
      });

      //-------------------------- Advocate Associate-------------------
      AdvocateApiHelper.advAssociate.getAdvAssociate().then(res => {
        if (res?.data?.data?.getAssociateList !== null) {
          const { code, data, errors } = res?.data?.data?.getAssociateList;
          if (code !== 200) {
            setAdvocateAssociate([]);
          } else {
            setAdvocateAssociate(
              res?.data?.data?.getAssociateList?.data?.associateList
            );
          }
        } else {
          setAdvocateAssociate([]);
        }
      });
      //---------------------------Advocate Todo---------------------------
      AdvocateApiHelper.advTodo.getTodo().then(res => {
        if (res?.data?.data?.getToDoList !== null) {
          const { code, data, errors } = res?.data?.data?.getToDoList;
          if (code !== 200) {
            setToDo([]);
          } else {
            setToDo(res?.data?.data?.getToDoList?.data?.toDoList);
          }
        } else {
          setToDo([]);
        }
      });

      //------------------Advocate Staff---------------------
      AdvocateApiHelper.advStaff.getStaff().then(res => {
        if (res?.data?.data?.getStaffList !== null) {
          const { code, data, errors } = res?.data?.data?.getStaffList;
          if (code !== 200) {
            setStaff([]);
          } else {
            setStaff(res?.data?.data?.getStaffList?.data?.staffList);
          }
        } else {
          setStaff([]);
        }
      });

      //----------------- Advocate client ------------------------
      AdvocateApiHelper.advClient.getClient().then(res => {
        if (res?.data?.data?.getClientList !== null) {
          const { code, data, errors } = res?.data?.data?.getClientList;
          if (code !== 200) {
            setClient([]);
          } else {
            setClient(res?.data?.data?.getClientList?.data?.clientList);
          }
        } else {
          setClient([]);
        }
      });
      //--------------------- Advocate Case----------------------
      AdvocateApiHelper.advCase.getAdvCase().then(res => {
        setAdvocateCase(res?.data?.data?.getCaseList?.data?.caseList);
      });
      //------------------ Advocate Expense -------------------
      AdvocateApiHelper.advExpense.getExpense().then(res => {
        setAdvocateExpense(res?.data?.data?.getExpenseList?.data?.expenseList);
      });
      AdvocateApiHelper.advExpense.getThisMonthExpense().then(res => {
        setAdvocateThisMonthExpense(
          res?.data?.data?.getThisMonthExpenseList?.data?.expenseList
        );
      });
      AdvocateApiHelper.advNotification.getNotifications().then(res => {
        setNotifications(res?.data?.data?.getMyNotificationInformation?.data);
      });
    } else {
    }

    LandingApiHelper.landingSumary.getLandingSummary().then(res => {
      setLandingPageSummary(res?.data?.data?.getLandingPageSummary?.data);
    });
  }, []);

  return (
    <DataContext.Provider
      value={{
        division,
        setDivision,
        district,
        setDistrict,
        subDistrict,
        setSubDistrict,
        postOffice,
        setPostOffice,
        policeStation,
        setPoliceStation,
        barCouncil,
        setBarCouncil,
        serviceArea,
        setServiceArea,
        specialities,
        setSpecialities,
        affiliation,
        setAffiliation,
        pricingPlan,
        setPricingPlan,
        court,
        setCourt,
        courtName,
        setCourtName,
        caseType,
        setCaseType,
        caseCategory,
        setCaseCategory,
        clientBehalf,
        setClientBehalf,
        clientType,
        setClientType,
        primaryResult,
        setPrimaryResult,
        judgementResult,
        setJudgementResult,
        requestForContact,
        setRequestForContact,
        loggedInUser,
        setLoggedInUser,
        advocate,
        setAdvocate,
        admin,
        setAdmin,
        advocateContact,
        setAdvocateContact,
        advocateAssociate,
        setAdvocateAssociate,
        toDo,
        setToDo,
        staff,
        setStaff,
        client,
        setClient,
        dashboardSummary,
        setDashboardSummary,
        otp,
        setOtp,
        advocateCase,
        setAdvocateCase,
        advocateExpense,
        setAdvocateExpense,
        adminDashboardSummary,
        setAdminDashboardSummary,
        landingPageSummary,
        setLandingPageSummary,
        advocateThisMonthExpense,
        setAdvocateThisMonthExpense,
        notifications,
        setNotifications,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
};
