import { useState } from 'react';
import AdvocateCasePageTableComponent from './Advocate Case Page Table/AdvocateCasePageTableComponent';
import AdvocateCasePageTableNextMonth from './Advocate Case Page Table/AdvocateCasePageTableNextMonth';
import AdvocateCasePageTableThisMonth from './Advocate Case Page Table/AdvocateCasePageTableThisMonth';
import AdvocateCasePageTableToday from './Advocate Case Page Table/AdvocateCasePageTableToday';
import AdvocateCasePageTableTomorrow from './Advocate Case Page Table/AdvocateCasePageTableTomorrow';
import AdvocateCasePageTableUpcoming from './Advocate Case Page Table/AdvocateCasePageTableUpcoming';
import AdvocateCasePageTableYesterday from './Advocate Case Page Table/AdvocateCasePageYesterday';
import { Icon } from '@iconify/react';
import bxMenuAltRight from '@iconify-icons/bx/bx-menu-alt-right';
import { Modal } from '@material-ui/core';

const AdvocateCasePageTabComponents = () => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(1);
  const toggleChange = index => {
    setToggle(index);
  };

  const paymentSuccess = (
    <div
      className='w-88 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '350px',
      }}
    >
      <div className='flex flex-col space-y-3 items-center px-10'>
        <div
          onClick={() => toggleChange(1) || setPaymentSuccessful(false)}
          className={
            toggle === 1
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span>Today</span>
        </div>
        <div
          onClick={() => toggleChange(2) || setPaymentSuccessful(false)}
          className={
            toggle === 2
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span>Tomorrow</span>
        </div>
        <div
          onClick={() => toggleChange(3) || setPaymentSuccessful(false)}
          className={
            toggle === 3
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span>Upcoming</span>
        </div>
        <div
          onClick={() => toggleChange(4) || setPaymentSuccessful(false)}
          className={
            toggle === 4
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span>Previous</span>
        </div>
        <div
          onClick={() => toggleChange(5) || setPaymentSuccessful(false)}
          className={
            toggle === 5
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span>This month</span>
        </div>
        <div
          onClick={() => toggleChange(6) || setPaymentSuccessful(false)}
          className={
            toggle === 6
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span>Next Month</span>
        </div>
        <div
          onClick={() => toggleChange(7) || setPaymentSuccessful(false)}
          className={
            toggle === 7
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span>All Cases</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className='flex flex-col space-y-4'>
        <div className='flex justify-between border-b border-deepIndigo lg:border-opacity-60 border-opacity-100'>
          <div className='xl:hidden flex justify-start mt-10 relative'>
            <div className='-mt-10'>
              <Icon
                onClick={() => setPaymentSuccessful(!open)}
                className='text-3xl text-primarylight'
                icon={bxMenuAltRight}
              />
            </div>
          </div>
          <div className='xl:flex hidden items-center justify-start space-x-4 text-base font-medium'>
            <div
              onClick={() => toggleChange(1)}
              className={
                toggle === 1
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>Today</span>
            </div>
            <div
              onClick={() => toggleChange(2)}
              className={
                toggle === 2
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>Tomorrow</span>
            </div>
            <div
              onClick={() => toggleChange(3)}
              className={
                toggle === 3
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>Upcoming</span>
            </div>
            <div
              onClick={() => toggleChange(4)}
              className={
                toggle === 4
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>Previous</span>
            </div>
            <div
              onClick={() => toggleChange(5)}
              className={
                toggle === 5
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>This month</span>
            </div>
            <div
              onClick={() => toggleChange(6)}
              className={
                toggle === 6
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>Next Month</span>
            </div>
            <div
              onClick={() => toggleChange(7)}
              className={
                toggle === 7
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>All Cases</span>
            </div>
          </div>
        </div>
        {/* toggle components */}
        <div>
          {/* toggle 1 new users */}
          <div
            className={
              toggle === 1 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateCasePageTableToday />
          </div>
          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 2 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateCasePageTableTomorrow />
          </div>
          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 3 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateCasePageTableUpcoming />
          </div>
          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 4 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateCasePageTableYesterday />
          </div>
          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 5 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateCasePageTableThisMonth />
          </div>
          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 6 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateCasePageTableNextMonth />
          </div>
          <div
            className={
              toggle === 7 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateCasePageTableComponent />
          </div>
        </div>
      </div>
      <Modal
        open={paymentSuccessful}
        onClose={() => setPaymentSuccessful(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {paymentSuccess}
      </Modal>
    </>
  );
};

export default AdvocateCasePageTabComponents;
