import { Modal, Paper, ThemeProvider } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../Context Api/ManageData';
import { useToasts } from 'react-toast-notifications';
import warn from '../../../../assets/images/warn.svg';
import confirm from '../../../../assets/images/confirm-button.svg';
import { logoutFunc } from '../../../../Utils/UserToken';
import modalClose from '../../../../assets/images/modal-close.svg';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';
import OtpField from '../../../../components/Typographys/OtpField';
import Loaders from '../../../../components/Typographys/Loaders/Loaders';
import { CircularProgress } from '@material-ui/core';
import theme from '../../../../theme';

const AdvocateEmailVerification = () => {
  const [loadingModal, setLoadingModal] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [logOutModalOpen, setLogoutModalOpen] = useState(false);
  const { dashboardSummary } = useContext(DataContext);
  const [resendLoading, setResendLoading] = useState(false);
  const { addToast } = useToasts();
  const packageType = JSON.parse(window.localStorage.getItem('packageDetails'));

  const handleResendOtp = () => {
    resendOtpRequest();
    setResendLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setResendLoading(false);
    }, 60000);
  }, [resendLoading]);

  //====================================================================
  //========================== send otp ================================
  //====================================================================
  const resendOtpRequest = () => {
    setLoadingModal(true);
    const resendOtpId = {
      advocateId: dashboardSummary?.advocate?.id,
    };

    const onSuccessResendOtp = result => {
      setLoadingModal(false);

      const { resendEmailVerificationOTP } = result?.data?.data;
      if (resendEmailVerificationOTP !== null) {
        const { code, data, errors } =
          result?.data?.data?.resendEmailVerificationOTP;
        if (code === 200 && data !== null) {
          addToast('Check your mail for an OTP code', {
            appearance: 'success',
            autoDismiss: true,
          });
          setVerifiedOtp(true);
        } else if (code !== 200 && data === null) {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      } else {
        addToast('Something went wrong. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    };
    const onErrorResendOtp = err => {
      addToast('Something went wrong. Please try again later.', {
        appearance: 'error',
        autoDismiss: true,
      });
      setLoadingModal(false);
    };

    AdvocateApiHelper.signUp
      .resendOtp({ data: resendOtpId })
      .then(onSuccessResendOtp)
      .catch(onErrorResendOtp);
  };
  //====================================================================
  //========================== send otp ================================
  //====================================================================

  const userOtpVerification = () => {
    setLoadingModal(true);

    const finalOtp = localStorage.getItem('finalOtp');
    const verifyData = {
      id: dashboardSummary?.advocate?.id,
      code: finalOtp,
    };

    const onSuccessVerifyOtp = result => {
      setLoadingModal(false);

      const { verifyAdvocateAccount } = result?.data?.data;
      if (verifyAdvocateAccount !== null) {
        const { code, data, errors } =
          result?.data?.data?.verifyAdvocateAccount;

        if (code === 200 && data !== null) {
          addToast('Email has been verified successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          logoutFunc();
          setVerifiedOtp(false);
        } else if (code !== 200 && data === null) {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      } else {
        addToast('Something went wrong. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    };
    const onErrorVerifyOtp = err => {
      addToast('Something went wrong. Please try again later.', {
        appearance: 'error',
        autoDismiss: true,
      });
      setLoadingModal(false);
    };

    AdvocateApiHelper.signUp
      .verifyOtp({ data: verifyData })
      .then(onSuccessVerifyOtp)
      .catch(onErrorVerifyOtp);
  };

  const otpInputModal = (
    <div
      className='2xl:w-1/3 sm:w-2/3 w-full bg-white absolute text-primarydark flex flex-col items-center justify-center space-y-10 p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
      }}
    >
      <h1 className='text-3xl font-bold text-center'>Verification Code</h1>
      <div className='w-full flex justify-center items-center otpdiv'>
        <OtpField />
      </div>
      <p className='text-center'>
        We have sent you an OTP code in{' '}
        <span className='font-bold'>{dashboardSummary?.advocate?.email}</span>.
        Didn’t get code?{' '}
        {resendLoading === true ? (
          <>
            <ThemeProvider theme={theme}>
              <CircularProgress color='secondary' />
            </ThemeProvider>
          </>
        ) : (
          <>
            <button
              style={{ outline: 'none' }}
              onClick={() => handleResendOtp()}
              className='font-bold underline'
            >
              Resend
            </button>
          </>
        )}
      </p>
      {/* {resendLoading === true ? (
        <>
          <span>Please wait for 60 seconds!</span>
        </>
      ) : (
        <> </>
      )} */}
      <button onClick={() => userOtpVerification()} style={{ outline: 'none' }}>
        <img src={confirm} alt='' />
      </button>
    </div>
  );

  const logoutModal = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-10/12 h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Confirm Logout</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setLogoutModalOpen(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col space-y-3 justify-center items-center'>
        <div className='-mt-7 transform rotate-180'>
          <img className='w-24' src={warn} alt='' />
        </div>
        <h1 className='text-xl'>You will be returned to the login screen.</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 sm:w-48 w-36 capitalize'
          onClick={() => logoutFunc()}
        >
          Confirm
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-800 text-white text-sm font-semibold bg-red-800 h-11 sm:w-48 w-36 capitalize'
          onClick={() => setLogoutModalOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const loadingModalView = <Loaders />;

  return (
    <>
      <div
        style={{ zIndex: '1000' }}
        className='fixed bg-black bg-opacity-80 lg:h-screen h-full w-full flex justify-center items-center text-white overflow-hidden'
      >
        <Paper elevation={3} className='w-2/5'>
          <div
            className='2xl:w-3/5 xl:w-2/3 w-11/12 h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
              <span>Verify Your Email</span>
            </div>
            {/* <div className='px-6 flex justify-end'>
              <Paper elevation={3}>
                <button
                  onClick={() => setLogoutModalOpen(true)}
                  style={{ outline: 'none' }}
                  className='text-red-800 text-sm w-20 h-9 rounded-xl'
                >
                  Logout
                </button>
              </Paper>
            </div> */}
            <div className='px-6 flex flex-col items-center space-y-6 pb-10'>
              <div className='flex flex-col items-center space-y-2'>
                <span>Your email is not verified yet.</span>
                <h1 className='text-3xl font-bold text-center text-pink-900'>
                  Send verification details at <br />
                  <span className='text-deepdark'>
                    {dashboardSummary?.advocate?.email}
                  </span>
                </h1>
              </div>
              <div className='w-full flex justify-center items-start text-white space-x-8'>
                <button
                  style={{ outline: 'none' }}
                  className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 sm:w-48 w-36 capitalize'
                  onClick={() => resendOtpRequest()}
                >
                  Send Email
                </button>
                <button
                  onClick={() => setLogoutModalOpen(true)}
                  style={{ outline: 'none' }}
                  className=' h-11 sm:w-48 w-36 rounded flex justify-center items-center bg-secondarydark  text-white transition duration-200 ease-in-out'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <Modal
        open={verifiedOtp}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {otpInputModal}
      </Modal>
      <Modal
        open={logOutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {logoutModal}
      </Modal>
      <Modal
        open={loadingModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {loadingModalView}
      </Modal>
    </>
  );
};

export default AdvocateEmailVerification;
