import { ThemeProvider } from '@material-ui/styles';
import theme from '../../theme';
import yellowSubmit from '../../assets/images/secondary-submit-button.svg';
import { TextField } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { FormControl } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';

const ForgotPasswordComponents = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { addToast } = useToasts();

  const onSubmit = (data, e) => {
    const url = `http://103.69.150.122:8080/reset-password/request-for-reset-password/${data.email}`;
    axios
      .get(url)
      .then(function (res) {
        if (res?.status === 200) {
          addToast('Password reset email has been sent.', {
            appearance: 'success',
            autoDismiss: true,
          });
        } else if (res == null) {
          addToast('User not found', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch(err => {
        addToast('Something went wrong!!.', {
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
                  Forgot Password?
                </h1>
                <h2>Please enter your email address to continue.</h2>
              </div>
              <ThemeProvider theme={theme}>
                <form
                  className='lg:w-1/2 w-full flex flex-col space-y-8 items-center'
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <FormControl
                    className='w-full flex items-center'
                    error={errors.email}
                  >
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Enter Your Email Address'
                      id='outlined-basic'
                      name='email'
                      variant='filled'
                      color='secondary'
                      inputProps={{
                        autoComplete: 'off',
                      }}
                      autoComplete='off'
                      {...register('email', {
                        required: true,
                        pattern:
                          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      })}
                    />
                    <FormHelperText>
                      {errors?.email?.type === 'required'
                        ? 'Email is required'
                        : errors?.email?.type === 'pattern' &&
                          'Enter a valid email address'}
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

export default ForgotPasswordComponents;
