/* eslint-disable */

import paynow from '../../assets/images/pay-now-dark.svg';
import confirm from '../../assets/images/confirm-button.svg';
import warn from '../../assets/images/taka.svg';
import proceed from '../../assets/images/proceed-to-payment.svg';
import error from '../../assets/images/error.svg';
import tryagain from '../../assets/images/try-again.svg';
import greentick from '../../assets/images/greentick.svg';
import done from '../../assets/images/done.svg';
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import theme from '../../theme';
import { useContext, useEffect, useRef, useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useLocation } from 'react-router';
import OtpField from '../Typographys/OtpField';
import { Link } from 'react-router-dom';
import { DataContext } from '../../Context Api/ManageData';
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { MAIN_API } from '../../Utils/APIs';
import { useToasts } from 'react-toast-notifications';
import { AdvocateApiHelper } from '../../Utils/AdvocateApiHelper';
import { ApiHelper } from '../../Utils/ApiHelper';
import { finalNewLoginToken } from '../../Utils/UserToken';
import Loaders from '../Typographys/Loaders/Loaders';
import { Input } from '@material-ui/core';
import { CircularProgress } from '@material-ui/core';

const PaymentDetailsPageComponents = () => {
  const [values, setValues] = useState({
    password: '',
    confirmpassword: '',
    showPassword: false,
  });
  const [confirmPass, setConfirmPass] = useState(false);
  const [open, setOpen] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [unVerifiedOtp, setUnVerifiedOtp] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [currentPhone, setCurrentPhone] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [userId, setUserId] = useState('');
  const { addToast } = useToasts();
  const handleOpen = () => {
    setOpen(true);
  };
  const [resendLoading, setResendLoading] = useState(false);
  const { district, setDistrict } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const [subDistrictById, setSubDistrictById] = useState([]);
  const [postOfficeById, setPostOfficeById] = useState([]);
  const { pricingPlan, setPricingPlan } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = useRef({});
  password.current = watch('password', '');

  const packageType = JSON.parse(window.localStorage.getItem('packageDetails'));

  const search = useLocation().search;

  //handling confirm password
  const viewConfirmPass = () => {
    setConfirmPass(!confirmPass);
  };

  const handleResendOtp = () => {
    resendOtpRequest();
    setResendLoading(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setResendLoading(false);
    }, 60000);
  }, [resendLoading]);

  //--------------------------------------------------------------------------
  //--------------- get sub district by district id---------------------------
  //----------------------------------------------------------------------------
  const getSubDistrictById = districtId => {
    // ApiHelper.subDistrict
    //   .subDistrictById(districtId)
    //   .then(res => console.log('sub district by id', res));

    const newDistrictId = JSON.stringify(districtId);
    const finalDistrictId = newDistrictId.replace(/"([^"]+)":/g, '$1:');

    const subDistrictByIdQuery = gql`
      query  {
        getSubDistrictListByDistrictId(
          districtId: ${finalDistrictId}
          size: 10000
          offset: 0
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
            subDistrictList {
              id
              name
              district {
                id
                name
                division {
                  id
                  name
                  country
                }
              }
            }
            offset
            limit
            numberOfElements
            totalElements
            totalPages
            first
            last
          }
        }
      }
    `;
    axios
      .post(
        MAIN_API,

        {
          method: 'POST',
          query: print(subDistrictByIdQuery),
        },
        {
          headers: {
            Authorization: '',
          },
        }
      )
      .then(res => {
        setSubDistrictById(
          res?.data?.data?.getSubDistrictListByDistrictId?.data?.subDistrictList
        );
      })
      .catch(err => console.log(err));
  };
  const handleDistrictChange = e => {
    // setDistrictId(e.target.value);
    getSubDistrictById(e.target.value);
  };

  //--------------------------------------------------------------------------
  //--------------- get sub district by district id---------------------------
  //----------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //--------------- get post office by sub district id------------------------
  //----------------------------------------------------------------------------

  const handleSubDistrictChange = e => {
    getPostOfficeBySubDistrict(e.target.value);
  };

  const getPostOfficeBySubDistrict = postOfficeId => {
    const newPostOfficeId = JSON.stringify(postOfficeId);
    const finalPostOfficeId = newPostOfficeId.replace(/"([^"]+)":/g, '$1:');
    const postOfficeQuery = gql`
   query {
      getPostOfficeListBySubDistrictId(
        subDistrictId: ${finalPostOfficeId}
        size: 10000
        offset: 0
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
          postOfficeList {
            id
            name
            postCode
            subDistrict {
              id
              name
              district {
                id
                name
                division {
                  id
                  name
                  country
                }
              }
            }
          }
          offset
          limit
          numberOfElements
          totalElements
          totalPages
          first
          last
        }
      }
    }
  `;

    axios
      .post(
        MAIN_API,

        {
          method: 'POST',
          query: print(postOfficeQuery),
        },
        {
          headers: {
            Authorization: '',
          },
        }
      )
      .then(res => {
        setPostOfficeById(
          res?.data?.data?.getPostOfficeListBySubDistrictId?.data
            ?.postOfficeList
        );
      })
      .catch(err => console.log(err));
  };

  //--------------------------------------------------------------------------
  //--------------- get post office by sub district id------------------------
  //----------------------------------------------------------------------------

  // --------------------------- submitting data to the database ---------------------------
  const onSubmit = (data, e) => {
    setCurrentEmail(data.email);
    setCurrentPhone(data.phone);
    setLoadingModal(true);

    const createUserData = {
      name: data.full_name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      chamberName: data.chamber_name,
      address: {
        streetAddress: data.address,
        subDistrict: {
          id: data.subDistrict,
        },
        district: {
          id: data.district,
        },
        postOffice: {
          id: data.post_office,
        },
      },
    };

    const data2 = JSON.stringify(createUserData);
    const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

    const createUserQuery = gql`
      mutation {
        createAdvocate(
          advocate: ${unquotedData2}
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

    axios
      .post(
        MAIN_API,
        {
          query: print(createUserQuery),
        },
        {
          headers: {
            Authorization: '',
          },
        }
      )
      .then(result => {
        const { createAdvocate } = result?.data?.data;
        if (createAdvocate !== null) {
          const { code, data, errors } = result?.data?.data?.createAdvocate;

          if (code === 200 && data !== null) {
            addToast(
              'Registration has been completed. A few more steps to start your journey.',
              {
                appearance: 'success',
                autoDismiss: true,
              }
            );
            setUserId(data.id);
            setLoadingModal(false);
            handleOpen();
          } else if (code !== 200 && data === null) {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
          setLoadingModal(false);
        } else {
          addToast('Something went wrong. Please try again later.', {
            appearance: 'error',
            autoDismiss: true,
          });
          setLoadingModal(false);
        }
      })
      .catch(
        err =>
          addToast('Something wrong happend', {
            appearance: 'error',
            autoDismiss: true,
          }),
        setLoadingModal(false)
      );
  };

  // ------------------------------------------- complete payment -------------------------------------------
  const completePayment = () => {
    setLoadingModal(true);
    const paymentData = {
      advocate: {
        id: userId,
      },
      pricingPlan: {
        id: packageType?.packageId,
      },
    };

    const data2 = JSON.stringify(paymentData);
    const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

    const createAdvocatePlanPaymentQuery = gql`
      mutation {
        createAdvocatePlanPaymentLink(
          advocatePlan: ${unquotedData2}
        ) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          paymentLink
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(createAdvocatePlanPaymentQuery),
        },
        {
          headers: {
            Authorization: '',
          },
        }
      )
      .then(result => {
        setLoadingModal(false);
        const { createAdvocatePlanPaymentLink } = result?.data?.data;
        if (createAdvocatePlanPaymentLink !== null) {
          const { code, errors, paymentLink } =
            result?.data?.data?.createAdvocatePlanPaymentLink;

          if (code === 200) {
            addToast(
              'Registration has been completed. Proceeding for payment.',
              {
                appearance: 'success',
                autoDismiss: true,
              }
            );
            setTimeout(() => {
              window.location.replace(paymentLink);
            }, 1000);
          } else if (code !== 200) {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
            setLoadingModal(false);
          }
        } else {
          addToast('Something went wrong. Please try again later.', {
            appearance: 'error',
            autoDismiss: true,
          });
          setLoadingModal(false);
        }
      })
      .catch(
        err =>
          addToast('Something wrong happend', {
            appearance: 'error',
            autoDismiss: true,
          }),
        setLoadingModal(false)
      );
  };

  // ------------------------------------------- otp verification -------------------------------------------
  const userOtpVerification = () => {
    const finalOtp = localStorage.getItem('finalOtp');
    const verifyData = {
      id: userId,
      code: finalOtp,
    };
    setLoadingModal(true);

    const onSuccessVerifyOtp = result => {
      const { verifyAdvocateAccount } = result?.data?.data;
      if (verifyAdvocateAccount !== null) {
        const { code, data, errors } =
          result?.data?.data?.verifyAdvocateAccount;

        if (code === 200 && data !== null) {
          addToast('Email has been verified successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          // window.localStorage.clear();
          setVerifiedOtp(true);
          setOpen(false);
          setLoadingModal(false);
        } else if (code !== 200 && data === null) {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
          setLoadingModal(false);
        }
      } else {
        addToast('Something went wrong. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        });
        setLoadingModal(false);
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

  //====================================================================
  //========================== resend otp ==============================
  //====================================================================
  const resendOtpRequest = () => {
    setLoadingModal(true);
    const resendOtpId = {
      advocateId: userId,
    };

    const onSuccessResendOtp = result => {
      const { resendEmailVerificationOTP } = result?.data?.data;
      if (resendEmailVerificationOTP !== null) {
        const { code, data, errors } =
          result?.data?.data?.resendEmailVerificationOTP;

        if (code === 200 && data !== null) {
          addToast('Check your mail for a new OTP code', {
            appearance: 'success',
            autoDismiss: true,
          });
          setLoadingModal(false);
        } else if (code !== 200 && data === null) {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
          setLoadingModal(false);
        }
      } else {
        addToast('Something went wrong. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        });
        setLoadingModal(false);
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
  //========================== resend otp ==============================
  //====================================================================

  useEffect(() => {
    const modal = new URLSearchParams(search).get('error');
    {
      modal === 'true' ? setErrorOpen(modal) : '';
    }
  }, []);

  useEffect(() => {
    const modal = new URLSearchParams(search).get('isOtpVerified');
    {
      modal === 'true' ? setVerifiedOtp(modal) : setUnVerifiedOtp(modal);
    }
  }, []);

  useEffect(() => {
    const modal = new URLSearchParams(search).get('success');
    {
      modal === 'true' ? setPaymentSuccessful(modal) : setErrorOpen(modal);
    }
  }, []);

  const otpInputModal = (
    <div
      className='2xl:w-1/3 sm:w-2/3 w-11/12 bg-white absolute text-primarydark flex flex-col items-center justify-center space-y-10 p-12 rounded-lg'
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
        <span className='font-bold'>{currentEmail}</span>. Didn’t get code?{' '}
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

  const otpVerified = (
    <div
      className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
      }}
    >
      <h1 className='text-3xl font-bold text-center'>Pay Now</h1>
      <div className='flex justify-center items-center'>
        <img className='w-20' src={warn} alt='' />
      </div>
      <p className='text-2xl font-medium text-center leading-relaxed'>
        You will be redirected to <br /> payment gateway.
      </p>
      <div className='border-2 border-dashed border-deepdark bg-lightSilver rounded-lg w-10/12 h-14 flex justify-center items-center font-bold text-xl'>
        Payment:{' '}
        {packageType?.packagePrice
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        /{' '}
        <span className='text-sm'>
          {packageType?.packageType === 'YEARLY' ? 'Yearly' : 'Half Yearly'}
        </span>
      </div>
      <button onClick={() => completePayment()} style={{ outline: 'none' }}>
        <img src={proceed} alt='' />
      </button>
      {/* <span
        onClick={() => setVerifiedOtp(false)}
        className='underline text-sm font-bold cursor-pointer '
      >
        No, Thank You
      </span> */}
    </div>
  );

  // const otpError = (
  //   <div
  //     className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
  //     style={{
  //       top: '50%',
  //       left: '50%',
  //       transform: `translate(-50%, -50%)`,
  //       height: '508px',
  //     }}
  //   >
  //     <h1 className='text-3xl font-bold text-center'>Error</h1>
  //     <div className='flex justify-center items-center'>
  //       <img src={error} alt='' />
  //     </div>
  //     <p className='text-2xl font-medium text-center leading-relaxed'>
  //       Oops!!! Wrong Code.
  //     </p>
  //     <button
  //       onClick={() => setUnVerifiedOtp(false) || setOpen(true)}
  //       style={{ outline: 'none' }}
  //     >
  //       <img src={tryagain} alt='' />
  //     </button>
  //   </div>
  // );

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
        Your payment has been completed. <br />
        Please check your email for more instructions.
      </p>
      <Link
        className='px-5 py-2 bg-primarydark border border-primarydark hover:bg-white text-white hover:text-primarydark transition duration-200 ease-in-out rounded'
        to='/signin'
      >
        Go To Sign In
      </Link>
    </div>
  );

  //========================================
  //===== loading modal -==================
  //=======================================
  const loadongModalView = <Loaders />;

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
        Your payment has been declined or failed. <br /> Please sign in into
        Xattorney to confirm your payment status!
      </p>
      <Link
        className='px-5 py-2 bg-primarydark border border-primarydark hover:bg-white text-white hover:text-primarydark transition duration-200 ease-in-out rounded'
        to='/signin'
      >
        Go To Sign In
      </Link>
    </div>
  );

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <>
      <div className='relative h-auto flex justify-center'>
        <div className='-mt-34 w-full bg-deepdark pb-16'>
          {/* -------------main content--------------- */}
          <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-0 relative flex flex-col lg:mt-44 mt-32 w-full z-50'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='rounded text-primarydark text-center bg-white lg:p-10 p-2 flex flex-col space-y-8'
            >
              <div className=''>
                <h1 className='text-3xl font-bold'>You are almost done !</h1>
                <span className='text-base'>
                  Let us configure your account for you
                </span>
              </div>
              <div className='flex flex-col justify-between space-y-6'>
                <ThemeProvider theme={theme}>
                  <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <FormControl error={errors?.full_name} className='w-full'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Full Name'
                        id='outlined-basic'
                        name='full_name'
                        variant='filled'
                        InputLabelProps={{ className: 'textfield__label' }}
                        color='secondary'
                        error={errors?.full_name}
                        {...register('full_name', { required: true })}
                      />
                      <FormHelperText>
                        {errors?.full_name?.type === 'required' &&
                          'Full Name is required'}
                      </FormHelperText>
                    </FormControl>
                    <FormControl
                      error={errors?.chamber_name}
                      className='w-full'
                    >
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Chamber Name (Optional)'
                        id='outlined-basic'
                        name='text'
                        variant='filled'
                        InputLabelProps={{ className: 'textfield__label' }}
                        color='secondary'
                        error={errors?.chamber_name}
                        {...register('chamber_name', { required: false })}
                      />
                      <FormHelperText>
                        {errors?.chamber_name?.type === 'required' &&
                          'Chamber Name is required'}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <FormControl error={errors?.phone} className='w-full'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Phone No'
                        id='outlined-basic'
                        name='tel'
                        variant='filled'
                        InputLabelProps={{ className: 'textfield__label' }}
                        color='secondary'
                        inputProps={{ maxLength: 11 }}
                        error={errors?.phone}
                        {...register('phone', {
                          required: true,
                          pattern:
                            /(^(\+88|0088|88)?(01){1}[3456789]{1}(\d){8})$/,
                        })}
                      />
                      <FormHelperText>
                        {errors?.phone?.type === 'required'
                          ? 'Phone Number is required'
                          : errors?.phone?.type === 'pattern' &&
                            'Enter a valid phone number'}
                      </FormHelperText>
                    </FormControl>
                    <FormControl error={errors?.email} className='w-full'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Email'
                        id='outlined-basic'
                        name='email'
                        variant='filled'
                        InputLabelProps={{ className: 'textfield__label' }}
                        color='secondary'
                        error={errors?.email}
                        {...register('email', {
                          required: true,
                          pattern:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                      />
                      <FormHelperText>
                        {errors?.email?.type === 'required'
                          ? 'Email address is required'
                          : errors?.email?.type === 'pattern' &&
                            'Enter a valid email address'}
                      </FormHelperText>
                    </FormControl>
                  </div>

                  <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <FormControl error={errors?.address} className='w-full'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Address'
                        id='outlined-basic'
                        name='address'
                        variant='filled'
                        InputLabelProps={{ className: 'textfield__label' }}
                        color='secondary'
                        error={errors?.address}
                        {...register('address', { required: true })}
                      />
                      <FormHelperText>
                        {errors?.address?.type === 'required' &&
                          'Address is required'}
                      </FormHelperText>
                    </FormControl>
                    <FormControl
                      className='w-full'
                      variant='filled'
                      InputLabelProps={{ className: 'textfield__label' }}
                      error={errors.district}
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        District
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='District'
                        name='district'
                        className='bg-lightSilver rounded text-white w-full'
                        color='secondary'
                        {...register('district', { required: true })}
                        onChange={handleDistrictChange}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {district.map(dis => (
                          <MenuItem value={dis.id}>{dis.name}</MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.district?.type === 'required' &&
                          'Please select your district'}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <FormControl
                      className='w-full'
                      variant='filled'
                      error={errors.subDistrict}
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Sub District
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='Sub District'
                        InputLabelProps={{ className: 'textfield__label' }}
                        className='bg-lightSilver rounded text-white w-full'
                        {...register('subDistrict', { required: true })}
                        onChange={handleSubDistrictChange}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {subDistrictById.map(subDistrictById => (
                          <MenuItem value={subDistrictById.id}>
                            {subDistrictById.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.subDistrict?.type === 'required' &&
                          'Please select your Sub District'}
                      </FormHelperText>
                    </FormControl>
                    <FormControl
                      className='w-full'
                      variant='filled'
                      error={errors.post_office}
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Post Office
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        InputLabelProps={{ className: 'textfield__label' }}
                        label='Post Office'
                        className='bg-lightSilver rounded text-white w-full'
                        color='secondary'
                        {...register('post_office', { required: true })}
                        // onChange={handlePostOfficeChange}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {postOfficeById.map(postOffice => (
                          <MenuItem value={postOffice.id}>
                            {postOffice.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {errors.post_office?.type === 'required' &&
                          'Post Office is required.'}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <FormControl
                      className='w-full'
                      variant='filled'
                      InputLabelProps={{ className: 'textfield__label' }}
                      error={errors.password}
                    >
                      <InputLabel htmlFor='outlined-adornment-password'>
                        Password
                      </InputLabel>
                      <FilledInput
                        className='bg-lightSilver rounded text-white w-full'
                        color='secondary'
                        id='outlined-adornment-password'
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        {...register('password', { required: true })}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                            >
                              {values.showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      <FormHelperText>
                        {errors?.password?.type === 'required' &&
                          'Password is required'}
                      </FormHelperText>
                    </FormControl>
                    <FormControl
                      className='w-full'
                      variant='filled'
                      InputLabelProps={{ className: 'textfield__label' }}
                      error={errors?.repeat_pass}
                    >
                      <InputLabel htmlFor='outlined-adornment-password'>
                        Confirm Password
                      </InputLabel>
                      <FilledInput
                        className='bg-lightSilver rounded text-white w-full flex items-center'
                        color='secondary'
                        id='outlined-adornment-password'
                        label='Confirm Password'
                        type={confirmPass ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        {...register('repeat_pass', {
                          required: true,
                          validate: value =>
                            value === password?.current ||
                            'Password do not match',
                        })}
                        endAdornment={
                          <InputAdornment position='end'>
                            <IconButton
                              aria-label='toggle password visibility'
                              onClick={viewConfirmPass}
                              onMouseDown={handleMouseDownPassword}
                              edge='end'
                            >
                              {confirmPass ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                        labelWidth={70}
                      />
                      <FormHelperText>
                        {errors?.repeat_pass?.type === 'required' &&
                          'Confirm Password is required'}
                        {errors?.repeat_pass && errors?.repeat_pass?.message}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <label class='flex flex-col items-start md:text-base text-xs -mt-3'>
                      <div className='flex items-start'>
                        <input
                          type='checkbox'
                          error={errors?.rememberMe}
                          class='sm:h-4 h-10 sm:w-4 w-10 text-green nm-inset-white-sm rounded'
                          {...register('rememberMe', { required: true })}
                        />

                        <span class='ml-2 -mt-1 text-primarydark sm:text-base text-sm'>
                          Check here to indicate that you have read and agree to
                          the{' '}
                          <span
                            onClick={() =>
                              window.open('/terms-and-conditions', '_blank')
                            }
                            className='text-secondarydark cursor-pointer text-lg'
                          >
                            terms & conditions
                          </span>{' '}
                          and{' '}
                          <span
                            onClick={() =>
                              window.open('/privacy-policy', '_blank')
                            }
                            className='text-secondarydark cursor-pointer text-lg'
                          >
                            privacy policies
                          </span>
                        </span>
                      </div>
                      <span className='pl-2 text-red-600 text-xsm'>
                        {errors?.rememberMe?.type === 'required' &&
                          'You must agree to continue'}
                      </span>
                    </label>
                  </div>
                </ThemeProvider>
              </div>
              <div className='flex justify-center items-center'>
                <button
                  // onClick={handleOpen}
                  className='flex justify-center items-center'
                  style={{ outline: 'none' }}
                >
                  <img src={paynow} alt='' />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {otpInputModal}
      </Modal>
      <Modal
        open={verifiedOtp}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {otpVerified}
      </Modal>
      {/* <Modal
        open={unVerifiedOtp}
        onClose={() => setUnVerifiedOtp(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {otpError}
      </Modal> */}
      {/* <Modal
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
      </Modal> */}
      <Modal
        open={loadingModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {loadongModalView}
      </Modal>
    </>
  );
};

export default PaymentDetailsPageComponents;
