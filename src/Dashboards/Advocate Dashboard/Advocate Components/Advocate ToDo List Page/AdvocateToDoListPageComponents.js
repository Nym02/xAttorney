import {
  FormHelperText,
  Modal,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { LaptopWindowsTwoTone } from '@material-ui/icons';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNewButton from '../../../../assets/images/add-new-button.svg';
import addNow from '../../../../assets/images/add-now.svg';
import addTodo from '../../../../assets/images/addTodo.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';
import {
  decodedAdvocateId,
  finalNewLoginToken,
} from '../../../../Utils/UserToken';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import AdvocateToDoListComplete from './AdvocateToDoListComplete';
import AdvocateToDoListPageTabComp from './AdvocateToDoListPageTabComp';
import AdvocateToDoListPageTableComp from './AdvocateToDoListPageTableComp';
import AdvocateToDoListPending from './AdvocateToDoListPending';

const AdvocateToDoListPageComponents = () => {
  const { addToast } = useToasts();
  const [createUser, setCreateUser] = useState(false);
  const { toDo, setToDo } = useContext(DataContext);
  const { dashboardSummary } = useContext(DataContext);
  const [descriptionText, setDescriptionText] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //submitting form
  const onSubmit = (data, e) => {
    const toDoData = {
      advocate: {
        id: dashboardSummary?.advocate?.id,
      },
      description: descriptionText,
      phone: data.phone_number,
    };

    const newTodoData = JSON.stringify(toDoData);
    const finalTodoData = newTodoData.replace(/"([^"]+)":/g, '$1:');

    const createTodoQuery = gql`
      mutation {
        createToDo(
          toDo: ${finalTodoData}
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
            advocate {
              id
            }
            description
            phone
            createdTime
            completed
            completedTime
          }
        }
      }
    `;

    // sending data to the database
    axios
      .post(
        MAIN_API,
        {
          query: print(createTodoQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(result => {
        const { createToDo } = result?.data?.data;
        if (createToDo !== null) {
          const { code, data, errors } = result?.data?.data?.createToDo;

          if (code === 200 && data !== null) {
            addToast('To Do has been created successfully', {
              appearance: 'success',
              autoDismiss: true,
            });
            AdvocateApiHelper.advTodo
              .getTodo()
              .then(result => {
                setToDo(result?.data?.data?.getToDoList?.data?.toDoList);
              })
              .then(() =>
                // reset()
                setTimeout(() => {
                  window.location.reload();
                }, 300)
              )
              .then(() => setCreateUser(false))
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
      .catch(err => {
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        });
      });

    setDescriptionText('');
  };

  const addNewUser = (
    <div
      className='2xl:w-1/3 lg:1/2 w-11/12 lg:h-auto h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add New Todo</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setCreateUser(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      {/* main content */}
      <form
        className='w-full px-12 flex flex-col space-y-6 pb-8'
        onSubmit={handleSubmit(onSubmit)}
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <FormControl className='w-full' z>
              <TextField
                className='bg-lightSilver rounded text-white '
                label='Description*'
                id='outlined-basic'
                name='description_text'
                variant='outlined'
                color='secondary'
                // error={errors.description_text}
                // {...register('description_text', { required: true })}
                onChange={e => setDescriptionText(e.target.value)}
              />
              {/* <FormHelperText>
                {errors.description_text?.type === 'required' &&
                  'Description can not be empty'}
              </FormHelperText> */}
            </FormControl>
          </div>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Phone Number'
              id='outlined-basic'
              name='phone_number'
              inputProps={{ maxLength: 11 }}
              variant='outlined'
              color='secondary'
              error={errors.phone_number}
              {...register('phone_number', {
                required: false,
                pattern: /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/,
              })}
              helperText={
                errors?.phone_number?.type === 'required'
                  ? 'Phone Number is required'
                  : errors?.phone_number?.type === 'pattern' &&
                    'Please enter a valid phone number'
              }
            />
          </div>
        </ThemeProvider>

        <div className='w-full flex justify-center items-center space-x-6'>
          {/* <button
            style={{ outline: 'none' }}
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button> */}
          <button type='submit' style={{ outline: 'none' }}>
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='To Do List' />
      <div className='mt-20 relative z-10'>
        <div className='flex items-center justify-end h-10 -mt-16'>
          <button
            onClick={() => setCreateUser(true)}
            style={{ outline: 'none' }}
            className='z-40'
          >
            <img src={addTodo} alt='' />
          </button>
        </div>

        <Modal
          open={createUser}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {addNewUser}
        </Modal>
        <div className='w-full -mt-5'>
          <AdvocateToDoListPageTabComp
            newChildren={<AdvocateToDoListPageTableComp />}
            allChildren={<AdvocateToDoListPending />}
            completeChildren={<AdvocateToDoListComplete />}
          />
        </div>
      </div>

      <Modal
        open={createUser}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addNewUser}
      </Modal>
    </>
  );
};

export default AdvocateToDoListPageComponents;
