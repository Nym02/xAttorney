/* eslint-disable */
import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import {
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';

const SuperAdminDistrictPageTableComp = () => {
  const { district, setDistrict } = useContext(DataContext);
  const { division, setDivision } = useContext(DataContext);
  const [districtId, setDistrictID] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [districtUpdateData, setDistrictUpdateData] = useState([]);
  const { addToast } = useToasts();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setDistrictID(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // -------------------------------- updating the district data --------------------------------

  //getting details by id
  const viewDetailsByID = district.find(({ id }) => id === districtId);
  console.log(viewDetailsByID);

  useEffect(() => {
    setDistrictUpdateData(viewDetailsByID);
  }, [districtId, viewDetailsByID]);

  const handleUpdateDataChange = e => {
    if (e.target.name === 'division') {
      if (districtUpdateData?.division !== null) {
        districtUpdateData.division.id = e.target.value;
      } else {
        districtUpdateData.division = { id: e.target.value };
      }
      setDistrictUpdateData({
        ...districtUpdateData,
        [e.target.name]: { id: e.target.value },
      });
    } else {
      setDistrictUpdateData({
        ...districtUpdateData,
        [e.target.name]: e.target.value,
      });
    }
  };
  console.log('after district change', districtUpdateData);
  const onSubmit = (data, e) => {
    if (
      (districtUpdateData?.name === '' || districtUpdateData?.name === null) &&
      (districtUpdateData?.division?.id === '' ||
        districtUpdateData?.division?.id === null)
    ) {
      addToast('Division & District is required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      (districtUpdateData && districtUpdateData?.division?.id === '') ||
      (districtUpdateData && districtUpdateData?.division?.id === null)
    ) {
      addToast('Division is required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      (districtUpdateData && districtUpdateData?.name == '') ||
      (districtUpdateData && districtUpdateData?.name == null)
    ) {
      addToast('District Name is required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const districtData = {
        id: districtId,
        name: districtUpdateData?.name,
        division: {
          id: districtUpdateData?.division?.id,
        },
      };
      const data2 = JSON.stringify(districtData);
      const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

      const updateDistrictQuery = gql`
    mutation {
      updateDistrict(
        district: ${unquotedData2}
        ) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data
          {
            id
            name
            division {
              id
              name
              country
            }
          }
        }
      }`;

      axios
        .post(
          MAIN_API,
          {
            query: print(updateDistrictQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(result => {
          const { updateDistrict } = result?.data?.data;
          if (updateDistrict !== null) {
            const { code, data, errors } = result?.data?.data.updateDistrict;

            if (code === 200 && data !== null) {
              addToast('District has been updated successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              ApiHelper.district
                .getDistrict()
                .then(res => {
                  setDistrict(
                    res?.data?.data?.getDistrictList?.data?.districtList
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
        })
        .catch(err =>
          addToast('Something wrong happend', {
            appearance: 'error',
            autoDismiss: true,
          })
        );

      handleClose();
    }
  };

  // -------------------------------- delete district data --------------------------------
  const deleteDistrict = () => {
    const onSuccessDeleteDistrict = () => {
      ApiHelper.district
        .getDistrict()
        .then(res => {
          setDistrict(res?.data?.data?.getDistrictList?.data?.districtList);
          addToast('District has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteDistrict = error => {};

    ApiHelper.district
      .deleteDistrict(districtId)
      .then(onSuccessDeleteDistrict)
      .catch(onErrorDeleteDistrict);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newDistrict = [];
  district.map((item, index) => {
    newDistrict.push({
      sl: index + 1,
      name: item?.name,
      divisionId: item?.division?.id,
      divisionName: item?.division?.name,
      countryName: item?.division?.country,
      id: item?.id,
    });
  });

  // -------------------------------- table columns --------------------------------
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
      name: 'name',
      label: 'District Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'divisionName',
      label: 'Division Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'countryName',
      label: 'Country Name',
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
    filter: true,
    selectableRows: false,
    filterType: 'input',
    responsive: 'stacked',
  };

  // const divisionName = [];
  // division.map(div => {
  //   divisionName.push({ name: div.name, id: div.id });
  // });

  // -------------------------------- update district --------------------------------
  const updateDistrictModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Edit District</span>
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
            <FormControl
              className='w-full'
              variant='outlined'
              // error={errors.division}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Division
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Division'
                name='division'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                // {...register('division', { required: true })}
                value={
                  districtUpdateData && districtUpdateData?.division
                    ? districtUpdateData?.division?.id
                    : ''
                }
                onChange={handleUpdateDataChange}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {division.map(div => (
                  <MenuItem key={div.id} value={div.id}>
                    {div.name}
                  </MenuItem>
                ))}
              </Select>

              {/* <FormHelperText>
                {errors.division?.type === 'required' && 'Division is required'}
              </FormHelperText> */}
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='District Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              value={districtUpdateData && districtUpdateData?.name}
              onChange={handleUpdateDataChange}
              // error={errors.district_name}
              // {...register('district_name', { required: true })}
              // helperText={
              //   errors.district_name?.type === 'required' &&
              //   'District Name can not be empty'
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
          <button style={{ outline: 'none' }}>
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
          onClick={() => deleteDistrict()}
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
        title={'District List'}
        data={newDistrict}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateDistrictModal}
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

export default SuperAdminDistrictPageTableComp;
