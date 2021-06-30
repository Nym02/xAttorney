import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import { Button, Menu, MenuItem, ThemeProvider } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
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

const SuperAdminCaseCategoryPageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { caseCategory, setCaseCategory } = useContext(DataContext);
  const [caseCategoryId, setCaseCategoryId] = useState('');
  const { court, setCourt } = useContext(DataContext);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [caseCategoryUpdate, setCaseCategoryUpdate] = useState([]);
  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCaseCategoryId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // --------------------- update case category ---------------------
  //getting update default value
  const viewDetailsByID = caseCategory.find(({ id }) => id === caseCategoryId);
  console.log(viewDetailsByID);

  useEffect(() => {
    setCaseCategoryUpdate(viewDetailsByID);
  }, [caseCategoryId, viewDetailsByID]);

  const handleUpdateDataChange = e => {
    if (e.target.name === 'court') {
      setCaseCategoryUpdate({
        ...caseCategoryUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else {
      setCaseCategoryUpdate({
        ...caseCategoryUpdate,
        [e.target.name]: e.target.value,
      });
    }
  };
  const onSubmit = (data, e) => {
    if (
      caseCategoryUpdate?.court?.id === '' ||
      caseCategoryUpdate?.court?.id === null
    ) {
      addToast('Please Select a Court', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      caseCategoryUpdate?.name === null ||
      caseCategoryUpdate?.name === ''
    ) {
      addToast('Case Category is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const caseCategoryData = {
        id: caseCategoryId,
        name: caseCategoryUpdate?.name,
        court: {
          id: caseCategoryUpdate?.court?.id,
        },
      };

      const newCaseCategoryData = JSON.stringify(caseCategoryData);
      const finalCaseCategoryData = newCaseCategoryData.replace(
        /"([^"]+)":/g,
        '$1:'
      );

      const updateCaseCategoryQuery = gql`
        mutation {
          updateCaseCategory(
            caseCategory: ${finalCaseCategoryData}
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
              court {
                id
              }
            }
          }
        }
      `;

      axios
        .post(
          MAIN_API,
          {
            query: print(updateCaseCategoryQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(result => {
          const { updateCaseCategory } = result?.data?.data;
          if (updateCaseCategory !== null) {
            const { code, data, errors } =
              result?.data?.data.updateCaseCategory;

            if (code === 200 && data !== null) {
              addToast('Case Category has been updated successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              ApiHelper.caseCategory
                .getCaseCategory()
                .then(res => {
                  setCaseCategory(
                    res?.data?.data?.getCaseCategoryList?.data?.caseCategoryList
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
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          })
        );

      handleClose();
    }
  };
  // --------------------- delete case category ---------------------
  const deleteCaseCategory = () => {
    const onSuccessDeleteCaseCategory = () => {
      ApiHelper.caseCategory
        .getCaseCategory()
        .then(res => {
          setCaseCategory(
            res?.data?.data?.getCaseCategoryList?.data?.caseCategoryList
          );
          addToast('Case Category has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteCaseCategory = error => {
      // console.log(error);
    };

    ApiHelper.caseCategory
      .deleteCaseCategory(caseCategoryId)
      .then(res => {
        return onSuccessDeleteCaseCategory();
      })
      .catch(onErrorDeleteCaseCategory);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  //added serial no field in the table
  let newCaseCategoryData = [];
  caseCategory.map((item, index) => {
    newCaseCategoryData.push({
      sl: index + 1,
      caseCategory: item?.name,
      courtName: item?.court?.name,
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
      name: 'caseCategory',
      label: 'Case Category',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'courtName',
      label: 'Court Name',
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
        <span>Edit Case Category</span>
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
          <FormControl
            className='w-full'
            variant='outlined'
            // error={errors.court}
          >
            <InputLabel id='demo-simple-select-outlined-label'>
              Court
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              label='Court'
              name='court'
              className='bg-lightSilver rounded text-white w-full'
              color='secondary'
              value={
                caseCategoryUpdate && caseCategoryUpdate?.court
                  ? caseCategoryUpdate?.court?.id
                  : ''
              }
              onChange={handleUpdateDataChange}
              // {...register("court", { required: true })}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {court.map(court => (
                <MenuItem value={court.id}>{court.name}</MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>
              {errors.court?.type === "required" && "Court is required"}
            </FormHelperText> */}
          </FormControl>
          <TextField
            className='bg-lightSilver rounded text-white w-full'
            label='Case Category'
            id='outlined-basic'
            name='name'
            variant='outlined'
            color='secondary'
            // error={errors.case_category}
            // {...register("case_category", { required: true })}
            // helperText={
            //   errors.case_category?.type === "required" &&
            //   "Case Category is required"
            // }
            value={caseCategoryUpdate ? caseCategoryUpdate?.name : ''}
            onChange={handleUpdateDataChange}
          />
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
          onClick={() => deleteCaseCategory()}
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
    filterCategory: 'input',
    responsive: 'stacked',
  };

  return (
    <>
      <MUIDataTable
        title={'Case Categories List'}
        data={newCaseCategoryData}
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

export default SuperAdminCaseCategoryPageTableComp;
