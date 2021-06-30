import { InputLabel, Modal } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import addNow from '../../../../../assets/images/add-now.svg';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import featureList from '../../../../../assets/images/featureListImg.svg';
import { DataContext } from '../../../../../Context Api/ManageData';

import theme from '../../../../../theme';
import { AdvocateApiHelper } from '../../../../../Utils/AdvocateApiHelper';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import DashboardPageHading from '../../../../Dashboard Typographys/DashboardPageHading';
import { useHistory } from 'react-router';
import Loaders from '../../../../../components/Typographys/Loaders/Loaders';

const AdvocateAssociatePageCreateNewAssociate = () => {
  const [loadingModal, setLoadingModal] = useState(false);

  const history = useHistory();
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
  const [emergencyPhoneList, setEmergencyPhoneList] = useState([]);
  const [emergencyEmailList, setEmergencyEmailList] = useState([]);
  const { division, setDivision } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { advocateAssociate, setAdvocateAssociate } = useContext(DataContext);
  const [districtById, setDistrictById] = useState([]);
  const [subDistrictById, setSubDistrictById] = useState([]);
  const [postOfficeById, setPostOfficeById] = useState([]);
  const { addToast } = useToasts();

  //getting advocate token
  // const loginToken = localStorage.getItem('loginInfo');
  // const newLoginToken = JSON.parse(loginToken);
  // const finalNewLoginToken = newLoginToken.loginToken;

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

  // console.log(emergencyPhoneList);
  // console.log(emergencyEmailList);

  //prevent form submit on enter

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
    const designation = data.designation ? data.designation : null;
    setLoadingModal(true);
    let createAssociateData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      designation: designation,

      emergencyContactPerson: {
        name: data.ename,
        phoneList: data.ephone,
        emailList: data.eemail,
        relation: data.erelation,
      },
      address: {
        streetAddress: data.address,
        postOffice: { id: data.postOffice },
        subDistrict: { id: data.subDistrict },
        district: { id: data.district },
        country: 'Bangladesh',
      },
    };

    const newCreateAssociateData = JSON.stringify(createAssociateData);
    const finalCreateAssociateData = newCreateAssociateData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const associateCreateQuery = gql`
      mutation {
        createAssociate(
          associate: ${finalCreateAssociateData}
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
            phone
            email
            designation
            address {
              streetAddress
              postOffice {
                id
                name
                postCode
              }
              subDistrict {
                id
                name
              }
              district {
                id
                name
              }
              country
            }
            emergencyContactPerson {
              name
              phoneList
              emailList
              relation
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
          query: print(associateCreateQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        setLoadingModal(false);
        const { code, data, errors } = res?.data?.data?.createAssociate;
        if (code != 200) {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
        } else if (code === 200) {
          AdvocateApiHelper.advAssociate
            .getAdvAssociate()
            .then(res => {
              setAdvocateAssociate(
                res?.data?.data?.getAssociateList?.data?.associateList
              );
            })
            .then(() => history.push('/dashboard/advocate/associates'))
            .then(() => {
              addToast('Associate Created Successfully', {
                appearance: 'success',
                autoDismiss: true,
              });
            });
        }
      })

      .catch(
        err =>
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          }),
        setLoadingModal(false)
      );
  };

  const loadingModalView = <Loaders />;

  return (
    <div>
      <DashboardPageHading title='Add Associates' />
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

              <FormControl
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
                  {...register('designation', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='ADVOCATE'>Advocate</MenuItem>
                  <MenuItem value='BARRISTER'>Barrister</MenuItem>
                  <MenuItem value='LAWYER'>Lawyer</MenuItem>
                </Select>
                <FormHelperText style={{ color: 'red !important' }}>
                  {errors.designation?.type === 'required' &&
                    'Designation is required'}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl error={errors?.phone} className='w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Phone Number*'
                  id='outlined-basic'
                  name='phone'
                  variant='outlined'
                  inputProps={{ maxlength: 11 }}
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
                    : errors.phone?.type === 'pattern' &&
                      'Enter a valid phone number'}
                </FormHelperText>
              </FormControl>

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
                error={errors.address}
                helperText={
                  errors.address?.type === 'required' && 'Address is required'
                }
              />
            </div>

            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              {/* <FormControl
                className='w-full'
                variant='outlined'
                error={errors.city}
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
                <FormHelperText>
                  {errors.city?.type === 'required' && 'Select your city'}
                </FormHelperText>
              </FormControl> */}
              <FormControl
                className='w-full'
                variant='outlined'
                error={errors.district}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  District
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='District'
                  name='district'
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
                <FormHelperText>
                  {errors.district?.type === 'required' &&
                    'Select your district'}
                </FormHelperText>
              </FormControl>
              <FormControl
                className='w-full'
                variant='outlined'
                error={errors.subDistrict}
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
                <FormHelperText>
                  {errors?.subDistrict?.type === 'required' &&
                    'Sub District is required'}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                error={errors?.postOffice}
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
                <FormHelperText>
                  {errors?.postOffice?.type === 'required' &&
                    'Post Office is required'}
                </FormHelperText>
              </FormControl>
              <div className='w-full lg:flex hidden lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'></div>
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              {/* <FormControl
                className='w-full'
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

              {/* <FormControl
                className='w-full'
                variant='outlined'
                style={{ width: '49%' }}
                error={errors.country}
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
                  {...register('country', { required: true })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='Bangladesh'>Bangladesh</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.country?.type === 'required' && 'Select your country'}
                </FormHelperText>
              </FormControl> */}
            </div>

            <h6 className='font-bold'>Account Panel</h6>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl error={errors?.email} className='w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Email*'
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
                  error={errors?.email}
                />
                <FormHelperText>
                  {errors?.email?.type === 'required'
                    ? 'Email is required'
                    : errors?.email?.type === 'pattern' &&
                      'Please Enter a valid email address'}
                </FormHelperText>
              </FormControl>

              <FormControl error={errors?.password} className='w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Password*'
                  id='outlined-basic'
                  name='password'
                  type='password'
                  variant='outlined'
                  color='secondary'
                  {...register('password', { required: true, minLength: 6 })}
                  error={errors?.password}
                />
                <FormHelperText>
                  {errors.password?.type === 'required'
                    ? 'Password is required'
                    : errors.password?.type === 'minLength' &&
                      'Password should be at least 6 character long'}
                </FormHelperText>
              </FormControl>
            </div>
            <h6 className='font-bold'>Emergency Contact Person</h6>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Name'
                id='outlined-basic'
                name='ename'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('ename', { required: false })}
                error={errors.ename}
                // helperText={
                //   errors.ename?.type === 'required' &&
                //   'Emergency Contact Name is required'
                // }
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Relation'
                id='outlined-basic'
                name='relation'
                variant='outlined'
                dense={true}
                color='secondary'
                {...register('erelation', { required: false })}
                // onChange={handleInputChange}
              />
            </div>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone'
                id='outlined-basic'
                name='emergencyPhone'
                inputProps={{ maxlength: 11 }}
                variant='outlined'
                color='secondary'
                // onKeyDown={associateEmergencyPhone}
                // onChange={handleInputChange}
                {...register('ephone', { required: false })}
                // error={errors.ephone}
                // helperText={
                //   errors.ephone?.type === 'required' &&
                //   'Emergency Contact Phone Number is required'
                // }
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='emergencyEmail'
                variant='outlined'
                color='secondary'
                // onKeyDown={associateEmergencyEmail}
                // onChange={handleInputChange}
                {...register('eemail', { required: false })}
                // error={errors.ephone}
                // helperText={
                //   errors.ephone?.type === 'required' &&
                //   'Emergency Contact Phone Number is required'
                // }
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
              onClick={() => window.location.reload()}
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
      <Modal
        open={loadingModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {loadingModalView}
      </Modal>
    </div>
  );
};

export default AdvocateAssociatePageCreateNewAssociate;
