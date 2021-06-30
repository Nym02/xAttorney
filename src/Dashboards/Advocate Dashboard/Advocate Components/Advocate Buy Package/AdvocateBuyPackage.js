import axios from 'axios';
import gql from 'graphql-tag';
import { Modal, Paper } from '@material-ui/core';
import { useContext, useState } from 'react';
import { DataContext } from '../../../../Context Api/ManageData';
import { print } from 'graphql';
import { useToasts } from 'react-toast-notifications';
import proceed from '../../../../assets/images/proceed-to-payment.svg';
import taka from '../../../../assets/images/taka.svg';
import warn from '../../../../assets/images/warn.svg';
import { MAIN_API } from '../../../../Utils/APIs';
import { decodedAdvocateId, logoutFunc } from '../../../../Utils/UserToken';
import modalClose from '../../../../assets/images/modal-close.svg';
import Loaders from '../../../../components/Typographys/Loaders/Loaders';
import { Icon } from '@iconify/react';
import greentick from '../../../../assets/images/greentick.svg';
import tickSolid from '@iconify-icons/teenyicons/tick-solid';

const AdvocateBuyPackage = () => {
  const [loadingModal, setLoadingModal] = useState(false);
  const { pricingPlan } = useContext(DataContext);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [toggle, setToggle] = useState('HALF_YEARLY');
  const toggleChange = index => {
    setToggle(index);
  };

  const { addToast } = useToasts();
  const packageType = JSON.parse(window.localStorage.getItem('packageDetails'));

  const completePayment = () => {
    setLoadingModal(true);
    const paymentData = {
      advocate: {
        id: decodedAdvocateId,
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
      .catch(
        err =>
          addToast('Something wrong happend', {
            appearance: 'error',
            autoDismiss: true,
          }),
        setLoadingModal(false)
      );
  };

  const otpVerified = (
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
        <img className='w-20' src={taka} alt='' />
      </div>
      <p className='text-2xl font-medium text-center leading-relaxed'>
        You will be redirected to <br /> payment gateway.
      </p>
      <div className='border-2 border-dashed border-deepdark bg-lightSilver rounded-lg w-10/12 h-14 flex justify-center items-center font-bold text-xl'>
        Payment: {packageType?.packagePrice}/{' '}
        <span className='text-sm'>
          {packageType?.packageType === 'YEARLY' ? 'Yearly' : 'Half Yearly'}
        </span>
      </div>
      <button onClick={() => completePayment()} style={{ outline: 'none' }}>
        <img src={proceed} alt='' />
      </button>
      <span
        onClick={() => setVerifiedOtp(false)}
        className='underline text-sm font-bold cursor-pointer '
      >
        No, Thank You
      </span>
    </div>
  );

  const deleteTableData = (
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
            onClick={() => setDeleteModal(false)}
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
          onClick={() => setDeleteModal(false)}
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
        {/* <Paper elevation={3} className='w-2/5'>
          <div
            className='2xl:w-3/5 xl:w-2/3 w-11/12 h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
            style={{
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
              <span>Complete Your Payment</span>
            </div>
            <div className='px-6 flex flex-col items-center space-y-6 pb-10'>
              <div className='-mt-20 flex flex-col items-center space-y-2'>
                <span>You haven't choose a pricing plan yet.</span>
                <h1 className='text-3xl font-bold text-center text-pink-900'>
                  Choose a pricing plan
                </h1>
              </div>
              <div className='w-full flex justify-between items-start text-white space-x-4'>
                {pricingPlan.map((value, index) =>
                  value.inactive === true ? (
                    <> </>
                  ) : (
                    <div className='bg-deepdark rounded h-auto w-1/2 p-6 flex flex-col items-center space-y-5'>
                      <div className='flex items-center text-lg space-x-2'>
                        <h1 className='font-medium text-secondarydark'>
                          Package Type:{' '}
                        </h1>
                        <span>
                          {value.planMode === 'HALF_YEARLY'
                            ? 'Basic'
                            : 'Premium'}
                        </span>
                      </div>
                      <div className='flex items-center text-lg space-x-2'>
                        <h1 className='font-medium text-secondarydark'>
                          Total Amount:{' '}
                        </h1>
                        <span className='line-through'>{value.price} Tk</span>
                      </div>
                      <div className='flex items-center text-lg space-x-2'>
                        <h1 className='font-medium text-secondarydark'>
                          Discounted Amount:{' '}
                        </h1>
                        <span>{value.discountedAmount} Tk</span>
                      </div>
                      <div className='flex justify-center space-x-8 items-center'>
                        <button
                          onClick={() => {
                            const packageData = {
                              packageType: value?.planMode,
                              packagePrice: value?.discountedAmount,
                              packageId: value?.id,
                            };

                            const finalPackageData =
                              JSON.stringify(packageData);
                            window.localStorage.setItem(
                              'packageDetails',
                              finalPackageData
                            );
                            setVerifiedOtp(true);
                          }}
                          style={{ outline: 'none' }}
                          className='w-32 py-2 rounded flex justify-center items-center bg-pink-900 hover:bg-white text-white hover:text-pink-900 transition duration-200 ease-in-out'
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className='mt-10 pb-6 flex justify-center items-center'>
                <button
                  onClick={() => setDeleteModal(true)}
                  style={{ outline: 'none' }}
                  className='w-32 py-2 rounded flex justify-center items-center bg-secondarydark hover:bg-white text-white hover:text-secondarydark transition duration-200 ease-in-out'
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </Paper> */}
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
              <span>Complete Your Payment</span>
            </div>
            <div className='mt-10 flex justify-end items-center px-16'>
              <button
                onClick={() => setDeleteModal(true)}
                style={{ outline: 'none' }}
                className='w-32 py-2 rounded flex justify-center items-center bg-secondarydark hover:bg-white text-white hover:text-secondarydark transition duration-200 ease-in-out'
              >
                Logout
              </button>
            </div>
            <div className='px-6 flex flex-col items-center space-y-6'>
              <div className='-mt-24 flex flex-col items-center space-y-2'>
                <span>You haven't choose a pricing plan yet.</span>
                <h1 className='text-3xl font-bold text-center text-pink-900'>
                  Choose a pricing plan
                </h1>
              </div>
            </div>
            <div className='flex justify-center items-center w-full pb-10 pt-4'>
              <div className='flex flex-col items-start'>
                {/* ************************** switch ************************** */}
                <div className='sm:ml-10 ml-3 z-30 -mb-24'>
                  <div className='lg:w-56 w-48 lg:h-14 h-12 rounded-3xl bg-lightSilver p-1 flex justify-evenly items-center'>
                    <div
                      onClick={() => toggleChange('HALF_YEARLY')}
                      className={
                        toggle === 'HALF_YEARLY'
                          ? 'bg-secondarydark rounded-2xl h-5/6 w-1/2 flex justify-center items-center cursor-pointer text-white font-semibold'
                          : 'text-primarydark font-medium cursor-pointer'
                      }
                    >
                      <span className='lg:text-base text-xsm'>Half Yearly</span>
                    </div>
                    <div
                      onClick={() => toggleChange('YEARLY')}
                      className={
                        toggle === 'YEARLY'
                          ? 'bg-secondarydark rounded-2xl h-5/6 w-1/2 flex justify-center items-center cursor-pointer text-white font-semibold'
                          : 'text-primarydark font-medium cursor-pointer'
                      }
                    >
                      <span className='lg:text-base text-xsm'>Yearly</span>
                    </div>
                  </div>
                </div>
                {/* ************************** switch ************************** */}

                {pricingPlan.map((value, index) =>
                  value.inactive === true ? (
                    <> </>
                  ) : (
                    <>
                      <div
                        className={
                          toggle === value.planMode
                            ? 'w-full h-full flex lg:flex-row flex-col lg:space-x-8 space-x-0 lg:space-y-0 space-y-8'
                            : 'hidden'
                        }
                      >
                        <div className='sm:w-106 w-full h-auto rounded bg-primarydark text-white sm:p-12 p-4 flex flex-col space-y-10'>
                          <div className='flex flex-col space-y-8 mt-32'>
                            {value.featureList.map((feature, key) => (
                              <div className='flex justify-between items-center'>
                                <span key={key}>{feature}</span>
                                <img src={greentick} alt='' />
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className='sm:w-106 w-full h-auto rounded bg-secondarylight text-primarydark sm:p-12 p-4'>
                          <div className='flex justify-between items-start'>
                            <div>
                              <h1 className='font-bold text-3xl'>
                                {value.planMode === 'HALF_YEARLY'
                                  ? 'Basic'
                                  : 'Premium'}
                              </h1>
                              <span className='inline-block h-1 w-8 bg-primarydark mt-3 mb-4' />
                            </div>
                            <div className='flex flex-col items-end'>
                              <div className='flex items-baseline space-x-1'>
                                <span className='line-through text-base text-primarylight font-semibold uppercase'>
                                  {value.price} Tk
                                </span>
                                <span className='text-3xl font-bold uppercase'>
                                  {value.discountedAmount} Tk
                                </span>
                              </div>
                              <span className='text-base capitalize font-semibold'>
                                {value.planMode === 'YEARLY'
                                  ? 'Yearly'
                                  : 'Half Yearly'}
                              </span>
                            </div>
                          </div>
                          <div className='flex justify-center items-center mb-7 mt-2'>
                            {/* <Link
                          to='/buynow/payment-details'
                          style={{ outline: 'none' }}
                          className='self-center flex justify-center items-center'
                          onClick={() => {
                            const packageData = {
                              packageType: value?.planMode,
                              packagePrice: value?.discountedAmount,
                              packageId: value?.id,
                            };

                            const finalPackageData =
                              JSON.stringify(packageData);
                            window.localStorage.setItem(
                              'packageDetails',
                              finalPackageData
                            );
                          }}
                        >
                          <img src={secondsubmit} alt='' />
                        </Link> */}
                            <button
                              onClick={() => {
                                const packageData = {
                                  packageType: value?.planMode,
                                  packagePrice: value?.discountedAmount,
                                  packageId: value?.id,
                                };

                                const finalPackageData =
                                  JSON.stringify(packageData);
                                window.localStorage.setItem(
                                  'packageDetails',
                                  finalPackageData
                                );
                                setVerifiedOtp(true);
                              }}
                              style={{ outline: 'none' }}
                              className='w-32 py-2 rounded flex justify-center items-center bg-deepdark hover:bg-white text-white hover:text-deepdark transition duration-200 ease-in-out'
                            >
                              Buy Now
                            </button>
                          </div>
                          {/* package details */}
                          <div className='flex flex-col space-y-6'>
                            <p className='text-lg font-medium'>
                              All of the benefits from this package
                            </p>
                            <div className='flex flex-col space-y-4'>
                              {value.benefitList.map((benefit, key) => (
                                <div className='flex items-center space-x-4'>
                                  <Icon className='text-2xl' icon={tickSolid} />
                                  <span
                                    key={index}
                                    className='text-sm tracking-tight'
                                  >
                                    {benefit}
                                  </span>
                                </div>
                              ))}
                            </div>
                            {/* <Link
                              to='/buynow/payment-details'
                              style={{ outline: 'none' }}
                              className='self-center'
                              onClick={() => {
                                const packageData = {
                                  packageType: value?.planMode,
                                  packagePrice: value?.discountedAmount,
                                  packageId: value?.id,
                                };

                                const finalPackageData =
                                  JSON.stringify(packageData);
                                window.localStorage.setItem(
                                  'packageDetails',
                                  finalPackageData
                                );
                              }}
                            >
                              <img src={secondsubmit} alt='' />
                            </Link> */}
                          </div>
                        </div>
                      </div>{' '}
                    </>
                  )
                )}
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
        {otpVerified}
      </Modal>
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
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

export default AdvocateBuyPackage;
