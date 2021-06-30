import { makeStyles, MenuItem, Modal, Paper } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import { useContext, useState } from 'react';
import avatar from '../../../assets/images/avatar-img.svg';
import notificationbell from '../../../assets/images/notification-bell.svg';
import settings from '../../../assets/images/settings-dashboard.svg';
import { DataContext } from '../../../Context Api/ManageData';
import modalClose from '../../../assets/images/modal-close.svg';
import warn from '../../../assets/images/logout.svg';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 100,
    right: 0,
    left: 76 + '%',
    zIndex: 1,
    border: 'none',
    borderRadius: '20px',
    boxShadow: '0px 0px 3px 2px #d8d8d8',
    padding: '10px 8px',
    backgroundColor: 'white',
    width: '300px',
    maxHeight: '386px',
    overflowY: 'scroll',
  },
}));
const SuperAdminNavbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { adminDashboardSummary } = useContext(DataContext);
  const [deleteModal, setDeleteModal] = useState(false);

  const handleClick = () => {
    setOpen(prev => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  const logoutFunc = () => {
    window.localStorage.removeItem('loginInfo');
    window.location.replace('/signin');
  };

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

  return (
    <>
      <div className='pt-12 pb-9'>
        <div className='h-20 w-full flex items-start justify-between'>
          <div>
            <h2 className='text-darkSilver'>
              Hello{' '}
              <span className='text-primarydark font-medium capitalize'>
                {adminDashboardSummary?.admin?.name}
              </span>
              ,
            </h2>
          </div>
          <div className='flex items-center space-x-12'>
            {/* <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                <img
                  src={notificationbell}
                  alt=''
                  onClick={handleClick}
                  style={{ cursor: 'pointer' }}
                />
                {open ? (
                  <div className={classes.dropdown}>
                    <div className='flex justify-between items-center border-b-2 pb-2 text-sm	'>
                      <h4 className='text-sm'>Notification</h4>
                      <button
                        className='focus:outline-none'
                        style={{ color: '#5D5FEF' }}
                      >
                        Mark All as read
                      </button>
                    </div>

                    <div className='notification-area'>
                      <div className='flex justify-between space-x-2 items-center py-2 border-b-2 pb-2'>
                        <div className='flex justify-center items-center'>
                          <div className='w-12 h-12 bg-black rounded-full '></div>
                        </div>
                        <div className=''>
                          <p>
                            <span className='font-bold text-sm'>
                              Md. Asif Iqbal
                            </span>{' '}
                            Ordered a new case.
                          </p>
                          <p>Just Now</p>
                        </div>
                      </div>
                      <div className='flex justify-between space-x-2 items-center py-2 border-b-2 pb-2'>
                        <div className='flex justify-center items-center'>
                          <div className='w-12 h-12 bg-black rounded-full '></div>
                        </div>
                        <div className=''>
                          <p>
                            <span className='font-bold text-sm'>
                              Md. Asif Iqbal
                            </span>{' '}
                            Ordered a new case.
                          </p>
                          <p>Just Now</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </ClickAwayListener>
            <img src={settings} alt='' /> */}
            {/* <div
              style={{ boxShadow: '0px 4px 14px rgba(34, 37, 169, 0.4)' }}
              className='h-10 w-10 rounded-full bg-primarydark'
            ></div> */}
            <Paper elevation={3}>
              <button
                onClick={() => setDeleteModal(true)}
                style={{ outline: 'none' }}
                className='text-red-800 text-sm w-20 h-9 rounded-xl'
              >
                Logout
              </button>
            </Paper>
          </div>
        </div>
      </div>

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
      </Modal>
    </>
  );
};
export default SuperAdminNavbar;
