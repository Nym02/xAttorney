/* eslint-disable */
import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import {
  Button,
  Menu,
  MenuItem,
  Modal,
  MuiThemeProvider,
  TextField,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { useForm } from 'react-hook-form';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { useToasts } from 'react-toast-notifications';
import { getMuiTheme } from '../../../../muiTableTheme';

const SuperAdminBarCouncilPageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { barCouncil, setBarCouncil } = useContext(DataContext);
  const [barCouncilId, setBarCouncilId] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);
  const { addToast } = useToasts();
  const [open, setOpen] = useState(false);
  const [barData, setBarData] = useState({});

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();

  // table action menu open
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setBarCouncilId(id);
  };

  const viewDetailsByID = barCouncil.find(({ id }) => id === barCouncilId);

  const handleChange = e => {
    setBarData(e.target.value);
  };
  // table action menu clsoe
  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    setBarData(viewDetailsByID?.name);
  }, [barCouncilId]);
  //completed bar council default value
  // -------------------------------- update bar council data --------------------------------
  // const onSubmit = (data, e) => {
  //   const updateBarCouncilData = {
  //     id: barCouncilId,
  //     name: data.bar_council_name,
  //   };

  //   const onSuccessUpdateBarCouncil = result => {
  //     const { updateBarCouncil } = result?.data?.data;
  //     if (updateBarCouncil !== null) {
  //       const { code, data, errors } = result?.data?.data.updateBarCouncil;

  //       if (code === 200 && data !== null) {
  //         addToast('Bar council has been updated successfully', {
  //           appearance: 'success',
  //           autoDismiss: true,
  //         });
  //         ApiHelper.barCouncil
  //           .getBarCouncil()
  //           .then(res => {
  //             setBarCouncil(
  //               res?.data?.data?.getBarCouncilList?.data?.barCouncilList
  //             );
  //           })
  //           .then(() => reset())
  //           .then(() => setOpen(false))
  //           .catch(err =>
  //             addToast('Something wrong happend', {
  //               appearance: 'error',
  //               autoDismiss: true,
  //             })
  //           );
  //       } else if (code !== 200 && data === null) {
  //         addToast(errors[0].description, {
  //           appearance: 'error',
  //           autoDismiss: true
  //         });
  //       }
  //     } else {
  //       addToast('Something went wrong. Please try again later.', {
  //         appearance: 'error',
  //         autoDismiss: true,
  //       });
  //     }
  //   };
  //   const onErrorUpdateBarCouncil = error => {
  //     addToast('Something wrong happend', {
  //       appearance: 'error',
  //       autoDismiss: true,
  //     });
  //   };

  //   ApiHelper.barCouncil
  //     .updateBarCouncil({ data: updateBarCouncilData })
  //     .then(onSuccessUpdateBarCouncil)
  //     .catch(onErrorUpdateBarCouncil);

  //   handleClose();
  // };
  // -------------------------------- update bar council data --------------------------------
  const handleSubmit = e => {
    e.preventDefault();
    const updateBarCouncilData = {
      id: barCouncilId,
      name: barData,
    };

    const onSuccessUpdateBarCouncil = result => {
      const { updateBarCouncil } = result?.data?.data;
      if (updateBarCouncil !== null) {
        const { code, data, errors } = result?.data?.data.updateBarCouncil;

        if (code === 200) {
          addToast('Bar council has been updated successfully', {
            appearance: 'success',
            autoDismiss: true,
          });
          ApiHelper.barCouncil
            .getBarCouncil()
            .then(res => {
              setBarCouncil(
                res?.data?.data?.getBarCouncilList?.data?.barCouncilList
              );
            })

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
    const onErrorUpdateBarCouncil = error => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.barCouncil
      .updateBarCouncil({ data: updateBarCouncilData })
      .then(onSuccessUpdateBarCouncil)
      .catch(onErrorUpdateBarCouncil);

    handleClose();
  };
  // -------------------------------- delete bar council data --------------------------------
  const deleteBarCouncil = () => {
    const onSuccessDeleteBarCouncil = () => {
      ApiHelper.barCouncil
        .getBarCouncil()
        .then(res => {
          setBarCouncil(
            res?.data?.data?.getBarCouncilList?.data?.barCouncilList
          );
          addToast('Bar Council has been deleted', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteBarCouncil = error => {
      // console.log(error);
    };

    ApiHelper.barCouncil
      .deleteBarCouncil(barCouncilId)
      .then(onSuccessDeleteBarCouncil)
      .catch(onErrorDeleteBarCouncil);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newBarCouncil = [];
  barCouncil.map((item, index) => {
    newBarCouncil.push({
      sl: index + 1,
      barCouncilName: item?.name,
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
      name: 'barCouncilName',
      label: 'Bar Council',
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

  // -------------------------------- update Bar Council --------------------------------
  const updateBarCouncilModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Update Council</span>
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
        // onSubmit={handleSubmit(onSubmit)}
        onSubmit={handleSubmit}
        className='w-full px-12 flex flex-col space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Bar Council Name'
              id='outlined-basic'
              name='bar_council_name'
              variant='outlined'
              color='secondary'
              value={barData}
              onChange={handleChange}
              // error={errors.bar_council_name}
              // {...register('bar_council_name', { required: true })}
              // helperText={
              //   errors.bar_council_name?.type === 'required' &&
              //   'Bar Council Name can not be empty'
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
          onClick={() => deleteBarCouncil()}
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

  const getMuiTheme = () =>
    createMuiTheme({
      overrides: {
        MUIDataTable: {
          root: {
            backgroundColor: '#AAF',
          },
        },
        MuiToolbar: {
          root: {
            backgroundColor: '#202838',
            color: 'white !important',
          },
        },
        MuiTableCell: {
          head: {
            backgroundColor: 'purple !important',
            color: '#ffffff !important',
          },
        },
        MuiTableFooter: {
          root: {
            '& .MuiToolbar-root': {
              backgroundColor: '#F2F2F2',
            },
          },
        },
      },
    });

  return (
    <>
      <MuiThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={'Bar Council'}
          data={newBarCouncil}
          columns={columns}
          options={options}
        />
      </MuiThemeProvider>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateBarCouncilModal}
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

export default SuperAdminBarCouncilPageTableComp;
