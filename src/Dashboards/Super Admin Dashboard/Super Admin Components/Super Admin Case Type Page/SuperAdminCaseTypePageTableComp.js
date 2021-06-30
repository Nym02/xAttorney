import editIcon from '@iconify-icons/akar-icons/edit';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Button, Menu, MenuItem, ThemeProvider } from '@material-ui/core';
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

const SuperAdminCaseTypePageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [caseTypeId, setCaseTypeId] = useState('');
  const { caseType, setCaseType } = useContext(DataContext);
  const { court, setCourt } = useContext(DataContext);
  const { caseCategory, setCaseCategory } = useContext(DataContext);
  const [caseTypeUpdate, setCaseTypeUpdate] = useState([]);
  const [courtIdFromTable, setCourtIdFromTable] = useState('');
  const [caseCategoryList, setCaseCategoryList] = useState([]);
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const caseCategoryByCourtId = courtId => {
    if (!courtId) return;
    const newCourtId = JSON.stringify(courtId);
    const finalCourtId = newCourtId.replace(/"([^"]+)":/g, '$1:');

    const caseCateGoryListByCourtId = gql`
      query {
        getCaseCategoryListByCourtId(courtId: ${finalCourtId}) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data {
            caseCategoryList {
              id
              name
              court {
                id
                name
                country
              }
            }
            offset
            limit
            numberOfElements
            totalElements
            totalPages
            first
            last
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,

        {
          method: 'POST',
          query: print(caseCateGoryListByCourtId),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        console.log(res);
        setCaseCategoryList(
          res?.data?.data?.getCaseCategoryListByCourtId?.data?.caseCategoryList
        );
      })
      .catch(err => console.log(err));
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setCaseTypeId(id);
    // setCourtIdFromTable(data?.rowData[2]);
  };
  // caseCategoryByCourtId(courtIdFromTable);

  const handleClose = () => {
    setAnchorEl(null);
  };
  //getting update default value
  const viewDetailsByID = caseType.find(({ id }) => id === caseTypeId);

  useEffect(() => {
    setCaseTypeUpdate(viewDetailsByID);
    caseCategoryByCourtId(viewDetailsByID?.court?.id);
  }, [caseTypeId, viewDetailsByID]);

  const handleUpdateDataChange = e => {
    if (e.target.name === 'court') {
      caseCategoryByCourtId(e.target.value);
      setCaseTypeUpdate({
        ...caseTypeUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'caseCategory') {
      setCaseTypeUpdate({
        ...caseTypeUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else {
      setCaseTypeUpdate({
        ...caseTypeUpdate,
        [e.target.name]: e.target.value,
      });
    }
  };
  // ----------------------- update case type -----------------------
  const onSubmit = (data, e) => {
    if (
      caseTypeUpdate?.court?.id === '' ||
      caseTypeUpdate?.court?.id === null
    ) {
    } else if (caseTypeUpdate?.name === '' || caseTypeUpdate?.name === null) {
      addToast('Case Type is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const caseType = {
        id: caseTypeId,
        name: caseTypeUpdate?.name,
        court: {
          id: caseTypeUpdate?.court?.id,
        },
        caseCategory: {
          id: caseTypeUpdate?.caseCategory?.id,
        },
      };
      const data2 = JSON.stringify(caseType);
      const unquotedData2 = data2.replace(/"([^"]+)":/g, '$1:');

      const updateCaseTypeQuery = gql`
        mutation {
          updateCaseType(
            caseType: ${unquotedData2}
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
            query: print(updateCaseTypeQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(result => {
          const { updateCaseType } = result?.data?.data;
          if (updateCaseType !== null) {
            const { code, data, errors } = result?.data?.data.updateCaseType;

            if (code === 200 && data !== null) {
              addToast('Case type has been updated successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              ApiHelper.caseType
                .getCaseType()
                .then(res => {
                  setCaseType(
                    res?.data?.data?.getCaseTypeList?.data?.caseTypeList
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

  // ----------------------- delete case type -----------------------
  const deleteCaseType = () => {
    const onSuccessDeleteCaseType = () => {
      ApiHelper.caseType
        .getCaseType()
        .then(res => {
          setCaseType(res?.data?.data?.getCaseTypeList?.data?.caseTypeList);
          addToast('CaseType has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteCaseType = error => {
      console.log(error);
    };

    ApiHelper.caseType
      .deleteCaseType(caseTypeId)
      .then(res => {
        return onSuccessDeleteCaseType();
      })
      .catch(onErrorDeleteCaseType);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newCaseTypeData = [];

  caseType.map((item, index) => {
    newCaseTypeData.push({
      sl: index + 1,
      caseType: item?.name,
      courtName: item?.court?.name,
      caseCategory: item?.caseCategory?.name,
      id: item?.id,
      courtId: item?.court?.id,
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
      name: 'caseType',
      label: 'Case Type',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'courtId',
      label: 'Court Id',
      options: {
        display: false,
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
          <FormControl
            className='w-full'
            variant='outlined'
            // error={errors.court_name}
          >
            <InputLabel id='demo-simple-select-outlined-label'>
              Court
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              label='Court'
              className='bg-lightSilver rounded text-white w-full'
              color='secondary'
              name='court'
              // {...register("court_name", { required: true })}
              value={
                caseTypeUpdate && caseTypeUpdate?.court
                  ? caseTypeUpdate?.court?.id
                  : ''
              }
              onChange={handleUpdateDataChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {court.map(court => (
                <MenuItem value={court.id}>{court.name}</MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>
              {errors.court_name?.type === "required" && "Court is required"}
            </FormHelperText> */}
          </FormControl>
          <FormControl
            className='w-full'
            variant='outlined'
            // error={errors.court_name}
          >
            <InputLabel id='demo-simple-select-outlined-label'>
              Case Category
            </InputLabel>
            <Select
              labelId='demo-simple-select-outlined-label'
              id='demo-simple-select-outlined'
              label='Case Category'
              className='bg-lightSilver rounded text-white w-full'
              color='secondary'
              name='caseCategory'
              // {...register("court_name", { required: true })}
              value={
                caseTypeUpdate && caseTypeUpdate?.caseCategory
                  ? caseTypeUpdate?.caseCategory?.id
                  : ''
              }
              onChange={handleUpdateDataChange}
            >
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              {caseCategoryList.map(caseCategory => (
                <MenuItem value={caseCategory.id}>{caseCategory.name}</MenuItem>
              ))}
            </Select>
            {/* <FormHelperText>
              {errors.court_name?.type === "required" && "Court is required"}
            </FormHelperText> */}
          </FormControl>
          <TextField
            className='bg-lightSilver rounded text-white w-full'
            label='Cast Type'
            id='outlined-basic'
            name='name'
            variant='outlined'
            color='secondary'
            value={caseTypeUpdate ? caseTypeUpdate?.name : ''}
            onChange={handleUpdateDataChange}
            // error={errors.case_type}
            // {...register("case_type", { required: true })}
            // helperText={
            //   errors.case_type?.type === "required" &&
            //   "Case Type can not be empty"
            // }
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
          onClick={() => deleteCaseType()}
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
        title={'Case Types List'}
        data={newCaseTypeData}
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

export default SuperAdminCaseTypePageTableComp;
