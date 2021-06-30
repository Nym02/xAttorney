/* eslint-disable */
import {
  Paper,
  Divider,
  Modal,
  ThemeProvider,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import OtpField from '../../../../components/Typographys/OtpField';
import paynow from '../../../../assets/images/pay-now.svg';
import confirm from '../../../../assets/images/confirm-button.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import proceed from '../../../../assets/images/proceed-to-payment.svg';
import error from '../../../../assets/images/error.svg';
import tryagain from '../../../../assets/images/try-again.svg';
import greentick from '../../../../assets/images/greentick.svg';
import done from '../../../../assets/images/done.svg';
import { useLocation } from 'react-router';
import theme from '../../../../theme';
import { TextField } from '@material-ui/core';
import { DataContext } from '../../../../Context Api/ManageData';
import { useForm } from 'react-hook-form';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';
import { useToasts } from 'react-toast-notifications';
import { resetCaches } from 'graphql-tag';

const AdvocateSettingsPageGeneralSettings = () => {
  const [openName, setOpenName] = useState(false);
  const [openPhone, setOpenPhone] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [unVerifiedOtp, setUnVerifiedOtp] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const { dashboardSummary, setDashboardSummary } = useContext(DataContext);
  const [general, setGeneral] = useState([]);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();

  // const {
  //   register2,
  //   handleSubmit2,
  //   formState: { errors: errors2 },
  // } = useForm();

  const search = useLocation().search;

  useEffect(() => {
    const modal = new URLSearchParams(search).get('isOtpVerified');
    {
      modal === 'true' ? setVerifiedOtp(modal) : setUnVerifiedOtp(modal);
    }
  }, []);

  // -------------------------------- update basic info name data --------------------------------

  useEffect(() => {
    setGeneral(dashboardSummary);
  }, [dashboardSummary]);

  const onSubmit = (data, e) => {
    const updateAdvocateName = {
      name: general?.advocate?.name,
      phone: general?.advocate?.phone,
      email: general?.advocate?.email,
      designation: general?.advocate?.designation,
      chamberName: general?.advocate?.chamberName,
    };

    const onSuccessUpdateBasicInfo = result => {
      AdvocateApiHelper.summary
        .getAdvocateDashboardSummary()
        .then(res => {
          setDashboardSummary(
            res?.data?.data?.getAdvocateDashboardSummary?.data
          );
          addToast('Successfully Updated Name', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .then(() => reset())
        // .then(() => {
        //   window.location.reload();
        // })
        .catch(error =>
          addToast('Something wrong happend', {
            appearance: 'error',
            autoDismiss: true,
          })
        );
    };
    const onErrorUpdateBasicInfo = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    AdvocateApiHelper.advUpdateInfo
      .updateBasicInfo({ data: updateAdvocateName })
      .then(onSuccessUpdateBasicInfo)
      .catch(onErrorUpdateBasicInfo);

    setOpenName(false);
  };

  // -------------------------------- update basic info name data --------------------------------
  const changePhone = (data, e) => {
    const updateAdvocateName = {
      name: dashboardSummary?.advocate?.name,
      phone: general?.advocate?.phone,
      email: dashboardSummary?.advocate?.email,
      designation: dashboardSummary?.advocate?.designation,
      chamberName: dashboardSummary?.advocate?.chamberName,
    };

    // console.log('updateAdvocateName', updateAdvocateName);

    const onSuccessUpdateBasicInfo = result => {
      AdvocateApiHelper.summary
        .getAdvocateDashboardSummary()
        .then(res => {
          setDashboardSummary(
            res?.data?.data?.getAdvocateDashboardSummary?.data
          );
          addToast('Successfully Updated Phone Number', {
            appearance: 'success',
            autoDismiss: true,
          });

          setOpenPhone(false);
        })
        .then(() => {})
        .catch(error =>
          addToast('Something wrong happend', {
            appearance: 'error',
            autoDismiss: true,
          })
        );
    };
    const onErrorUpdateBasicInfo = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    AdvocateApiHelper.advUpdateInfo
      .updateBasicInfo({ data: updateAdvocateName })
      .then(onSuccessUpdateBasicInfo)
      .catch(onErrorUpdateBasicInfo);
  };

  const handleGeneralInputChange = e => {
    setGeneral({
      ...general,
      advocate: {
        ...general.advocate,
        [e.target.name]: e.target.value,
      },
    });
  };

  // -------------------------------- update basic info name data --------------------------------
  // const onSubmit = (data, e) => {
  //   console.log('input data', data);
  //   const updateAdvocateName = {
  //     name: data.name,
  //     phone: dashboardSummary?.advocate?.phone,
  //     email: dashboardSummary?.advocate?.email,
  //     designation: dashboardSummary?.advocate?.designation,
  //     chamberName: dashboardSummary?.advocate?.chamberName,
  //     bloodGroup: dashboardSummary?.advocate?.bloodGroup,
  //     picture: dashboardSummary?.advocate?.picture,
  //   };

  //   console.log('updateAdvocateName', updateAdvocateName);

  //   const onSuccessUpdateBasicInfo = result => {
  //     console.log(result);
  //     AdvocateApiHelper.summary
  //       .getAdvocateDashboardSummary()
  //       .then(res => {
  //         setDashboardSummary(
  //           res?.data?.data?.getAdvocateDashboardSummary?.data
  //         );
  //         addToast('Successfully Updated Name', {
  //           appearance: 'success',
  //           autoDismiss: true,
  //         });
  //       })
  //       .then(() => {
  //         window.location.reload();
  //       })
  //       .catch(error =>
  //         addToast('Something wrong happend', {
  //           appearance: 'error',
  //           autoDismiss: true,
  //         })
  //       );
  //   };
  //   const onErrorUpdateBasicInfo = error => {
  //     addToast('Something wrong happend', {
  //       appearance: 'error',
  //       autoDismiss: true,
  //     });
  //   };

  //   AdvocateApiHelper.advUpdateInfo
  //     .updateBasicInfo({ data: updateAdvocateName })
  //     .then(onSuccessUpdateBasicInfo)
  //     .catch(onErrorUpdateBasicInfo);

  //   setOpenName(false);
  // };

  const changeName = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Edit Name</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpenName(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full px-12 flex flex-col items-center space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl className='w-full' error={errors.name}>
              <TextField
                className='bg-white rounded text-white w-full '
                label='Full Name'
                id='outlined-basic'
                name='name'
                variant='outlined'
                color='secondary'
                {...register('name', { required: true })}
                onChange={handleGeneralInputChange}
                value={general?.advocate?.name}
              />
              <FormHelperText>
                {errors.name?.type === 'required' && 'Name is required'}
              </FormHelperText>
            </FormControl>
          </div>
        </ThemeProvider>
        <button
          type='submit'
          // onClick={() => setOpenName(false)}
          style={{ outline: 'none' }}
        >
          <img src={confirm} alt='' />
        </button>
      </form>
    </div>
  );

  const sendOtpCode = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Send Otp</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setSendOtp(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='w-full px-12 flex flex-col items-center space-y-6 pb-8'>
        <p className='text-center'>
          We will send an OTP code in{' '}
          <span className='font-bold'>ashikbd100@gmail.com</span> and{' '}
          <span className='font-bold'>018xxxxxxx911</span>
        </p>
        <button
          onClick={() => setSendOtp(false) || setOpenPhone(true)}
          style={{ outline: 'none' }}
        >
          <img src={confirm} alt='' />
        </button>
      </div>
    </div>
  );

  const otpInput = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Otp Input</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpenPhone(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='w-full px-12 flex flex-col items-center space-y-6 pb-8'>
        <div className='w-full flex justify-center items-center otpdiv'>
          <OtpField />
        </div>
        <p className='text-center'>
          We have sent you an OTP code in{' '}
          <span className='font-bold'>ashikbd100@gmail.com</span> and{' '}
          <span className='font-bold'>018xxxxxxx911</span>. Didn’t get code?{' '}
          <span className='font-bold underline'>Resend</span>
        </p>
        <button
          onClick={() =>
            setOpenPhone(false) ||
            window.location.replace(
              '/dashboard/advocate/settings/?isOtpVerified=true'
            )
          }
          style={{ outline: 'none' }}
        >
          <img src={confirm} alt='' />
        </button>
      </div>
    </div>
  );

  const otpVerified = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Change Phone Number</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setVerifiedOtp(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit2(changePhone)}
        className='w-full px-12 flex flex-col items-center space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl className='w-full' error={errors2.phone}>
              <TextField
                className='bg-white rounded text-white w-full'
                label='Phone No'
                id='margin-normal'
                name='phone'
                variant='outlined'
                inputProps={{ maxLength: 11 }}
                color='secondary'
                {...register2('phone', {
                  required: true,
                  pattern: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                })}
                onChange={handleGeneralInputChange}
                value={general?.advocate?.phone}
              />
              <FormHelperText>
                {errors?.phone?.type === 'required'
                  ? 'Phone number is required'
                  : errors2?.phone?.type === 'pattern' &&
                    'Enter a valid phone number'}
              </FormHelperText>
            </FormControl>
          </div>
        </ThemeProvider>
        <button
          // onClick={() => setVerifiedOtp(false)}
          style={{ outline: 'none' }}
        >
          <img src={confirm} alt='' />
        </button>
      </form>
    </div>
  );

  const otpError = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Error</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setUnVerifiedOtp(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='w-full px-12 flex flex-col items-center space-y-6 pb-8'>
        <div className='flex justify-center items-center'>
          <img src={error} alt='' />
        </div>
        <p className='text-2xl font-medium text-center leading-relaxed'>
          Oops!!! Wrong Code.
        </p>
        <button
          onClick={() => setUnVerifiedOtp(false) || setOpenPhone(true)}
          style={{ outline: 'none' }}
        >
          <img src={tryagain} alt='' />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Paper className='w-full rounded-md' elevation={4}>
        <div className='w-full bg-white rounded-md h-104 text-primarydark'>
          <div className='h-13 flex justify-start items-center pl-4 pr-12'>
            <h1 className='font-semibold text-lg'>General Settings</h1>
          </div>
          <Divider />

          {/* name settings */}
          <div className='h-16 flex justify-start items-center pl-4 lg:pr-12 pr-4 w-full'>
            <div className='flex items-center justify-between space-x-8 w-full'>
              <span className='w-2/5 flex justify-start items-center'>
                Name
              </span>
              <h1 className='w-2/5 font-semibold text-lg'>
                {dashboardSummary?.advocate?.name}
              </h1>
              <div
                onClick={() => setOpenName(true)}
                className='w-1/5 cursor-pointer text-blue-400 flex justify-end items-center'
              >
                <span>Edit</span>
              </div>
            </div>
          </div>
          <Divider />

          {/* phone settings */}
          <div className='h-16 flex justify-start items-center pl-4 lg:pr-12 pr-4 w-full'>
            <div className='flex items-center justify-between space-x-8 w-full'>
              <span className='w-2/5 flex justify-start items-center'>
                Phone No
              </span>
              <h1 className='w-2/5 font-semibold text-lg'>
                +88{dashboardSummary?.advocate?.phone}
              </h1>
              <div
                onClick={() => setVerifiedOtp(true)}
                className='w-1/5 cursor-pointer text-blue-400 flex justify-end items-center'
              >
                <span>Edit</span>
              </div>
            </div>
          </div>
          <Divider />

          {/* email settings */}
          {/* <div className='h-16 flex justify-start items-center pl-4 pr-12 w-full'>
            <div className='flex items-center justify-between space-x-8 w-full'>
              <span className='w-2/5 flex justify-start items-center'>
                Email
              </span>
              <h1 className='w-2/5 font-semibold text-lg'>
                {dashboardSummary?.advocate?.email}
              </h1>
              <div className='w-1/5 cursor-pointer text-blue-400 flex justify-end items-center'>
                <span>Edit</span>
              </div>
            </div>
          </div>
          <Divider /> */}
        </div>
      </Paper>
      {/* for name change */}
      <Modal
        open={openName}
        onClose={() => setOpenName(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {changeName}
      </Modal>

      {/* for phone number */}
      <Modal
        open={sendOtp}
        onClose={() => setSendOtp(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {sendOtpCode}
      </Modal>
      <Modal
        open={openPhone}
        onClose={() => setOpenPhone(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {otpInput}
      </Modal>
      <Modal
        open={verifiedOtp}
        onClose={() => setVerifiedOtp(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {otpVerified}
      </Modal>
      <Modal
        open={unVerifiedOtp}
        onClose={() => setUnVerifiedOtp(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {otpError}
      </Modal>
    </>
  );
};

export default AdvocateSettingsPageGeneralSettings;
