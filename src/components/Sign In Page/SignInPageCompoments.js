import { FilledInput, Modal } from '@material-ui/core';
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ThemeProvider } from '@material-ui/styles';
import jwt from 'jwt-decode';
import { memo, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import loginbutton from '../../assets/images/login-button.svg';
import signinbg from '../../assets/images/sign-in-image.svg';
import { DataContext } from '../../Context Api/ManageData';
// import signinwave from '../../assets/images/signinwave.svg';
import theme from '../../theme';
import { AdvocateApiHelper } from '../../Utils/AdvocateApiHelper';
import Loaders from '../Typographys/Loaders/Loaders';

const SignInPageCompoments = () => {
  const [values, setValues] = useState({
    password: '',
    confirmpassword: '',
    showPassword: false,
  });
  const [loginError, setLoginError] = useState({
    error: '',
  });
  const [loadingModal, setLoadingModal] = useState(false);
  const { addToast } = useToasts();
  const { loggedInUser, setLoggedInUser } = useContext(DataContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || {
    from: { pathname: '/dashboard/advocate' },
  };
  let { admin } = location.state || {
    admin: { pathname: '/dashboard/superadmin' },
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data, e) => {
    setLoadingModal(true);
    const loginInfo = {
      username: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    };
    AdvocateApiHelper.login
      .doLogin({ data: loginInfo })
      .then(res => {
        // console.log(res);
        handleSignIn(res);
      })
      .catch(err => {
        addToast('Something went wrong!!!. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        });
      });
  };

  //handling sign in
  const handleSignIn = loginData => {
    const { login } = loginData?.data?.data;
    if (login !== null) {
      const { code, data } = loginData?.data?.data?.login;
      if (data !== null) {
        let token = decodeToken(data);
        const loginInfo = {
          loginToken: data,
          isLoggedIn: true,
          userType: token?.user_type[0],
        };
        const newLoginInfo = JSON.stringify(loginInfo);
        localStorage.setItem('loginInfo', newLoginInfo);

        if (loginInfo?.userType === 'SUPER_ADMIN') {
          window.location.replace('/dashboard/superadmin');
        } else if (loginInfo?.userType === 'ADVOCATE') {
          window.location.replace('/dashboard/advocate');
        }
        // }
        // console.log('token values', loggedInUser);
      } else if (data === null && code !== 200) {
        // let error = "Wrong Credential. Please enter valid email and password";

        // if (error) {
        //   setLoginError({ error });
        // }
        addToast('Wrong Credentials', {
          appearance: 'error',
          autoDismiss: true,
        });
        setLoadingModal(false);
      }
    } else {
      addToast('There was an error proccessing your request', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };
  //decoding token value
  const decodeToken = tokenValue => {
    return jwt(tokenValue);
  };
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const [state, setState] = useState({
    checked: true,
  });

  const checkhandleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //loading modal
  const loadingModalView = <Loaders />;

  const localStore = localStorage.getItem('loginInfo');
  const newLocalStore = JSON.parse(localStore);
  return (
    <>
      {newLocalStore?.userType !== 'SUPER_ADMIN' &&
      newLocalStore?.userType !== 'ADVOCATE' ? (
        <>
          <div className='relative h-auto flex justify-center'>
            <div className='-mt-34 w-full bg-deepdark pb-16'>
              {/* -------------main content--------------- */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 relative flex lg:justify-between justify-center items-center space-x-3 lg:mt-44 mt-44 lg:-mb-10 -mb-10 w-full'
              >
                <div className='flex flex-col space-y-8 lg:w-5/12 w-full'>
                  <ThemeProvider theme={theme}>
                    <h1 className='font-bold text-4xl text-secondarylight lg:text-left text-center'>
                      Sign In
                    </h1>
                    <p className='text-lg text-white leading-relaxed lg:text-left text-center'>
                      Smarten your lawyering journey with{' '}
                      <span className='text-secondarydark text-lg font-bold'>
                        Xattorney
                      </span>
                      .
                    </p>
                    <p>{loginError.error}</p>
                    <div className='flex flex-col space-y-6'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full '
                        label='Email/Phone No'
                        id='outlined-basic'
                        name='email'
                        variant='filled'
                        color='secondary'
                        inputProps={{
                          autoComplete: 'off',
                        }}
                        autoComplete='off'
                        error={errors.email}
                        {...register('email', {
                          required: true,
                          pattern:
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        })}
                        helperText={
                          errors?.email?.type === 'required'
                            ? 'Email is required'
                            : errors?.email?.type === 'pattern' &&
                              'Enter a valid email address'
                        }
                      />

                      <FormControl
                        className='w-full bg-lightSilver rounded text-white'
                        variant='filled'
                        error={Boolean(errors.password)}
                      >
                        <InputLabel htmlFor='outlined-adornment-password'>
                          Password
                        </InputLabel>
                        <FilledInput
                          className='bg-lightSilver rounded text-white w-full h-full'
                          color='secondary'
                          id='outlined-adornment-password'
                          type={values.showPassword ? 'text' : 'password'}
                          {...register('password', {
                            required: true,
                          })}
                          // onChange={handleChange('password')}
                          endAdornment={
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge='end'
                              >
                                {values.showPassword ? (
                                  <Visibility className='text-deepdark' />
                                ) : (
                                  <VisibilityOff className='text-deepdark' />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          labelWidth={70}
                        />
                        <FormHelperText>
                          {errors.password?.type === 'required' &&
                            'Password is required'}
                        </FormHelperText>
                      </FormControl>
                      <div className='flex justify-between items-center'>
                        <label class='flex items-center md:text-base text-xs -mt-3'>
                          <input
                            type='checkbox'
                            class='h-4 w-4 text-green nm-inset-white-sm rounded'
                            {...register('rememberMe', { required: false })}
                          />
                          <span class='ml-2 mt-1 text-white text-sm'>
                            Remember me
                          </span>
                        </label>

                        <Link
                          to='/forgot-password'
                          className='text-white text-sm -mt-3 hover:underline'
                        >
                          Forgot Password
                        </Link>
                      </div>
                    </div>
                  </ThemeProvider>
                  <div className='flex justify-center items-center'>
                    <button
                      style={{ outline: 'none' }}
                      className='flex justify-center items-center'
                    >
                      <img src={loginbutton} alt='' />
                    </button>
                  </div>
                  <span className='text-sm text-white text-center'>
                    Don’t have any account?{' '}
                    <Link to='/buy-now' className='font-bold hover:underline'>
                      Buy Now
                    </Link>
                  </span>
                </div>
                <div className='lg:flex hidden w-7/12'>
                  <img src={signinbg} alt='' />
                </div>
              </form>
            </div>
          </div>
        </>
      ) : newLocalStore?.userType === 'SUPER_ADMIN' ? (
        window.location.replace('/dashboard/superadmin')
      ) : newLocalStore?.userType === 'ADVOCATE' ? (
        window.location.replace('/dashboard/advocate')
      ) : (
        window.location.replace('/signin')
      )}
      <Modal
        open={loadingModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {loadingModalView}
      </Modal>
    </>
  );
};

export default memo(SignInPageCompoments);
