import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Modal, ThemeProvider } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { OutlinedInput } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNewButton from '../../../../assets/images/add-new-button.svg';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminHomePageNewUsersTableComp from '../Super Admin Home Page/Super Admin Home Page Tab Components/Super Admin Home Page New Users Components/SuperAdminHomePageNewUsersTableComp';
import SuperAdminUserPageNewUserTable from './Super Admin User Page Tables/SuperAdminUserPageNewUserTable';
import SuperAdminUserPageTabComps from './Super Admin User Page Tables/SuperAdminUserPageTabComps';
import PuffLoader from 'react-spinners/PuffLoader';

const SuperAdminUsersPageComponents = () => {
  const { addToast } = useToasts();
  const [createUser, setCreateUser] = useState(false);
  const [values, setValues] = useState({
    password: '',
    confirmpassword: '',
    showPassword: false,
  });
  const [confirmPass, setConfirmPass] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { advocate, setAdvocate } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { pricingPlan, setPricingPlan } = useContext(DataContext);
  let [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const confirmPassword = () => {
    setConfirmPass(!confirmPass);
  };
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  // --------------------------
  const onSubmit = (data, e) => {
    const advocateData = {
      advocate: {
        name: data.full_name,
        chamberName: data.chamber_name,
        phone: data.phone_number,
        email: data.email,
        password: data.password,
        address: {
          streetAddress: data.address,
          subDistrict: {
            id: data.sub_district,
          },
          district: {
            id: data.district,
          },
          country: data.country,
        },
      },
      pricingPlan: {
        id: data.package_type,
      },
      payMode: data.payment_via,
    };

    const data2 = JSON.stringify(advocateData);
    const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

    const advocateQuery = gql`
      mutation {
        createAdvocatePlanAsAnAdmin(
          advocatePlan: ${unquotedData2}
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
            advocate {
              id
              name
              phone
              email
              chamberName
              address {
                streetAddress
                subDistrict {
                  id
                }
                district {
                  id
                }
                country
              }
            }
            pricingPlan {
              id
            }
            payMode
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(advocateQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createAdvocatePlanAsAnAdmin } = result?.data?.data;
        if (createAdvocatePlanAsAnAdmin !== null) {
          const { code, data, errors } =
            result?.data?.data?.createAdvocatePlanAsAnAdmin;

          if (code === 200 && data !== null) {
            addToast('Advocate has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.advocate
              .getAdvocate()
              .then(res => {
                setAdvocate(
                  res?.data?.data?.getAdvocateList?.data?.advocateList
                );
              })
              .then(() => reset())
              .then(() => setCreateUser(false))
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

    // setCreateUser(false);
  };

  const addNewUser = (
    <div
      className='2xl:w-2/3 w-11/12 lg:h-auto h-full bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add New User</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setCreateUser(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      {/* main content */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full px-12 flex flex-col space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <FormControl error={errors.full_name} className='w-full'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Full Name'
                id='outlined-basic'
                name='full_name'
                variant='outlined'
                color='secondary'
                error={errors.full_name}
                {...register('full_name', { required: true })}
              />
              <FormHelperText>
                {errors?.full_name?.type === 'required' &&
                  'Full Name is required'}
              </FormHelperText>
            </FormControl>
            <FormControl className='w-full' error={errors.chamber_name}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Chamber Name'
                id='outlined-basic'
                name='chamber_name'
                variant='outlined'
                color='secondary'
                error={errors.chamber_name}
                {...register('chamber_name', { required: true })}
              />
              <FormHelperText>
                {errors?.chamber_name?.type === 'required' &&
                  'Chamber Name is required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <FormControl className='w-full' error={errors.phone_number}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone No.'
                id='outlined-basic'
                name='phone_number'
                variant='outlined'
                color='secondary'
                error={errors.phone_number}
                {...register('phone_number', {
                  required: true,
                  pattern: /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/,
                })}
              />
              <FormHelperText>
                {errors?.phone_number?.type === 'required'
                  ? 'Phone Number is required'
                  : errors?.phone_number?.type === 'pattern' &&
                    'Please enter a valid phone number.'}
              </FormHelperText>
            </FormControl>
            <FormControl className='w-full' error={errors.email}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='email'
                variant='outlined'
                color='secondary'
                error={errors.email}
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              <FormHelperText>
                {errors?.email?.type === 'required'
                  ? 'Email is required'
                  : errors?.email?.type === 'pattern' &&
                    'Please enter a valid email address.'}
              </FormHelperText>
            </FormControl>
          </div>

          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <FormControl className='w-full' error={errors.address}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Address'
                id='outlined-basic'
                name='address'
                variant='outlined'
                color='secondary'
                error={errors.address}
                {...register('address', { required: true })}
              />
              <FormHelperText>
                {errors?.address?.type === 'required' && 'Address is required'}
              </FormHelperText>
            </FormControl>
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
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
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
                  'Sub District is required'}
              </FormHelperText>
            </FormControl>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.country}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Country
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Country'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                name='country'
                {...register('country', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='Bangladesh'>Bangladesh</MenuItem>
              </Select>
              <FormHelperText>
                {errors?.country?.type === 'required' && 'Country is required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.password}
            >
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                name='password'
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                {...register('password', { required: true, minLength: 6 })}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText>
                {errors.password?.type === 'required'
                  ? 'Password is required'
                  : errors?.password?.type === 'minLength' &&
                    'Password must be at least 6 character long.'}
              </FormHelperText>
            </FormControl>
            <FormControl className='w-full' variant='outlined'>
              <InputLabel htmlFor='outlined-adornment-password'>
                Confirm Password
              </InputLabel>
              <OutlinedInput
                className='bg-lightSilver rounded text-white w-full flex items-center'
                color='secondary'
                name='password_repeat'
                id='outlined-adornment-password'
                type={confirmPass ? 'text' : 'password'}
                onChange={handleChange('password')}
                // {...register('password_repeat', {
                //   validate: value =>
                //     value === confirmPassword || 'The passwords do not match',
                // })}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={confirmPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {confirmPass ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText>
                {/* {errors?.password_repeat && 'Passwords do not match'} */}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.package_type}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Package Type
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Package Type'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('package_type', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {pricingPlan.map(pack => (
                  <MenuItem value={pack.id}>{pack.planMode}</MenuItem>
                ))}
              </Select>
              <FormHelperText>
                {errors?.package_type?.type === 'required' &&
                  'Please select your favorite package'}
              </FormHelperText>
            </FormControl>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.payment_via}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Payment Via
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Payment Via'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('payment_via', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value='CASH'>Cash</MenuItem>
                <MenuItem value='ONLINE_PAYMENT'>Online Payment</MenuItem>
                <MenuItem value='BANK'>Bank</MenuItem>
              </Select>
              <FormHelperText>
                {errors?.payment_via?.type === 'required' &&
                  'Please select your favorite payment method'}
              </FormHelperText>
            </FormControl>
          </div>
        </ThemeProvider>

        <div className='w-full flex justify-center items-center space-x-6'>
          <button
            style={{ outline: 'none' }}
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button>
          <button
            // onClick={() => setCreateUser(false)}
            style={{ outline: 'none' }}
          >
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='All Users' />
      {advocate.length === 0 ? (
        <>
          <div className='w-full min-h-screen flex justify-center items-center -mt-40'>
            <PuffLoader loading={loading} size={150} />
          </div>
        </>
      ) : (
        <div className='mt-20 relative z-10'>
          <div className='flex items-center justify-end h-10 -mt-16'>
            <button
              onClick={() => setCreateUser(true)}
              style={{ outline: 'none' }}
              className='z-40'
            >
              <img src={addNewButton} alt='' />
            </button>
          </div>

          <Modal
            open={createUser}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
          >
            {addNewUser}
          </Modal>
          <div className='w-full -mt-5'>
            <SuperAdminUserPageTabComps
              newChildren={<SuperAdminUserPageNewUserTable />}
              allChildren={<SuperAdminUserPageNewUserTable />}
            />
          </div>
        </div>
      )}
      {/* <div className='mt-20 relative z-10'>
        <div className='flex items-center justify-end h-10 -mt-16'>
          <button
            onClick={() => setCreateUser(true)}
            style={{ outline: 'none' }}
            className='z-40'
          >
            <img src={addNewButton} alt='' />
          </button>
        </div>

        <Modal
          open={createUser}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {addNewUser}
        </Modal>
        <div className='w-full -mt-5'>
          <SuperAdminUserPageTabComps
            newChildren={<SuperAdminUserPageNewUserTable />}
            allChildren={<SuperAdminUserPageNewUserTable />}
          />
        </div>
      </div> */}
    </>
  );
};

export default SuperAdminUsersPageComponents;
