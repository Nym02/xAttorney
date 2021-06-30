import DateFnsUtils from '@date-io/date-fns';
import editIcon from '@iconify-icons/akar-icons/edit';
import eyeIcon from '@iconify-icons/akar-icons/eye';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import clockCircleOutlined from '@iconify-icons/ant-design/clock-circle-outlined';
import deleteOutlined from '@iconify-icons/ant-design/delete-outlined';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import tickIcon from '@iconify-icons/typcn/tick';
import { Icon } from '@iconify/react';
import { createMuiTheme, Modal, ThemeProvider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';

import warn from '../../../../assets/images/warn.svg';
import { TextField } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';
import {
  decodedAdvocateId,
  finalNewLoginToken,
} from '../../../../Utils/UserToken';
import moment from 'moment';

const AdvocateToDoListPageTableComp = () => {
  const [createUser, setCreateUser] = useState(false);
  const [toDoId, setToDoId] = useState('');
  const { toDo, setToDo } = useContext(DataContext);
  const { addToast } = useToasts();
  const [anchorEl, setAnchorEl] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [CompleteModal, setCompleteModal] = useState(false);

  // const handleClick = (event, id) => {
  //   setAnchorEl(event.currentTarget);
  //   setToDoId(id);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCalled = id => {
    setToDoId(id);
    setDeleteModal(true);
  };

  const handleUpdate = value => {
    setToDoId(value.rowData[5]);
    setCompleteModal(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ------------------------ update todolist status ------------------------
  // use another popup to do this update status
  const updateToDoCompleteStatus = () => {
    const completeStatusData = {
      toDoId: toDoId,
      completed: true,
    };

    const onSuccessCreateToDoStatus = result => {
      const { updateToDoCompletedStatus } = result?.data?.data;
      if (updateToDoCompletedStatus !== null) {
        const { code, data, errors } =
          result?.data?.data?.updateToDoCompletedStatus;

        if (code === 200 && data !== null) {
          addToast('Task has been updated to Completed', {
            appearance: 'success',
            autoDismiss: true,
          });
          AdvocateApiHelper.advTodo
            .getTodo()
            .then(result => {
              setToDo(result?.data?.data?.getToDoList?.data?.toDoList);
            })
            // .then(() =>
            //   // reset()
            //   setTimeout(() => {
            //     window.location.reload();
            //   }, 300)
            // )
            .then(() => setCompleteModal(false))
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
    const onErrorCreateToDoStatus = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    AdvocateApiHelper.advTodo
      .updateToDoStatus({
        data: completeStatusData,
      })
      .then(onSuccessCreateToDoStatus)
      .catch(onErrorCreateToDoStatus);
  };

  //delete todo modal
  const deleteTodo = () => {
    const onSuccessDeleteTodo = result => {
      AdvocateApiHelper.advTodo
        .getTodo()
        .then(res => {
          setToDo(res?.data?.data?.getToDoList?.data?.toDoList);
          addToast('ToDo has been deleted Succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .catch();
    };
    const onErrorDeleteTodo = error => {
      // console.log(error);
    };

    AdvocateApiHelper.advTodo
      .deleteToDo(toDoId)
      .then(onSuccessDeleteTodo)
      .catch(onErrorDeleteTodo);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  let newToDo = [];
  toDo.map((item, index) => {
    newToDo.push({
      sl: index + 1,
      name: item?.name,
      description: item?.description,
      phone: item?.phone,
      completeStatus: item?.completed,
      createdTime: moment(item?.createdTime).format('lll'),
      completedTime: moment(item?.completedTime).format('lll'),
      id: item?.id,
    });
  });

  const columns = [
    // {
    //   name: 'sl',
    //   label: 'SL. No',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: 'createdTime',
      label: 'Assigned Time',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'description',
      label: 'Description',
      options: {
        filter: true,
        sort: true,
      },
    },
    // {
    //   name: 'createdTime',
    //   label: 'SL. No',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    // {
    //   name: "name",
    //   label: "Description",
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: 'phone',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'completeStatus',
      label: 'Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (completed, value) => {
          if (completed === false) {
            return (
              <>
                <div className='flex justify-start items-center'>
                  <div
                    onClick={() => handleUpdate(value)}
                    className='flex justify-center items-start'
                  >
                    <span className='bg-pink-900 text-white font-semibold px-1 py-1 rounded flex justify-center items-center cursor-pointer'>
                      Mark As Done
                    </span>
                  </div>
                </div>
              </>
            );
          }
          if (completed === true) {
            return (
              <>
                <div className='flex justify-start items-center'>
                  <div className='flex justify-center items-start'>
                    <span className='bg-primarydark text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      Completed
                    </span>
                  </div>
                </div>
              </>
            );
          }
          return <div>Unknown</div>;
        },
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (id, value) => {
          return (
            <div className='flex justify-start items-center'>
              <div
                onClick={() => handleCalled(value.rowData[5])}
                className='flex justify-center items-center cursor-pointer'
              >
                <div className='p-2 rounded-full bg-red-800'>
                  <Icon className='text-white text-2xl' icon={deleteOutlined} />
                </div>
              </div>
            </div>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Id',
      options: {
        display: false,
      },
    },
    {
      name: 'completedTime',
      label: 'Completed Time',
      options: {
        filter: true,
        sort: true,
      },
    },
  ];

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  // const addNewUser = (
  //   <div
  //     className='2xl:w-2/3 w-11/12 lg:h-auto h-full bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
  //     style={{
  //       top: '50%',
  //       left: '50%',
  //       transform: `translate(-50%, -50%)`,
  //     }}
  //   >
  //     <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
  //       <span>Add New Todo</span>
  //       <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
  //         <img
  //           onClick={() => setCreateUser(false)}
  //           className='w-full cursor-pointer'
  //           src={modalClose}
  //           alt=''
  //         />
  //       </div>
  //     </div>

  //     {/* main content */}
  //     <form
  //       className='w-full px-12 flex flex-col space-y-6 pb-8'
  //       // onSubmit={handleSubmit(onSubmit)}
  //     >
  //       <ThemeProvider theme={theme}>
  //         <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
  //           <TextField
  //             className='bg-lightSilver rounded text-white w-full'
  //             label='Description'
  //             id='outlined-basic'
  //             name='description_text'
  //             variant='outlined'
  //             color='secondary'
  //             multiline
  //             rows={8}
  //             error={errors.description_text}
  //             {...register('description_text', { required: true })}
  //             helperText={
  //               errors.description_text?.type === 'required' &&
  //               'Description can not be empty'
  //             }
  //           />
  //         </div>
  //         <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
  //           <TextField
  //             className='bg-lightSilver rounded text-white w-full'
  //             label='Phone Number'
  //             id='outlined-basic'
  //             name='phone_number'
  //             variant='outlined'
  //             color='secondary'
  //             error={errors.phone_number}
  //             {...register('phone_number', {
  //               required: true,
  //               minLength: 11,
  //               pattern: /^[0-9 && +]*$/,
  //             })}
  //             helperText={
  //               errors?.phone_number?.type === 'required'
  //                 ? 'Phone Number can not be empty'
  //                 : errors?.phone_number?.type === 'pattern'
  //                 ? 'Please enter a valid phone number'
  //                 : errors.phone_number?.type === 'minLength' &&
  //                   'Phone Number should be at 11 character long'
  //             }
  //           />
  //         </div>
  //       </ThemeProvider>

  //       <div className='w-full flex justify-center items-center space-x-6'>
  //         <button
  //           style={{ outline: 'none' }}
  //           className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
  //         >
  //           Reset
  //         </button>
  //         <button
  //           // onClick={() => setCreateUser(false)}
  //           style={{ outline: 'none' }}
  //           type='submit'
  //         >
  //           add
  //           {/* <img src={addNow} alt="" /> */}
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );

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
          onClick={() => deleteTodo()}
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

  // -------------------------------- delete modal --------------------------------
  const updateCompleteModal = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Confirm</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setCompleteModal(false)}
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
        <h1 className='text-xl'>Make the task complete..</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 w-48 capitalize'
          onClick={() => updateToDoCompleteStatus()}
        >
          Confirm
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-800 text-white text-sm font-semibold bg-red-800 h-11 w-48 capitalize'
          onClick={() => setCompleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  return (
    <>
      <MUIDataTable
        title={'To Do List'}
        data={newToDo}
        columns={columns}
        options={options}
      />
      {/* <Modal
        open={createUser}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addNewUser}
      </Modal> */}
      <Modal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
      </Modal>

      <Modal
        open={CompleteModal}
        onClose={() => setCompleteModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateCompleteModal}
      </Modal>
    </>
  );
};

export default AdvocateToDoListPageTableComp;
