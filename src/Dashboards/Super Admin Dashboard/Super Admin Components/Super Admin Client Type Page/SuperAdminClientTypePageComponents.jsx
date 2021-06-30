import { InputBase, Modal, TextField, ThemeProvider } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/add-now.svg';
import addNewService from '../../../../assets/images/add-clienttype.svg';
import filter from '../../../../assets/images/filter.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminClientTypePageTableComp from './SuperAdminClientTypePageTableComp';

const SuperAdminClientTypePageComponents = () => {
  const [open, setOpen] = useState(false);
  const { clientType, setClientType } = useContext(DataContext);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    const clientTypeData = {
      name: data.client_type,
    };

    const onSuccessCreateClientType = result => {
      const { createClientType } = result?.data?.data;
      if (createClientType !== null) {
        const { code, data, errors } = result?.data?.data.createClientType;

        if (code === 200 && data !== null) {
          addToast('Client type has been created successfully', {
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
    const onErrorCreateClientType = error => {
      addToast('Something went wrong. Please try again later.', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.clientType
      .createClientType({ data: clientTypeData })
      .then(onSuccessCreateClientType)
      .catch(onErrorCreateClientType);
  };

  const addModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add A Client Type</span>
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
              name='client_type'
              variant='outlined'
              color='secondary'
              error={errors.client_type}
              {...register('client_type', { required: true })}
              helperText={
                errors.client_type?.type === 'required' &&
                'Client Type is required'
              }
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

  return (
    <>
      <DashboardPageHading title='Client Type' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addNewService} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminClientTypePageTableComp />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addModal}
      </Modal>
    </>
  );
};

export default SuperAdminClientTypePageComponents;
