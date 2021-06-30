import { Paper } from '@material-ui/core';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import crossIcon from '@iconify-icons/akar-icons/cross';
import tickCircleSolid from '@iconify-icons/teenyicons/tick-circle-solid';
import pauseNow from '../../../../../assets/images/pause-now.svg';

const SuperAdminPlansPageActivePlanCard = ({
  packageType,
  discountPrice,
  mainPrice,
  planMode,
  features,
  benefits,
}) => {
  const [openFeature, setOpenFeature] = useState(false);
  const [openBenefit, setOpenBenefit] = useState(false);

  return (
    <>
      <Paper
        elevation={4}
        className={
          openFeature || openBenefit ? 'h-auto rounded-md' : 'h-80 rounded-md'
        }
      >
        <div className='w-full h-full bg-white rounded-md text-primarydark px-11 py-6'>
          {/* title and prices */}
          <div className='flex items-center justify-between'>
            <div className='flex flex-col space-y-3 items-start'>
              <h1 className='text-2xl font-semibold'>{packageType}</h1>
              <h2>
                Plan Mode: <span className='font-semibold'>{planMode}</span>
              </h2>
            </div>
            <div className='flex flex-col space-y-3 items-end'>
              <h1 className='text-2xl'>
                Discounted Price:{' '}
                <span className='font-semibold'>{discountPrice} TK</span>
              </h1>
              <h1>
                Regular Price:{' '}
                <span className='font-semibold'>{mainPrice} TK</span>
              </h1>
            </div>
          </div>

          {/* fetures list */}
          <Paper elevation={5} className={openFeature ? 'h-76' : 'h-11 w-full'}>
            <div
              onClick={() => setOpenFeature(!openFeature)}
              className={
                openFeature
                  ? 'px-8 py-3 mt-5 flex flex-col justify-center space-y-5'
                  : 'bg-white text-primarydark px-8 flex items-center justify-between mt-5 rounded-md h-full w-full'
              }
            >
              <div className='flex justify-between items-center w-full'>
                <h1 className='font-bold text-base text-primarydark'>
                  Feature List
                </h1>
                <div className={openFeature ? '' : 'transform -rotate-45'}>
                  <Icon
                    onClick={() => setOpenFeature(!openFeature)}
                    icon={crossIcon}
                  />
                </div>
              </div>
              <div
                className={
                  openFeature ? 'flex flex-col bg-white px-2' : 'hidden'
                }
              >
                <ul className='list-disc list-inside flex flex-col space-y-6 text-primarydark'>
                  {features.map(feature => (
                    <li>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Paper>
          {/* benefit section */}
          <Paper elevation={5} className={openBenefit ? 'h-76' : 'h-11 w-full'}>
            <div
              onClick={() => setOpenBenefit(!openBenefit)}
              className={
                openBenefit
                  ? 'px-8 py-3 mt-2 flex flex-col justify-center space-y-5'
                  : 'bg-white text-primarydark px-8 flex items-center justify-between mt-2 rounded-md h-full w-full'
              }
            >
              <div className='flex justify-between items-center w-full'>
                <h1 className='font-bold text-base text-primarydark'>
                  Benefit List
                </h1>
                <div className={openBenefit ? '' : 'transform -rotate-45'}>
                  <Icon
                    onClick={() => setOpenBenefit(!openBenefit)}
                    icon={crossIcon}
                  />
                </div>
              </div>
              <div
                className={
                  openBenefit ? 'flex flex-col bg-white px-2' : 'hidden'
                }
              >
                <ul className='list-disc list-inside flex flex-col space-y-6 text-primarydark'>
                  {benefits.map(benefit => (
                    <li>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Paper>

          {/* status section */}
          <div className='mt-9 flex justify-between items-center'>
            {/* status */}
            <div className='flex items-center space-x-2'>
              <span>Status:</span>
              <div className='flex items-center justify-center space-x-1 text-white bg-deepGreen h-9 w-36 rounded-full'>
                <Icon icon={tickCircleSolid} />
                <span>Active Now</span>
              </div>
            </div>

            {/* pause buttons */}
            <div className='flex items-center space-x-3'>
              <button className='h-9 w-32 text-sm font-bold text-secondarydark border border-secondarydark rounded-md'>
                Delete
              </button>
              <button className='h-9 w-32 text-sm font-bold text-secondarydark border border-secondarydark rounded-md'>
                Edit
              </button>
              <button>
                <img src={pauseNow} alt='' />
              </button>
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default SuperAdminPlansPageActivePlanCard;
