import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  OutlinedInput,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import { Icon } from '@iconify/react';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import eyeIcon from '@iconify-icons/akar-icons/eye';
import keyIcon from '@iconify-icons/codicon/key';
import disabledIcon from '@iconify-icons/fe/disabled';
import { DataContext } from '../../../../Context Api/ManageData';
import { useToasts } from 'react-toast-notifications';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import theme from '../../../../theme';
import { useForm } from 'react-hook-form';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { ApiHelper } from '../../../../Utils/ApiHelper';

const SuperAdminSuperAdminsPageTableComp = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { admin, setAdmin } = useContext(DataContext);
  const [adminStatusModal, setAdminStatusModal] = useState(false);
  const { addToast } = useToasts();
  const [status, setStatus] = useState('');
  const [adminId, setAdminId] = useState('');
  const [values, setValues] = useState({
    password: '',
    confirmpassword: '',
    showPassword: false,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleClick = (event, id, value) => {
    setAnchorEl(event.currentTarget);
    setAdminId(id);
    setStatus(value.rowData[4]);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // --------------------------- update admin ---------------------------
  const onSubmit = (data, e) => {
    const adminData = {
      id: adminId,
      name: data.name,
      phone: data.tel,
      email: data.email,
      password: data.password,
      designation: data.designation_text,
      adminType: 'SUPER_ADMIN',
    };

    const onSuccessUpdateAdmin = result => {
      const { updateAdmin } = result?.data?.data;
      if (updateAdmin !== null) {
        const { code, data, errors } = result?.data?.data.updateAdmin;
        if (code === 200 && data !== null) {
          addToast('Admin has been updated successfully', {
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
    const onErrorUpdateAdmin = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.admin
      .updateAdmin({ data: adminData })
      .then(onSuccessUpdateAdmin)
      .catch(onErrorUpdateAdmin);
  };

  // --------------------------- update admin status ---------------------------
  const updateAdminStatusFunction = async () => {
    let statusChange = '';

    if (status === 'INACTIVE') {
      statusChange = 'ACTIVE';
    } else {
      statusChange = 'INACTIVE';
    }

    const adminData = {
      id: adminId,
      adminStatus: statusChange,
    };

    const onSuccessUpdateAdminStatus = result => {
      const { updateAdminStatus } = result?.data?.data;
      if (updateAdminStatus !== null) {
        const { code, data, errors } = result?.data?.data.updateAdminStatus;
        if (code === 200 && data !== null) {
          addToast('Admin status has been changed', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.admin
            .getAdmin()
            .then(res => {
              setAdmin(res?.data?.data?.getAdminList?.data?.adminList);
            })
            // .then(() => window.location.reload())
            .then(() => setAdminStatusModal(false))
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
    const onErrorUpdateAdminStatus = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.admin
      .updateAdminStatus({ data: adminData })
      .then(onSuccessUpdateAdminStatus)
      .catch(onErrorUpdateAdminStatus);
  };

  let newAdmin = [];
  admin.map((item, index) => {
    newAdmin.push({
      sl: index + 1,
      name: item?.name,
      phone: item?.phone,
      email: item?.email,
      designation: item?.designation,
      adminStatus: item?.adminStatus,
      id: item?.id,
    });
  });

  const columns = [
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'designation',
      label: 'Designation',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'phone',
      label: 'Phone',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'adminStatus',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: adminStatus => {
          if (adminStatus === 'ACTIVE') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-primarydark text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      Active
                    </span>
                  </div>
                </div>
              </>
            );
          }
          if (adminStatus === 'INACTIVE') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-red-800 text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      Inactive
                    </span>
                  </div>
                </div>
              </>
            );
          }
          return <div>Unknown</div>;
        },
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (id, value) => {
          return (
            <div>
              <Button
                style={{ outline: 'none' }}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={event => handleClick(event, id, value)}
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
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={eyeIcon} />
                  <span>View</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setOpen(true)}
                >
                  <Icon icon={editIcon} />
                  <span>Edit</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={trashCan} />
                  <span>Delete</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={handleClose}
                >
                  <Icon icon={keyIcon} />
                  <span>Change Password</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setAdminStatusModal(true)}
                >
                  <Icon icon={disabledIcon} />
                  <span>Change Status</span>
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

  // --------------------------- edit admin ---------------------------
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
            {/* <FormControl className='w-full' error={errors.admin_type}>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Designation'
                id='outlined-basic'
                name='admin_type'
                variant='outlined'
                color='secondary'
                {...register('admin_type', { required: true })}
              />
              <FormHelperText>
                {errors.admin_type?.type === 'required' &&
                  'Bar Council Name can not be empty'}
              </FormHelperText>
            </FormControl> */}
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
          <button type='submit' style={{ outline: 'none' }}>
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  // -------------------------------- change status modal --------------------------------
  const chageStatusModal = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Change Status</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setAdminStatusModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex justify-center items-center'>
        <h1>Do you want to change the status?</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-deepGreen text-white text-sm font-semibold bg-deepGreen h-9 w-48'
          onClick={() => updateAdminStatusFunction()}
        >
          yes
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-500 text-white text-sm font-semibold bg-red-500 h-9 w-48'
          onClick={() => setAdminStatusModal(false)}
        >
          No
        </button>
      </div>
    </div>
  );

  return (
    <>
      <MUIDataTable
        title={'Super Admin List'}
        data={newAdmin}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addModal}
      </Modal>

      <Modal
        open={adminStatusModal}
        onClose={() => setAdminStatusModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {chageStatusModal}
      </Modal>
    </>
  );
};

export default SuperAdminSuperAdminsPageTableComp;
