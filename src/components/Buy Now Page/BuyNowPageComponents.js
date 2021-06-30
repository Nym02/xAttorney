import { Icon } from '@iconify/react';
import { useContext, useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import greentick from '../../assets/images/greentick.svg';
import { DataContext } from '../../Context Api/ManageData';
import tickSolid from '@iconify-icons/teenyicons/tick-solid';
import BuyNowPackageComp from './BuyNowPackageComp';
import secondsubmit from '../../assets/images/secondary-buynow-button.svg';
import { Link } from 'react-router-dom';

const BuyNowPageComponents = () => {
  const { pricingPlan, setPricingPlan } = useContext(DataContext);
  const { addToast } = useToasts();
  const [toggle, setToggle] = useState('HALF_YEARLY');
  const toggleChange = index => {
    setToggle(index);
  };

  return (
    <>
      <div className='relative h-auto flex justify-center'>
        <div className='-mt-34 w-full bg-deepdark pb-16'>
          {/* -------------main content--------------- */}
          <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 relative flex flex-col lg:mt-56 mt-36 w-full z-50'>
            <div className='flex flex-col items-center space-y-2 text-center w-full'>
              <h1 className='text-3xl text-white font-bold capitalize'>
                Simple, Transparent Pricing
              </h1>
              <span className='text-secondarydark capitalize'>
                No Contracts, No Surprise Fees
              </span>
            </div>

            {/* pricing cards */}
            <div className='flex justify-center items-center w-full'>
              <div className='flex flex-col items-start mt-30'>
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
                        <div className='sm:w-106 w-full h-auto rounded bg-white text-primarydark sm:p-12 p-4 flex flex-col space-y-10'>
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
                            <Link
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
                            </Link>
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
        </div>
      </div>
    </>
  );
};

export default BuyNowPageComponents;
