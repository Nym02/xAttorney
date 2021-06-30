import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import { FormControl, ThemeProvider } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { Button, Menu, MenuItem } from '@material-ui/core';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
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

const SuperAdminPoliceStationPageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { policeStation, setPoliceStation } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const [policeStationId, setPoliceStationId] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [policeStationUpdate, setPoliceStationUpdate] = useState([]);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPoliceStationId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ----------------------- update police station -----------------------
  //getting details by ID

  const viewDetailsByID = policeStation.find(
    ({ id }) => id === policeStationId
  );

  useEffect(() => {
    setPoliceStationUpdate(viewDetailsByID);
  }, [policeStationId, viewDetailsByID]);

  console.log(viewDetailsByID);

  console.log('police station new change', policeStationUpdate);

  const handleUpdateDataChange = e => {
    if (e.target.name === 'district') {
      if (policeStationUpdate?.district !== null) {
        policeStationUpdate.district.id = e.target.value;
      } else {
        policeStationUpdate.district = { id: e.target.value };
      }
      setPoliceStationUpdate({
        ...policeStationUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else {
      setPoliceStationUpdate({
        ...policeStationUpdate,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (data, e) => {
    if (
      policeStationUpdate?.district?.id === '' ||
      policeStationUpdate?.district?.id === null
    ) {
      addToast('Please Select a District.', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      policeStationUpdate?.name === null ||
      policeStationUpdate?.name === ''
    ) {
      addToast('Police Station Name is Required.', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const PoliceStation = {
        id: policeStationId,
        name: policeStationUpdate?.name,
        district: {
          id: policeStationUpdate?.district?.id,
        },
      };
      const data2 = JSON.stringify(PoliceStation);
      const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

      const updatePoliceStaionQuery = gql`
        mutation {
          updatePoliceStation(
            policeStation: ${unquotedData2}
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
            query: print(updatePoliceStaionQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(result => {
          const { updatePoliceStation } = result?.data?.data;
          if (updatePoliceStation !== null) {
            const { code, data, errors } =
              result?.data?.data.updatePoliceStation;

            if (code === 200 && data !== null) {
              addToast('Police station has been updated successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              ApiHelper.policeStation
                .getPoliceStation()
                .then(res => {
                  setPoliceStation(
                    res?.data?.data?.getPoliceStationList?.data
                      ?.policeStationList
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

  // ----------------------- delete police station -----------------------
  const deletePoliceStation = () => {
    const onSuccessDeletePoliceStation = () => {
      ApiHelper.policeStation
        .getPoliceStation()
        .then(res => {
          setPoliceStation(
            res?.data?.data?.getPoliceStationList?.data?.policeStationList
          );
          addToast('Police Station has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeletePoliceStation = error => {
      // console.log(error);
    };

    ApiHelper.policeStation
      .deletePoliceStation(policeStationId)
      .then(res => {
        return onSuccessDeletePoliceStation();
      })
      .catch(onErrorDeletePoliceStation);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newPoliceStation = [];
  policeStation.map((item, index) => {
    newPoliceStation.push({
      sl: index + 1,
      policeStation: item?.name,
      districtName: item?.district?.name,
      divisionName: item?.district?.division?.name,
      CountryName: item?.district?.division?.country,
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
      name: 'policeStation',
      label: 'Police Station',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'districtName',
      label: 'District',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'divisionName',
      label: 'Division',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'CountryName',
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
        <span>Edit Police Station</span>
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
              error={errors.district}
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
                value={
                  policeStationUpdate && policeStationUpdate?.district
                    ? policeStationUpdate?.district?.id
                    : ''
                }
                onChange={handleUpdateDataChange}
                // {...register('district', { required: true })}
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
              label='Police Station Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              value={policeStationUpdate ? policeStationUpdate?.name : ''}
              onChange={handleUpdateDataChange}
              // error={errors.police_station_name}
              // {...register('police_station_name', { required: true })}
              // helperText={
              //   errors.police_station_name?.type === 'required' &&
              //   'Police Station Name is required'
              // }
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
          onClick={() => deletePoliceStation()}
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
  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  return (
    <>
      <MUIDataTable
        title={'Police Station List'}
        data={newPoliceStation}
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

export default SuperAdminPoliceStationPageTableComp;
