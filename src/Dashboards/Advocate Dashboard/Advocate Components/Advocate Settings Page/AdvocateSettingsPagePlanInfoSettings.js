import {
  Paper,
  Divider,
  ThemeProvider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Modal,
  FormHelperText,
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import payNow from '../../../../assets/images/pay-now.svg';
import proceed from '../../../../assets/images/proceed-to-payment.svg';
import warn from '../../../../assets/images/warn.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import theme from '../../../../theme';
import { DataContext } from '../../../../Context Api/ManageData';
import {
  decodedAdvocateId,
  finalNewLoginToken,
  latestPlanId,
} from '../../../../Utils/UserToken';
import gql from 'graphql-tag';
import axios from 'axios';
import { MAIN_API } from '../../../../Utils/APIs';
import { print } from 'graphql';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

const AdvocateSettingsPagePlanInfoSettings = () => {
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentConfirm, setPaymentConfirm] = useState(false);
  const { dashboardSummary } = useContext(DataContext);
  const { pricingPlan } = useContext(DataContext);
  const [selectedPricingPlan, setSelectedPricingPlan] = useState('');
  const { addToast } = useToasts();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const packageType = pricingPlan?.find(({ id }) => id === selectedPricingPlan);

  //=====================================================
  //---------------- submit playment --------------------
  //=====================================================
  const onSubmit = (data, e) => {
    setSelectedPricingPlan(data?.pricingPlanMode);
    setPaymentConfirm(true);
  };

  const completePayment = () => {
    const paymentData = {
      advocate: {
        id: decodedAdvocateId,
      },
      pricingPlan: {
        id: selectedPricingPlan,
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
        const { createAdvocatePlanPaymentLink } = result?.data?.data;
        if (createAdvocatePlanPaymentLink !== null) {
          const { code, errors, paymentLink } =
            result?.data?.data?.createAdvocatePlanPaymentLink;

          if (code === 200) {
            addToast('Proceeding for payment.', {
              appearance: 'success',
              autoDismiss: true,
            });
            setTimeout(() => {
              window.location.replace(paymentLink);
            }, 1000);
          } else if (code !== 200) {
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
      })
      .catch(err =>
        addToast('Something wrong happend', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
  //=====================================================
  //---------------- submit playment --------------------
  //=====================================================

  const openPaymentModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Select Package Plan</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpenPayment(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full px-12 flex flex-col space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <FormControl
            error={errors.pricingPlanMode}
            className='w-full'
            variant='outlined'
          >
            <InputLabel id='demo-simple-select-outlined-label'>
              Package Type
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              label='Package Type'
              className='bg-lightSilver rounded text-white w-full'
              color='secondary'
              name='pricingPlanMode'
              {...register('pricingPlanMode', { required: true })}
            >
              {pricingPlan?.map(pricingPlan => (
                <MenuItem value={pricingPlan?.id}>
                  {pricingPlan?.planMode === 'YEARLY'
                    ? 'Yearly'
                    : 'Half Yearly'}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.pricingPlanMode?.type === 'required' &&
                'You must select a package to continue'}
            </FormHelperText>
          </FormControl>
        </ThemeProvider>
        <div className='w-full flex justify-center items-center'>
          <button
            type='submit'
            // onClick={() => setPaymentConfirm(true) || setOpenPayment(false)}
            style={{ outline: 'none' }}
            className='bg-deepdark text-white px-5 py-2 border border-deepdark hover:bg-white hover:text-deepdark transition duration-200 ease-in-out rounded'
          >
            {/* <img src={proceed} alt='' /> */}
            Proceed to Payemnt
          </button>
        </div>
      </form>
    </div>
  );

  const confirmPayment = (
    <div
      className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
        zIndex: '5000',
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
        {packageType?.discountedAmount
          ?.toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        /{' '}
        <span className='text-sm'>
          {packageType?.planMode === 'YEARLY' ? 'Yearly' : 'Half Yearly'}
        </span>
      </div>
      <button onClick={() => completePayment()} style={{ outline: 'none' }}>
        <img src={proceed} alt='' />
      </button>
      <span
        onClick={() => setPaymentConfirm(false)}
        className='text-sm font-bold cursor-pointer '
      >
        No, Thank You
      </span>
    </div>
  );

  return (
    <>
      <Paper className='w-full rounded-md' elevation={4}>
        <div className='w-full bg-white rounded-md h-104 text-primarydark'>
          <div className='h-13 flex justify-start items-center pl-4 pr-12'>
            <h1 className='font-semibold text-lg'>Plan Information</h1>
          </div>
          <Divider />
          <div className='flex flex-col justify-center items-center pl-4 lg:pr-12 pr-4 w-full mt-13'>
            <div className='flex flex-col items-center space-y-6 lg:w-2/3 w-full'>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-lg font-semibold'>Plan</h1>
                <span className='text-lg text-blue-400'>
                  {dashboardSummary?.latestAdvocatePlan?.pricingPlan
                    ?.planMode !== null ? (
                    <>
                      {dashboardSummary?.latestAdvocatePlan?.pricingPlan
                        ?.planMode === 'YEARLY'
                        ? 'Premium'
                        : 'Basic'}{' '}
                    </>
                  ) : (
                    'No Plan Info'
                  )}
                </span>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-lg font-semibold'>Duration</h1>
                <span className='text-lg text-blue-400'>
                  {dashboardSummary?.latestAdvocatePlan?.pricingPlan
                    ?.planMode !== null ? (
                    <>
                      {dashboardSummary?.latestAdvocatePlan?.pricingPlan
                        ?.planMode === 'YEARLY'
                        ? '1 Year '
                        : '6 Months'}{' '}
                    </>
                  ) : (
                    ''
                  )}
                </span>
              </div>
              <div className='flex justify-between items-center w-full'>
                <h1 className='text-lg font-semibold'>Remaining</h1>
                <span className='text-lg text-blue-400'>
                  {dashboardSummary?.latestPlanRemainingDays}{' '}
                  {dashboardSummary?.latestPlanRemainingDays <= '1'
                    ? 'Day'
                    : 'Days'}
                </span>
              </div>
            </div>
            <div className='flex justify-start items-center lg:w-2/3 w-full mt-16'>
              <p className='text-lg font-semibold w-full text-center'>
                N.B- Pay Within{' '}
                <span className='text-secondarydark text-3xl font-semibold'>
                  {dashboardSummary?.latestPlanRemainingDays}
                </span>{' '}
                {dashboardSummary?.latestPlanRemainingDays <= '1'
                  ? 'Day'
                  : 'Days'}
                . Enjoy Hassle Free XATTORNEY
              </p>
            </div>
            <button
              onClick={() => setOpenPayment(true)}
              className='mt-16'
              style={{ outline: 'none' }}
            >
              <img src={payNow} alt='' />
            </button>
          </div>
          <div className='flex flex-col justify-center items-center w-full mt-10'>
            <h1 className='text-primarydark text-base text-center border-b border-secondarydark -ml-6'>
              Payment Channels
            </h1>
            <div className='w-full'>
              <img src='/SSLCommerz-Pay-With-logo-All-Size-01.png' alt='' />
            </div>
          </div>
        </div>
      </Paper>
      <Modal
        open={openPayment}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {openPaymentModal}
      </Modal>
      <Modal
        open={paymentConfirm}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {confirmPayment}
      </Modal>
    </>
  );
};

export default AdvocateSettingsPagePlanInfoSettings;
