import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import {
  Button,
  Menu,
  MenuItem,
  Modal,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../Context Api/ManageData';
import { useToasts } from 'react-toast-notifications';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import theme from '../../../../theme';
import addNow from '../../../../assets/images/add-now.svg';

import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { useForm } from 'react-hook-form';

const SuperAdminSpecialitiesPageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { specialities, setSpecialities } = useContext(DataContext);
  const [specialitiesId, setSpecialitiesID] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateSpecialitiesSingleData, setUpdateSpecialitiesSingleData] =
    useState([]);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // table action menu open
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSpecialitiesID(id);
  };

  // table action menu clsoe
  const handleClose = () => {
    setAnchorEl(null);
  };

  //setting default value
  const viewDetailsByID = specialities.find(({ id }) => id === specialitiesId);

  console.log('specialities data by id', viewDetailsByID);

  const hanldeUpdateValueChange = e => {
    setUpdateSpecialitiesSingleData({
      ...updateSpecialitiesSingleData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setUpdateSpecialitiesSingleData(viewDetailsByID);
  }, [specialitiesId, viewDetailsByID]);

  // -------------------------------- update specialities data --------------------------------
  const onSubmit = (data, e) => {
    const updateSpecialitiesData = {
      id: specialitiesId,
      name: updateSpecialitiesSingleData?.name,
    };

    const onSuccessUpdateSpecialities = result => {
      const { updateSpecialities } = result?.data?.data;
      if (updateSpecialities !== null) {
        const { code, data, errors } = result?.data?.data.updateSpecialities;

        if (code === 200 && data !== null) {
          addToast('Spacilities has been updated successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.specialities
            .getSpecialities()
            .then(res => {
              setSpecialities(
                res?.data?.data?.getSpecialitiesList?.data?.specialitiesList
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
    };
    const onErrorUpdateSpecialities = err => {
      addToast('Something went wrong. Please try again later.', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.specialities
      .updateSpecialities({ data: updateSpecialitiesData })
      .then(onSuccessUpdateSpecialities)
      .catch(onErrorUpdateSpecialities);

    handleClose();
  };

  //delete Specialities data
  const deleteSpecialities = () => {
    const onSuccessDeleteSpecialities = result => {
      console.log(result);

      const { deleteSpecialities } = result?.data?.data;

      if (deleteSpecialities !== null) {
        const { code, data, errors } = result?.data?.data?.deleteSpecialities;

        if (code === 200 && data !== null) {
          ApiHelper.specialities
            .getSpecialities()
            .then(res => {
              setSpecialities(
                res?.data?.data?.getSpecialitiesList?.data?.specialitiesList
              );
              addToast('Speciality has been deleted', {
                appearance: 'success',
                autoDismiss: true,
              });
            })
            .catch(err => {});
        } else {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      } else {
        addToast('Something went wrong!!', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    };
    const onErrorDeleteSpecialities = error => {
      // console.log(error);
    };

    ApiHelper.specialities
      .deleteSpecialities(specialitiesId)
      .then(onSuccessDeleteSpecialities)
      .catch(onErrorDeleteSpecialities);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newSpecialities = [];
  specialities.map((item, index) => {
    newSpecialities.push({
      sl: index + 1,
      specialitiesName: item?.name,
      id: item?.id,
    });
  });

  const columns = [
    {
      name: 'sl',
      label: 'SL No.',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'specialitiesName',
      label: 'Specialities',
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
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setOpen(true)}
                >
                  <Icon icon={editIcon} />
                  <span>Edit</span>
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

  const updateSpecialities = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add Speciality</span>
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
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Specialities Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              error={errors.name}
              {...register('name', { required: true })}
              value={
                updateSpecialitiesSingleData &&
                updateSpecialitiesSingleData?.name
              }
              onChange={hanldeUpdateValueChange}
              helperText={
                errors.name?.type === 'required' &&
                'Specialities Name can not be empty'
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
          <button style={{ outline: 'none' }} type='submit'>
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
          onClick={() => deleteSpecialities()}
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

  return (
    <>
      <MUIDataTable
        title={'Specialities'}
        data={newSpecialities}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateSpecialities}
      </Modal>

      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
      </Modal>
    </>
  );
};

export default SuperAdminSpecialitiesPageTableComp;
