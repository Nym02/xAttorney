import { Modal, TextField, ThemeProvider } from '@material-ui/core';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addCourt from '../../../../assets/images/add-court.svg';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminCourtPageTableComp from './SuperAdminCourtPageTableComp';

const SuperAdminCourtPageComponents = () => {
  const [open, setOpen] = useState(false);
  const { court, setCourt } = useContext(DataContext);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    const courtData = {
      name: data.court_name,
      country: data.country,
    };

    const onSuccessCreateCourt = result => {
      const { createCourt } = result?.data?.data;
      if (createCourt !== null) {
        const { code, data, errors } = result?.data?.data.createCourt;

        if (code === 200 && data !== null) {
          addToast('Court has been created successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.court
            .getCourt()
            .then(res =>
              setCourt(res?.data?.data?.getCourtList?.data?.courtList)
            )
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
    const onErrorCreateCourt = error => {};

    ApiHelper.court
      .createCourt({ data: courtData })
      .then(onSuccessCreateCourt)
      .catch(onErrorCreateCourt);
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
        <span>Add A Court</span>
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
              label='Court Name'
              id='outlined-basic'
              name='court_name'
              variant='outlined'
              color='secondary'
              error={errors.court_name}
              {...register('court_name', { required: true })}
              helperText={
                errors.court_name?.type === 'required' &&
                'Court Name can not be empty'
              }
            />
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Country'
              id='outlined-basic'
              name='country'
              variant='outlined'
              color='secondary'
              error={errors.country}
              {...register('country', { required: true })}
              helperText={
                errors.country?.type === 'required' &&
                'Country Name can not be empty'
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
          <button style={{ outline: 'none' }} type='submit'>
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='Court' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addCourt} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminCourtPageTableComp />
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

export default SuperAdminCourtPageComponents;
