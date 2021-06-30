import { Modal, TextField, ThemeProvider } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addCourtName from '../../../../assets/images/add-courtname.svg';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminCourtNamePageTableComp from './SuperAdminCourtNamePageTableComp';

const SuperAdminCourtNamePageComponents = () => {
  const [open, setOpen] = useState(false);
  const { court, setCourt } = useContext(DataContext);
  const { courtName, setCourtName } = useContext(DataContext);
  const { caseType, setCaseType } = useContext(DataContext);
  const [caseCategoryList, setCaseCategoryList] = useState([]);
  const [caseTypeList, setCaseTypeList] = useState([]);
  const { caseCategory, setCaseCategory } = useContext(DataContext);
  const [courtId, setCourtId] = useState('');
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleModalClose = () => {
    setOpen(false);
    reset();
  };

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
    setCourtId(e.target.value);
    caseCategoryByCourtId(e.target.value);
  };

  const caseTypeByCaseCategory = caseCateGoryId => {
    const newCourtId = JSON.stringify(courtId);
    const finalCourtId = newCourtId.replace(/"([^"]+)":/g, '$1:');
    const newCaseCategoryId = JSON.stringify(caseCateGoryId);
    const finalCaseCategoryId = newCaseCategoryId.replace(/"([^"]+)":/g, '$1:');

    const caseTypeByCaseCategory = gql`
      query {
        getCaseTypeListByCourtIdAndCaseCategoryId(courtId: ${finalCourtId}, caseCategoryId: ${finalCaseCategoryId}) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data {
            caseTypeList {
              id
              name
              court {
                id
                name
                country
              }
              caseCategory {
                id
                name
                court {
                  id
                  name
                  country
                }
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
          query: print(caseTypeByCaseCategory),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        setCaseTypeList(
          res?.data?.data?.getCaseTypeListByCourtIdAndCaseCategoryId?.data
            ?.caseTypeList
        );
      })
      .catch(err => console.log(err));
  };

  const handleCaseCategory = e => {
    caseTypeByCaseCategory(e.target.value);
  };

  const onSubmit = (data, e) => {
    const courtNameData = {
      name: data.court_name,
      court: {
        id: data.court,
      },
      caseType: {
        id: data.caseType,
      },
      caseCategory: {
        id: data.caseCategory,
      },
    };
    console.log(courtNameData);
    const newCourtNameData = JSON.stringify(courtNameData);
    const finalCourtNameData = newCourtNameData.replace(/"([^"]+)":/g, '$1:');

    const createCourtNameQuery = gql`
      mutation {
        createCourtName(
          courtName: ${finalCourtNameData}
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
            caseType {
              id
            }
            caseCategory {
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
          query: print(createCourtNameQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createCourtName } = result?.data?.data;
        if (createCourtName !== null) {
          const { code, data, errors } = result?.data?.data.createCourtName;

          if (code === 200 && data !== null) {
            addToast('Court name has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.courtName
              .getCourtName()
              .then(res => {
                setCourtName(
                  res?.data?.data?.getCourtNameList?.data?.courtNameList
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
        <span>Add A Court Name</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => handleModalClose()}
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
                {errors.court?.type === 'required' && 'Court is required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.court}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Case Category
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Case Category'
                name='caseCategory'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('caseCategory', { required: true })}
                onChange={handleCaseCategory}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {caseCategoryList.map(caseCategory => (
                  <MenuItem value={caseCategory.id}>
                    {caseCategory.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.caseCategory?.type === 'required' &&
                  'Case Category is Required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.court}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Case Type
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Case Type'
                name='caseType'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('caseType', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {caseTypeList.map(caseType => (
                  <MenuItem value={caseType.id}>{caseType.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.caseType?.type === 'required' &&
                  'Case Type is Required'}
              </FormHelperText>
            </FormControl>
          </div>

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
                'Court Name is required'
              }
            />
          </div>
        </ThemeProvider>
        <div className='w-full flex justify-center items-center space-x-6'>
          {/* <button
            style={{ outline: 'none' }}
            onClick={() => reset()}
            type='reset'
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button> */}
          <button style={{ outline: 'none' }}>
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='Court Name' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addCourtName} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminCourtNamePageTableComp />
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

export default SuperAdminCourtNamePageComponents;
