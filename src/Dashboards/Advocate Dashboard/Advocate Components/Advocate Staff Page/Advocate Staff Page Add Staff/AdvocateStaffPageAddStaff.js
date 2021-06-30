import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import theme from '../../../../../theme';
import addNow from '../../../../../assets/images/add-now.svg';
import DashboardPageHading from '../../../../Dashboard Typographys/DashboardPageHading';
import { useContext, useState } from 'react';
import { DataContext } from '../../../../../Context Api/ManageData';
import gql from 'graphql-tag';
import axios from 'axios';
import { MAIN_API } from '../../../../../Utils/APIs';
import { print } from 'graphql';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import { useToasts } from 'react-toast-notifications';
import { AdvocateApiHelper } from '../../../../../Utils/AdvocateApiHelper';
import { useHistory } from 'react-router';

const AdvocateStaffPageAddStaff = () => {
  const { division, setDivision } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { postOffice, setPostOffice } = useContext(DataContext);
  const { staff, setStaff } = useContext(DataContext);
  const [subDistrictById, setSubDistrictById] = useState([]);
  const [postOfficeById, setPostOfficeById] = useState([]);
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { addToast } = useToasts();

  const onSubmit = (data, e) => {
    // let emerphone = null;
    // if (data.ephone !== null) {
    //   emerphone = [data.ephone];
    // }
    // console.log(emerphone);
    // let emeremail = data.eemail;
    // if (emeremail === null) {
    //   emeremail = '';
    // } else {
    //   emeremail = data.eemail;
    // }
    // let ephone =
    // data.ephone == null || data.ephone === undefined ? null : data.ephone;
    const staffData = {
      name: data.name,
      designation: data.designation,
      phoneList: [data.phone],
      emailList: [data.email],
      bloodGroup: data.bloodGroup,
      education: data.education,
      address: {
        streetAddress: data?.address,
        postOffice: { id: data?.postOffice },
        subDistrict: { id: data?.subDistrict },
        district: { id: data?.district },
      },
      description: data.description,
      emergencyContactPerson: {
        name: data.ename,
        phoneList: [data.ephone],
        emailList: [data.eemail],
        relation: data.erelation,
      },
    };

    const newStaffData = JSON.stringify(staffData);
    const finalStaffData = newStaffData.replace(/"([^"]+)":/g, '$1:');

    const createStaffQuery = gql`
      mutation {
        createStaff(
          staff: ${finalStaffData}
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
            designation
            phoneList
            emailList
            bloodGroup
            education
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
            description
            emergencyContactPerson {
              name
              phoneList
              emailList
              relation
            }
            staffStatus
            createdTime
          }
        }
      }
    `;

    // console.log(createStaffQuery);

    //sending data to the database
    axios
      .post(
        MAIN_API,
        {
          query: print(createStaffQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { createStaff } = res?.data?.data;
        if (createStaff !== null) {
          const { code, data, errors } = res?.data?.data?.createStaff;

          if (code === 200) {
            AdvocateApiHelper.advStaff
              .getStaff()
              .then(res => {
                setStaff(res?.data?.data?.getStaffList?.data?.staffList);
              })
              .then(() => reset())
              .then(() => history.push('/dashboard/advocate/staff'))
              .then(() => {
                addToast('Staff has been created succesfully.', {
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
          addToast('Something went wrong!!!. Please try again later', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      // .then(() => window.location.replace('/dashboard/advocate/staff'))
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  //==================================================================================
  //==================================================================================

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
  //==================================================================================
  //==================================================================================

  return (
    <div>
      <DashboardPageHading title='Add Staff' />
      <div>
        <form
          className='w-full px-12 flex flex-col space-y-6 pb-8'
          onSubmit={handleSubmit(onSubmit)}
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

              <FormControl error={errors?.designation} className='w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full my-2'
                  label='Designation*'
                  id='outlined-basic'
                  name='designation'
                  variant='outlined'
                  color='secondary'
                  // onChange={handleInputChange}
                  {...register('designation', {
                    required: 'Designation is required',
                  })}
                  error={errors?.designation}
                />
                <FormHelperText>{errors?.designation?.message}</FormHelperText>
              </FormControl>
            </div>
            <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl error={errors?.phone} className='w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Phone Number*'
                  id='outlined-basic'
                  name='phone'
                  inputProps={{ maxLength: 11 }}
                  variant='outlined'
                  color='secondary'
                  {...register('phone', { required: true, minLength: 11 })}
                  // onChange={handleInputChange}
                  error={errors?.phone}
                />
                <FormHelperText>
                  {errors?.phone?.type === 'required'
                    ? 'Phone Number is required'
                    : errors?.phone?.type === 'minLength' && 'At least 11'}
                </FormHelperText>
              </FormControl>

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

            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                error={errors.bloodGroup}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Blood Group
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('bloodGroup', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='A_POSITIVE'>A+</MenuItem>
                  <MenuItem value='A_NEGATIVE'>A-</MenuItem>
                  <MenuItem value='B_POSITIVE'>B+</MenuItem>
                  <MenuItem value='B_NEGATIVE'>B-</MenuItem>
                  <MenuItem value='AB_POSITIVE'>AB+</MenuItem>
                  <MenuItem value='AB_NEGATIVE'>AB-</MenuItem>
                  <MenuItem value='O_POSITIVE'>O+</MenuItem>
                  <MenuItem value='O_NEGATIVE'>O-</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.bloodGroup?.type === 'required' &&
                    'Select Your Blood Group'}
                </FormHelperText>
              </FormControl>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Education'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('education', { required: false })}
                error={errors.education}
                helperText={
                  errors.education?.type === 'required' &&
                  'Education is required'
                }
              />
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Address'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('address', { required: false })}
                error={errors.address}
                helperText={
                  errors.address?.type === 'required' && 'Address is required'
                }
              />
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
                  label='Division'
                  id='demo-simple-select-outlined'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('city', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {division?.map(div => (
                    <MenuItem value={div?.id}>{div?.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.city?.type === 'required' && 'Select your city'}
                </FormHelperText>
              </FormControl> */}
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
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
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('district', { required: false })}
                  onChange={handleDistrictId}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {district?.map(dis => (
                    <MenuItem value={dis?.id}>{dis?.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.district?.type === 'required' &&
                    'Please select your district'}
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
                  label='Sub District'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('subDistrict', { required: false })}
                  onChange={handleSubDistrictId}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {subDistrictById?.map(subDistrictById => (
                    <MenuItem value={subDistrictById?.id}>
                      {subDistrictById?.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.subDistrict?.type === 'required' &&
                    'Please select your Sub District'}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                error={errors.postOffice}
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
                  {postOfficeById?.map(postOfficeById => (
                    <MenuItem value={postOfficeById?.id}>
                      {postOfficeById?.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.postOffice?.type === 'required' &&
                    'Please select your Post Office'}
                </FormHelperText>
              </FormControl>
              {/* <FormControl
                className='w-full'
                variant='outlined'
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
                  {...register('country', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='Bangladesh'>Bangladesh</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.country?.type === 'required' &&
                    'Please select your Country'}
                </FormHelperText>
              </FormControl> */}
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
                  {...register('associate', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Bangladesh</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.associate?.type === 'required' &&
                    'Select your district'}
                </FormHelperText>
              </FormControl> */}
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Description'
                id='outlined-basic'
                name='description'
                variant='outlined'
                color='secondary'
                multiline
                rows='4'
                style={{ width: '49%' }}
                {...register('description', { required: false })}
                error={errors.description}
                helperText={
                  errors.description?.type === 'required' &&
                  'Description is required'
                }
                // onChange={handleInputChange}
              />
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
                // error={errors.ename}
                // helperText={
                //   errors.ename?.type === 'required' &&
                //   'Emergency Contact Name is required'
                // }
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone No'
                id='outlined-basic'
                inputProps={{ maxLength: 11 }}
                name='tel'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('ephone', { required: false })}
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
                label='Relation'
                id='outlined-basic'
                name='relation'
                variant='outlined'
                dense={true}
                color='secondary'
                // onChange={handleInputChange}
                {...register('erelation', { required: false })}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='tel'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('eemail', { required: false })}
                // error={errors.ephone}
                // helperText={
                //   errors.ephone?.type === 'required' &&
                //   'Emergency Contact Phone Number is required'
                // }
              />
            </div>
          </ThemeProvider>

          <div className='w-full flex justify-center items-center space-x-6'>
            <button
              type='reset'
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
    </div>
  );
};

export default AdvocateStaffPageAddStaff;
