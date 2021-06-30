import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Modal,
  Select,
  TextField,
} from '@material-ui/core';
import { Button, Menu, MenuItem, ThemeProvider } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import addNow from '../../../../assets/images/add-now.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { MAIN_API } from '../../../../Utils/APIs';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import warn from '../../../../assets/images/warn.svg';
import { useEffect } from 'react';

const SuperAdminPostOfficePageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { postOffice, setPostOffice } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const [postOfficeId, setPostOfficeId] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [postOfficeUpdate, setPostOfficeUpdate] = useState([]);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setPostOfficeId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // -------------------------------- updating posroffice data --------------------------------

  //getting details by id

  const viewDetailsByID = postOffice.find(({ id }) => id === postOfficeId);

  useEffect(() => {
    setPostOfficeUpdate(viewDetailsByID);
  }, [postOfficeId, viewDetailsByID]);

  console.log(viewDetailsByID);
  console.log('set new post office data', postOfficeUpdate);

  const handleUpdateDataChange = e => {
    if (e.target.name === 'subDistrict') {
      if (postOfficeUpdate?.subDistrict !== null) {
        postOfficeUpdate.subDistrict.id = e.target.value;
      } else {
        postOfficeUpdate.subDistrict = { id: e.target.value };
      }
      setPostOfficeUpdate({
        ...postOfficeUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else {
      setPostOfficeUpdate({
        ...postOfficeUpdate,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (data, e) => {
    if (
      postOfficeUpdate?.subDistrict?.id === '' ||
      postOfficeUpdate?.subDistrict?.id === null
    ) {
      addToast('Sub District is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      postOfficeUpdate?.name === '' ||
      postOfficeUpdate?.name === null
    ) {
      addToast('Post Office Name is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      postOfficeUpdate?.postCode === '' ||
      postOfficeUpdate?.postCode === null
    ) {
      addToast('Post Code is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const postOffice = {
        id: postOfficeId,
        name: postOfficeUpdate?.name,
        postCode: postOfficeUpdate?.postCode,
        subDistrict: {
          id: postOfficeUpdate?.subDistrict?.id,
        },
      };
      const data2 = JSON.stringify(postOffice);
      const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

      const updatePostOfficeQuery = gql`
      mutation {
        updatePostOffice(
          postOffice: ${unquotedData2}
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
            postCode
            subDistrict {
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
      }
    `;
      axios
        .post(
          MAIN_API,
          {
            query: print(updatePostOfficeQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(result => {
          const { updatePostOffice } = result?.data?.data;
          if (updatePostOffice !== null) {
            const { code, data, errors } = result?.data?.data.updatePostOffice;

            if (code === 200 && data !== null) {
              addToast('Post office has been updated successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              ApiHelper.postOffice
                .getPostOffice()
                .then(res => {
                  setPostOffice(
                    res?.data?.data?.getPostOfficeList?.data?.postOfficeList
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

  // -------------------------------- delete posr office data --------------------------------
  const deletePostOffice = () => {
    const onSuccessDeletePostOffice = () => {
      ApiHelper.postOffice
        .getPostOffice()
        .then(res => {
          setPostOffice(
            res?.data?.data?.getPostOfficeList?.data?.postOfficeList
          );
          addToast('Post Office has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeletePostOffice = error => {
      // console.log(error);
    };

    ApiHelper.postOffice
      .deletePostOffice(postOfficeId)
      .then(res => {
        return onSuccessDeletePostOffice();
      })
      .catch(onErrorDeletePostOffice);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newPostOffice = [];
  postOffice.map((item, index) => {
    newPostOffice.push({
      sl: index + 1,
      postOffice: item?.name,
      postCode: item?.postCode,
      subDistrictName: item?.subDistrict?.name,
      districtName: item?.subDistrict?.district?.name,
      divisionName: item?.subDistrict?.district?.division?.name,
      CountryName: item?.subDistrict?.district?.division?.country,
      id: item?.id,
    });
  });

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
        <span>Edit Post Office</span>
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
              // error={errors.sub_district}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Sub District
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='District'
                name='subDistrict'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                value={
                  postOfficeUpdate && postOfficeUpdate?.subDistrict
                    ? postOfficeUpdate?.subDistrict?.id
                    : ''
                }
                onChange={handleUpdateDataChange}
                // {...register('sub_district', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {subDistrict.map(subdistrict => (
                  <MenuItem value={subdistrict.id}>{subdistrict.name}</MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>
                {errors.sub_district?.type === 'required' &&
                  'District is required'}
              </FormHelperText> */}
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Post Office Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              value={postOfficeUpdate ? postOfficeUpdate?.name : ''}
              onChange={handleUpdateDataChange}
              // error={errors.post_office_name}
              // {...register('post_office_name', { required: true })}
              // helperText={
              //   errors.post_office_name?.type === 'required' &&
              //   'Post Office Name is required'
              // }
            />
          </div>

          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Post Code'
              id='outlined-basic'
              name='postCode'
              variant='outlined'
              color='secondary'
              value={postOfficeUpdate ? postOfficeUpdate?.postCode : ''}
              onChange={handleUpdateDataChange}
              // error={errors.post_code}
              // {...register('post_code', { required: true })}
              // helperText={
              //   errors.post_code?.type === 'required' && 'Post Code is required'
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
          onClick={() => deletePostOffice()}
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
      name: 'postOffice',
      label: 'Post Office',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'postCode',
      label: 'Post Code',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'subDistrictName',
      label: 'Sub District',
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

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  return (
    <>
      <MUIDataTable
        title={'Post Office List'}
        data={newPostOffice}
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

export default SuperAdminPostOfficePageTableComp;
