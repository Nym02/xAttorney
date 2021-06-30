import {
  FormControl,
  FormHelperText,
  InputBase,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/add-now.svg';
import addPostOffice from '../../../../assets/images/add-postoffice.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminPostOfficePageTableComp from './SuperAdminPostOfficePageTableComp';

const SuperAdminPostOfficePageComponents = () => {
  const [open, setOpen] = useState(false);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { postOffice, setPostOffice } = useContext(DataContext);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data, e) => {
    // post_code: "sdfsdf"
    // post_office_name: "sdfsdf"
    // sub_district: "60a792a2ea41b9184122646e"

    const postOfficeData = {
      name: data.post_office_name,
      postCode: data.post_code,
      subDistrict: {
        id: data.sub_district,
      },
    };

    const newPostOfficeData = JSON.stringify(postOfficeData);

    const unquotedPostOfficeData = newPostOfficeData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const createPostOfficeQuery = gql`
      mutation {
        createPostOffice(
          postOffice: ${unquotedPostOfficeData}
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
            postCode
            subDistrict {
              id
              name
              district {
                id
                name
                division {
                  id
                  name
                  country
                }
              }
            }
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(createPostOfficeQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createPostOffice } = result?.data?.data;
        if (createPostOffice !== null) {
          const { code, data, errors } = result?.data?.data.createPostOffice;

          if (code === 200 && data !== null) {
            addToast('Post office has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.postOffice
              .getPostOffice()
              .then(res => {
                setPostOffice(
                  res?.data?.data?.getPostOfficeList?.data?.postOfficeList
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
        <span>Add A Post Office</span>
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
              error={errors.sub_district}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Sub District
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='District'
                name='sub_district'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('sub_district', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {subDistrict.map(subdistrict => (
                  <MenuItem value={subdistrict.id}>{subdistrict.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.sub_district?.type === 'required' &&
                  'District is required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Post Office Name'
              id='outlined-basic'
              name='post_office_name'
              variant='outlined'
              color='secondary'
              error={errors.post_office_name}
              {...register('post_office_name', { required: true })}
              helperText={
                errors.post_office_name?.type === 'required' &&
                'Post Office Name is required'
              }
            />
          </div>

          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Post Code'
              id='outlined-basic'
              name='post_code'
              variant='outlined'
              color='secondary'
              error={errors.post_code}
              {...register('post_code', { required: true })}
              helperText={
                errors.post_code?.type === 'required' && 'Post Code is required'
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
      <DashboardPageHading title='Post Office' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addPostOffice} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminPostOfficePageTableComp />
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

export default SuperAdminPostOfficePageComponents;
