import { Modal, TextField, ThemeProvider } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Select } from '@material-ui/core';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import addNow from '../../../../assets/images/add-now.svg';
import addPrimaryResult from '../../../../assets/images/add-primaryresult.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminPrimaryResultPageTableComp from './SuperAdminPrimaryResultPageTableComp';

const SuperAdminPrimaryResultPageComponents = () => {
  const [open, setOpen] = useState(false);
  const { court, setCourt } = useContext(DataContext);
  const { primaryResult, setPrimaryResult } = useContext(DataContext);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    const primaryResultData = {
      name: data.primary_result,
      court: {
        id: data.court,
      },
    };

    const newPrimaryResultData = JSON.stringify(primaryResultData);
    const finalPrimaryResultData = newPrimaryResultData.replace(
      /"([^"]+)":/g,
      '$1:'
    );
    const createPrimaryResultQuery = gql`
      mutation {
        createPrimaryResult(
          primaryResult: ${finalPrimaryResultData}
        ) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data {
            id
            name
            court {
              id
            }
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(createPrimaryResultQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createPrimaryResult } = result?.data?.data;
        if (createPrimaryResult !== null) {
          const { code, data, errors } = result?.data?.data.createPrimaryResult;

          if (code === 200 && data !== null) {
            addToast('Primary result has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.primaryResult
              .getPrimaryResult()
              .then(res => {
                setPrimaryResult(
                  res?.data?.data?.getPrimaryResultList?.data?.primaryResultList
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
      })
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
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
        <span>Add A Primary Result</span>
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
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.court}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Court
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Court'
                name='court'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('court', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {court.map(court => (
                  <MenuItem value={court.id}>{court.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.court?.type === 'required' && 'Court is required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Primary Result'
              id='outlined-basic'
              name='primary_result'
              variant='outlined'
              color='secondary'
              error={errors.primary_result}
              {...register('primary_result', { required: true })}
              helperText={
                errors.primary_result?.type === 'required' &&
                'Primary Result is required'
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
      <DashboardPageHading title='Primary Result' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addPrimaryResult} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminPrimaryResultPageTableComp />
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

export default SuperAdminPrimaryResultPageComponents;
