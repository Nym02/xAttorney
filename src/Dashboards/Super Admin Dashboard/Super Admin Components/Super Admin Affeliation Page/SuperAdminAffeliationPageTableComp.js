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
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../../../Context Api/ManageData';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import theme from '../../../../theme';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { useToasts } from 'react-toast-notifications';
import { useEffect } from 'react';

const SuperAdminAffeliationPageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [affiliationId, setAffiliationId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const { affiliation, setAffiliation } = useContext(DataContext);
  const [updateAffiliation, setUpdateAffiliation] = useState([]);
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
    setAffiliationId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //getting details by id

  const viewDetailsByID = affiliation.find(({ id }) => id === affiliationId);
  console.log('details', viewDetailsByID);

  useEffect(() => {
    setUpdateAffiliation(viewDetailsByID);
  }, [affiliationId, viewDetailsByID]);
  console.log('update affiliation', updateAffiliation);

  //handle input change

  const handleInputChange = e => {
    setUpdateAffiliation({
      ...updateAffiliation,
      [e.target.name]: e.target.value,
    });
  };
  // -------------------------------- update affiliation data --------------------------------
  const onSubmit = (data, e) => {
    const updateAffiliationData = {
      id: affiliationId,
      name: updateAffiliation?.name,
    };

    const onSuccessUpdateAffiliations = result => {
      console.log('update affiliation data response', result);
      const { updateAffiliations } = result?.data?.data;
      if (updateAffiliations !== null) {
        const { code, data, errors } = result?.data?.data.updateAffiliations;

        if (code === 200 && data !== null) {
          addToast('Affiliations has been updated successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.affiliations
            .getAffiliations()
            .then(res => {
              setAffiliation(
                res?.data?.data?.getAffiliationsList?.data?.affiliationsList
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
    const onErrorUpdateAffiliations = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.affiliations
      .updateAffiliations({ data: updateAffiliationData })
      .then(onSuccessUpdateAffiliations)
      .catch(onErrorUpdateAffiliations);

    handleClose();
  };

  // -------------------------------- delete affiliation data --------------------------------
  const deleteAffiliation = () => {
    const onSuccessDeleteAffiliations = () => {
      ApiHelper.affiliations
        .getAffiliations()
        .then(res => {
          setAffiliation(
            res?.data?.data?.getAffiliationsList?.data?.affiliationsList
          );
          addToast('Affiliation has been deleted', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteAffiliations = error => {
      // console.log(error);
    };

    ApiHelper.affiliations
      .deleteAffiliations(affiliationId)
      .then(onSuccessDeleteAffiliations)
      .catch(onErrorDeleteAffiliations);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newAffeliation = [];
  affiliation.map((item, index) => {
    newAffeliation.push({
      sl: index + 1,
      affeliationName: item?.name,
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
      name: 'affeliationName',
      label: 'Affeliation',
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

  const updateAffilitationModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add Affeliation</span>
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
              label='Affeliation Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              error={errors.name}
              {...register('name', { required: true })}
              value={updateAffiliation?.name}
              onChange={handleInputChange}
              helperText={
                errors.name?.type === 'required' &&
                'Affeliation Name can not be empty'
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
          onClick={() => deleteAffiliation()}
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
        title={'Affeliation'}
        data={newAffeliation}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateAffilitationModal}
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

export default SuperAdminAffeliationPageTableComp;
