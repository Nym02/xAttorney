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
import addNewService from '../../../../assets/images/add-service-area.svg';

import addCaseType from '../../../../assets/images/add-casetype.svg';
import filter from '../../../../assets/images/filter.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminCaseTypePageTableComp from './SuperAdminCaseTypePageTableComp';
import { finalNewLoginToken } from '../../../../Utils/UserToken';

const SuperAdminCaseTypePageComponents = () => {
  const [open, setOpen] = useState(false);
  const { caseType, setCaseType } = useContext(DataContext);
  const { caseCategory, setCaseCategory } = useContext(DataContext);
  const { court, setCourt } = useContext(DataContext);
  const [caseCategoryList, setCaseCategoryList] = useState([]);
  const { addToast } = useToasts();

  const caseCategoryByCourtId = courtId => {
    const newCourtId = JSON.stringify(courtId);
    const finalCourtId = newCourtId.replace(/"([^"]+)":/g, '$1:');

    const caseCateGoryListByCourtId = gql`
      query {
        getCaseCategoryListByCourtId(courtId: ${finalCourtId}) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data {
            caseCategoryList {
              id
              name
              court {
                id
                name
                country
              }
            }
            offset
            limit
            numberOfElements
            totalElements
            totalPages
            first
            last
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,

        {
          method: 'POST',
          query: print(caseCateGoryListByCourtId),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        console.log(res);
        setCaseCategoryList(
          res?.data?.data?.getCaseCategoryListByCourtId?.data?.caseCategoryList
        );
      })
      .catch(err => console.log(err));
  };

  const handleCourtChange = e => {
    caseCategoryByCourtId(e.target.value);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleModalClose = () => {
    setOpen(true);
    reset();
  };

  const onSubmit = (data, e) => {
    const caseType = {
      name: data.case_type,
      court: {
        id: data.court_name,
      },
      caseCategory: {
        id: data.caseCategory,
      },
    };

    const newCaseType = JSON.stringify(caseType);
    const finalCaseType = newCaseType.replace(/"([^"]+)":/g, '$1:');

    const createCaseTypeQuery = gql`
      mutation {
        createCaseType(
          caseType: ${finalCaseType}
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
            caseCategory{
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
          query: print(createCaseTypeQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createCaseType } = result?.data?.data;
        if (createCaseType !== null) {
          const { code, data, errors } = result?.data?.data.createCaseType;

          if (code === 200 && data !== null) {
            addToast('Case type has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.caseType
              .getCaseType()
              .then(res => {
                setCaseType(
                  res?.data?.data?.getCaseTypeList?.data?.caseTypeList
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
        <span>Add Case Type</span>
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
            error={errors.court_name}
          >
            <InputLabel id='demo-simple-select-outlined-label'>
              Court
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              label='Court'
              className='bg-lightSilver rounded text-white w-full'
              color='secondary'
              {...register('court_name', { required: true })}
              onChange={handleCourtChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {court.map(court => (
                <MenuItem value={court.id}>{court.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.court_name?.type === 'required' && 'Court is required'}
            </FormHelperText>
          </FormControl>
          <FormControl
            className='w-full'
            variant='outlined'
            error={errors.caseCategory}
          >
            <InputLabel id='demo-simple-select-outlined-label'>
              Case Category
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              label='Case Category'
              className='bg-lightSilver rounded text-white w-full'
              color='secondary'
              {...register('caseCategory', { required: true })}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {caseCategoryList.map(caseCategory => (
                <MenuItem value={caseCategory.id}>{caseCategory.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {errors.caseCategory?.type === 'required' &&
                'Case Category is required'}
            </FormHelperText>
          </FormControl>
          <TextField
            className='bg-lightSilver rounded text-white w-full'
            label='Cast Type'
            id='outlined-basic'
            name='case_type'
            variant='outlined'
            color='secondary'
            error={errors.case_type}
            {...register('case_type', { required: true })}
            helperText={
              errors.case_type?.type === 'required' &&
              'Case Type can not be empty'
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
      <DashboardPageHading title='Case Type' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button
            onClick={() => handleModalClose()}
            style={{ outline: 'none' }}
          >
            <img src={addCaseType} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminCaseTypePageTableComp />
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

export default SuperAdminCaseTypePageComponents;
