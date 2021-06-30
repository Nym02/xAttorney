import axios from 'axios';
import { print } from 'graphql';

import { MAIN_API } from './APIs';
import { NEWS_LETTER } from './APIs/Landing Page/News Letter/NewsLetter';
import { CALL_REFRESH_TOKEN } from './APIs/Landing Page/Refresh Token/RefreshToken';
import { GET_ALL_LANDING_PAGE_SUMMARY } from './APIs/Landing Page/Summary/LandingSummary';

export const Axios = axios.create({
  baseURL: MAIN_API,
});

export const LandingApiHelper = {
  // -------------------------- landing summary --------------------------
  landingSumary: {
    getLandingSummary: () =>
      Axios({
        method: 'POST',
        data: {
          query: print(GET_ALL_LANDING_PAGE_SUMMARY),
        },
        headers: {
          Authorization: ``,
        },
      }),
  },
  newsLetter: {
    createNewsLetter: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(NEWS_LETTER),
          variables: data,
        },
        {
          headers: {
            Authorization: ``,
          },
        }
      ),
  },
  refreshToken: {
    callRefreshToken: ({ data }) =>
      Axios.post(
        '/',
        {
          query: print(CALL_REFRESH_TOKEN),
          variables: data,
        },
        {
          headers: {
            Authorization: ``,
          },
        }
      ),
  },
};
