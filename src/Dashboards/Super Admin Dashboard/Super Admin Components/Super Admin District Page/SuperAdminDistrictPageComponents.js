/* eslint-disable */
import { MenuItem } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { Modal, TextField, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import { print } from 'graphql';
import gql, { resetCaches } from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import addDistrict from '../../../../assets/images/add-district.svg';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminDistrictPageTableComp from './SuperAdminDistrictPageTableComp';
import { useToasts } from 'react-toast-notifications';
import { Autocomplete } from '@material-ui/lab';
import { finalNewLoginToken } from '../../../../Utils/UserToken';

const SuperAdminDistrictPageComponents = () => {
  const [open, setOpen] = useState(false);
  const { division, setDivision } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { addToast } = useToasts();

  // form handle submit
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // creating new district (if it works, it works)
  const onSubmit = (data, e) => {
    const districtData = {
      name: data.district_name,
      division: {
        id: data.division,
      },
    };

    const data2 = JSON.stringify(districtData);
    const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

    const districtQuery = gql`
      mutation {
        createDistrict(
          district: ${unquotedData2}
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
            division {
              id
              name
              country
            }
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(districtQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createDistrict } = result?.data?.data;
        if (createDistrict !== null) {
          const { code, data, errors } = result?.data?.data?.createDistrict;

          if (code === 200 && data !== null) {
            addToast('District has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.district
              .getDistrict()
              .then(res => {
                setDistrict(
                  res?.data?.data?.getDistrictList?.data?.districtList
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
        addToast('Something wrong happend', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  const updateDistrictModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add District</span>
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
              error={errors.division}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Division
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Division'
                name='division'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('division', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {division.map(div => (
                  <MenuItem key={div.id} value={div.id}>
                    {div.name}
                  </MenuItem>
                ))}
              </Select>
              {/* <Autocomplete
                className="w-full"
                id="case-type"
                options={divisionName}
                renderOption={(option) => option.name}
                renderTags={(option) => option.name}
                getOptionLabel={(option) => option.id}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    className="bg-lightSilver rounded text-white w-full"
                    variant="outlined"
                    label="Division"
                    name="id"
                    color="secondary"
                    {...register("division", { required: true })}
                  />
                )}
              /> */}
              <FormHelperText>
                {errors.division?.type === 'required' && 'Division is required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='District Name'
              id='outlined-basic'
              name='district_name'
              variant='outlined'
              color='secondary'
              error={errors.district_name}
              {...register('district_name', { required: true })}
              helperText={
                errors.district_name?.type === 'required' &&
                'District Name can not be empty'
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
      <DashboardPageHading title='District' />
      <div className='flex flex-col space-y-3'>
        <div className='border-b border-deepIndigo border-opacity-50 flex items-end justify-between pb-1'>
          <h1 className='text-primarydark font-semibold border-b border-primarydark h-full -mb-1'>
            All
          </h1>
          <button onClick={() => setOpen(true)} style={{ outline: 'none' }}>
            <img src={addDistrict} alt='' />
          </button>
        </div>
      </div>
      <div className='mt-7'>
        <SuperAdminDistrictPageTableComp />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateDistrictModal}
      </Modal>
    </>
  );
};

export default SuperAdminDistrictPageComponents;
