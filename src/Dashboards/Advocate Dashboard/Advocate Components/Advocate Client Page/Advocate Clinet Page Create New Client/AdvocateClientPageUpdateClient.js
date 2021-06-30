import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { print } from 'graphql';
import gql, { resetCaches } from 'graphql-tag';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../../assets/images/update-button-large.svg';
import { DataContext } from '../../../../../Context Api/ManageData';
import theme from '../../../../../theme';
import { AdvocateApiHelper } from '../../../../../Utils/AdvocateApiHelper';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import DashboardPageHading from '../../../../Dashboard Typographys/DashboardPageHading';

const AdvocateClientPageUpdateClient = () => {
  const history = useHistory();

  const [associateEmergencyContact, setAssociateEmergencyContact] = useState({
    emergencyPhone: '',
    emergencyEmail: '',
  });
  const [emergencyPhoneList, setEmergencyPhoneList] = useState([]);
  const [emergencyEmailList, setEmergencyEmailList] = useState([]);
  const [updateClient, setUpdateClient] = useState([]);
  const { division, setDivision } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { postOffice, setPostOffice } = useContext(DataContext);
  const [singleClient, setSingleClient] = useState([]);
  const [loading, setLoading] = useState(true);

  const { client, setClient } = useContext(DataContext);
  const { addToast } = useToasts();
  const { clientId } = useParams();

  // ===================================================================================
  // =====================getting client info by id=====================================
  // ===================================================================================

  const getClientById = React.useCallback(ClientIdForUpdate => {
    const newClientId = JSON.stringify(ClientIdForUpdate);
    const finalClientId = newClientId.replace(/"([^"]+)":/g, '$1:');
    const getClientQuery = gql`
     query {
        getClientById(clientId: ${finalClientId}) {
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
              name
              phone
              email
              designation
              chamberName
            }
            name
            phoneList
            emailList
            address {
              streetAddress
              postOffice {
                id
              }
              subDistrict {
                id
              }
              district {
                id
              }
              country
            }
            contactPersonList {
              name
              phoneList
              emailList
              company
              designation
              description
            }
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(getClientQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        setSingleClient(res?.data?.data?.getClientById?.data);
      });
  }, []);

  useEffect(() => {
    if (clientId) getClientById(clientId);
  }, [clientId, getClientById]);
  //handling multiple phone and email list
  const handleInputChange = e => {
    if (e.target.name === 'phoneList') {
      setSingleClient({
        ...singleClient,
        phoneList: [e.target.value],
      });
    } else if (e.target.name === 'emailList') {
      setSingleClient({
        ...singleClient,
        emailList: [e.target.value],
      });
    } else if (e.target.name === 'streetAddress') {
      setSingleClient({
        ...singleClient,
        address: {
          ...singleClient.address,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name === 'district') {
      setSingleClient({
        ...singleClient,
        address: {
          ...singleClient.address,
          [e.target.name]: { id: e.target.value },
        },
      });
    } else if (e.target.name === 'subDistrict') {
      setSingleClient({
        ...singleClient,
        address: {
          ...singleClient.address,
          [e.target.name]: { id: e.target.value },
        },
      });
    } else if (e.target.name === 'postOffice') {
      setSingleClient({
        ...singleClient,
        address: {
          ...singleClient.address,
          [e.target.name]: { id: e.target.value },
        },
      });
    } else if (e.target.name === 'contact_name') {
      setSingleClient({
        ...singleClient,
        contactPersonList: [
          (singleClient.contactPersonList[0] = {
            ...singleClient.contactPersonList[0],
            name: e.target.value,
          }),
        ],
      });
    } else if (e.target.name === 'contact_phone') {
      setSingleClient({
        ...singleClient,
        contactPersonList: [
          (singleClient.contactPersonList[0] = {
            ...singleClient.contactPersonList[0],
            phoneList: [e.target.value],
          }),
        ],
      });
    } else if (e.target.name === 'contact_email') {
      setSingleClient({
        ...singleClient,
        contactPersonList: [
          (singleClient.contactPersonList[0] = {
            ...singleClient.contactPersonList[0],
            emailList: [e.target.value],
          }),
        ],
      });
    } else if (e.target.name === 'contact_designation') {
      setSingleClient({
        ...singleClient,
        contactPersonList: [
          (singleClient.contactPersonList[0] = {
            ...singleClient.contactPersonList[0],
            designation: e.target.value,
          }),
        ],
      });
    } else if (e.target.name === 'contact_company') {
      setSingleClient({
        ...singleClient,
        contactPersonList: [
          (singleClient.contactPersonList[0] = {
            ...singleClient.contactPersonList[0],
            company: e.target.value,
          }),
        ],
      });
    } else if (e.target.name === 'contact_description') {
      setSingleClient({
        ...singleClient,
        contactPersonList: [
          (singleClient.contactPersonList[0] = {
            ...singleClient.contactPersonList[0],
            description: e.target.value,
          }),
        ],
      });
    } else {
      setSingleClient({
        ...singleClient,
        [e.target.name]: e.target.value,
      });
    }
  };

  //inserting phone numbers into an array
  const associateEmergencyPhone = e => {
    if (e.key == 'Enter') {
      setEmergencyPhoneList([
        ...emergencyPhoneList,
        associateEmergencyContact.emergencyPhone,
      ]);
    }
  };
  //inserting email into an array

  const associateEmergencyEmail = e => {
    if (e.key == 'Enter') {
      setEmergencyEmailList([
        ...emergencyEmailList,
        associateEmergencyContact.emergencyEmail,
      ]);
    }
  };

  //prevent form submit on enter
  const preventFormSubmit = e => {
    if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

  const handleClientUpdateInfo = e => {
    e.preventDefault();
    const createClientData = {
      id: clientId,
      name: singleClient?.name,
      phoneList: [singleClient?.phoneList[0]],
      emailList: [singleClient?.emailList[0]],
      address: {
        streetAddress: singleClient?.address?.streetAddress,
        postOffice: { id: singleClient?.address?.postOffice?.id },
        subDistrict: { id: singleClient?.address?.subDistrict?.id },
        district: { id: singleClient?.address?.district?.id },
        country: 'Bangladesh',
      },
      contactPersonList: [
        {
          name: singleClient?.contactPersonList[0]?.name,
          phoneList: [singleClient?.contactPersonList[0]?.phoneList[0]],
          emailList: [singleClient?.contactPersonList[0]?.emailList[0]],
          company: singleClient?.contactPersonList[0]?.company,
          designation: singleClient?.contactPersonList[0]?.designation,
          description: singleClient?.contactPersonList[0]?.description,
        },
      ],
    };

    const newCreateClient = JSON.stringify(createClientData);
    const finalCreateClientData = newCreateClient.replace(/"([^"]+)":/g, '$1:');

    const clientUpdateQuery = gql`
      mutation {
        updateClient(client: ${finalCreateClientData}) {
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
            address {
              streetAddress
              postOffice {
                id
              }
              subDistrict {
                id
              }
              district {
                id
              }
              country
            }
            contactPersonList {
              name
              phoneList
              emailList
              company
              designation
              description
            }
          }
        }
      }
    `;

    //sending data to the database
    axios
      .post(
        MAIN_API,
        {
          query: print(clientUpdateQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateClient } = res?.data?.data;
        if (updateClient !== null) {
          const { code, data, errors } = res?.data?.data?.updateClient;

          if (code === 200) {
            AdvocateApiHelper.advClient
              .getClient()
              .then(res => {
                setClient(res?.data?.data?.getClientList?.data?.clientList);
              })
              .then(() => history.push('/dashboard/advocate/clients'))
              .then(() => {
                addToast('Client data has been updated succesfully.', {
                  appearance: 'success',
                  autoDismiss: true,
                });
              });
          } else {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        }
      })
      // .then(() => window.location.replace('/dashboard/advocate/clients'))
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  const handleClientUpdate = e => {
    e.preventDefault();
  };

  // console.log(updateClient);
  // useEffect(() => {
  //   setSingleClient(updateClient);
  // }, [clientId, updateClient]);

  useEffect(() => {
    if (district.length > 0 && singleClient) {
      setLoading(false);
    }
    if (subDistrict.length > 0 && singleClient) {
      setLoading(false);
    }
    if (postOffice.length > 0 && singleClient) {
      setLoading(false);
    }
  }, [district, subDistrict, postOffice, singleClient]);

  if (loading) {
    return <div>Please wait</div>;
  }

  return (
    <div>
      <DashboardPageHading title='Update Client' />
      <div>
        <form
          className='w-full px-12 flex flex-col space-y-6 pb-8'
          // onSubmit={handleSubmit(onSubmit)}
          // onKeyPress={(e) => preventFormSubmit(e)}
          onSubmit={handleClientUpdateInfo}
        >
          <h6 className='font-bold'>Basic Information</h6>
          <ThemeProvider theme={theme}>
            <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full my-2'
                label='Name'
                id='outlined-basic'
                name='name'
                variant='outlined'
                color='secondary'
                value={singleClient?.name}
                onChange={handleInputChange}
                // {...register("name", { required: "Name is required" })}
                // error={errors.name}
                // helperText={errors.name?.message}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='emailList'
                variant='outlined'
                color='secondary'
                value={
                  singleClient && singleClient.emailList
                    ? singleClient.emailList[0]
                    : ''
                }
                onChange={handleInputChange}
                // {...register("email", {
                //   required: true,
                //   pattern:
                //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                // })}
                // error={errors.email}
                // helperText={
                //   errors.email?.type === "required"
                //     ? "Email is required"
                //     : errors?.email?.type === "pattern" && "Enter a valid email"
                // }
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
                style={{ width: '49%' }}
                value={
                  singleClient && singleClient?.phoneList
                    ? singleClient?.phoneList[0]
                    : ''
                }
                color='secondary'
                // {...register("phone", {
                //   required: true,
                //   pattern: /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/,
                // })}
                onChange={handleInputChange}
                // error={errors.phone}
                // helperText={
                //   errors.phone?.type === "required"
                //     ? "Phone Number is required"
                //     : errors.phone?.type === "pattern" &&
                //       "Enter a valid phone number"
                // }
              />
            </div>
            <h6 className='font-bold'>Client's Address</h6>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Address'
                id='outlined-basic'
                name='streetAddress'
                variant='outlined'
                color='secondary'
                value={
                  singleClient && singleClient?.address
                    ? singleClient?.address?.streetAddress
                    : ''
                }
                onChange={handleInputChange}
              />
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.district}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  District
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='District'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  name='district'
                  value={singleClient?.address?.district?.id}
                  onChange={handleInputChange}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {district.map(district => (
                    <MenuItem value={district.id}>{district.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.subDistrict}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Sub District
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='District'
                  className='bg-lightSilver rounded text-white w-full'
                  name='subDistrict'
                  value={singleClient?.address?.subDistrict?.id}
                  color='secondary'
                  // {...register("subDistrict", { required: false })}
                  onChange={handleInputChange}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {subDistrict.map(subDistrict => (
                    <MenuItem value={subDistrict.id}>
                      {subDistrict.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors?.postOffice}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Post Office
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Post Office'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  value={singleClient?.address?.postOffice?.id}
                  name='postOffice'
                  onChange={handleInputChange}
                  // {...register("postOffice", { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {postOffice.map(postOffice => (
                    <MenuItem value={postOffice.id}>{postOffice.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <h6 className='font-bold'>Contact Person</h6>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Name'
                id='outlined-basic'
                name='contact_name'
                variant='outlined'
                color='secondary'
                value={
                  singleClient && singleClient.contactPersonList
                    ? singleClient.contactPersonList[0]?.name
                    : ''
                }
                onChange={handleInputChange}
                // {...register("contact_name", { required: false })}
                // error={errors.ename}
                // helperText={
                //   errors.ename?.type === 'required' &&
                //   'Emergency Contact Name is required'
                // }
              />

              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone'
                id='outlined-basic'
                inputProps={{ maxlength: 11 }}
                variant='outlined'
                color='secondary'
                name='contact_phone'
                // onKeyDown={associateEmergencyPhone}
                value={
                  singleClient && singleClient.contactPersonList
                    ? singleClient.contactPersonList[0] &&
                      singleClient.contactPersonList[0]?.phoneList &&
                      singleClient.contactPersonList[0]?.phoneList[0]
                    : ''
                }
                onChange={handleInputChange}
                // {...register("contact_phone", { required: false })}
                // error={errors.ephone}
                // helperText={
                //   errors.ephone?.type === 'required' &&
                //   'Emergency Contact Phone Number is required'
                // }
              />
            </div>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='contact_email'
                variant='outlined'
                color='secondary'
                name='contact_email'
                value={
                  singleClient && singleClient.contactPersonList
                    ? singleClient.contactPersonList[0] &&
                      singleClient.contactPersonList[0]?.emailList &&
                      singleClient.contactPersonList[0]?.emailList[0]
                    : ''
                }
                onChange={handleInputChange}
                // {...register("contact_email", { required: false })}
                // error={errors.ephone}
                // helperText={
                //   errors.ephone?.type === 'required' &&
                //   'Emergency Contact Phone Number is required'
                // }
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Relation/Designation'
                id='outlined-basic'
                name='relation'
                variant='outlined'
                dense={true}
                color='secondary'
                name='contact_designation'
                value={
                  singleClient && singleClient.contactPersonList
                    ? singleClient.contactPersonList[0]?.designation
                    : ''
                }
                // {...register("contact_relation", { required: false })}
                onChange={handleInputChange}
              />
            </div>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Company Name'
                id='outlined-basic'
                name='companyName'
                variant='outlined'
                color='secondary'
                name='contact_company'
                value={
                  singleClient && singleClient.contactPersonList
                    ? singleClient.contactPersonList[0]?.company
                    : ''
                }
                // onKeyDown={associateEmergencyEmail}
                onChange={handleInputChange}
                // {...register("contact_companyName", { required: false })}
                // {...register('ephone', { required: true })}
                // error={errors.ephone}
                // helperText={
                //   errors.ephone?.type === 'required' &&
                //   'Emergency Contact Phone Number is required'
                // }
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Description'
                id='outlined-basic'
                name='description'
                variant='outlined'
                dense={true}
                color='secondary'
                name='contact_description'
                value={
                  singleClient && singleClient.contactPersonList
                    ? singleClient.contactPersonList[0]?.description
                    : ''
                }
                // {...register("contact_description", { required: false })}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className='flex  justify-between space-x-8'>
              <ul className='list-disc pl-5 w-full'>
                {emergencyPhoneList.map(contact => (
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
                {emergencyEmailList.map(contact => (
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
          </ThemeProvider>

          <div className='w-full flex justify-center items-center space-x-6'>
            {/* <button
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
              type='submit'
              // onClick={() => setCreateUser(false)}
              style={{ outline: 'none' }}
            >
              <img src={addNow} alt='' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvocateClientPageUpdateClient;
