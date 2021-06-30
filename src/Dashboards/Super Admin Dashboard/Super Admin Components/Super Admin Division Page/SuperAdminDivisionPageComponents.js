import { Modal, TextField, ThemeProvider } from '@material-ui/core';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import addDivision from '../../../../assets/images/add-division.svg';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminDivisionPageTableComp from './SuperAdminDivisionPageTableComp';

const SuperAdminDivisionPageComponents = () => {
  const [open, setOpen] = useState(false);
  const { division, setDivision } = useContext(DataContext);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    const divisionData = {
      name: data.division_name,
      country: data.country_name,
    };

    const onSuccessCreateDivision = result => {
      const { createDivision } = result?.data?.data;
      if (createDivision !== null) {
        const { code, data, errors } = result?.data?.data.createDivision;

        if (code === 200 && data !== null) {
          addToast('Division has been created successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.division
            .getDivision()
            .then(res => {
              setDivision(res?.data?.data?.getDivisionList?.data?.divisionList);
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
    const onErrorCreateDivision = error => {
      addToast('Something went wrong. Please try again later.', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.division
      .createDivision({ data: divisionData })
      .then(onSuccessCreateDivision)
      .catch(onErrorCreateDivision);
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
        <span>Add A Division</span>
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
              label='Division Name'
              id='outlined-basic'
              name='division_name'
              variant='outlined'
              color='secondary'
              error={errors.division_name}
              {...register('division_name', { required: true })}
              helperText={
                errors.division_name?.type == 'required' &&
                'Division Name Can not be empty'
              }
            />
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Country Name'
              id='outlined-basic'
              name='country_name'
              variant='outlined'
              color='secondary'
              error={errors.country_name}
              {...register('country_name', { required: true })}
              helperText={
                errors.country_name?.type == 'required' &&
                'Country Name Can not be empty'
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
      <DashboardPageHading title='Division' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addDivision} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminDivisionPageTableComp />
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

export default SuperAdminDivisionPageComponents;
