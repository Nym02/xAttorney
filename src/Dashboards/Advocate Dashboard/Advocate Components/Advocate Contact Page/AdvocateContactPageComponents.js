import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import AdvocateContactPageTabComp from './AdvocateContactPageTabComp';
import AdvocateContactPageTableComp from './AdvocateContactPageTableComp';
import addNow from '../../../../assets/images/add-now.svg';
import addContact from '../../../../assets/images/addContact.svg';
// import addNewContact from '../../../../assets/images/addNewContact.svg';
// import printContact from '../../../../assets/images/contactPrint.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import {
  FormControl,
  Modal,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import { useContext, useState } from 'react';
import { DataContext } from '../../../../Context Api/ManageData';
import { useToasts } from 'react-toast-notifications';
import { useForm } from 'react-hook-form';
import featureList from '../../../../assets/images/featureListImg.svg';
import theme from '../../../../theme';
import gql from 'graphql-tag';
import jwt from 'jwt-decode';
import axios from 'axios';
import { MAIN_API } from '../../../../Utils/APIs';
import { print } from 'graphql';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';
import { FormHelperText } from '@material-ui/core';

const contactInitialValues = {
  phone_number_list: '',
  email_list: '',
};

const AdvocateContactPageComponents = () => {
  const [createUser, setCreateUser] = useState(false);
  const [advContact, setAdvContact] = useState(contactInitialValues);
  const [phoneList, setPhoneList] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [contactId, setContactId] = useState('');
  const { advocateContact, setAdvocateContact } = useContext(DataContext);

  const { addToast } = useToasts();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleInputChange = e => {
    const newAdvContact = { ...advContact };
    newAdvContact[e.target.name] = e.target.value;

    setAdvContact(newAdvContact);
  };

  //adding multiple phone numbers
  const handlePhoneNumbers = e => {
    if (e.keyCode == 13) {
      if (phoneList.length < 5) {
        setPhoneList([...phoneList, advContact.phone_number_list]);
      }
    }
  };
  //adding multiple emails
  const handleEmails = e => {
    if (e.keyCode === 13) {
      if (emailList.length < 5) {
        setEmailList([...emailList, advContact.email_list]);
      }
    }
  };

  //getting advocate token
  const loginToken = localStorage.getItem('loginInfo');
  const newLoginToken = JSON.parse(loginToken);
  const finalNewLoginToken = newLoginToken.loginToken;

  //decoding advocate token
  const decodeToken = tokenValue => {
    return jwt(tokenValue);
  };

  const advocateIdFromToken = decodeToken(finalNewLoginToken);
  const finalAdvocateId = advocateIdFromToken.id;

  // ---------------------------------- submitting data to the database ----------------------------------
  const onSubmit = (data, e) => {
    //   createContact(
    //   contact: {
    //     advocate: {
    //       id: "60a4f9c122ef6b91b56c9f67"
    //     }
    //     name: "Test Contact",
    //     phoneList: ["01997157535"],
    //     emailList: ["shihabhossain611@gmail.com"],
    //     designation: "Programmer",
    //     company: "Project X Ltd."
    //     details: "This is a test details"
    //   }
    // )

    const createContactData = {
      advocate: {
        id: finalAdvocateId,
      },
      name: data.name,
      phoneList: [data.phone_number],
      emailList: [data.email_address],
      designation: data.relation,
      company: data.company_name,
      details: data.description,
    };
    const newCreateContactData = JSON.stringify(createContactData);
    const finalCreateContactData = newCreateContactData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const createAdvContactQuery = gql`
      mutation {
        createContact(
          contact: ${finalCreateContactData}
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
            name
            phoneList
            emailList
            designation
            company
            details
          }
        }
      }
    `;

    //sending data to the database
    axios
      .post(
        MAIN_API,
        {
          query: print(createAdvContactQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        // window.location.reload();
        const { createContact } = res?.data?.data;
        if (createContact !== null) {
          const { code, data, errors } = res?.data?.data?.createContact;
          if (code === 200) {
            AdvocateApiHelper.advContact
              .getAdvContact()
              .then(res => {
                setAdvocateContact(
                  res?.data?.data?.getContactList?.data?.contactList
                );
              })
              .then(() => reset())
              .then(() => setCreateUser(false))
              .then(() => {
                addToast('Contact Added Successfully', {
                  appearance: 'success',
                  autoDismiss: true,
                });
              });
            // window.location.reload();
          } else {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong!!!. Please try again later.', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      // .then(() => window.location.reload())
      // .then(
      //   AdvocateApiHelper.advContact
      //     .getAdvContact()
      //     .then(res => {
      //       console.log('after create contact', res);
      //       setAdvocateContact(
      //         res?.data?.data?.getAdvocateContactList?.data?.advocateContactList
      //       );
      //       addToast('Successfully added new advocate contact', {
      //         appearance: 'success',
      //         autoDismiss: true,
      //       });
      //     })
      //     .catch(err =>
      //       addToast('Something went wrong', {
      //         appearance: 'error',
      //         autoDismiss: true,
      //       })
      //     )
      // )

      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  const addNewUser = (
    <div
      className='2xl:w-2/3 w-11/12 lg:h-auto h-full bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add New Contact</span>
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
        onKeyPress={e => {
          if (e.key == 'Enter') {
            e.preventDefault();
          }
        }}
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <FormControl error={errors?.name} className='w-full'>
              <TextField
                className='bg-lightSilver rounded text-white w-full my-2'
                label='Name*'
                id='outlined-basic'
                name='name'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                error={errors?.name}
                {...register('name', { required: true })}
              />
              <FormHelperText>
                {errors?.name?.type === 'required' && 'Name is required'}
              </FormHelperText>
            </FormControl>

            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Relation/Designation'
              id='outlined-basic'
              name='relation'
              variant='outlined'
              color='secondary'
              error={errors.relation}
              {...register('relation', { required: false })}
              helperText={
                errors.relation?.type === 'required' &&
                'Relative Name is required'
              }
              // onChange={handleInputChange}
            />
          </div>
          <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <FormControl error={errors?.phone_number} className='w-full'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone Number*'
                id='outlined-basic'
                name='phone_number_list'
                variant='outlined'
                inputProps={{ maxLength: 11 }}
                color='secondary'
                // onKeyDown={handlePhoneNumbers}
                error={errors?.phone_number}
                {...register('phone_number', { required: true, minLength: 11 })}
                // onChange={handleInputChange}
              />
              <FormHelperText>
                {errors?.phone_number?.type === 'required'
                  ? 'Phone Number is required'
                  : errors?.phone_number?.type === 'minLength' &&
                    'Phone Number should be 11 character logn'}
              </FormHelperText>
            </FormControl>

            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Email'
              id='outlined-basic'
              name='email_list'
              variant='outlined'
              color='secondary'
              // error={emailList.length < 1 ? true : false}
              // onKeyDown={handleEmails}
              error={errors.email_address}
              {...register('email_address', { required: false })}
              helperText={
                errors.email_address?.type === 'required' &&
                'Email Address is required'
              }
              // onChange={handleInputChange}
            />
          </div>
          {/* <div className='flex  justify-between space-x-8'>
            <ul className='list-disc pl-5 w-full'>
              {phoneList.map(contact => (
                <li>
                  <span className=' text-xl font-bold flex items-center space-x-2'>
                    {contact}{' '}
                    <button className='ml-3' type='button'>
                      <img className='w-6' src={featureList} alt='' />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
            <ul className='list-disc pl-5 w-full'>
              {emailList.map(contact => (
                <li>
                  <span className=' text-xl font-bold flex items-center space-x-2'>
                    {contact}{' '}
                    <button className='ml-3' type='button'>
                      <img className='w-6' src={featureList} alt='' />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div> */}

          <div className='w-50 flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Company Name'
              id='outlined-basic'
              name='company_name'
              variant='outlined'
              color='secondary'
              // onChange={handleInputChange}
              error={errors.company_name}
              {...register('company_name', { required: false })}
              helperText={
                errors.company_name?.type === 'required' &&
                'Company Name is required'
              }
            />
            <TextField
              // style={{ width: "49%" }}
              className='bg-lightSilver rounded text-white w-full'
              label='Description'
              id='outlined-basic'
              name='description'
              variant='outlined'
              color='secondary'
              multiline
              error={errors.description}
              {...register('description', { required: false })}
              helperText={
                errors.description?.type === 'required' &&
                'Description is required'
              }
              // onChange={handleInputChange}
            />
          </div>
        </ThemeProvider>

        <div className='w-full flex justify-center items-center space-x-6'>
          <button
            onClick={() => reset()}
            type='reset'
            style={{ outline: 'none' }}
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button>
          {/* <button style={{ outline: "none" }}>
            <img src={addNow} alt="" />
          </button> */}
          <button
            // onClick={() => setCreateUser(false)}
            style={{ outline: 'none' }}
            type='submit'
          >
            <img src={addNow} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='All Contacts' />
      <div className='mt-20 relative z-10'>
        <div className='flex items-center justify-end h-10 -mt-16'>
          <button
            onClick={() => setCreateUser(true)}
            style={{ outline: 'none' }}
            className='z-40'
          >
            <img src={addContact} alt='' />
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
          <AdvocateContactPageTabComp
            newChildren={<AdvocateContactPageTableComp />}
            allChildren={<AdvocateContactPageTableComp />}
          />
        </div>
      </div>
    </>
  );
};

export default AdvocateContactPageComponents;
