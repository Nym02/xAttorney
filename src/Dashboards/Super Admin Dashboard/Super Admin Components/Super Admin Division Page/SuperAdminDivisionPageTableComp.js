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
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import theme from '../../../../theme';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DataContext } from '../../../../Context Api/ManageData';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { useToasts } from 'react-toast-notifications';
import { JsonWebTokenError } from 'jsonwebtoken';

const SuperAdminDivisionPageTableComp = () => {
  const { division, setDivision } = useContext(DataContext);
  const [divisionId, setDivisionID] = useState('');
  const [divisionRowData, setDivisionRowData] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { addToast } = useToasts();
  const [divisionUpdateData, setDivisionUpdateData] = useState([]);

  // table action menu open
  const handleClick = (event, id, item) => {
    setAnchorEl(event.currentTarget);
    setDivisionID(id);
    setDivisionRowData(item?.rowData);
  };
  // console.log(divisionId);

  // table action menu clsoe
  const handleClose = () => {
    setAnchorEl(null);
  };

  //single row data
  const viewDetailsByID = division.find(({ id }) => id === divisionId);
  console.log('viewRowDetailsByID', viewDetailsByID);

  useEffect(() => {
    setDivisionUpdateData(viewDetailsByID);
  }, [divisionId, viewDetailsByID]);

  //changing update data

  const hanldeUpdateDataChange = e => {
    setDivisionUpdateData({
      ...divisionUpdateData,
      [e.target.name]: e.target.value,
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {},
  });

  // update division data
  const onSubmit = (data, e) => {
    if (divisionUpdateData?.name === '') {
      addToast('Division Name is Required.', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      divisionUpdateData?.country === '' ||
      divisionUpdateData?.country === null
    ) {
      addToast('Country Name is Required.', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const updateDivisionData = {
        id: divisionId,
        name: divisionUpdateData.name,
        country: divisionUpdateData.country,
      };
      // setValue('name', divisionRowData[1]);
      // setValue('country', divisionRowData[2]);

      const onSuccessUpdateDivision = result => {
        const { updateDivision } = result?.data?.data;
        if (updateDivision !== null) {
          const { code, data, errors } = result?.data?.data.updateDivision;

          if (code === 200 && data !== null) {
            addToast('Division has been updated successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            ApiHelper.division
              .getDivision()
              .then(res => {
                setDivision(
                  res?.data?.data?.getDivisionList?.data?.divisionList
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
      const onErrorUpdateDivision = error => {
        addToast('Something went wrong. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        });
      };

      ApiHelper.division
        .updateDivision({ data: updateDivisionData })
        .then(onSuccessUpdateDivision)
        .catch(onErrorUpdateDivision);

      handleClose();
    }
  };

  //delete division data
  const deleteDivision = () => {
    const onSuccessDeleteDivision = result => {
      const { deleteDivision } = result?.data?.data;

      if (deleteDivision !== null) {
        const { code, data, errors } = result?.data?.data?.deleteDivision;

        if (code === 200) {
          addToast('Division has been updated successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.division
            .getDivision()
            .then(res => {
              setDivision(res?.data?.data?.getDivisionList?.data?.divisionList);
            })
            .catch();
        } else {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      } else {
        addToast('Something went wrong!!. Please try again later', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    };
    const onErrorDeleteDivision = error => {
      // console.log(error);
    };

    ApiHelper.division
      .deleteDivision(divisionId)
      .then(onSuccessDeleteDivision)
      .catch(onErrorDeleteDivision);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  // push the fetched data into a new array
  let newDivision = [];
  division.map((item, index) => {
    newDivision.push({
      sl: index + 1,
      name: item?.name,
      country: item?.country,
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
      name: 'name',
      label: 'Division Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'country',
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
        customBodyRender: (value, item) => {
          return (
            <div>
              <Button
                style={{ outline: 'none' }}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={event => handleClick(event, value, item)}
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
                  // onClick={() => updateDivision()}
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
        <ThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Division Name'
              id='outlined-basic'
              variant='outlined'
              color='secondary'
              name='name'
              // error={errors.name}
              // {...register('name', { required: true })}
              value={divisionUpdateData && divisionUpdateData?.name}
              onChange={hanldeUpdateDataChange}
              // helperText={
              //   errors.name?.type === 'required' &&
              //   'Division Name Can not be empty'
              // }
            />
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Country Name'
              id='outlined-basic'
              name='country'
              variant='outlined'
              color='secondary'
              // error={errors.country}
              // {...register('country', { required: true })}
              value={divisionUpdateData && divisionUpdateData?.country}
              onChange={hanldeUpdateDataChange}
              // helperText={
              //   errors.country?.type === 'required' &&
              //   'Country Name Can not be empty'
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
          onClick={() => deleteDivision()}
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
        title={'Division List'}
        data={newDivision}
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

export default SuperAdminDivisionPageTableComp;

// // get division details by id
// const [divisionDetails, setDivisionDetails] = useState({});
// const fetchDivisionById = async () => {
//   try {
//     const res = await axios({
//       url: MAIN_API,
//       method: 'POST',
//       data: {
//         query: print(GET_DIVISION_BY_ID),
//         variables: {
//           divisionId: divisionId,
//         },
//       },
//     });
//     console.log('getDivisionByID: ', res?.data?.data?.getDivisionById?.data);
//     setDivisionDetails(res?.data?.data?.getDivisionById?.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// // get division details by id
// const fetchDivisionById = () => {
//   // const onSuccessGetDivisionById = res => {
//   //   console.log('setDivisionDetails', res?.data?.data?.getDivisionById?.data);
//   //   setDivisionDetails(res?.data?.data?.getDivisionById?.data);
//   //   ApiHelper.division
//   //     .getDivision()
//   //     .then(res => {
//   //       console.log(
//   //         'updated div',
//   //         res?.data?.data?.getDivisionList?.data?.divisionList
//   //       );
//   //       setDivision(res?.data?.data?.getDivisionList?.data?.divisionList);
//   //     })
//   //     .catch();
//   // };
//   const onErrorGetDivisionById = error => {
//     console.log(error);
//   };

//   ApiHelper.division
//     .getDivisionByID(divisionId)
//     .then(res => {
//       console.log(
//         'setDivisionDetails',
//         res?.data?.data?.getDivisionById?.data
//       );
//       setDivisionDetails(res?.data?.data?.getDivisionById?.data);
//     })
//     .catch(onErrorGetDivisionById);
// };

// console.log('divisiondetails', divisionDetails);

// edit table data
// const updateDivision = () => {
//   setOpen(true);
//   // fetchDivisionById();
//   handleClose();
// };

// // get division details by id
// const [divisionDetails, setDivisionDetails] = useState({});
// const fetchDivisionById = async () => {
//   try {
//     const res = await axios({
//       url: MAIN_API,
//       method: 'POST',
//       data: {
//         query: print(GET_DIVISION_BY_ID),
//         variables: {
//           divisionId: divisionId,
//         },
//       },
//     });
//     console.log('getDivisionByID: ', res?.data?.data?.getDivisionById?.data);
//     setDivisionDetails(res?.data?.data?.getDivisionById?.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const updateDivision = async () => {
//   try {
//     await fetchDivisionById();
//     setOpen(true);
//     console.log('update state', divisionDetails);
//     handleClose;
//   } catch (err) {
//     console.log(err);
//   }
// };
