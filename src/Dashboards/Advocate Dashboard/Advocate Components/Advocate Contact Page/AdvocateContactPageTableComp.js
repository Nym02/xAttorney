import editIcon from '@iconify-icons/akar-icons/edit';
import eyeIcon from '@iconify-icons/akar-icons/eye';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import clockCircleOutlined from '@iconify-icons/ant-design/clock-circle-outlined';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
// import filter from '../../../../../assets/images/filter.svg';
// import SearchIcon from '@material-ui/icons/Search';
import { Modal, ThemeProvider } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import jwt from 'jwt-decode';
import MUIDataTable from 'mui-datatables';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/update-button-large.svg';
import addContact from '../../../../assets/images/addContact.svg';
import addNewContact from '../../../../assets/images/addNewContact.svg';
import printContact from '../../../../assets/images/contactPrint.svg';
import featureList from '../../../../assets/images/featureListImg.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';
import { MAIN_API } from '../../../../Utils/APIs';

const contactInitialValues = {
  name: '',
  designation: '',
  phone_number_list: '',
  email_list: '',
  company: '',
  details: '',
};

const AdvocateContactPageTableComp = () => {
  const [createUser, setCreateUser] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [advContact, setAdvContact] = useState(contactInitialValues);
  const [phoneList, setPhoneList] = useState([]);
  const [emailList, setEmailList] = useState([]);
  const [contactId, setContactId] = useState('');
  const { advocateContact, setAdvocateContact } = useContext(DataContext);
  const [contactDetailsByID, setContactDetailsById] = useState('');

  const { addToast } = useToasts();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (e, id, item) => {
    setAnchorEl(e.currentTarget);
    setContactId(id);
    setContactDetailsById(item.rowData);
  };

  const viewContactDetailsByID = advocateContact?.find(
    ({ id }) => id === contactId
  );
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleInputChange = e => {
    // const newAdvContact = { ...advContact };
    // newAdvContact[e.target.name] = e.target.value;
    if (e.target.name == 'phoneList') {
      setAdvContact({
        ...advContact,
        phoneList: [e.target.value],
      });
    } else if (e.target.name == 'emailList') {
      setAdvContact({
        ...advContact,
        emailList: [e.target.value],
      });
    } else {
      setAdvContact({
        ...advContact,
        [e.target.name]: e.target.value,
      });
    }
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

  useEffect(() => {
    setAdvContact(viewContactDetailsByID);
  }, [contactId, viewContactDetailsByID]);

  // ---------------------------------- updating contact info ----------------------------------
  const handleContactFormUpdate = e => {
    e.preventDefault();
    const updateContactData = {
      advocate: {
        id: finalAdvocateId,
      },
      id: contactId,
      name: advContact.name,
      phoneList: [advContact.phoneList[0]],
      emailList: [advContact.emailList[0]],
      designation: advContact.designation,
      company: advContact.company,
      details: advContact.details,
    };
    const newCreateContactData = JSON.stringify(updateContactData);
    const finalCreateContactData = newCreateContactData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const createAdvContactQuery = gql`
      mutation {
        updateContact(
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
        const { updateContact } = res?.data?.data;
        if (updateContact !== null) {
          const { code, data, errors } = res?.data?.data?.updateContact;
          if (code === 200 && data !== null) {
            addToast('Advocate Contact Updated Successfully', {
              appearance: 'success',
              autoDismiss: true,
            });

            AdvocateApiHelper.advContact
              .getAdvContact()
              .then(res => {
                setAdvocateContact(
                  res?.data?.data?.getContactList?.data?.contactList
                );
              })

              .then(() => setCreateUser(false));
          } else {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong. Please try again later', {
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
  };

  // -------------------------------- delete AdvocateContact data --------------------------------
  const deleteAdvocateContact = () => {
    const onSuccessDeleteAdvocateContact = () => {
      AdvocateApiHelper.advContact.getAdvContact().then(res => {
        setAdvocateContact(res?.data?.data?.getContactList?.data?.contactList);
      });
      addToast('Contact has been deleted succesfully', {
        appearance: 'success',
        autoDismiss: true,
      });
    };
    const onErrorDeleteAdvocateContact = error => {
      // console.log(error);
    };

    AdvocateApiHelper.advContact
      .deleteAdvContact(contactId)
      .then(res => {
        const { deleteContact } = res?.data?.data;
        if (deleteContact !== null) {
          const { code, data, errors } = res?.data?.data?.deleteContact;

          if (code === 200 && data !== null) {
            return onSuccessDeleteAdvocateContact();
          } else {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .catch(onErrorDeleteAdvocateContact);

    setAnchorEl(null);
    setDeleteModal(false);
  };

  // -------------------------------- view contact data --------------------------------
  const viewContactData = () => {};

  // -------------------------------- table data in new array --------------------------------
  const newAdvocateContactData = [];
  advocateContact?.map((item, idx) => {
    newAdvocateContactData.push({
      sl: idx + 1,
      name: item?.name,
      designation: item?.designation,
      description: item?.details,
      company: item?.company,
      phone: item?.phoneList[0],
      email: item?.emailList[0],
      id: item?.id,
    });
  });

  const columns = [
    {
      name: 'sl',
      label: 'Serial No.',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'designation',
      label: 'Relation/Designation',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'phone',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
      },
    },

    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'company',
      label: 'Company',
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
                onClick={e => handleClick(e, value, item)}
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
                {/* <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setOpen(true)}
                >
                  <Icon icon={eyeIcon} />
                  <span>View</span>
                </MenuItem> */}
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setCreateUser(true)}
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
    jumpToPage: true,
  };

  const updateContact = (
    <div
      className='2xl:w-2/3 w-11/12 lg:h-auto h-full bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Update Contact</span>
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
        onSubmit={handleContactFormUpdate}
        // onSubmit={handleSubmit(onSubmit)}
        // onKeyPress={e => {
        //   if (e.key === 'Enter') {
        //     e.preventDefault();
        //   }
        // }}
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <TextField
              className='bg-lightSilver rounded text-white w-full my-2'
              label='Name'
              id='outlined-basic'
              name='name'
              variant='outlined'
              color='secondary'
              value={advContact?.name}
              onChange={handleInputChange}
              // error={errors.name}
              // {...register('name', { required: true })}
              // helperText={
              //   errors.name?.type === 'required' && 'Name is required'
              // }
            />

            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Relation/Designation'
              id='outlined-basic'
              name='designation'
              variant='outlined'
              color='secondary'
              value={advContact?.designation}
              // error={errors.relation}
              // {...register('relation', { required: true })}
              // helperText={
              //   errors.relation?.type === 'required' &&
              //   'Relative Name is required'
              // }
              onChange={handleInputChange}
            />
          </div>
          <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Phone Number'
              id='outlined-basic'
              name='phoneList'
              variant='outlined'
              inputProps={{ maxLength: 11 }}
              color='secondary'
              value={
                advContact && advContact.phoneList
                  ? advContact.phoneList[0]
                  : ''
              }
              // onKeyDown={handlePhoneNumbers}
              // error={errors.phone_number}
              // {...register('phone_number', { required: true, minLength: 11 })}
              // helperText={
              //   errors.phone_number?.type === 'required'
              //     ? 'Phone Number is required'
              //     : errors.phone_number?.type === 'minLength' &&
              //       'Phone Numbe should be 11 character logn'
              // }
              onChange={handleInputChange}
            />
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Email'
              id='outlined-basic'
              name='emailList'
              variant='outlined'
              color='secondary'
              value={
                advContact && advContact.emailList
                  ? advContact.emailList[0]
                  : ''
              }
              // error={emailList.length < 1 ? true : false}
              // onKeyDown={handleEmails}
              // error={errors.email_list}
              // {...register('email_list', { required: true })}
              // helperText={
              //   errors.email_list?.type === 'required' && 'Email is required'
              // }
              onChange={handleInputChange}
            />
          </div>

          <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Company Name'
              id='outlined-basic'
              name='company'
              variant='outlined'
              color='secondary'
              value={advContact?.company}
              onChange={handleInputChange}
              // error={errors.company_name}
              // {...register('company_name', { required: true })}
              // helperText={
              //   errors.company_name?.type === 'required' &&
              //   'Company Name is required'
              // }
            />
            <TextField
              // style={{ width: "49%" }}
              className='bg-lightSilver rounded text-white w-full'
              label='Description'
              id='outlined-basic'
              name='details'
              variant='outlined'
              color='secondary'
              value={advContact?.details}
              onChange={handleInputChange}
              // multiline
              // error={errors.description}
              // {...register('description', { required: true })}
              // helperText={
              //   errors.description?.type === 'required' &&
              //   'Description is required'
              // }
            />
          </div>
        </ThemeProvider>

        <div className='w-full flex justify-center items-center space-x-6'>
          {/* <button
            onClick={() => reset()}
            type='reset'
            style={{ outline: 'none' }}
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button> */}
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

  // ---------------------------------- view contact data ----------------------------------
  const showContactInfo = (
    <div
      className='2xl:w-1/3 w-11/12 lg:h-auto h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>View Contact Details</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpen(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      {/* main content */}

      <div className='p-4'>
        {/* <div className='text-right -mt-10'>
          <button className='text-right'>
            <img src={addNewContact} alt='' />
          </button>
        </div> */}
        <div className='p-2 flex flex-col space-y-4 -mt-10'>
          <div>
            <div className='flex flex-col space-x-4 space-y-2'>
              <h1 className='text-xsm font-light'>Name</h1>
              <span className='font-bold text-lg'>{contactDetailsByID[1]}</span>
            </div>
          </div>
          <div className='flex justify-between w-full'>
            <div className='flex flex-col space-x-4 space-y-2 w-1/2'>
              <h1 className='text-xsm font-light'>Phone</h1>
              <span className='font-bold text-lg'>{contactDetailsByID[3]}</span>
            </div>
            <div className='flex flex-col space-x-4 space-y-2 w-1/2'>
              <h1 className='text-xsm font-light'>Email</h1>
              <span className='font-bold text-lg'>{contactDetailsByID[4]}</span>
            </div>
          </div>
          <div className='flex justify-between w-full'>
            <div className='flex flex-col space-x-4 space-y-2 w-1/2'>
              <h1 className='text-xsm font-light'>Company</h1>
              <span className='font-bold text-lg'>{contactDetailsByID[5]}</span>
            </div>
            <div className='flex flex-col space-x-4 space-y-2 w-1/2'>
              <h1 className='text-xsm font-light'>Designation / Relation</h1>
              <span className='font-bold text-lg'>{contactDetailsByID[2]}</span>
            </div>
          </div>
        </div>
        {/* <div className='flex justify-center'>
          <div className='mt-3'>
            <button>
              <img src={printContact} alt='' />
            </button>
            <button>
              <img src={printContact} alt='' />
            </button>
            <button>
              <img src={printContact} alt='' />
            </button>
            <button>
              <img src={printContact} alt='' />
            </button>
          </div>
        </div> */}
      </div>
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
          onClick={() => deleteAdvocateContact()}
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
        title={'Contact List'}
        data={newAdvocateContactData}
        columns={columns}
        options={options}
      />
      <Modal
        open={createUser}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {updateContact}
      </Modal>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {showContactInfo}
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

export default AdvocateContactPageTableComp;
