import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import theme from '../../theme';
import yellowSubmit from '../../assets/images/secondary-submit-button.svg';
import { memo, useRef, useState } from 'react';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const ResetPasswordComponents = () => {
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');

  const { addToast } = useToasts();
  const history = useHistory();

  const [values, setValues] = useState({
    password: '',
    confirmpassword: '',
    showPassword: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const viewPassword = () => setShowPassword(!showPassword);

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const onSubmit = (data, e) => {
    //     password: "12345"
    // repeatPassword: "12345"
    const resetPasswordData = {
      newPassword: data.password,
      reWrittenNewPassword: data.repeatPassword,
    };

    const url = `http://103.69.150.122:8080/reset-password/${token}`;

    // axios({
    //   method: 'POST',
    //   url: url,
    //   data: resetPasswordData,
    // })
    //   .then(res => console.log('reset password', res))
    //   .then(err => console.log(err));
    axios
      .post(url, {
        newPassword: data.password,
        reWrittenNewPassword: data.repeatPassword,
      })
      .then(res => {
        if (res.status === 200) {
          history.push('/signin');
          addToast('Password has been successfully resetted.', {
            appearance: 'success',
            autoDismiss: true,
          });
          reset();
        }
      })
      .catch(err => {
        addToast('Something went wrong!!!!. Please try again', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  return (
    <>
      <div className='relative h-auto flex justify-center'>
        <div className='-mt-34 w-full bg-deepdark pb-20'>
          {/* -------------main content--------------- */}
          <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 relative flex lg:flex-row flex-col justify-between items-center lg:mt-56 mt-40 lg:space-y-0 space-y-8 w-full z-50'>
            {/* texts and staffs */}
            <div className='flex flex-col space-y-20 justify-center items-center relative  w-full text-white'>
              <div className='flex flex-col space-y-6'>
                <h1 className='font-bold text-4xl text-secondarylight  text-center'>
                  Reset Password
                </h1>
                <h2>Please follow the steps to reset your password.</h2>
              </div>
              <ThemeProvider theme={theme}>
                <form
                  className='w-full flex flex-col space-y-8 items-center'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <FormControl
                    className='lg:w-1/2 w-full'
                    variant='outlined'
                    error={errors.password}
                  >
                    <InputLabel
                      InputLabelProps={{ className: 'textfield__label' }}
                      htmlFor='outlined-adornment-password'
                    >
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      className='bg-primarydark rounded text-white w-full'
                      color='primary'
                      label='New Password'
                      id='outlined-adornment-password'
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleChange('password')}
                      {...register('password', { required: true })}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={viewPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {!showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                    <FormHelperText>
                      {errors?.password?.type === 'required' &&
                        'Password is required'}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    className='lg:w-1/2 w-full'
                    variant='outlined'
                    error={errors.repeatPassword}
                  >
                    <InputLabel htmlFor='outlined-adornment-password'>
                      Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                      className='bg-primarydark rounded text-white w-full flex items-center'
                      color='primary'
                      id='outlined-adornment-password'
                      label='Confirm New Password'
                      type={values.showPassword ? 'text' : 'password'}
                      onChange={handleChange('password')}
                      {...register('repeatPassword', {
                        validate: value =>
                          value === password.current || 'Password do not match',
                      })}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                    <FormHelperText>
                      {errors.repeatPassword && errors.repeatPassword.message}
                    </FormHelperText>
                  </FormControl>

                  <button
                    type='submit'
                    className='flex justify-center items-center'
                    style={{ outline: 'none' }}
                  >
                    <img src={yellowSubmit} alt='' />
                  </button>
                </form>
              </ThemeProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ResetPasswordComponents);
