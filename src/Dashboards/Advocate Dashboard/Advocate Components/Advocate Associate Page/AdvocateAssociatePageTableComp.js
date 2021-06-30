import editIcon from '@iconify-icons/akar-icons/edit';
import eyeIcon from '@iconify-icons/akar-icons/eye';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import clockCircleOutlined from '@iconify-icons/ant-design/clock-circle-outlined';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { Menu } from '@material-ui/core';

import confirm from '../../../../assets/images/confirm-button.svg';
import { MenuItem } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import addAssociate from '../../../../assets/images/addAssociate.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import addNow from '../../../../assets/images/update-button-large.svg';
import theme from '../../../../theme';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';

import passwordIcon from '@iconify-icons/carbon/password';
import gql from 'graphql-tag';
import axios from 'axios';
import { MAIN_API } from '../../../../Utils/APIs';
import { print } from 'graphql';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import Loaders from '../../../../components/Typographys/Loaders/Loaders';

const AdvocateAssociatePageTableComp = () => {
  const [createUser, setCreateUser] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { advocateAssociate, setAdvocateAssociate } = useContext(DataContext);
  const [associateId, setAssociateId] = useState('');
  const [loadingModal, setLoadingModal] = useState(false);
  const [updateAssociate, setUpdateAssociate] = useState([]);
  const { addToast } = useToasts();

  const [values, setValues] = useState({
    password: '',
    confirmpassword: '',
    showPassword: false,
  });
  const [resetPasswordModal, setResetPasswordModal] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset: reset2,
    watch: watch2,
  } = useForm();

  const [newPassword, setNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState(false);

  const password = useRef({});
  password.current = watch2('newPass', '');

  const showNewPassword = () => setNewPassword(!newPassword);
  const showConfirmNewPassword = () =>
    setConfirmNewPassword(!confirmNewPassword);

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setAssociateId(id);
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

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  //----------------------------------------------------------------
  // ---------------------------delete Associate--------------------
  //----------------------------------------------------------------
  const deleteAssociate = e => {
    setLoadingModal(true);

    const onSuccessDeleteAdvocatAssociate = () => {
      AdvocateApiHelper.advAssociate.getAdvAssociate().then(res => {
        setAdvocateAssociate(
          res?.data?.data?.getAssociateList?.data?.associateList
        );
      });
      addToast('Associate has been deleted succesfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    };
    const onErrorDeleteAdvocateAssociate = error => {
      setLoadingModal(false);
    };

    AdvocateApiHelper.advAssociate
      .deleteAdvAssociate(associateId)
      .then(res => {
        setLoadingModal(false);
        const { deleteAssociate } = res?.data?.data;
        if (deleteAssociate !== null) {
          const { code, data, errors } = res?.data?.data?.deleteAssociate;
          if (code === 200) {
            return onSuccessDeleteAdvocatAssociate();
          } else {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something Went Wrong', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      //  .then(() => window.location.reload())
      .catch(onErrorDeleteAdvocateAssociate);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  //------------------------------------------------------------------------
  //changing update data
  //--------------------------------------------------------------------
  const handleInputChange = e => {
    if (e.target.name === 'designation') {
      setUpdateAssociate({
        ...updateAssociate,
        [e.target.name]: e.target.value,
      });
    } else {
      setUpdateAssociate({
        ...updateAssociate,
        [e.target.name]: e.target.value,
      });
    }
  };

  //getting associate data by id

  const viewDetailsByID = advocateAssociate.find(
    ({ id }) => id === associateId
  );

  useEffect(() => {
    setUpdateAssociate(viewDetailsByID);
  }, [associateId, viewDetailsByID]);
  //creating new associate
  const updateDesignation = updateAssociate?.designation
    ? updateAssociate?.designation
    : null;
  const handleAssociateUpdate = e => {
    setLoadingModal(true);
    e.preventDefault();
    const updateAssociateData = {
      id: associateId,
      name: updateAssociate?.name,
      phone: updateAssociate?.phone,
      email: updateAssociate?.email,
      designation: updateDesignation,
    };

    // const onSuccessUpdateAssociate = () => {
    //   // console.log('update result', result);
    //   AdvocateApiHelper.advAssociate
    //     .getAdvAssociate()
    //     .then(res => {
    //       setAdvocateAssociate(
    //         res?.data?.data?.getAssociateList?.data?.associateList
    //       );
    //       addToast('Successfully Updated Associate data', {
    //         appearance: 'success',
    //         autoDismiss: true,
    //       });
    //     })
    //     .then(() => {
    //       // window.location.reload();
    //     })
    //     .catch(error =>
    //       addToast('Something wrong happend', {
    //         appearance: 'error',
    //         autoDismiss: true,
    //       })
    //     );
    //   // window.location.reload();
    // };
    const onErrorUpdateAssociate = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
      setLoadingModal(false);
    };

    AdvocateApiHelper.advAssociate
      .updateAssociate({ data: updateAssociateData })
      .then(res => {
        setLoadingModal(false);
        const { updateAssociateBasicInformation } = res?.data?.data;
        if (
          updateAssociateBasicInformation !== null ||
          updateAssociateBasicInformation.length !== 0
        ) {
          const { code, data, errors } =
            res?.data?.data?.updateAssociateBasicInformation;

          if (code === 200) {
            // return onSuccessUpdateAssociate();
            AdvocateApiHelper.advAssociate
              .getAdvAssociate()
              .then(res => {
                setAdvocateAssociate(
                  res?.data?.data?.getAssociateList?.data?.associateList
                );
                addToast('Successfully Updated Associate data', {
                  appearance: 'success',
                  autoDismiss: true,
                });
              })
              .then(() => {
                // window.location.reload();
              })
              .catch(error =>
                addToast('Something wrong happend', {
                  appearance: 'error',
                  autoDismiss: true,
                })
              );
          } else {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        }
      })
      .catch(onErrorUpdateAssociate);

    setCreateUser(false);
    handleClose();
  };

  //-------------------------------------------------------------
  //-------------------reset associate password------------------
  //-------------------------------------------------------------
  const resetAssociatePassword = (data, e) => {
    setLoadingModal(true);

    const associateResetPassword = {
      associateId: associateId,
      newPassword: data.newPass,
      reWrittenNewPassword: data.repeat_pass,
    };

    const newAssociatePass = JSON.stringify(associateResetPassword);
    const finalAssociatePass = newAssociatePass.replace(/"([^"]+)":/g, '$1:');

    const associateResetPasswordQuery = gql`
      mutation {
        updateAssociatePassword(
          resetPasswordFormData: ${finalAssociatePass}
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
            address {
              streetAddress
              postOffice {
                id
                name
                postCode
              }
              subDistrict {
                id
                name
              }
              district {
                id
                name
              }
              country
            }
            emergencyContactPerson {
              name
              phoneList
              emailList
              relation
            }
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(associateResetPasswordQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        setLoadingModal(false);

        const { updateAssociatePassword } = res?.data?.data;

        if (updateAssociatePassword !== null) {
          const { code, data, errors } =
            res?.data?.data?.updateAssociatePassword;

          if (code === 200) {
            addToast('Associate Password has been updated successfully.', {
              appearance: 'success',
              autoDismiss: true,
            });
            reset2();
            setResetPasswordModal(false);
          } else {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong!!!. Please try again later.', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch(err => {
        addToast('Something went wrong!!!. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        });
        setLoadingModal(false);
      });
  };

  //-------------------------------------------------------------
  //-------------------reset associate password------------------
  //-------------------------------------------------------------

  //--------------------------------------------------
  //fetching associate data---------------------------
  //--------------------------------------------------
  let newAssociateData = [];
  advocateAssociate.map((item, idx) => {
    newAssociateData.push({
      sl: idx + 1,
      name: item?.name,
      phone: item?.phone,
      address: item?.address?.streetAddress,
      district: item?.address?.district?.name,
      subDistrict: item?.address?.subDistrict?.name,
      postOffice: item?.address?.postOffice?.name,
      id: item?.id,
    });
  });

  const columns = [
    {
      name: 'sl',
      label: 'SL. No',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'phone',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'package',
      label: 'Assigned Case',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'address',
      label: 'Address',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'district',
      label: 'District',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'subdistrict',
      label: 'Sub District',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'postOffice',
      label: 'Post Office',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <div>
              <Button
                style={{ outline: 'none' }}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={event => handleClick(event, value)}
              >
                <Icon
                  className='text-2xl text-purple-400'
                  icon={overflowMenuVertical}
                />
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {/* <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={clockCircleOutlined} />
                  <span>Renwew</span>
                </MenuItem> */}
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setCreateUser(true)}
                >
                  <Icon icon={editIcon} />
                  <span>Edit</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setResetPasswordModal(true)}
                >
                  <Icon icon={passwordIcon} />
                  <span>Reset Password</span>
                </MenuItem>

                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setDeleteModal(true)}
                >
                  <Icon icon={trashCan} />
                  <span>Delete</span>
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  ///associate reset password modal

  const resetPassword = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Edit Name</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setResetPasswordModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit2(resetAssociatePassword)}
        className='w-full px-12 flex flex-col items-center space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors2.newPass}
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
                error={errors2.newPass}
                // onChange={handleChange('password')}
                {...register2('newPass', { required: true })}
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
                {errors2?.newPass?.type === 'required' &&
                  'New Password is required'}
              </FormHelperText>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors2.repeat_pass}
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
                {...register2('repeat_pass', {
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
                      {confirmNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
              <FormHelperText>
                {errors2?.repeat_pass && errors2?.repeat_pass?.message}
              </FormHelperText>
            </FormControl>
          </div>
        </ThemeProvider>
        <button
          type='submit'
          // onClick={() => setOpenName(false)}
          style={{ outline: 'none' }}
        >
          <img src={confirm} alt='' />
        </button>
      </form>
    </div>
  );

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
        <span>Update Associate</span>
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
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleAssociateUpdate}
        className='w-full px-12 flex flex-col space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full my-2'
                label='Name'
                id='outlined-basic'
                name='name'
                variant='outlined'
                color='secondary'
                value={updateAssociate?.name}
                onChange={handleInputChange}
                // {...register('name', { required: 'Name is required' })}
                // error={errors.name}
                // helperText={errors.name?.message}
              />

              <FormControl
                className='w-full'
                variant='outlined'
                error={errors.designation}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Designation
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  name='designation'
                  value={updateAssociate?.designation}
                  onChange={handleInputChange}
                  // {...register('designation', { required: true })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='ADVOCATE'>Advocate</MenuItem>
                  <MenuItem value='BARRISTER'>Barrister</MenuItem>
                  <MenuItem value='LAWYER'>Lawyer</MenuItem>
                </Select>
                <FormHelperText style={{ color: 'red !important' }}>
                  {errors.designation?.type === 'required' &&
                    'Designation is required'}
                </FormHelperText>
              </FormControl>
            </div>
          </div>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Phone Number'
              id='outlined-basic'
              name='phone'
              variant='outlined'
              color='secondary'
              value={updateAssociate?.phone}
              onChange={handleInputChange}
              // {...register('phone', {
              //   required: true,
              //   pattern: /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/,
              // })}
              // error={errors.phone}
              // helperText={
              //   errors.phone?.type === 'required'
              //     ? 'Phone Number is required'
              //     : errors.phone?.type === 'pattern' &&
              //       'Enter a valid phone number'
              // }
            />
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Email'
              id='outlined-basic'
              name='email'
              variant='outlined'
              color='secondary'
              onChange={handleInputChange}
              value={updateAssociate?.email}
              // {...register('email', {
              //   required: true,
              //   pattern:
              //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              // })}
              // error={errors.email}
              // helperText={
              //   errors.email?.type === 'required'
              //     ? 'Email is required'
              //     : errors?.email?.type === 'pattern' &&
              //       'Please Enter a valid email address'
              // }
            />
          </div>
        </ThemeProvider>
        <div className='w-full flex justify-center items-center space-x-6'>
          {/* <button
            style={{ outline: 'none' }}
            type='reset'
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button> */}
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
  // -------------------------------- delete modal --------------------------------
  const deleteTableData = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Confirm Delete</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setDeleteModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col space-y-3 justify-center items-center'>
        <div className='-mt-7'>
          <img src={warn} alt='' />
        </div>
        <h1 className='text-xl'>This action is not reversible.</h1>
        <h1 className='text-xl'>Are you sure to delete this?</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 w-48 capitalize'
          onClick={() => deleteAssociate()}
        >
          Confirm
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-800 text-white text-sm font-semibold bg-red-800 h-11 w-48 capitalize'
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const loadingModalView = <Loaders />;

  return (
    <>
      <div className='flex items-center justify-end h-10 -mt-16'>
        <button style={{ outline: 'none' }}>
          <Link to='/dashboard/advocate/associates/add-new-associate'>
            <img src={addAssociate} alt='' />
          </Link>
        </button>
      </div>

      <MUIDataTable
        title={'Associate List'}
        data={newAssociateData}
        columns={columns}
        options={options}
      />
      <Modal
        open={createUser}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addNewUser}
      </Modal>
      <Modal
        open={resetPasswordModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {resetPassword}
      </Modal>
      <Modal
        open={deleteModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
      </Modal>
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

export default AdvocateAssociatePageTableComp;
