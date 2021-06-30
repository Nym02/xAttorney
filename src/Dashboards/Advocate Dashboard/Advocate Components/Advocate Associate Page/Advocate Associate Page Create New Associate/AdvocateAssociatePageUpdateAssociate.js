import { InputLabel } from '@material-ui/core';
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
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useToasts } from 'react-toast-notifications';
import featureList from '../../../../../assets/images/featureListImg.svg';
import { DataContext } from '../../../../../Context Api/ManageData';
import { useLocation, useParams } from 'react-router';
import theme from '../../../../../theme';
import { AdvocateApiHelper } from '../../../../../Utils/AdvocateApiHelper';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import DashboardPageHading from '../../../../Dashboard Typographys/DashboardPageHading';

const AdvocateAssociatePageUpdateAssociate = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [associateEmergencyContact, setAssociateEmergencyContact] = useState({
    emergencyPhone: '',
    emergencyEmail: '',
  });
  const [emergencyPhoneList, setEmergencyPhoneList] = useState([]);
  const [emergencyEmailList, setEmergencyEmailList] = useState([]);
  const { division, setDivision } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { postOffice, setPostOffice } = useContext(DataContext);
  const { addToast } = useToasts();
  const { assiciateId } = useParams();

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
  const onSubmit = (data, e) => {
    // associate: 'ACTIVE';
    // city: '6096da4822ef6b5134ddae6e';
    // description: 'sdfsdf';
    // designation: 10;
    // district: '60a79204ea41b9184122646b';
    // email: 'naimulhaquesagar@gmail.com';
    // ename: 'dfg';
    // name: 'sdf';
    // password: 'nayeem161';
    // phone: '01949509823';
    // postOffice: '60a79994ea41b91841226474';
    // subDistrict: '60a792a2ea41b9184122646e';
    // username: 'nayeem161';

    let createAssociateData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      password: data.password,
      designation: data.designation,

      emergencyContactPerson: {
        name: data.ename,
        phoneList: emergencyPhoneList,
        emailList: emergencyEmailList,
        relation: data.erelation,
      },
      address: {
        streetAddress: data.address,
        postOffice: { id: data.postOffice },
        subDistrict: { id: data.subDistrict },
        district: { id: data.district },
        country: data.country,
      },
    };
    // createAsccociateData.designation = startColor;

    const newCreateAssociateData = JSON.stringify(createAssociateData);
    const finalCreateAssociateData = newCreateAssociateData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    // console.log('final', finalCreateAssociateData);

    const associateCreateQuery = gql`
      mutation {
        updateAssociateBasicInformation(
          associate: {
            id: "60ab8e1f22ef6b3de54e5dfe"
            name: "Test Test Associate"
            phone: "01997157535"
            email: "shihabhossain611@gmail.com"
            password: "Abc123"
            designation: ADVOCATE
          }
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
          }
        }
      }
    `;
    // console.log(associateCreateQuery);

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
        const { code, data, errors } = res?.data?.data?.createAssociate;

        if (code != 200) {
          addToast(errors[0].description, {
            appearance: 'error',
            autoDismiss: true,
          });
        } else if (code === 200) {
        }
      })

      // .then(() => window.location.replace('/dashboard/advocate/associates'))
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
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
              <TextField
                className='bg-lightSilver rounded text-white w-full my-2'
                label='Name'
                id='outlined-basic'
                name='name'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('name', { required: 'Name is required' })}
                error={errors.name}
                helperText={errors.name?.message}
              />

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
              </FormControl>
            </div>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone Number'
                id='outlined-basic'
                name='phone'
                variant='outlined'
                color='secondary'
                {...register('phone', {
                  required: true,
                  pattern: /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/,
                })}
                // onChange={handleInputChange}
                error={errors.phone}
                helperText={
                  errors.phone?.type === 'required'
                    ? 'Phone Number is required'
                    : errors.phone?.type === 'pattern' &&
                      'Enter a valid phone number'
                }
              />

              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Address'
                id='outlined-basic'
                name='address'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                {...register('address', {
                  required: true,
                })}
                error={errors.address}
                helperText={
                  errors.address?.type === 'required' && 'Address is required'
                }
              />
            </div>

            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                error={errors.city}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  City/Town
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('city', { required: true })}
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
              </FormControl>
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
                  {...register('district', { required: true })}
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
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
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
                  {...register('subDistrict', { required: true })}
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
                <FormHelperText>
                  {errors?.subDistrict?.type === 'required' &&
                    'Sub District is required'}
                </FormHelperText>
              </FormControl>
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
                  {...register('postOffice', { required: true })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {postOffice.map(postOffice => (
                    <MenuItem value={postOffice.id}>{postOffice.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors?.postOffice?.type === 'required' &&
                    'Post Office is required'}
                </FormHelperText>
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
                  <MenuItem value='ACTIVE'>ACTIVE</MenuItem>
                  <MenuItem value='INACTIVE'>INACTIVE</MenuItem>
                </Select>
                <FormHelperText>
                  {errors.associate?.type === 'required' &&
                    'Select your district'}
                </FormHelperText>
              </FormControl> */}

              <FormControl
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
              </FormControl>
            </div>

            <h6 className='font-bold'>Account Panel</h6>
            <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
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
                variant='outlined'
                color='secondary'
                onKeyDown={associateEmergencyPhone}
                onChange={handleInputChange}
                // {...register('ephone', { required: true })}
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
                onKeyDown={associateEmergencyEmail}
                onChange={handleInputChange}
                // {...register('ephone', { required: true })}
                // error={errors.ephone}
                // helperText={
                //   errors.ephone?.type === 'required' &&
                //   'Emergency Contact Phone Number is required'
                // }
              />
            </div>
            <div className='flex  justify-between space-x-8'>
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

export default AdvocateAssociatePageUpdateAssociate;
