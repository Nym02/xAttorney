import axios from 'axios';
import { print } from 'graphql';

import {
  CREATE_AFFELIATIONS,
  DELETE_AFFELIATIONS,
  GET_ALL_AFFELIATIONS,
  UPDATE_AFFELIATIONS,
} from './APIs/SuperAdmin/Affeliation/Affeliation';
import {
  CREATE_BAR_COUNCIL,
  DELETE_BAR_COUNCIL,
  GET_ALL_BAR_COUNCIL,
  UPDATE_BAR_COUNCIL,
} from './APIs/SuperAdmin/BarCouncil/BarCouncil';
import {
  DELETE_CASE_CATEGORY,
  GET_ALL_CASE_CATEGORY,
} from './APIs/SuperAdmin/CaseCategory/CaseCategory';
import {
  DELETE_CASE_TYPE,
  GET_ALL_CASE_TYPE,
} from './APIs/SuperAdmin/CaseType/CaseType';
import {
  CREATE_CLIENT_BEHALF,
  DELETE_CLIENT_BEHALF,
  GET_ALL_CLIENT_BEHALF,
  UPDATE_CLIENT_BEHALF,
} from './APIs/SuperAdmin/ClientBehalf/ClientBehalf';
import {
  CREATE_CLIENT_TYPE,
  DELETE_CLIENT_TYPE,
  GET_ALL_CLIENT_TYPE,
  UPDATE_CLIENT_TYPE,
} from './APIs/SuperAdmin/ClientType/ClientType';
import {
  CREATE_COURT,
  DELETE_COURT,
  GET_ALL_COURT,
  UPDATE_COURT,
} from './APIs/SuperAdmin/Court/Court';
import {
  DELETE_COURT_NAME,
  GET_ALL_COURT_NAME,
} from './APIs/SuperAdmin/CourtName/CourtName';
import {
  DELETE_DISTRICT,
  GET_ALL_DISTRICT,
} from './APIs/SuperAdmin/District/District';
import {
  CREATE_DIVISION,
  DELETE_DIVISION,
  GET_ALL_DIVISION,
  UPDATE_DIVISION,
} from './APIs/SuperAdmin/Division/Division';
import {
  DELETE_JUDGEMENT_RESULT,
  GET_ALL_JUDGEMENT_RESULT,
} from './APIs/SuperAdmin/JudgementResult/JudgementResult';
import {
  DELETE_POLICE_STATION,
  GET_ALL_POLICE_STATION,
} from './APIs/SuperAdmin/PoliceStation/PoliceStation';
import {
  DELETE_POST_OFFICE,
  GET_ALL_POST_OFFICE,
} from './APIs/SuperAdmin/PostOffice/PostOffice';
import { GET_ALL_PRICING_PLAN } from './APIs/SuperAdmin/PricingPlan/PricingPlan';
import {
  DELETE_PRIMARY_RESULT,
  GET_ALL_PRIMARY_RESULT,
} from './APIs/SuperAdmin/PrimaryResult/PrimaryResult';
import {
  CREATE_REQUEST_FOR_CONTACT,
  GET_ALL_REQUEST_FOR_CONTACT,
  UPDATE_CALL_STATUS_OF_REQUEST_FOR_CONTACT,
  UPDATE_REQUEST_FOR_CONTACT,
} from './APIs/SuperAdmin/RequestForContact/RequestForContact';
import {
  CREATE_SERVICE_AREA,
  DELETE_SERVICE_AREA,
  GET_ALL_SERVICE_AREA,
  UPDATE_SERVICE_AREA,
} from './APIs/SuperAdmin/ServiceArea/ServiceArea';
import {
  CREATE_SPECIALITIES,
  DELETE_SPECIALITIES,
  GET_ALL_SPECIALITIES,
  UPDATE_SPECIALITIES,
} from './APIs/SuperAdmin/Specialities/Specialities';
import {
  DELETE_SUB_DISTRICT,
  GET_ALL_SUB_DISTRICT,
  SUB_DISTRICT_BY_ID,
} from './APIs/SuperAdmin/SubDistrict/SubDistrict';
import { GET_ADMIN_SUMMARY } from './APIs/SuperAdmin/Summary/Summary';
import {
  CREATE_ADMIN,
  GET_ALL_ADMIN,
  UPDATE_ADMIN,
  UPDATE_ADMIN_STATUS,
} from './APIs/SuperAdmin/SuperAdmin/SuperAdmin';
import {
  CHANGE_ADVOCATE_STATUS,
  GET_ALL_ADVOCATE,
} from './APIs/SuperAdmin/User/User';
import { finalNewLoginToken } from './UserToken';

import { MAIN_API } from './APIs';

export const Axios = axios.create({
  // baseURL: 'http://192.168.1.227:5000/graphql',
  baseURL: MAIN_API,
});

//user token
const postLoginData = localStorage.getItem('loginInfo');
const parsedPostLoginData = JSON.parse(postLoginData);
const loginToken = parsedPostLoginData?.loginToken;

export const ApiHelper = {
  // -------------------------- advovate --------------------------
  advocate: {
    getAdvocate: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_ADVOCATE),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      }),
    updateAdvocateStatus: ({ data }) => {
      return Axios.post(
        '/',
        {
          query: print(CHANGE_ADVOCATE_STATUS),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
  },
  // -------------------------- advovate --------------------------

  //--------------- summary ----------------
  summary: {
    getAdminDashboardSummary: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ADMIN_SUMMARY),
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
  },
  //--------------- summary ----------------

  // -------------------------- super admin --------------------------
  admin: {
    getAdmin: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_ADMIN),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      }),
    createAdmin: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CREATE_ADMIN),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateAdmin: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_ADMIN),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateAdminStatus: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_ADMIN_STATUS),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- super admin --------------------------

  // -------------------------- court --------------------------
  court: {
    getCourt: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_COURT),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      }),
    createCourt: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CREATE_COURT),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateCourt: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_COURT),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteCourt: courtId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_COURT),
          variables: {
            courtId: courtId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- court --------------------------

  // -------------------------- case type --------------------------
  caseType: {
    getCaseType: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_CASE_TYPE),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    deleteCaseType: caseTypeId => {
      return Axios.post(
        '/',
        {
          query: print(DELETE_CASE_TYPE),
          variables: {
            caseTypeId: caseTypeId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
  },
  // -------------------------- case type --------------------------

  // -------------------------- case category --------------------------
  caseCategory: {
    getCaseCategory: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_CASE_CATEGORY),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    deleteCaseCategory: caseCategoryId => {
      return Axios.post(
        '/',
        {
          query: print(DELETE_CASE_CATEGORY),
          variables: {
            caseCategoryId: caseCategoryId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
  },
  // -------------------------- case category --------------------------

  // -------------------------- division --------------------------
  division: {
    getDivision: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_DIVISION),
        },
        headers: {
          Authorization: ``,
        },
      }),
    createDivision: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CREATE_DIVISION),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateDivision: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_DIVISION),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteDivision: divisionId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_DIVISION),
          variables: {
            divisionId: divisionId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- division --------------------------

  // -------------------------- district --------------------------
  district: {
    getDistrict: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_DISTRICT),
        },
        headers: {
          Authorization: ``,
        },
      }),
    deleteDistrict: districtId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_DISTRICT),
          variables: {
            districtId: districtId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- district --------------------------

  // -------------------------- sub district --------------------------
  subDistrict: {
    getSubDistrict: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_SUB_DISTRICT),
        },
        headers: {
          Authorization: ``,
        },
      }),
    subDistrictById: districtId => {
      return Axios({
        method: 'POST',
        data: {
          query: print(SUB_DISTRICT_BY_ID),
          variables: {
            districtId: districtId,
          },
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
    deleteSubDistrict: subDistrictId => {
      return Axios.post(
        '/',
        {
          query: print(DELETE_SUB_DISTRICT),
          variables: {
            subDistrictId: subDistrictId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
  },
  // -------------------------- sub district --------------------------

  // -------------------------- post office --------------------------
  postOffice: {
    getPostOffice: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_POST_OFFICE),
        },
        headers: {
          Authorization: ``,
        },
      }),
    deletePostOffice: postOfficeId => {
      return Axios.post(
        '/',
        {
          query: print(DELETE_POST_OFFICE),
          variables: {
            postOfficeId: postOfficeId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
  },
  // -------------------------- post office --------------------------

  // -------------------------- police station --------------------------
  policeStation: {
    getPoliceStation: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_POLICE_STATION),
        },
        headers: {
          Authorization: ``,
        },
      }),
    deletePoliceStation: policeStationId => {
      return Axios.post(
        '/',
        {
          query: print(DELETE_POLICE_STATION),
          variables: {
            policeStationId: policeStationId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
  },
  // -------------------------- police station --------------------------

  // -------------------------- bar council --------------------------
  barCouncil: {
    getBarCouncil: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_BAR_COUNCIL),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      }),
    createBarCouncil: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CREATE_BAR_COUNCIL),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateBarCouncil: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_BAR_COUNCIL),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteBarCouncil: barCouncilId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_BAR_COUNCIL),
          variables: {
            barCouncilId: barCouncilId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- bar council --------------------------

  // -------------------------- affiliations --------------------------
  affiliations: {
    getAffiliations: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_AFFELIATIONS),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      }),
    createAffiliations: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CREATE_AFFELIATIONS),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateAffiliations: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_AFFELIATIONS),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteAffiliations: affiliationsId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_AFFELIATIONS),
          variables: {
            affiliationsId: affiliationsId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- affiliations --------------------------

  // -------------------------- service areas --------------------------
  serviceAreas: {
    getServiceArea: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_SERVICE_AREA),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      }),
    createServiceArea: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CREATE_SERVICE_AREA),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateServiceArea: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_SERVICE_AREA),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteServiceArea: serviceAreaId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_SERVICE_AREA),
          variables: {
            serviceAreaId: serviceAreaId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- service areas --------------------------

  // -------------------------- specialities --------------------------
  specialities: {
    getSpecialities: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_SPECIALITIES),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      }),
    createSpecialities: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CREATE_SPECIALITIES),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateSpecialities: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_SPECIALITIES),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteSpecialities: specialitiesId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_SPECIALITIES),
          variables: {
            specialitiesId: specialitiesId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- specialities --------------------------

  // -------------------------- specialities --------------------------
  clientBehalf: {
    getClientBehalf: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_CLIENT_BEHALF),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    createClientBehalf: ({ data }) => {
      return Axios.post(
        '/',
        {
          query: print(CREATE_CLIENT_BEHALF),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
    updateClientBehalf: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_CLIENT_BEHALF),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteClientBehalf: clientBehalfId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_CLIENT_BEHALF),
          variables: {
            clientBehalfId: clientBehalfId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- specialities --------------------------

  // -------------------------- specialities --------------------------
  clientType: {
    getClientType: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_CLIENT_TYPE),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    createClientType: ({ data }) => {
      return Axios.post(
        '/',
        {
          query: print(CREATE_CLIENT_TYPE),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
    updateClientType: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_CLIENT_TYPE),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteClientType: clientTypeId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_CLIENT_TYPE),
          variables: {
            clientTypeId: clientTypeId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- specialities --------------------------

  // -------------------------- specialities --------------------------
  courtName: {
    getCourtName: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_COURT_NAME),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    deleteCourtName: courtNameId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_COURT_NAME),
          variables: {
            courtNameId: courtNameId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },

  judgementResult: {
    getJudgementResult: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_JUDGEMENT_RESULT),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },

    deleteJudgementResult: judgmentResultId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_JUDGEMENT_RESULT),
          variables: {
            judgmentResultId: judgmentResultId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- specialities --------------------------

  // -------------------------- specialities --------------------------
  primaryResult: {
    getPrimaryResult: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_PRIMARY_RESULT),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },

    deletePrimaryResult: primaryResultId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_PRIMARY_RESULT),
          variables: {
            primaryResultId: primaryResultId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  // -------------------------- specialities --------------------------

  // -------------------------- request for contact --------------------------
  requestForContact: {
    getRequestForContact: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_REQUEST_FOR_CONTACT),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    createRequestForContact: ({ data }) => {
      return Axios.post(
        '/',
        {
          query: print(CREATE_REQUEST_FOR_CONTACT),
          variables: data,
        },
        {
          headers: {
            Authorization: ``,
          },
        }
      );
    },
    updateRequestForContact: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_REQUEST_FOR_CONTACT),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateRequestForContactCallStatus: ({ data }) => {
      return Axios.post(
        '/',
        {
          query: print(UPDATE_CALL_STATUS_OF_REQUEST_FOR_CONTACT),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      );
    },
  },
  // -------------------------- request for contact --------------------------

  // -------------------------- request for contact --------------------------
  pricingPlan: {
    getPricingPlan: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_PRICING_PLAN),
        },
        headers: {
          Authorization: '',
        },
      });
    },
  },
  // -------------------------- request for contact --------------------------
};
