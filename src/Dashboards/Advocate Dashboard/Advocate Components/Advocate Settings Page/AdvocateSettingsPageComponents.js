import { Divider } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { useState } from 'react';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import AdvocateSettingsPageChangePassword from './AdvocateSettingsPageChangePassword';
import AdvocateSettingsPageGeneralSettings from './AdvocateSettingsPageGeneralSettings';
import AdvocateSettingsPageNotificationSettings from './AdvocateSettingsPageNotificationSettings';
import AdvocateSettingsPagePlanInfoSettings from './AdvocateSettingsPagePlanInfoSettings';
import AdvocateSettingsPagePrivacyPolicy from './AdvocateSettingsPagePrivacyPolicy';
import AdvocateSettingsPageTermsAndConditions from './AdvocateSettingsPageTermsAndConditions';
import AdvocateSettingsPageTransactionHistory from './AdvocateSettingsPageTransactionHistory';
import AdvocateSettingsPageUpdateAccount from './AdvocateSettingsPageUpdateAccount';
import { Icon } from '@iconify/react';
import bxMenuAltRight from '@iconify-icons/bx/bx-menu-alt-right';
import { Modal } from '@material-ui/core';

const AdvocateSettingsPageComponents = () => {
  const [toggle, setToggle] = useState(1);
  const toggleChange = index => {
    setToggle(index);
  };

  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const paymentSuccess = (
    <div
      className='w-88 bg-white absolute h-auto text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='flex flex-col space-y-3 items-center px-4 text-center'>
        <div
          onClick={() => toggleChange(1) || setPaymentSuccessful(false)}
          className={
            toggle === 1
              ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
              : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
          }
        >
          <span>General</span>
        </div>
        <Divider />
        <div
          onClick={() => toggleChange(2) || setPaymentSuccessful(false)}
          className={
            toggle === 2
              ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
              : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
          }
        >
          <span>Plan Info</span>
        </div>
        <Divider />
        <div
          onClick={() => toggleChange(3) || setPaymentSuccessful(false)}
          className={
            toggle === 3
              ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
              : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
          }
        >
          <span>Notification</span>
        </div>
        <Divider />
        <div
          onClick={() => toggleChange(4) || setPaymentSuccessful(false)}
          className={
            toggle === 4
              ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
              : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
          }
        >
          <span>Change Password</span>
        </div>
        <Divider />
        <div
          onClick={() => toggleChange(5) || setPaymentSuccessful(false)}
          className={
            toggle === 5
              ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
              : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
          }
        >
          <span>Update Account</span>
        </div>
        <Divider />
        <div
          onClick={() => toggleChange(6) || setPaymentSuccessful(false)}
          className={
            toggle === 6
              ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
              : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
          }
        >
          <span>Terms & Conditions</span>
        </div>
        <Divider />
        <div
          onClick={() => toggleChange(7) || setPaymentSuccessful(false)}
          className={
            toggle === 7
              ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
              : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
          }
        >
          <span>Privacy Policy</span>
        </div>
        <Divider />
        <div
          onClick={() => toggleChange(8) || setPaymentSuccessful(false)}
          className={
            toggle === 8
              ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
              : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
          }
        >
          <span>Transaction History</span>
        </div>
        <Divider />
      </div>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='Account Settings' />
      <div className='flex lg:flex-row flex-col lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full h-full'>
        <div className='xl:hidden flex justify-end mt-10 relative'>
          <div>
            <Icon
              onClick={() => setPaymentSuccessful(!paymentSuccessful)}
              className='text-3xl text-primarylight'
              icon={bxMenuAltRight}
            />
          </div>
        </div>
        <Paper className='rounded-md w-1/5 h-full lg:flex hidden' elevation={4}>
          <div className='flex flex-col w-full bg-white rounded-md font-medium'>
            <div
              onClick={() => toggleChange(1)}
              className={
                toggle === 1
                  ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
                  : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
              }
            >
              <span>General</span>
            </div>
            <Divider />
            <div
              onClick={() => toggleChange(2)}
              className={
                toggle === 2
                  ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
                  : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
              }
            >
              <span>Plan Info</span>
            </div>
            <Divider />
            <div
              onClick={() => toggleChange(3)}
              className={
                toggle === 3
                  ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
                  : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
              }
            >
              <span>Notification</span>
            </div>
            <Divider />
            <div
              onClick={() => toggleChange(4)}
              className={
                toggle === 4
                  ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
                  : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
              }
            >
              <span>Change Password</span>
            </div>
            <Divider />
            <div
              onClick={() => toggleChange(5)}
              className={
                toggle === 5
                  ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
                  : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
              }
            >
              <span>Update Account</span>
            </div>
            <Divider />
            <div
              onClick={() => toggleChange(6)}
              className={
                toggle === 6
                  ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
                  : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
              }
            >
              <span>Terms & Conditions</span>
            </div>
            <Divider />
            <div
              onClick={() => toggleChange(7)}
              className={
                toggle === 7
                  ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
                  : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
              }
            >
              <span>Privacy Policy</span>
            </div>
            <Divider />
            <div
              onClick={() => toggleChange(8)}
              className={
                toggle === 8
                  ? 'text-primarydark cursor-pointer h-13 flex justify-start items-center px-4'
                  : 'text-primarydark opacity-70 cursor-pointer h-13 flex justify-start items-center px-4'
              }
            >
              <span>Transaction History</span>
            </div>
            <Divider />
          </div>
        </Paper>

        {/* toggle components */}
        <div className='lg:w-4/5 w-full h-full'>
          {/* toggle 1 General */}
          <div
            className={
              toggle === 1 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateSettingsPageGeneralSettings />
          </div>

          {/* toggle 2 Plan Information */}
          <div
            className={
              toggle === 2 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateSettingsPagePlanInfoSettings />
          </div>

          {/* toggle 3 Notification */}
          <div
            className={
              toggle === 3 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateSettingsPageNotificationSettings />
          </div>

          {/* toggle 4 Change Password */}
          <div
            className={
              toggle === 4 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateSettingsPageChangePassword />
          </div>

          {/* toggle 5 Plan Information */}
          <div
            className={
              toggle === 5 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateSettingsPageUpdateAccount />
          </div>

          {/* toggle 2 Plan Information */}
          <div
            className={
              toggle === 6 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateSettingsPageTermsAndConditions />
          </div>

          {/* toggle 2 Plan Information */}
          <div
            className={
              toggle === 7 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateSettingsPagePrivacyPolicy />
          </div>

          {/* toggle 2 Plan Information */}
          <div
            className={
              toggle === 8 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateSettingsPageTransactionHistory />
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

export default AdvocateSettingsPageComponents;
