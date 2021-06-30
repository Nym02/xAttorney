import { InputBase, Modal, TextField, ThemeProvider } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/add-now.svg';
import addNewService from '../../../../assets/images/add-casecategory.svg';
import filter from '../../../../assets/images/filter.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminCaseCategoryPageTableComp from './SuperAdminCaseCategoryPageTableComp';

const SuperAdminCaseCategoryPageComponents = () => {
  const [open, setOpen] = useState(false);
  const { court, setCourt } = useContext(DataContext);
  const { caseCategory, setCaseCategory } = useContext(DataContext);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    const caseCategoryData = {
      name: data.case_category,
      court: {
        id: data.court,
      },
    };

    const newCaseCategoryData = JSON.stringify(caseCategoryData);
    const finalCaseCategoryDate = newCaseCategoryData.replace(
      /"([^"]+)":/g,
      '$1:'
    );
    const createCaseCategoryQuery = gql`
      mutation {
        createCaseCategory(
          caseCategory: ${finalCaseCategoryDate}
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
          query: print(createCaseCategoryQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createCaseCategory } = result?.data?.data;
        if (createCaseCategory !== null) {
          const { code, data, errors } = result?.data?.data.createCaseCategory;

          if (code === 200 && data !== null) {
            addToast('Case Category has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.caseCategory
              .getCaseCategory()
              .then(res => {
                setCaseCategory(
                  res?.data?.data?.getCaseCategoryList?.data?.caseCategoryList
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
    setOpen(false);
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
        <span>Add Case Category</span>
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
          <TextField
            className='bg-lightSilver rounded text-white w-full'
            label='Case Category'
            id='outlined-basic'
            name='case_category'
            variant='outlined'
            color='secondary'
            error={errors.case_category}
            {...register('case_category', { required: true })}
            helperText={
              errors.case_category?.type === 'required' &&
              'Case Category is required'
            }
          />
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
      <DashboardPageHading title='Case Category' />
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
        <SuperAdminCaseCategoryPageTableComp />
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

export default SuperAdminCaseCategoryPageComponents;
