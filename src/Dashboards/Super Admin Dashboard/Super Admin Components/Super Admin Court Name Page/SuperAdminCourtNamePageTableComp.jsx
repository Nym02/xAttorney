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
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import MUIDataTable from 'mui-datatables';
import { useEffect } from 'react';
import { useContext, useState } from 'react';
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

const SuperAdminCourtNamePageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { courtName, setCourtName } = useContext(DataContext);
  const { court, setCourt } = useContext(DataContext);
  const { caseType, setCaseType } = useContext(DataContext);
  const { caseCategory, setCaseCategory } = useContext(DataContext);
  const [courtNameId, setCourtNameId] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [courtNameUpdate, setCourtNameUpdate] = useState([]);
  const [caseCategoryList, setCaseCategoryList] = useState([]);
  const [caseTypeList, setCaseTypeList] = useState([]);
  const [courtId, setCourtId] = useState('');
  const { addToast } = useToasts();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  console.log(courtName);

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
        setCaseCategoryList(
          res?.data?.data?.getCaseCategoryListByCourtId?.data?.caseCategoryList
        );
        console.log('Final court Name', viewDetailsByID?.caseCategory?.id);
        caseTypeByCaseCategory(viewDetailsByID?.caseCategory?.id);
      })
      .catch(err => console.log(err));
  };

  const caseTypeByCaseCategory = caseCateGoryId => {
    console.log('Court id', viewDetailsByID?.court?.id);
    console.log('caseCategoryId', caseCateGoryId);
    if (!caseCateGoryId || !viewDetailsByID?.court?.id) return;
    const newCourtId = JSON.stringify(viewDetailsByID?.court?.id);
    const finalCourtId = newCourtId.replace(/"([^"]+)":/g, '$1:');
    const newCaseCategoryId = JSON.stringify(caseCateGoryId);
    const finalCaseCategoryId = newCaseCategoryId.replace(/"([^"]+)":/g, '$1:');

    const caseTypeByCaseCategory = gql`
      query {
        getCaseTypeListByCourtIdAndCaseCategoryId(courtId: ${finalCourtId}, caseCategoryId: ${finalCaseCategoryId}) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data {
            caseTypeList {
              id
              name
              court {
                id
                name
                country
              }
              caseCategory {
                id
                name
                court {
                  id
                  name
                  country
                }
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
          query: print(caseTypeByCaseCategory),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        setCaseTypeList(
          res?.data?.data?.getCaseTypeListByCourtIdAndCaseCategoryId?.data
            ?.caseTypeList
        );
      })
      .catch(err => console.log(err));
  };

  const handleClick = (e, id) => {
    setAnchorEl(e.currentTarget);
    setCourtNameId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //getting update default value
  const viewDetailsByID = courtName.find(({ id }) => id === courtNameId);
  console.log(viewDetailsByID);

  useEffect(() => {
    setCourtId(viewDetailsByID?.court?.id);
    setCourtNameUpdate(viewDetailsByID);
    caseCategoryByCourtId(viewDetailsByID?.court?.id);
  }, [courtNameId, viewDetailsByID]);

  const handleUpdateDataChange = e => {
    if (e.target.name === 'court') {
      // setCourtId(e.target.value);
      caseCategoryByCourtId(e.target.value);
      setCourtNameUpdate({
        ...courtNameUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'caseType') {
      setCourtNameUpdate({
        ...courtNameUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'caseCategory') {
      caseTypeByCaseCategory(e.target.value);
      setCourtNameUpdate({
        ...courtNameUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else {
      setCourtNameUpdate({
        ...courtNameUpdate,
        [e.target.name]: e.target.value,
      });
    }
  };

  console.log('after change', courtNameUpdate);

  const onSubmit = (data, e) => {
    if (
      courtNameUpdate?.court?.id === '' ||
      courtNameUpdate?.court?.id === null
    ) {
      addToast('Please select a court', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (courtNameUpdate?.name === '' || courtNameUpdate?.name === null) {
      addToast('Court Name is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const courtNameData = {
        id: courtNameId,
        name: courtNameUpdate?.name,
        court: {
          id: courtNameUpdate?.court?.id,
        },
        caseType: {
          id: courtNameUpdate?.caseType?.id,
        },
        caseCategory: {
          id: courtNameUpdate?.caseCategory?.id,
        },
      };

      const newCourtNameData = JSON.stringify(courtNameData);
      const finalCourtNameData = newCourtNameData.replace(/"([^"]+)":/g, '$1:');

      const updateCourtNameQuery = gql`
        mutation {
          updateCourtName(
            courtName: ${finalCourtNameData}
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
              caseType{
                id
              }
              caseCategory{
                id
              }
            }
          }
        }
      `;
      console.log(updateCourtNameQuery);
      axios
        .post(
          MAIN_API,
          {
            query: print(updateCourtNameQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(result => {
          console.log('update court name', result);
          const { updateCourtName } = result?.data?.data;
          if (updateCourtName !== null) {
            const { code, data, errors } = result?.data?.data.updateCourtName;

            if (code === 200 && data !== null) {
              addToast('Court name has been updated successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              ApiHelper.courtName
                .getCourtName()
                .then(res => {
                  setCourtName(
                    res?.data?.data?.getCourtNameList?.data?.courtNameList
                  );
                })
                // .then(() => reset())
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

  // -------------------------------- delete court name data --------------------------------
  const deleteCourtName = () => {
    const onSuccessDeleteCourtName = () => {
      ApiHelper.courtName
        .getCourtName()
        .then(res => {
          setCourtName(res?.data?.data?.getCourtNameList?.data?.courtNameList);
          addToast('CourtName has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch(err =>
          addToast('CourtName has been deleted succesfully', {
            appearance: 'error',
            autoDismiss: true,
          })
        );
    };
    const onErrorDeleteCourtName = error => {
      console.log(error);
    };

    ApiHelper.courtName
      .deleteCourtName(courtNameId)
      .then(onSuccessDeleteCourtName)
      .catch(onErrorDeleteCourtName);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newCourtName = [];
  courtName.map((item, index) => {
    newCourtName.push({
      sl: index + 1,
      courtNameTitle: item?.name,
      court: item?.court?.name,
      caseType: item?.caseType?.name,
      caseCategory: item?.caseCategory?.name,
      courtCountry: item?.court?.country,
      id: item?.id,
    });
  });

  const columns = [
    {
      name: 'courtNameTitle',
      label: 'Court Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'court',
      label: 'Court',
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
      name: 'caseCategory',
      label: 'Case Category',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'courtCountry',
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
        filter: false,
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

  const updateCourtNameModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Update Court Name Info</span>
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
                  courtNameUpdate && courtNameUpdate?.court
                    ? courtNameUpdate?.court?.id
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
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl
              className='w-full'
              variant='outlined'
              // error={errors.court}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Case Category
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Case Category'
                name='caseCategory'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                value={
                  courtNameUpdate && courtNameUpdate?.caseCategory
                    ? courtNameUpdate?.caseCategory?.id
                    : ''
                }
                onChange={handleUpdateDataChange}
                // {...register("court", { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {caseCategoryList.map(caseCategory => (
                  <MenuItem value={caseCategory.id}>
                    {caseCategory.name}
                  </MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>
                {errors.court?.type === "required" && "Court is required"}
              </FormHelperText> */}
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl
              className='w-full'
              variant='outlined'
              // error={errors.court}
            >
              <InputLabel id='demo-simple-select-outlined-label'>
                Case Type
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Case Type'
                name='caseType'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                value={
                  courtNameUpdate && courtNameUpdate?.caseType
                    ? courtNameUpdate?.caseType?.id
                    : ''
                }
                onChange={handleUpdateDataChange}
                // {...register("court", { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {caseTypeList.map(caseType => (
                  <MenuItem value={caseType.id}>{caseType.name}</MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>
                {errors.court?.type === "required" && "Court is required"}
              </FormHelperText> */}
            </FormControl>
          </div>

          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Court Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              value={courtNameUpdate ? courtNameUpdate?.name : ''}
              onChange={handleUpdateDataChange}
              // error={errors.court_name}
              // {...register("court_name", { required: true })}
              // helperText={
              //   errors.court_name?.type === "required" &&
              //   "Court Name is required"
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
          onClick={() => deleteCourtName()}
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
        title={'Court Names List'}
        data={newCourtName}
        columns={columns}
        options={options}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateCourtNameModal}
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

export default SuperAdminCourtNamePageTableComp;
