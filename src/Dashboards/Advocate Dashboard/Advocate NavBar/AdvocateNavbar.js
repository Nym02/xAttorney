import Icon from '@iconify/react';
import {
  Button,
  makeStyles,
  Menu,
  MenuItem,
  Modal,
  Paper,
  ThemeProvider,
} from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import notificationbell from '../../../assets/images/notification-bell.svg';
import settings from '../../../assets/images/settings-dashboard.svg';
import logoutSolid from '@iconify-icons/clarity/logout-solid';
import { DataContext } from '../../../Context Api/ManageData';
import modalClose from '../../../assets/images/modal-close.svg';
import warn from '../../../assets/images/logout.svg';
import { latestPlanId, logoutFunc } from '../../../Utils/UserToken';
import { AdvocateApiHelper } from '../../../Utils/AdvocateApiHelper';
import MenuList from '@material-ui/core/MenuList';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import Grow from '@material-ui/core/Grow';
import { Popper } from '@material-ui/core';
import { useEffect } from 'react';
import { IconButton } from '@material-ui/core';
import { Badge } from '@material-ui/core';
import theme from '../../../theme';
import { Divider } from '@material-ui/core';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';

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

const AdvocateNavbar = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const { dashboardSummary } = useContext(DataContext);
  const { notifications, setNotifications } = useContext(DataContext);
  const { addToast } = useToasts();

  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpenPopover(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenPopover(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpenPopover(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(openPopover);
  useEffect(() => {
    if (prevOpen.current === true && openPopover === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openPopover;
  }, [openPopover]);

  const seenAllNotification = () => {
    const onSuccessSeenNotification = result => {
      // console.log('seen notification', result);
      const { seenAllMyUnseenNotificationInformation } = result?.data?.data;
      if (seenAllMyUnseenNotificationInformation !== null) {
        const { code, data, errors } =
          result?.data?.data.seenAllMyUnseenNotificationInformation;

        if (code === 200 && data !== null) {
          AdvocateApiHelper.advNotification
            .getNotifications()
            .then(res => {
              setNotifications(
                res?.data?.data?.getMyNotificationInformation?.data
              );
            })
            .then(() => setOpenPopover(false))
            .catch(err =>
              addToast('Something went wrong. Please try again later', {
                appearance: 'error',
                autoDismiss: true,
              })
            );
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
    const onErrorSeenNotification = err => {};
    AdvocateApiHelper.advNotification
      .seeNotifications()
      .then(onSuccessSeenNotification)
      .catch(onErrorSeenNotification);
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
        <div className='h-20 w-full flex sm:items-start items-center justify-between sm:mt-0 -mt-5'>
          {/* greetings text with name */}
          <div className='sm:flex hidden'>
            <h2 className='text-darkSilver'>
              Hello{' '}
              <span className='font-medium text-primarylight'>
                {dashboardSummary?.advocate?.name}
              </span>
              , Welcome
            </h2>
          </div>
          <div className='sm:hidden flex'>
            <h2 className='text-darkSilver'>
              <span className='font-medium text-primarylight'>
                {dashboardSummary?.advocate?.name}
              </span>
            </h2>
          </div>
          <div className='flex items-center sm:space-x-12 space-x-3'>
            {/* notification */}
            <ThemeProvider theme={theme}>
              <IconButton
                ref={anchorRef}
                aria-controls={openPopover ? 'menu-list-grow' : undefined}
                aria-haspopup='true'
                onClick={handleToggle}
                style={{ outline: 'none' }}
                aria-label='cart'
              >
                <Badge
                  badgeContent={
                    notifications?.advocateNotificationInformationList?.length
                  }
                  color='primary'
                >
                  <NotificationsNoneIcon />
                </Badge>
              </IconButton>
              <Popper
                open={openPopover}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                style={{ zIndex: 1000 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper
                      style={{ zIndex: 1000 }}
                      className='w-88 h-auto'
                      elevation={5}
                    >
                      <ClickAwayListener
                        onClickAway={handleClose}
                        className='w-full bg-white'
                      >
                        <div className='flex flex-col items-start px-6 w-full pb-7'>
                          <div className='flex justify-between items-center w-full py-4 text-sm'>
                            <h1 className='text-deepdark'>Notification</h1>
                            <button
                              onClick={() => seenAllNotification()}
                              style={{ outline: 'none', color: '#5D5FEF' }}
                            >
                              Mark All As Read
                            </button>
                          </div>
                          <Divider />
                          <div className='flex flex-col space-y-4'>
                            {notifications?.advocateNotificationInformationList
                              ?.length !== 0 ? (
                              <>
                                {notifications?.advocateNotificationInformationList?.map(
                                  (value, index) => (
                                    <>
                                      <div className='flex items-center justify-start space-x-2'>
                                        <div className='w-12 h-12 rounded-full bg-indigo-600'></div>
                                        <div className='flex flex-col space-y-1 text-sm w-4/5'>
                                          <p className='text-black'>
                                            {value?.message}
                                          </p>
                                          <span>
                                            {moment(value?.createdAt)
                                              .startOf('hour')
                                              .fromNow()}
                                          </span>
                                        </div>
                                      </div>
                                      <Divider />
                                    </>
                                  )
                                )}
                              </>
                            ) : (
                              <>
                                <div>
                                  <h1>No New Notification</h1>
                                </div>
                              </>
                            )}
                          </div>
                          <Divider />
                        </div>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </ThemeProvider>

            {/* settings */}
            <Link to='/dashboard/advocate/settings'>
              <img className='lg:w-6 w-8' src={settings} alt='' />
            </Link>

            {/* <Button
              style={{ outline: 'none' }}
              aria-controls='simple-menu'
              aria-haspopup='true'
              onClick={handleClick}
            >
              <div
                style={{ boxShadow: '0px 4px 14px rgba(34, 37, 169, 0.4)' }}
                className='h-10 w-10 rounded-full bg-primarydark'
              ></div>
            </Button>
            <Menu
              className='mt-12'
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem
                className='flex space-x-2 items-center'
                onClick={handleClose}
              >
                <Icon className='text-2xl text-red-700' icon={logoutSolid} />
                <span className='font-medium'>Logout</span>
              </MenuItem>
            </Menu> */}
            <Paper elevation={3}>
              <button
                onClick={() => setDeleteModal(true)}
                style={{ outline: 'none' }}
                className='text-red-800 sm:text-sm text-xsm sm:w-20 w-16 sm:h-9 h-8 rounded-xl'
              >
                Logout
              </button>
            </Paper>
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
      </div>
    </>
  );
};

export default AdvocateNavbar;
