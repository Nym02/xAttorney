import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import { TextField } from '@material-ui/core';
import {
  Button,
  Menu,
  MenuItem,
  Modal,
  ThemeProvider,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';

const SuperAdminClientTypePageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { clientType, setClientType } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [clientTypeId, setClientTypeId] = useState('');
  const [clientTypeUpdate, setClientTypeUpdate] = useState([]);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setClientTypeId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //update client type

  //getting update default value
  const viewDetailsByID = clientType.find(({ id }) => id === clientTypeId);
  console.log(viewDetailsByID);

  useEffect(() => {
    setClientTypeUpdate(viewDetailsByID);
  }, [clientTypeId, viewDetailsByID]);

  const handleUpdateDataChange = e => {
    setClientTypeUpdate({
      ...clientTypeUpdate,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (data, e) => {
    if (clientTypeUpdate?.name === null || clientTypeUpdate?.name === '') {
      addToast('Client Type Name is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const updateClientType = {
        id: clientTypeId,
        name: clientTypeUpdate?.name,
      };

      const onSuccessUpdateClientType = result => {
        const { updateClientType } = result?.data?.data;
        if (updateClientType !== null) {
          const { code, data, errors } = result?.data?.data.updateClientType;

          if (code === 200 && data !== null) {
            addToast('Client type has been updated successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.clientType
              .getClientType()
              .then(res => {
                setClientType(
                  res?.data?.data?.getClientTypeList?.data?.clientTypeList
                );
              })
              .then(() => reset())
              .then(() => setOpen(false))
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
      const onErrorUpdateClientType = error => {
        addToast('Something wrong happend', {
          appearance: 'error',
          autoDismiss: true,
        });
      };

      ApiHelper.clientType
        .updateClientType({ data: updateClientType })
        .then(onSuccessUpdateClientType)
        .catch(onErrorUpdateClientType);

      handleClose();
    }
  };

  //delete client type
  const deleteClientType = () => {
    const onSuccessDeleteClientType = () => {
      ApiHelper.clientType
        .getClientType()
        .then(res => {
          setClientType(
            res?.data?.data?.getClientTypeList?.data?.clientTypeList
          );
        })
        .catch();
    };
    const onErrorDeleteClientType = error => {
      // console.log(error);
    };

    // console.log("clientBehalfId", clientBehalfId);
    ApiHelper.clientType
      .deleteClientType(clientTypeId)
      .then(onSuccessDeleteClientType)
      .catch(onErrorDeleteClientType);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newClientType = [];
  clientType.map((item, idx) => {
    newClientType.push({
      sl: idx + 1,
      clientTypeName: item?.name,
      id: item?.id,
    });
  });

  const columns = [
    {
      name: 'sl',
      label: 'SL No.',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientTypeName',
      label: 'Client Type Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: false,
        sort: false,
        customBodyRender: value => {
          return (
            <div>
              <Button
                style={{ outline: 'none' }}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={event => handleClick(event, value)}
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
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setOpen(true)}
                >
                  <Icon icon={editIcon} />
                  <span>Edit</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setDeleteModal(true)}
                >
                  <Icon icon={trashCan} />
                  <span>Delete</span>
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  // update modal
  const updateTableData = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Edit Division</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpen(false)}
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
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Client Type Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              value={clientTypeUpdate ? clientTypeUpdate?.name : ''}
              onChange={handleUpdateDataChange}
              // error={errors.client_type}
              // {...register('client_type', { required: true })}
              // helperText={
              //   errors.client_type?.type === 'required' &&
              //   'Client Type is required'
              // }
            />
          </div>
        </ThemeProvider>
        <div className='w-full flex justify-center items-center space-x-6'>
          <button
            style={{ outline: 'none' }}
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button>
          <button style={{ outline: 'none' }}>
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  // delete modal
  const deleteTableData = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Confirm Delete</span>
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
        <div className='-mt-7'>
          <img src={warn} alt='' />
        </div>
        <h1 className='text-xl'>This action is not reversible.</h1>
        <h1 className='text-xl'>Are you sure to delete this?</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 w-48 capitalize'
          onClick={() => deleteClientType()}
        >
          Confirm
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-800 text-white text-sm font-semibold bg-red-800 h-11 w-48 capitalize'
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  return (
    <>
      <MUIDataTable
        title={'Client Type List'}
        data={newClientType}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateTableData}
      </Modal>
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

export default SuperAdminClientTypePageTableComp;
