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
import gql, { resetCaches } from 'graphql-tag';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useState } from 'react';
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

const SuperAdminJudgementResultPageTableComp = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { judgementResult, setJudgementResult } = useContext(DataContext);
  const { court, setCourt } = useContext(DataContext);
  const [judgementResultId, setJudgementResultId] = useState('');
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [judgementResultUpdate, setJudgementResultUpdate] = useState([]);
  const { addToast } = useToasts();

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setJudgementResultId(id);
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

  // -------------------------- update judgement result --------------------------

  //getting update default value
  const viewDetailsByID = judgementResult.find(
    ({ id }) => id === judgementResultId
  );
  console.log(viewDetailsByID);

  useEffect(() => {
    setJudgementResultUpdate(viewDetailsByID);
  }, [judgementResultId, viewDetailsByID]);

  const handleUpdateDataChange = e => {
    if (e.target.name === 'court') {
      setJudgementResultUpdate({
        ...judgementResultUpdate,
        [e.target.name]: { id: e.target.value },
      });
    } else {
      setJudgementResultUpdate({
        ...judgementResultUpdate,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = (data, e) => {
    if (
      judgementResultUpdate?.court?.id == '' ||
      judgementResultUpdate?.court?.id === null
    ) {
      addToast('Please Select a Court', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else if (
      judgementResultUpdate?.name === '' ||
      judgementResultUpdate?.name === null
    ) {
      addToast('Judgement Result is Required', {
        appearance: 'error',
        autoDismiss: true,
      });
    } else {
      const judgementResultData = {
        id: judgementResultId,
        name: judgementResultUpdate?.name,
        court: {
          id: judgementResultUpdate?.court?.id,
        },
      };

      const newJudgementResultData = JSON.stringify(judgementResultData);
      const finalJudgementResultData = newJudgementResultData.replace(
        /"([^"]+)":/g,
        '$1:'
      );

      console.log(finalJudgementResultData);

      const updateJudgementResultQuery = gql`
        mutation {
          updateJudgmentResult(
            judgmentResult: ${finalJudgementResultData}
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
            query: print(updateJudgementResultQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(result => {
          const { updateJudgmentResult } = result?.data?.data;
          if (updateJudgmentResult !== null) {
            const { code, data, errors } =
              result?.data?.data.updateJudgmentResult;

            if (code === 200 && data !== null) {
              addToast('Judgement result has been updated successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
              ApiHelper.judgementResult
                .getJudgementResult()
                .then(res => {
                  setJudgementResult(
                    res?.data?.data?.getJudgmentResultList?.data
                      ?.judgmentResultList
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

  // -------------------------------- delete district data --------------------------------
  const deleteJudgementResult = () => {
    const onSuccessDeleteJudgementResult = () => {
      ApiHelper.judgementResult
        .getJudgementResult()
        .then(res => {
          setJudgementResult(
            res?.data?.data?.getJudgmentResultList?.data?.judgmentResultList
          );
          addToast('JudgementResult has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteJudgementResult = error => {
      addToast('Something went wrong', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.judgementResult
      .deleteJudgementResult(judgementResultId)
      .then(onSuccessDeleteJudgementResult)
      .catch(onErrorDeleteJudgementResult);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newJudgementResult = [];
  judgementResult.map((item, index) => {
    newJudgementResult.push({
      sl: index + 1,
      judgementResult: item?.name,
      court: item?.court?.name,
      courtCountry: item?.court?.country,
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
      name: 'judgementResult',
      label: 'Judgement Result',
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

  const addModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add A Judgement Result</span>
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
                  judgementResultUpdate && judgementResultUpdate?.court
                    ? judgementResultUpdate?.court?.id
                    : ''
                }
                onChange={handleUpdateDataChange}
                // {...register('court', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {court.map(court => (
                  <MenuItem value={court.id}>{court.name}</MenuItem>
                ))}
              </Select>
              {/* <FormHelperText>
                {errors.court?.type === 'required' && 'Court is required'}
              </FormHelperText> */}
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Judgement Name'
              id='outlined-basic'
              name='name'
              value={judgementResultUpdate ? judgementResultUpdate?.name : ''}
              onChange={handleUpdateDataChange}
              variant='outlined'
              color='secondary'
              // error={errors.judgement_result}
              // {...register('judgement_result', { required: true })}
              // helperText={
              //   errors.judgement_result?.type === 'required' &&
              //   'Judgement Result is required'
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
          onClick={() => deleteJudgementResult()}
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
        title={'Judgement Result List'}
        data={newJudgementResult}
        columns={columns}
        options={options}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addModal}
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

export default SuperAdminJudgementResultPageTableComp;
