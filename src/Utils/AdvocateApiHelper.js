import axios from 'axios';
import { print } from 'graphql';
import { MAIN_API } from './APIs';

import {
  DELETE_ASSOCIATE,
  GET_ALL_ASSOCIATE,
  UPDATE_ASSOCIATE,
} from './APIs/Advocate/Associates/Associate';
import { LOGIN } from './APIs/Advocate/Auth/Login';

import {
  CASE_DISPOSED,
  DELETE_CASE,
  GET_ALL_CASE,
  NO_NEXT_DATE,
} from './APIs/Advocate/Case/Case';
import { DELETE_CLIENT, GET_ALL_CLIENT } from './APIs/Advocate/Client/Client';
import {
  DELETE_ADVOCATE_CONTACT,
  GET_ALL_ADVOCATE_CONTACT,
} from './APIs/Advocate/Contact/Contact';
import {
  DELETE_EXPENSE,
  GET_ALL_EXPENSE,
  GET_THIS_MONTH_EXPENSES,
} from './APIs/Advocate/Expense/Expense';
import {
  GET_ALL_NOTIFICATION,
  SEEN_ALL_NOTIFICATION,
} from './APIs/Advocate/Notification/Notification';
import { LATEST_PRICING_PLAN } from './APIs/Advocate/Pricing Plan/PricingPlan';
import { RESEND_OTP, VERIFY_OTP } from './APIs/Advocate/SignUp/SignUp';
import { DELETE_STAFF, GET_ALL_STAFF } from './APIs/Advocate/Staff/Staff';
import { GET_ALL_SUMMARY } from './APIs/Advocate/Summary/Summary';
import {
  CREATE_TODO,
  DELETE_TODO,
  GET_ALL_TODO,
  UPDATE_TODO_COMPLETE_STATUS,
} from './APIs/Advocate/TodoList/TodoList';
import { UPDATE_BASIC_INFO } from './APIs/Advocate/Update Info/UpdateInfo';
import { finalNewLoginToken } from './UserToken';

export const Axios = axios.create({
  // baseURL: "https://api.xattorney.app/graphql",
  // baseURL: 'http://192.168.1.227:5000/graphql',
  // baseURL: 'https://api.xattorney.app/graphql',
  baseURL: MAIN_API,
});

//user token
const postLoginData = localStorage.getItem('loginInfo');
const parsedPostLoginData = JSON.parse(postLoginData);
const loginToken = parsedPostLoginData?.loginToken;

export const AdvocateApiHelper = {
  // ------------------login---------------------
  login: {
    doLogin: ({ data }) => {
      return Axios.post('/', {
        query: print(LOGIN),
        variables: data,
      });
    },
  },
  // ------------------login---------------------

  //-------------------contact-------------------
  advContact: {
    getAdvContact: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_ADVOCATE_CONTACT),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    deleteAdvContact: contactId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_ADVOCATE_CONTACT),
          variables: {
            contactId: contactId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  //-------------------contact-------------------

  //--------------------advocate associate----------

  advAssociate: {
    getAdvAssociate: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_ASSOCIATE),
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
    updateAssociate: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_ASSOCIATE),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      ),
    deleteAdvAssociate: associateId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_ASSOCIATE),
          variables: {
            associateId: associateId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      ),
  },
  //--------------------advocate associate----------

  //------------------todo-----------------
  advTodo: {
    getTodo: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_TODO),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    createToDo: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CREATE_TODO),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    updateToDoStatus: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_TODO_COMPLETE_STATUS),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
    deleteToDo: toDoId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_TODO),
          variables: {
            toDoId: toDoId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  //------------------todo-----------------

  //--------------- staff -----------------
  advStaff: {
    getStaff: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_STAFF),
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
    },
    deleteStaff: staffId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_STAFF),
          variables: {
            staffId: staffId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  //--------------- staff -----------------

  //--------------- client ----------------
  advClient: {
    getClient: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_CLIENT),
        },

        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
    deleteClient: clientId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_CLIENT),
          variables: {
            clientId: clientId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  //--------------- client ----------------
  //--------------- summary ----------------
  summary: {
    getAdvocateDashboardSummary: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_SUMMARY),
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
  },
  //--------------- summary ----------------

  //--------------- signUp ----------------
  signUp: {
    verifyOtp: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(VERIFY_OTP),
          variables: data,
        },
        {
          headers: {
            Authorization: ``,
          },
        }
      ),
    resendOtp: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(RESEND_OTP),
          variables: data,
        },
        {
          headers: {
            Authorization: ``,
          },
        }
      ),
  },
  //--------------- signUp ----------------

  //------------advocate case --------------
  advCase: {
    getAdvCase: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_CASE),
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },

    neNextDate: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(NO_NEXT_DATE),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      ),
    caseDisposed: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CASE_DISPOSED),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      ),
    deleteCase: caseId =>
      Axios.post(
        '/',
        {
          query: print(DELETE_CASE),
          variables: {
            caseId: caseId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  //------------advocate case---------------
  //-----------advocate expense --------------
  advExpense: {
    getExpense: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_EXPENSE),
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
    getThisMonthExpense: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_THIS_MONTH_EXPENSES),
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
    deleteExpense: expenseId => {
      return Axios.post(
        '/',
        {
          query: print(DELETE_EXPENSE),
          variables: {
            expenseId: expenseId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      );
    },
  },
  //-----------advocate expense --------------
  //--------------- signUp ----------------
  advUpdateInfo: {
    updateBasicInfo: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(UPDATE_BASIC_INFO),
          variables: data,
        },
        {
          headers: {
            Authorization: `Bearer ${loginToken}`,
          },
        }
      ),
  },
  //--------------- signUp ----------------

  //----------notification----------------
  advNotification: {
    getNotifications: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_NOTIFICATION),
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
    seeNotifications: () => {
      return Axios({
        method: 'POST',
        data: {
          query: print(SEEN_ALL_NOTIFICATION),
        },
        headers: {
          Authorization: `Bearer ${finalNewLoginToken}`,
        },
      });
    },
  },
  //----------notification----------------

  //----------latest pricing plan----------------
  advlatestPricingPlan: {
    getLatestPricingPlan: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(LATEST_PRICING_PLAN),
          variables: data,
        },
        {
          headers: {
            Authorization: ``,
          },
        }
      ),
  },
  //----------latest pricing plan----------------
};
