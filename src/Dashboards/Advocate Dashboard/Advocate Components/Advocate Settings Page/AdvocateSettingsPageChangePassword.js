import {
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  ThemeProvider,
} from '@material-ui/core';
import theme from '../../../../theme';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useRef, useState } from 'react';
import update from '../../../../assets/images/update-button.svg';
import { useForm } from 'react-hook-form';
import { FormHelperText } from '@material-ui/core';
import gql from 'graphql-tag';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { MAIN_API } from '../../../../Utils/APIs';
import { print } from 'graphql';
import { finalNewLoginToken } from '../../../../Utils/UserToken';

const AdvocateSettingsPageChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();
  const { addToast } = useToasts();

  const [oldPassword, setOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(false);

  const showOldPassowrd = () => setOldPassword(!oldPassword);
  const showNewPassword = () => setNewPassword(!newPassword);
  const showConfirmNewPassword = () =>
    setConfirmNewPassword(!confirmNewPassword);

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const password = useRef({});
  password.current = watch('newPass', '');

  const onSubmit = data => {
    // newPass: '123';
    // oldPass: '123';
    // repeat_pass: '123';

    const updatePassData = {
      oldPassword: data.oldPass,
      newPassword: data.newPass,
      reWrittenPassword: data.repeat_pass,
    };

    const newUpdatePassData = JSON.stringify(updatePassData);
    const finalUpdatePass = newUpdatePassData.replace(/"([^"]+)":/g, '$1:');

    const updatePasswordQuery = gql`
      mutation {
        updateAdvocatePassword(
          passwordResetFormData: ${finalUpdatePass}
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
            phone
            email
            designation
            chamberName
            address {
              streetAddress
              postOffice {
                id
              }
              subDistrict {
                id
              }
              district {
                id
              }
              country
            }
            bloodGroup
            picture
            phoneVerified
            phoneVerifiedTime
            emailVerified
            emailVerifiedTime
            phoneList {
              number
              verified
              verifiedOn
            }
            emailList {
              address
              verified
              verifiedOn
            }
            fax
            website
            membershipList {
              barCouncil {
                id
                name
              }
              memberId
            }
            serviceAreaList {
              id
              name
            }
            specialitiesList {
              id
              name
            }
            affiliationsList {
              id
              name
            }
            branchList
            legalAidServices
            proBonoServices
            pushNotification
            sendAutoSmsToClient
            sendAutoEmailToClient
            newsletterSubscription
          }
        }
      }
    `;
    axios
      .post(
        MAIN_API,
        {
          query: print(updatePasswordQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { updateAdvocatePassword } = result?.data?.data;
        if (updateAdvocatePassword !== null) {
          const { code, data, errors } =
            result?.data?.data?.updateAdvocatePassword;

          if (code === 200) {
            addToast('Password updated successfully.', {
              appearance: 'success',
              autoDismiss: true,
            });
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

  return (
    <>
      <Paper className='w-full rounded-md' elevation={4}>
        <div className='w-full bg-white rounded-md h-104 text-primarydark'>
          <div className='h-13 flex justify-start items-center pl-4 pr-12'>
            <h1 className='font-semibold text-lg'>Change Password</h1>
          </div>
          <Divider />
          <div className='flex flex-col justify-center items-center pl-4 lg:pr-12 pr-4 w-full mt-13'>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className='flex flex-col items-center space-y-6 lg:w-2/4 w-full'
            >
              <ThemeProvider theme={theme}>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  error={errors.oldPass}
                >
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Old Password
                  </InputLabel>
                  <OutlinedInput
                    className='bg-lightSilver rounded text-white w-full'
                    color='primary'
                    InputLabelProps={{ className: 'textfield__label' }}
                    label='Old Password'
                    id='outlined-adornment-password'
                    error={errors.oldPass}
                    type={oldPassword ? 'text' : 'password'}
                    // onChange={handleChange('password')}
                    {...register('oldPass', { required: true })}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={showOldPassowrd}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {oldPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  <FormHelperText>
                    {errors?.oldPass?.type === 'required' &&
                      'Old Password is required'}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  error={errors.newPass}
                >
                  <InputLabel
                    InputLabelProps={{ className: 'textfield__label' }}
                    htmlFor='outlined-adornment-password'
                  >
                    New Password
                  </InputLabel>
                  <OutlinedInput
                    className='bg-lightSilver rounded text-white w-full'
                    color='primary'
                    label='New Password'
                    name='newPass'
                    id='outlined-adornment-password'
                    type={newPassword ? 'text' : 'password'}
                    error={errors.newPass}
                    // onChange={handleChange('password')}
                    {...register('newPass', { required: true })}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={showNewPassword}
                          // onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {newPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    }
                    labelWidth={70}
                  />
                  <FormHelperText>
                    {errors?.newPass?.type === 'required' &&
                      'New Password is required'}
                  </FormHelperText>
                </FormControl>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  error={errors.repeat_pass}
                >
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Confirm New Password
                  </InputLabel>
                  <OutlinedInput
                    className='bg-lightSilver rounded text-white w-full flex items-center'
                    color='primary'
                    id='outlined-adornment-password'
                    label='Confirm New Password'
                    type={confirmNewPassword ? 'text' : 'password'}
                    // onChange={handleChange('password')}
                    // {...register()}
                    {...register('repeat_pass', {
                      validate: value =>
                        value === password?.current || 'Password do not match',
                    })}
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          name='confirmNewPass'
                          onClick={showConfirmNewPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {confirmNewPassword ? (
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
                    {errors?.repeat_pass && errors?.repeat_pass?.message}
                  </FormHelperText>
                </FormControl>
              </ThemeProvider>

              <button style={{ outline: 'none' }}>
                <img src={update} alt='' />
              </button>
            </form>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default AdvocateSettingsPageChangePassword;
