import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import warn from '../../../../assets/images/warn.svg';
import greentick from '../../../../assets/images/greentick.svg';
import done from '../../../../assets/images/done.svg';
import confirm from '../../../../assets/images/confirm-button.svg';
import {
  IconButton,
  InputAdornment,
  Modal,
  OutlinedInput,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import addNewService from '../../../../assets/images/add-super-admin.svg';
import { useContext, useState } from 'react';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import theme from '../../../../theme';
import SuperAdminSuperAdminsPageTableComp from './SuperAdminSuperAdminsPageTableComp';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { DataContext } from '../../../../Context Api/ManageData';

const SuperAdminSuperAdminsPageComponents = () => {
  const [open, setOpen] = useState(false);
  const [sentWarnning, setSentWarning] = useState(false);
  const { admin, setAdmin } = useContext(DataContext);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [values, setValues] = useState({
    password: '',
    confirmpassword: '',
    showPassword: false,
  });
  const { addToast } = useToasts();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // --------------------------- create admin ---------------------------
  const onSubmit = (data, e) => {
    const adminData = {
      name: data.name,
      phone: data.tel,
      email: data.email,
      designation: data.designation_text,
      password: data.password,
      adminType: 'SUPER_ADMIN',
    };

    const onSuccessCreateAdmin = result => {
      const { createAdmin } = result?.data?.data;
      if (createAdmin !== null) {
        const { code, data, errors } = result?.data?.data.createAdmin;
        if (code === 200 && data !== null) {
          addToast('Admin has been created successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.admin
            .getAdmin()
            .then(res => {
              setAdmin(res?.data?.data?.getAdminList?.data?.adminList);
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
    const onErrorCreateAdmin = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.admin
      .createAdmin({ data: adminData })
      .then(onSuccessCreateAdmin)
      .catch(onErrorCreateAdmin);

    setOpen(false);
  };

  const addModal = (
    <div
      className='xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add A Super Admin</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
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
            <FormControl className='w-full' error={errors.name}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Full Name'
                id='outlined-basic'
                name='name'
                variant='outlined'
                color='secondary'
                {...register('name', { required: true })}
              />
              <FormHelperText>
                {errors.name?.type === 'required' && 'Name can not be empty'}
              </FormHelperText>
            </FormControl>
            <FormControl className='w-full' error={errors.email}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email Adress'
                id='outlined-basic'
                name='email'
                variant='outlined'
                color='secondary'
                {...register('email', { required: true })}
              />
              <FormHelperText>
                {errors.email?.type === 'required' && 'Email can not be empty'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl className='w-full' error={errors.tel}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone Number'
                id='outlined-basic'
                name='tel'
                variant='outlined'
                color='secondary'
                {...register('tel', { required: true })}
              />
              <FormHelperText>
                {errors.tel?.type === 'required' &&
                  'Phone number can not be empty'}
              </FormHelperText>
            </FormControl>
            <FormControl className='w-full' error={errors.designation_text}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Designation'
                id='outlined-basic'
                name='designation_text'
                variant='outlined'
                color='secondary'
                {...register('designation_text', { required: true })}
              />
              <FormHelperText>
                {errors.designation_text?.type === 'required' &&
                  'Bar Council Name can not be empty'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-start space-x-8'>
            <FormControl
              className='lg:w-1/2 w-full'
              variant='outlined'
              error={errors.password}
            >
              <InputLabel htmlFor='outlined-adornment-password'>
                Password
              </InputLabel>
              <OutlinedInput
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                id='outlined-adornment-password'
                type={values.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                {...register('password', { required: true })}
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
                {errors.password?.type === 'required' &&
                  'Password can not be empty'}
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
            type='submit'
            // onClick={() => setOpen(false) || setSentWarning(true)}
            style={{ outline: 'none' }}
          >
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  const sentAdminMailDetails = (
    <div
      className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
      }}
    >
      <h1 className='text-3xl font-bold text-center'>Warning</h1>
      <div className='flex justify-center items-center'>
        <img src={warn} alt='' />
      </div>
      <p className='text-2xl font-medium text-center leading-relaxed'>
        An email with password will be sent to this user’s email.
      </p>
      <button
        onClick={() => setSentWarning(false) || setSentSuccess(true)}
        style={{ outline: 'none' }}
      >
        <img src={confirm} alt='' />
      </button>
      <span
        onClick={() => setSentWarning(false)}
        className='underline text-sm font-bold cursor-pointer '
      >
        No, Thank You
      </span>
    </div>
  );

  const adminAddedSuccess = (
    <div
      className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
      }}
    >
      <h1 className='text-3xl font-bold text-center'>Well Done!</h1>
      <div className='flex justify-center items-center'>
        <img width={100} src={greentick} alt='' />
      </div>
      <p className='text-2xl font-medium text-center leading-relaxed'>
        We have sent you instruction <br /> at{' '}
        <span className='font-bold'>abc@abc.com</span>
      </p>
      <button onClick={() => setSentSuccess(false)} style={{ outline: 'none' }}>
        <img src={done} alt='' />
      </button>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='Super Admin' />
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
        <SuperAdminSuperAdminsPageTableComp />
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addModal}
      </Modal>
      <Modal
        open={sentWarnning}
        onClose={() => setSentWarning(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {sentAdminMailDetails}
      </Modal>
      <Modal
        open={sentSuccess}
        onClose={() => setSentSuccess(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {adminAddedSuccess}
      </Modal>
    </>
  );
};

export default SuperAdminSuperAdminsPageComponents;
