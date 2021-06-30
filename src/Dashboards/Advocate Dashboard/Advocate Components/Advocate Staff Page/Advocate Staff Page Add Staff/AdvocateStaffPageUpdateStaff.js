import { InputLabel } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import { useForm } from 'react-hook-form';
import theme from '../../../../../theme';
import addNow from '../../../../../assets/images/update-button-large.svg';
import DashboardPageHading from '../../../../Dashboard Typographys/DashboardPageHading';
import { useCallback, useContext, useState } from 'react';
import { DataContext } from '../../../../../Context Api/ManageData';
import gql from 'graphql-tag';
import axios from 'axios';
import { MAIN_API } from '../../../../../Utils/APIs';
import { print } from 'graphql';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import { useToasts } from 'react-toast-notifications';
import { useHistory, useParams } from 'react-router';
import { AdvocateApiHelper } from '../../../../../Utils/AdvocateApiHelper';
import { useEffect } from 'react';

const AdvocateStaffPageUpdateStaff = () => {
  const { division, setDivision } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { postOffice, setPostOffice } = useContext(DataContext);
  const { staff, setStaff } = useContext(DataContext);
  const [singleStaff, setSingleStaff] = useState([]);
  const [subDistrictById, setSubDistrictById] = useState([]);
  const [postOfficeById, setPostOfficeById] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const { addToast } = useToasts();
  const { staffId } = useParams();

  const getStaffById = useCallback(
    staffUpdateId => {
      const newStaffId = JSON.stringify(staffUpdateId);
      const finalStaffId = newStaffId.replace(/"([^"]+)":/g, '$1:');
      const getStaffQuery = gql`
      {
        getStaffById(staffId: ${finalStaffId}) {
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
      axios
        .post(
          MAIN_API,
          {
            query: print(getStaffQuery),
          },
          {
            headers: {
              Authorization: `Bearer ${finalNewLoginToken}`,
            },
          }
        )
        .then(res => {
          setSingleStaff(res?.data?.data?.getStaffById?.data);
        })
        // .then(() => window.location.replace('/dashboard/advocate/staff'))
        .catch(err =>
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          })
        );
    },
    [addToast]
  );

  useEffect(() => {
    if (staffId) getStaffById(staffId);
  }, [staffId, getStaffById]);

  const handleInputChange = e => {
    if (e.target.name === 'phoneList') {
      setSingleStaff({
        ...singleStaff,
        phoneList: [e.target.value],
      });
    } else if (e.target.name === 'emailList') {
      setSingleStaff({
        ...singleStaff,
        emailList: [e.target.value],
      });
    } else if (e.target.name === 'bloodGroup') {
      setSingleStaff({
        ...singleStaff,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === 'streetAddress') {
      setSingleStaff({
        ...singleStaff,
        address: {
          ...singleStaff.address,
          [e.target.name]: e.target.value,
        },
      });
    } else if (e.target.name === 'district') {
      setSingleStaff({
        ...singleStaff,
        address: {
          ...singleStaff.address,
          [e.target.name]: { id: e.target.value },
        },
      });
    } else if (e.target.name === 'subDistrict') {
      setSingleStaff({
        ...singleStaff,
        address: {
          ...singleStaff.address,
          [e.target.name]: { id: e.target.value },
        },
      });
    } else if (e.target.name === 'postOffice') {
      setSingleStaff({
        ...singleStaff,
        address: {
          ...singleStaff.address,
          [e.target.name]: { id: e.target.value },
        },
      });
    } else if (e.target.name === 'contact_name') {
      setSingleStaff({
        ...singleStaff,
        emergencyContactPerson: {
          ...singleStaff.emergencyContactPerson,
          name: e.target.value,
        },
      });
    } else if (e.target.name === 'contact_relation') {
      setSingleStaff({
        ...singleStaff,
        emergencyContactPerson: {
          ...singleStaff.emergencyContactPerson,
          relation: e.target.value,
        },
      });
    } else if (e.target.name === 'contact_email') {
      setSingleStaff({
        ...singleStaff,
        emergencyContactPerson: {
          ...singleStaff.emergencyContactPerson,
          emailList: [e.target.value],
        },
      });
    } else if (e.target.name === 'contact_phone') {
      setSingleStaff({
        ...singleStaff,
        emergencyContactPerson: {
          ...singleStaff.emergencyContactPerson,
          phoneList: [e.target.value],
        },
      });
    } else {
      setSingleStaff({
        ...singleStaff,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleStaffUpdate = e => {
    e.preventDefault();
    const staffData = {
      id: staffId,
      name: singleStaff?.name,
      designation: singleStaff?.designation,
      phoneList: [singleStaff?.phoneList[0]],
      emailList: [singleStaff?.emailList[0]],
      bloodGroup: singleStaff?.bloodGroup,
      education: singleStaff?.education,
      address: {
        streetAddress: singleStaff?.address?.streetAddress,
        postOffice: { id: singleStaff?.address?.postOffice?.id },
        subDistrict: { id: singleStaff?.address?.subDistrict?.id },
        district: { id: singleStaff?.address?.district?.id },
      },
      description: singleStaff?.description,
      emergencyContactPerson: {
        name: singleStaff?.emergencyContactPerson?.name,
        phoneList: [singleStaff?.emergencyContactPerson?.phoneList[0]],
        emailList: [singleStaff?.emergencyContactPerson?.emailList[0]],
        relation: singleStaff?.emergencyContactPerson?.relation,
      },
    };

    const newStaffData = JSON.stringify(staffData);
    const finalStaffData = newStaffData.replace(/"([^"]+)":/g, '$1:');

    const updateStaffQuery = gql`
      mutation {
        updateStaff(staff: ${finalStaffData}) {
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

    //sending data to the database
    axios
      .post(
        MAIN_API,
        {
          query: print(updateStaffQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateStaff } = res?.data?.data;
        if (updateStaff !== null) {
          const { code, data, errors } = res?.data?.data?.updateStaff;

          if (code === 200) {
            AdvocateApiHelper.advStaff
              .getStaff()
              .then(res => {
                setStaff(res?.data?.data?.getStaffList?.data?.staffList);
              })

              .then(() => history.push('/dashboard/advocate/staff'))
              .then(() => {
                addToast('Staff has been updated succesfully.', {
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

  useEffect(() => {
    if (district.length > 0 && singleStaff) {
      setLoading(false);
    }
    if (subDistrict.length > 0 && singleStaff) {
      setLoading(false);
    }
    if (postOffice.length > 0 && singleStaff) {
      setLoading(false);
    }
  }, [district, subDistrict, postOffice, singleStaff]);

  if (loading) {
    return <div>Please wait</div>;
  }

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
      <DashboardPageHading title='Update Staff' />
      <div>
        <form
          className='w-full px-12 flex flex-col space-y-6 pb-8'
          // onSubmit={handleSubmit(onSubmit)}
          onSubmit={handleStaffUpdate}
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
                value={singleStaff?.name}
                onChange={handleInputChange}
                // {...register('name', { required: 'Name is required' })}
                // error={errors.name}
                // helperText={errors.name?.message}
              />

              <TextField
                className='bg-lightSilver rounded text-white w-full my-2'
                label='Designation'
                id='outlined-basic'
                name='designation'
                variant='outlined'
                color='secondary'
                value={singleStaff.designation}
                onChange={handleInputChange}
                // {...register('designation', {
                //   required: 'Designation is required',
                // })}
                // error={errors.designation}
                // helperText={errors.designation?.message}
              />
            </div>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone Number'
                id='outlined-basic'
                name='phoneList'
                variant='outlined'
                color='secondary'
                inputProps={{ maxLength: 11 }}
                value={
                  singleStaff && singleStaff.phoneList
                    ? singleStaff.phoneList[0]
                    : ''
                }
                onChange={handleInputChange}
                // {...register('phone', { required: true, minLength: 4 })}
                // // onChange={handleInputChange}
                // error={errors.phone}
                // helperText={
                //   errors.phone?.type === 'required'
                //     ? 'Phone Number is required'
                //     : errors.phone?.type === 'minLength' && 'At least 4'
                // }
              />

              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='emailList'
                variant='outlined'
                color='secondary'
                value={
                  singleStaff && singleStaff.emailList
                    ? singleStaff.emailList[0]
                    : ''
                }
                onChange={handleInputChange}
                // {...register('email', {
                //   required: true,
                //   pattern:
                //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                // })}
                // error={errors.email}
                // helperText={
                //   errors.email?.type === 'required'
                //     ? 'Email is required'
                //     : errors?.email?.type === 'pattern' && 'Enter a valid email'
                // }
              />
            </div>

            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl className='w-full' variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>
                  Blood Group
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Blood Group'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  name='bloodGroup'
                  value={singleStaff?.bloodGroup}
                  onChange={handleInputChange}
                  // {...register('bloodGroup', { required: true })}
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
              </FormControl>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Education'
                id='outlined-basic'
                name='education'
                variant='outlined'
                color='secondary'
                onChange={handleInputChange}
                value={singleStaff?.education}
                // {...register('education', { required: true })}
                // error={errors.education}
                // helperText={
                //   errors.education?.type === 'required' &&
                //   'Education is required'
                // }
              />
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Address'
                id='outlined-basic'
                name='streetAddress'
                variant='outlined'
                color='secondary'
                value={
                  singleStaff && singleStaff.address
                    ? singleStaff?.address?.streetAddress
                    : ''
                }
                onChange={handleInputChange}
                // {...register('address', { required: true })}
                // error={errors.address}
                // helperText={
                //   errors.address?.type === 'required' && 'Address is required'
                // }
              />
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl className='w-full' variant='outlined'>
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
                  value={singleStaff?.address?.district?.id}
                  onChange={handleInputChange}
                  // {...register('district', { required: true })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {district.map(dis => (
                    <MenuItem value={dis.id}>{dis.name}</MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors.district?.type === 'required' &&
                    'Please select your district'}
                </FormHelperText> */}
              </FormControl>
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
                  label='Sub District'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  name='subDistrict'
                  value={singleStaff?.address?.subDistrict?.id}
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
                {/* <FormHelperText>
                  {errors.subDistrict?.type === 'required' &&
                    'Please select your Sub District'}
                </FormHelperText> */}
              </FormControl>
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.postOffice}
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
                  name='postOffice'
                  value={singleStaff?.address?.postOffice?.id}
                  onChange={handleInputChange}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {postOffice.map(postOffice => (
                    <MenuItem value={postOffice.id}>{postOffice.name}</MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors.postOffice?.type === 'required' &&
                    'Please select your Post Office'}
                </FormHelperText> */}
              </FormControl>
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
                // {...register('description', { required: true })}
                // error={errors.description}
                // helperText={
                //   errors.description?.type === 'required' &&
                //   'Description is required'
                // }
                value={singleStaff.description}
                onChange={handleInputChange}
              />
            </div>

            <h6 className='font-bold'>Emergency Contact Person</h6>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Name'
                id='outlined-basic'
                name='contact_name'
                variant='outlined'
                color='secondary'
                value={
                  singleStaff && singleStaff.emergencyContactPerson
                    ? singleStaff.emergencyContactPerson?.name
                    : ''
                }
                onChange={handleInputChange}

                // {...register('ename', { required: false })}
                // error={errors.ename}
                // helperText={
                //   errors.ename?.type === 'required' &&
                //   'Emergency Contact Name is required'
                // }
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone No'
                inputProps={{ maxLength: 11 }}
                id='outlined-basic'
                variant='outlined'
                color='secondary'
                name='contact_phone'
                inputProps={{ maxLength: 11 }}
                value={
                  singleStaff && singleStaff.emergencyContactPerson
                    ? singleStaff?.emergencyContactPerson?.phoneList &&
                      singleStaff?.emergencyContactPerson?.phoneList[0]
                    : ''
                }
                onChange={handleInputChange}
                // {...register('ephone', { required: false })}
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
                name='contact_relation'
                variant='outlined'
                dense={true}
                color='secondary'
                value={
                  singleStaff && singleStaff?.emergencyContactPerson
                    ? singleStaff?.emergencyContactPerson?.relation
                    : ''
                }
                onChange={handleInputChange}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Email'
                id='outlined-basic'
                name='contact_email'
                variant='outlined'
                color='secondary'
                value={
                  singleStaff && singleStaff.emergencyContactPerson
                    ? singleStaff?.emergencyContactPerson?.emailList &&
                      singleStaff?.emergencyContactPerson?.emailList[0]
                    : ''
                }
                onChange={handleInputChange}
              />
            </div>
          </ThemeProvider>

          <div className='w-full flex justify-center items-center space-x-6'>
            {/* <button
              type='reset'
              style={{ outline: 'none' }}
              className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
            >
              Reset
            </button> */}

            <button style={{ outline: 'none' }} type='submit'>
              <img src={addNow} alt='' />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdvocateStaffPageUpdateStaff;
