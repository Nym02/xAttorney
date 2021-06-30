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
  MuiThemeProvider,
  Select,
  TextField,
} from '@material-ui/core';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import warn from '../../../../assets/images/warn.svg';
import { useEffect } from 'react';

const SuperAdminSubDistrictPageTableComp = () => {
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const [subDistrictId, setSubDistrictId] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [subDistrictUpdate, setSubDistrictUpdate] = useState([]);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSubDistrictId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // -------------------------------- updating the sub district data --------------------------------

  //getting details by id

  const viewDetailsByID = subDistrict.find(({ id }) => id === subDistrictId);

  useEffect(() => {
    setSubDistrictUpdate(viewDetailsByID);
  }, [subDistrictId, viewDetailsByID]);

  const handleUpdateDataChange = e => {
    if (e.target.name === 'district') {
      if (subDistrictUpdate?.district !== null) {
        subDistrictUpdate.district.id = e.target.value;
      } else {
        subDistrictUpdate.district = { id: e.target.value };
      }
      setSubDistrictUpdate({
        ...subDistrictUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else {
      setSubDistrictUpdate({
        ...subDistrictUpdate,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (data, e) => {
    if (
      (subDistrictUpdate?.name === '' || subDistrictUpdate?.name === null) &&
      (subDistrictUpdate?.district?.id === '' ||
        subDistrictUpdate?.district?.id === null)
    ) {
      addToast('District & Sub District Name is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      subDistrictUpdate?.district?.id === '' ||
      subDistrictUpdate?.district?.id === null
    ) {
      addToast('District is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      subDistrictUpdate?.name === '' ||
      subDistrictUpdate?.name === null
    ) {
      addToast('Sub District Name is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const subDistrictData = {
        id: subDistrictId,
        name: subDistrictUpdate?.name,
        district: {
          id: subDistrictUpdate?.district?.id,
        },
      };
      const data2 = JSON.stringify(subDistrictData);
      const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

      const updateSubDistrictQuery = gql`
        mutation {
          updateSubDistrict(
            subDistrict: ${unquotedData2}
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
              district {
                id
                name
                division {
                  id
                  name
                  country
                }
              }
            }
          }
        }
      `;

      axios
        .post(
          MAIN_API,
          {
            query: print(updateSubDistrictQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(result => {
          const { updateSubDistrict } = result?.data?.data;
          if (updateSubDistrict !== null) {
            const { code, data, errors } = result?.data?.data.updateSubDistrict;

            if (code === 200 && data !== null) {
              addToast('Sub district has been updated successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              ApiHelper.subDistrict
                .getSubDistrict()
                .then(res => {
                  setSubDistrict(
                    res?.data?.data?.getSubDistrictList?.data?.subDistrictList
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

  // -------------------------- delete subdistrict --------------------------
  const deleteSubDistrict = () => {
    const onSuccessDeleteSubDistrict = () => {
      ApiHelper.subDistrict
        .getSubDistrict()
        .then(res => {
          setSubDistrict(
            res?.data?.data?.getSubDistrictList?.data?.subDistrictList
          );
          addToast('Sub district has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch(err => {
          addToast('Something went wrong. Please try again later.', {
            appearance: 'error',
            autoDismiss: true,
          });
        });
    };
    const onErrorDeleteSubDistrict = error => {
      addToast('Something went wrong. Please try again later.', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.subDistrict
      .deleteSubDistrict(subDistrictId)
      .then(onSuccessDeleteSubDistrict)
      .catch(onErrorDeleteSubDistrict);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newSubDistrict = [];
  subDistrict.map((item, index) => {
    newSubDistrict.push({
      sl: index + 1,
      id: item?.id,
      name: item?.name,
      districtName: item?.district?.name,
      divisionName: item?.district?.division?.name,
      countryName: item?.district?.division?.country,
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
      name: 'name',
      label: 'SubDistrict Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'districtName',
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
      label: 'Country',
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

  // update modal
  const updateTableData = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Edit Division</span>
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
        <MuiThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl
              className='w-full'
              variant='outlined'
              // error={errors.district}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                District
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='District'
                name='district'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                // {...register('district', { required: true })}
                value={
                  subDistrictUpdate && subDistrictUpdate?.district
                    ? subDistrictUpdate?.district?.id
                    : ''
                }
                onChange={handleUpdateDataChange}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {district.map(district => (
                  <MenuItem value={district.id}>{district.name}</MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>
                {errors.district?.type === 'required' && 'District is required'}
              </FormHelperText> */}
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Sub District Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              value={subDistrictUpdate && subDistrictUpdate?.name}
              onChange={handleUpdateDataChange}
              // error={errors.sub_district}
              // {...register('sub_district', { required: true })}
              // helperText={
              //   errors.sub_district?.type === 'required' &&
              //   'Sub District is required'
              // }
            />
          </div>
        </MuiThemeProvider>
        <div className='w-full flex justify-center items-center space-x-6'>
          <button
            style={{ outline: 'none' }}
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button>
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
          onClick={() => deleteSubDistrict()}
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
        data={newSubDistrict}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateTableData}
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

export default SuperAdminSubDistrictPageTableComp;
