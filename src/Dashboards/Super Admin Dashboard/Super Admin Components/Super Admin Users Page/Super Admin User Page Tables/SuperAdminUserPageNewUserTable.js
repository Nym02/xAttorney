import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import { Modal } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import disabledIcon from '@iconify-icons/fe/disabled';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import modalClose from '../../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../../Context Api/ManageData';
import moment from 'moment';
import { ApiHelper } from '../../../../../Utils/ApiHelper';
import PuffLoader from 'react-spinners/PuffLoader';
import { useToasts } from 'react-toast-notifications';

const SuperAdminUserPageNewUserTable = () => {
  const [createUser, setCreateUser] = useState(false);
  const [advocateStatusModal, setAdvocateStatusModal] = useState(false);
  const { advocate, setAdvocate } = useContext(DataContext);
  const [advocateId, setAdvocateId] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [advocateStatus, setAdvocateStatus] = useState('');
  let [loading, setLoading] = useState(true);
  const { addToast } = useToasts();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event, value, data) => {
    setAnchorEl(event.currentTarget);
    setAdvocateId(value);
    setAdvocateStatus(data);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //============================================================================
  // --------------------------- update admin status ---------------------------
  //============================================================================
  const updateAdminStatusFunction = async () => {
    let statusChange = '';
    if (
      advocateStatus.rowData[6] === 'INACTIVE' ||
      advocateStatus.rowData[6] === 'BLOCKED'
    ) {
      statusChange = true;
    } else {
      statusChange = false;
    }
    const adminData = {
      advocateId: advocateId,
      activeAdvocateStatus: statusChange,
    };

    const onSuccessUpdateAdminStatus = result => {
      const { updateAdvocateStatusAsAnAdmin } = result?.data?.data;
      if (updateAdvocateStatusAsAnAdmin !== null) {
        const { code, data, errors } =
          result?.data?.data.updateAdvocateStatusAsAnAdmin;
        if (code === 200 && data !== null) {
          addToast('Advocate status has been changed successfullt.', {
            appearance: 'success',
            autoDismiss: true,
          });
          setAdvocateStatusModal(false);
          setLoadingModal(true);
          ApiHelper.advocate
            .getAdvocate()
            .then(res => {
              setAdvocate(res?.data?.data?.getAdvocateList?.data?.advocateList);
            })
            .then(() => setLoadingModal(false))
            .catch(err =>
              addToast('Something wrong happend', {
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
    const onErrorUpdateAdminStatus = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };
    ApiHelper.advocate
      .updateAdvocateStatus({ data: adminData })
      .then(onSuccessUpdateAdminStatus)
      .catch(onErrorUpdateAdminStatus);

    handleClose();
  };
  //============================================================================
  // --------------------------- update admin status ---------------------------
  //============================================================================

  //============================================================================
  // --------------------------- push data in the table ------------------------
  //============================================================================
  let newAdvocate = [];
  advocate.map((item, index) => {
    newAdvocate.push({
      sl: index + 1,
      clientName: item?.name,
      clientPhone: item?.phone,
      email: item?.email,
      signUpDate: moment(item?.createdAt).format('DD-MM-YYYY'),
      advocateStatus: item?.advocateStatus,
      id: item?.id,
      pricingPlan: item?.latestPricingPlan,
    });
  });
  //============================================================================
  // --------------------------- push data in the table ------------------------
  //============================================================================

  const columns = [
    {
      name: 'signUpDate',
      label: 'Sign Up Date',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientName',
      label: 'Client Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientPhone',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'pricingPlan',
      label: 'Package',
      options: {
        filter: true,
        sort: true,
        customBodyRender: pricingPlan => {
          if (pricingPlan === 'HALF_YEARLY') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-primarydark text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      Half Yearly
                    </span>
                  </div>
                </div>
              </>
            );
          }
          if (pricingPlan === 'YEARLY') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-red-800 text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      Yearly
                    </span>
                  </div>
                </div>
              </>
            );
          }
          return <div className='text-red-800'>None</div>;
        },
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'paymentVia',
      label: 'Payment Via',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'advocateStatus',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: advocateStatus => {
          if (advocateStatus === 'ACTIVE') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-primarydark text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      Active
                    </span>
                  </div>
                </div>
              </>
            );
          }
          if (advocateStatus === 'INACTIVE') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-indigo-700 text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      Inactive
                    </span>
                  </div>
                </div>
              </>
            );
          }
          if (advocateStatus === 'BLOCKED') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-red-800 text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      Blocked
                    </span>
                  </div>
                </div>
              </>
            );
          }
          return <div>Not Specified</div>;
        },
      },
    },
    {
      name: 'id',
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, data) => {
          return (
            <div>
              <Button
                style={{ outline: 'none' }}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={event => handleClick(event, value, data)}
              >
                <Icon
                  className='text-2xl text-purple-400'
                  icon={overflowMenuVertical}
                />
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={clockCircleOutlined} />
                  <span>Renwew</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={eyeIcon} />
                  <span>View</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={editIcon} />
                  <span>Edit</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={trashCan} />
                  <span>Delete</span>
                </MenuItem> */}
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setAdvocateStatusModal(true)}
                >
                  <Icon icon={disabledIcon} />
                  <span>Change Status</span>
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  //============================================================================
  //--------------------------- change admin status ----------------------------
  //============================================================================
  const chageStatusModal = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Change Status</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setAdvocateStatusModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col space-y-3 justify-center items-center'>
        <h1>Do you want to change the status for?</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-deepGreen text-white text-sm font-semibold bg-deepdark h-11 w-48'
          onClick={() => updateAdminStatusFunction()}
        >
          yes
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-500 text-white text-sm font-semibold bg-red-800 h-11 w-48'
          onClick={() => setAdvocateStatusModal(false)}
        >
          No
        </button>
      </div>
    </div>
  );
  //============================================================================
  // --------------------------- change admin status ---------------------------
  //============================================================================

  //============================================================================
  // --------------------------- loading modal view ----------------------------
  //============================================================================
  const loadongModalView = (
    <div
      className='w-106 h-auto bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <PuffLoader loading={loading} size={150} />
    </div>
  );
  //============================================================================
  // --------------------------- loading modal view ----------------------------
  //============================================================================

  return (
    <>
      <MUIDataTable
        title={'User List'}
        data={newAdvocate}
        columns={columns}
        options={options}
      />
      <Modal
        open={advocateStatusModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {chageStatusModal}
      </Modal>
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

export default SuperAdminUserPageNewUserTable;
