import jwt from 'jwt-decode';
import { LandingApiHelper } from './LandingApiHelper';

// getting advocate token

export const checkExpiryTime = decodedToken => {
  let currentDate = new Date();
  if (currentDate >= decodedToken?.exp * 1000) {
    logoutFunc();
  }
};

const decodeToken = tokenValue => {
  return jwt(tokenValue);
};

export const refreshAccessToken = decodedToken => {
  console.log('its getting called');
  let currentDate = new Date();
  checkExpiryTime(decodedToken);
  currentDate.setMinutes(currentDate.getMinutes() + 2);
  if (currentDate >= decodedToken?.exp * 1000) {
    // TODO Call Refresh Token
    // console.log('HELLO REFRESH TOKEN');
    const tokenData = {
      token: finalNewLoginToken,
    };

    const onSuccessCallRefreshToken = result => {
      let accessToken = result?.data?.data?.refreshAccessToken?.data;
      // console.log('call refresh token', accessToken);

      console.log('changing token');

      let token = decodeToken(accessToken);
      const loginInfo = {
        loginToken: accessToken,
        isLoggedIn: true,
        userType: token?.user_type[0],
      };
      localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
    };
    const onErrorCallRefreshToken = err => {};

    LandingApiHelper.refreshToken
      .callRefreshToken({ data: tokenData })
      .then(onSuccessCallRefreshToken)
      .catch(onErrorCallRefreshToken);
  }
};

export const logoutFunc = () => {
  window.localStorage.removeItem('loginInfo');
  window.location.replace('/signin');
};

export let finalNewLoginToken,
  decodedAdvocateId,
  userType,
  latestPlanId,
  emailVerified;
const loginToken = localStorage?.getItem('loginInfo');

if (loginToken !== null) {
  const newLoginToken = JSON.parse(loginToken);
  finalNewLoginToken = newLoginToken?.loginToken;
  const decodedToken = jwt(finalNewLoginToken);
  decodedAdvocateId = decodedToken?.id;
  userType = JSON.stringify(decodedToken?.user_type[0]);
  latestPlanId = decodedToken?.latestPlanId;
  emailVerified = decodedToken?.emailVerified;
  refreshAccessToken(decodedToken);
}
