import { Modal, TextField, ThemeProvider } from '@material-ui/core';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';

import addNow from '../../../../assets/images/add-now.svg';
import addAffeliation from '../../../../assets/images/add-affeliation.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import theme from '../../../../theme';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminAffeliationPageTableComp from './SuperAdminAffeliationPageTableComp';
import { DataContext } from '../../../../Context Api/ManageData';
import { useToasts } from 'react-toast-notifications';
import { ApiHelper } from '../../../../Utils/ApiHelper';

const SuperAdminAffeliationPageComponents = () => {
  const [open, setOpen] = useState(false);
  const { affiliation, setAffiliation } = useContext(DataContext);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    const affiliationData = {
      name: data.affeliation_name,
    };

    const onSuccessCreateAffiliation = result => {
      const { createAffiliations } = result?.data?.data;
      if (createAffiliations !== null) {
        const { code, data, errors } = result?.data?.data.createAffiliations;

        if (code === 200 && data !== null) {
          addToast('Affiliations has been created successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.affiliations
            .getAffiliations()
            .then(res => {
              setAffiliation(
                res?.data?.data?.getAffiliationsList?.data?.affiliationsList
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
    const onErrorCreateAffiliation = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.affiliations
      .createAffiliations({ data: affiliationData })
      .then(onSuccessCreateAffiliation)
      .catch(onErrorCreateAffiliation);
  };

  const createAffilitation = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add Affeliation</span>
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
              label='Affeliation Name'
              id='outlined-basic'
              name='affeliation_name'
              variant='outlined'
              color='secondary'
              error={errors.affeliation_name}
              {...register('affeliation_name', { required: true })}
              helperText={
                errors.affeliation_name?.type === 'required' &&
                'Affeliation Name can not be empty'
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
      <DashboardPageHading title='Affiliation' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addAffeliation} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminAffeliationPageTableComp />
      </div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {createAffilitation}
      </Modal>
    </>
  );
};

export default SuperAdminAffeliationPageComponents;
