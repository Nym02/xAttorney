import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import error from '../../../../assets/images/error.svg';
import greentick from '../../../../assets/images/greentick.svg';
import { LandingApiHelper } from '../../../../Utils/LandingApiHelper';
import { finalNewLoginToken, logoutFunc } from '../../../../Utils/UserToken';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import jwt from 'jwt-decode';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';

const AdvocatePakagePayment = () => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [latesPlan, setLatestPlan] = useState('');
  const { status } = useParams();

  useEffect(() => {
    if (status === 'success') {
      setPaymentSuccessful(true);
      onRefreshToken();
    } else if (status === 'failed') {
      setErrorOpen(true);
    } else {
    }
  }, [status]);

  const onRefreshToken = () => {
    const tokenData = {
      token: finalNewLoginToken,
    };

    const onSuccessCreateAccessToken = result => {
      const decodeToken = jwt(
        result?.data?.data?.getAccessTokenAfterChangingPricingPlan?.data
      );
      const loginInfo = {
        loginToken:
          result?.data?.data?.getAccessTokenAfterChangingPricingPlan?.data,
        isLoggedIn: true,
        userType: decodeToken?.user_type[0],
      };
      localStorage.setItem('loginInfo', JSON.stringify(loginInfo));
    };
    const onErrorCreateAccessToken = err => {
      logoutFunc();
    };

    AdvocateApiHelper.advlatestPricingPlan
      .getLatestPricingPlan({ data: tokenData })
      .then(onSuccessCreateAccessToken)
      .catch(onErrorCreateAccessToken);
  };

  const paymentSuccess = (
    <div
      className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
      }}
    >
      <h1 className='text-3xl font-bold text-center'>Well Done!</h1>
      <div className='flex justify-center items-center'>
        <img width={100} src={greentick} alt='' />
      </div>
      <p className='text-lg font-medium text-center leading-relaxed'>
        Your subscription pacakage has been renewed.
      </p>
      <Link
        className='px-5 py-2 bg-primarydark border border-primarydark hover:bg-white text-white hover:text-primarydark transition duration-200 ease-in-out rounded'
        onClick={() => window.location.replace('/dashboard/advocate')}
      >
        Go To Home
      </Link>
    </div>
  );

  const paymentError = (
    <div
      className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
      }}
    >
      <h1 className='text-3xl font-bold text-center'>Payment Failed</h1>
      <div className='flex justify-center items-center'>
        <img src={error} alt='' />
      </div>
      <p className='text-lg font-medium text-center leading-relaxed'>
        Your payment has been declined or failed. <br /> Please try again!
      </p>
      <Link
        className='px-5 py-2 bg-primarydark border border-primarydark hover:bg-white text-white hover:text-primarydark transition duration-200 ease-in-out rounded'
        to='/dashboard/advocate'
      >
        Go To Sign In
      </Link>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='Payment Status' />
      <Modal
        open={paymentSuccessful}
        onClose={() => setPaymentSuccessful(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {paymentSuccess}
      </Modal>
      <Modal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {paymentError}
      </Modal>
    </>
  );
};

export default AdvocatePakagePayment;
