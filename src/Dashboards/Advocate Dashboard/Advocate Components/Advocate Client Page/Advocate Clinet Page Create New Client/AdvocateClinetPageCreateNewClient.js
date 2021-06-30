import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { print } from 'graphql';
import gql, { resetCaches } from 'graphql-tag';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import addNow from '../../../../../assets/images/add-now.svg';
import { useToasts } from 'react-toast-notifications';
import featureList from '../../../../../assets/images/featureListImg.svg';
import { DataContext } from '../../../../../Context Api/ManageData';

import theme from '../../../../../theme';
import { AdvocateApiHelper } from '../../../../../Utils/AdvocateApiHelper';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import DashboardPageHading from '../../../../Dashboard Typographys/DashboardPageHading';
import { useHistory } from 'react-router';

const AdvocateClinetPageCreateNewClient = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [associateEmergencyContact, setAssociateEmergencyContact] = useState({
    emergencyPhone: '',
    emergencyEmail: '',
  });
  const history = useHistory();
  const [emergencyPhoneList, setEmergencyPhoneList] = useState([]);
  const [emergencyEmailList, setEmergencyEmailList] = useState([]);
  const { division, setDivision } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { postOffice, setPostOffice } = useContext(DataContext);
  const { client, setClient } = useContext(DataContext);
  const [districtById, setDistrictById] = useState([]);
  const [subDistrictById, setSubDistrictById] = useState([]);
  const [postOfficeById, setPostOfficeById] = useState([]);
  const { addToast } = useToasts();

  //handling multiple phone and email list
  const handleInputChange = e => {
    const newEmergencyContact = { ...associateEmergencyContact };
    newEmergencyContact[e.target.name] = e.target.value;
    setAssociateEmergencyContact(newEmergencyContact);
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

  const preventFormSubmit = e => {
    if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

  // ================================================================================
  // ---------------get district by division id--------------------------------------
  // ================================================================================

  const handleDivisionId = e => {
    getDistrictByDivisionId(e.target.value);
  };
  const getDistrictByDivisionId = divisionIdForDistrict => {
    const newDivisionIdForDistrict = JSON.stringify(divisionIdForDistrict);
    const finalDivisionIdForDistrict = newDivisionIdForDistrict.replace(
      /"([^"]+)":/g,
      '$1:'
    );
    const districtByIdQuery = gql`
      {
        getDistrictListByDivisionId(
          divisionId: ${finalDivisionIdForDistrict}
          size: 10000
          offset: 0
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
            districtList {
              id
              name
              division {
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
          query: print(districtByIdQuery),
        },
        {
          headers: {
            Authorization: '',
          },
        }
      )
      .then(res => {
        // console.log(res);
        setDistrictById(
          res?.data?.data?.getDistrictListByDivisionId?.data?.districtList
        );
      })
      .catch(err => console.log(err));
  };

  // ================================================================================
  // ---------------get district by division id--------------------------------------
  // ================================================================================

  // ================================================================================
  // ---------------get subdistrict by district id----------------------------------
  // ================================================================================

  const handleDistrictId = e => {
    getSubDistrictIdByDistrict(e.target.value);
  };
  const getSubDistrictIdByDistrict = districtIdForSubDistrict => {
    const newDistrictIdForSubDistrict = JSON.stringify(
      districtIdForSubDistrict
    );
    const finalDistrictIdForSubDistrict = newDistrictIdForSubDistrict.replace(
      /"([^"]+)":/g,
      '$1:'
    );
    const subDistrictByIdQuery = gql`
       {
         getSubDistrictListByDistrictId(
           districtId: ${finalDistrictIdForSubDistrict}
           size: 10000
           offset: 0
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
             subDistrictList {
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
          query: print(subDistrictByIdQuery),
        },
        {
          headers: {
            Authorization: '',
          },
        }
      )
      .then(res => {
        // console.log(res);
        setSubDistrictById(
          res?.data?.data?.getSubDistrictListByDistrictId?.data?.subDistrictList
        );
      })
      .catch(err => console.log(err));
  };

  // ================================================================================
  // ---------------get subdistrict by district id----------------------------------
  // ================================================================================
  // ================================================================================
  // ---------------get post office by subdistrict id-------------------------------
  // ================================================================================
  const handleSubDistrictId = e => {
    getPostOfficeBySubDistrictId(e.target.value);
  };
  const getPostOfficeBySubDistrictId = subDistrictIdForPostOffice => {
    const newPostOfficeBySubDistrictId = JSON.stringify(
      subDistrictIdForPostOffice
    );
    const finalPostOfficeBySubDistrictId = newPostOfficeBySubDistrictId.replace(
      /"([^"]+)":/g,
      '$1:'
    );
    const postOfficeQuery = gql`
      {
        getPostOfficeListBySubDistrictId(
          subDistrictId: ${finalPostOfficeBySubDistrictId}
          size: 10000
          offset: 0
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
            postOfficeList {
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
          query: print(postOfficeQuery),
        },
        {
          headers: {
            Authorization: '',
          },
        }
      )
      .then(res => {
        // console.log(res);
        setPostOfficeById(
          res?.data?.data?.getPostOfficeListBySubDistrictId?.data
            ?.postOfficeList
        );
      })
      .catch(err => console.log(err));
  };
  // ================================================================================
  // ---------------get post office by subdistrict id--------------------------------
  // ================================================================================

  const onSubmit = (data, e) => {
    const createClientData = {
      name: data.name,
      phoneList: data.phone,
      emailList: data.email,
      address: {
        streetAddress: data.address,
        postOffice: { id: data.postOffice },
        subDistrict: { id: data.subDistrict },
        district: { id: data.district },
        country: 'Bangladesh',
      },
      contactPersonList: [
        {
          name: data.contact_name,
          phoneList: [data.contact_phone],
          emailList: [data.contact_email],
          company: data.contact_companyName,
          designation: data.contact_relation,
          description: data.contact_description,
        },
      ],
    };

    const newCreateClient = JSON.stringify(createClientData);
    const finalCreateClientData = newCreateClient.replace(/"([^"]+)":/g, '$1:');

    const clientCreateQuery = gql`
      mutation {
        createClient(
          client: ${finalCreateClientData}
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
          query: print(clientCreateQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        // console.log('create client', res);
        const { createClient } = res?.data?.data;
        if (createClient !== null) {
          const { code, data, errors } = res?.data?.data?.createClient;

          if (code == 200) {
            AdvocateApiHelper.advClient
              .getClient()
              .then(res => {
                setClient(res?.data?.data?.getClientList?.data?.clientList);
              })
              .then(() => reset())
              .then(() => history.push('/dashboard/advocate/clients'))
              .then(() => {
                addToast('Advocate Client Added Successfully', {
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
        } else {
          addToast('Something went wrong!!!.', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })

      // .then(() => window.location.replace('/dashboard/advocate/clients'))
      .catch(err =>
        addToast('Something went wrong!!!. Please try again later.', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  return (
    <div>
      <DashboardPageHading title='Add A Client' />
      <div>
        <form
          className='w-full px-12 flex flex-col space-y-6 pb-8'
          onSubmit={handleSubmit(onSubmit)}
          onKeyPress={e => preventFormSubmit(e)}
        >
          <h6 className='font-bold'>Basic Information</h6>
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
                  {...register('name', { required: 'Name is required' })}
                  error={errors?.name}
                />
                <FormHelperText>{errors?.name?.message}</FormHelperText>
              </FormControl>

              {/* <FormControl
                className='w-full'
                variant='outlined'
                error={errors.designation}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Designation
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('designation', { required: true })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='ADVOCATE'>Advocate</MenuItem>
                </Select>
                <FormHelperText style={{ color: 'red !important' }}>
                  {errors.designation?.type === 'required' &&
                    'Designation is required'}
                </FormHelperText>
              </FormControl> */}

              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='email'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('email', {
                  required: false,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                error={errors.email}
                helperText={
                  errors.email?.type === 'required'
                    ? 'Email is required'
                    : errors?.email?.type === 'pattern' && 'Enter a valid email'
                }
              />
            </div>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl error={errors?.phone} className='w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Phone Number*'
                  id='outlined-basic'
                  name='phone'
                  variant='outlined'
                  inputProps={{ maxLength: 11 }}
                  style={{ width: '49%' }}
                  color='secondary'
                  {...register('phone', {
                    required: true,
                    pattern: /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/,
                  })}
                  // onChange={handleInputChange}
                  error={errors?.phone}
                />
                <FormHelperText>
                  {errors?.phone?.type === 'required'
                    ? 'Phone Number is required'
                    : errors?.phone?.type === 'pattern' &&
                      'Enter a valid phone number'}
                </FormHelperText>
              </FormControl>
            </div>
            <h6 className='font-bold'>Client's Address</h6>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              {/* <FormControl
                className='w-full'
                style={{ width: '49%' }}
                variant='outlined'
                error={errors.associate}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Associate Status
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='District'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('associate', { required: true })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='ACTIVE'>ACTIVE</MenuItem>
                  <MenuItem value='INACTIVE'>INACTIVE</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.associate?.type === 'required' &&
                    'Select your district'}
                </FormHelperText>
              </FormControl> */}

              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Address'
                id='outlined-basic'
                name='address'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('address', {
                  required: false,
                })}

                // error={errors.address}
                // helperText={
                //   errors.address?.type === 'required' && 'Address is required'
                // }
              />
              {/* <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.city}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Division
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('city', { required: false })}
                  onChange={handleDivisionId}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {division.map(division => (
                    <MenuItem value={division.id}>{division.name}</MenuItem>
                  ))}
                </Select>
                
              </FormControl> */}
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
                  {...register('district', { required: false })}
                  onChange={handleDistrictId}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {district.map(district => (
                    <MenuItem value={district.id}>{district.name}</MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors.district?.type === 'required' &&
                    'Select your district'}
                </FormHelperText> */}
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
                  color='secondary'
                  {...register('subDistrict', { required: false })}
                  onChange={handleSubDistrictId}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {subDistrictById.map(subDistrictById => (
                    <MenuItem value={subDistrictById.id}>
                      {subDistrictById.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors?.subDistrict?.type === 'required' &&
                    'Sub District is required'}
                </FormHelperText> */}
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
                  {...register('postOffice', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {postOfficeById.map(postOfficeById => (
                    <MenuItem value={postOfficeById.id}>
                      {postOfficeById.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors?.postOffice?.type === 'required' &&
                    'Post Office is required'}
                </FormHelperText> */}
              </FormControl>
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              {/* <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.country}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Country
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Country'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('country', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='Bangladesh'>Bangladesh</MenuItem>
                </Select>
                {/* <FormHelperText>
                  {errors.country?.type === 'required' &&
                    'Please select your Country'}
                </FormHelperText> *
              </FormControl> */}
            </div>

            {/* <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='email'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('email', {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
                error={errors.email}
                helperText={
                  errors.email?.type === 'required'
                    ? 'Email is required'
                    : errors?.email?.type === 'pattern' &&
                      'Please Enter a valid email address'
                }
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Password'
                id='outlined-basic'
                name='password'
                type='password'
                variant='outlined'
                color='secondary'
                {...register('password', { required: true, minLength: 6 })}
                error={errors.password}
                helperText={
                  errors.password?.type === 'required'
                    ? 'Password is required'
                    : errors.password?.type === 'minLength' &&
                      'Password should be at least 6 character long'
                }
              />
            </div> */}
            <h6 className='font-bold'>Contact Person</h6>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Name'
                id='outlined-basic'
                name='contact_name'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('contact_name', { required: false })}
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
                name='contact_phone'
                inputProps={{ maxlength: 11 }}
                variant='outlined'
                color='secondary'
                onKeyDown={associateEmergencyPhone}
                onChange={handleInputChange}
                {...register('contact_phone', { required: false })}
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
                // onKeyDown={associateEmergencyEmail}
                onChange={handleInputChange}
                {...register('contact_email', { required: false })}
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
                {...register('contact_relation', { required: false })}
                // onChange={handleInputChange}
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
                // onKeyDown={associateEmergencyEmail}
                onChange={handleInputChange}
                {...register('contact_companyName', { required: false })}
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
                {...register('contact_description', { required: false })}
                // onChange={handleInputChange}
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
            >
              <img src={addNow} alt='' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvocateClinetPageCreateNewClient;
