import { InputLabel } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputBase, Modal, TextField, ThemeProvider } from '@material-ui/core';
import { AddPhotoAlternateSharp } from '@material-ui/icons';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/add-now.svg';
import addSubDistrict from '../../../../assets/images/add-subdistrict.svg';
import filter from '../../../../assets/images/filter.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminSubDistrictPageTableComp from './SuperAdminSubDistrictPageTableComp';

const SuperAdminSubDistrictPageComponents = () => {
  const [open, setOpen] = useState(false);
  const { district, setDistrict } = useContext(DataContext);
  const { addToast } = useToasts();
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data, e) => {
    const subDistrict = {
      name: data.sub_district,
      district: {
        id: data.district,
      },
    };
    const newSubDistrict = JSON.stringify(subDistrict);
    const finalSubDistrict = newSubDistrict.replace(/"([^"]+)":/g, '$1:');
    const subDistrictQuery = gql`
      mutation {
        createSubDistrict(
          subDistrict: ${finalSubDistrict}
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
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(subDistrictQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createSubDistrict } = result?.data?.data;
        if (createSubDistrict !== null) {
          const { code, data, errors } = result?.data?.data.createSubDistrict;

          if (code === 200 && data !== null) {
            addToast('Sub district has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.subDistrict
              .getSubDistrict()
              .then(res => {
                setSubDistrict(
                  res?.data?.data?.getSubDistrictList?.data?.subDistrictList
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
      .catch(err => {
        addToast('Something wrong happend', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
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
        <span>Add A Sub District</span>
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
              error={errors.district}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                District
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='District'
                name='district'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('district', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {district.map(district => (
                  <MenuItem value={district.id}>{district.name}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors.district?.type === 'required' && 'District is required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Sub District Name'
              id='outlined-basic'
              name='sub_district'
              variant='outlined'
              color='secondary'
              error={errors.sub_district}
              {...register('sub_district', { required: true })}
              helperText={
                errors.sub_district?.type === 'required' &&
                'Sub District is required'
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
      <DashboardPageHading title='Sub District' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addSubDistrict} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminSubDistrictPageTableComp />
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

export default SuperAdminSubDistrictPageComponents;
