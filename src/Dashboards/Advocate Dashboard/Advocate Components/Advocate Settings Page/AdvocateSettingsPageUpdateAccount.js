import {
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import theme from '../../../../theme';
import { DropzoneArea } from 'material-ui-dropzone';
import { DataContext } from '../../../../Context Api/ManageData';
import { FormHelperText } from '@material-ui/core';
import gql from 'graphql-tag';
import { DateRangeTwoTone } from '@material-ui/icons';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { MAIN_API } from '../../../../Utils/APIs';
import { print } from 'graphql';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import { useEffect } from 'react';
import updateButton from '../../../../assets/images/update-button-large.svg';

const AdvocateSettingsPageUpdateAccount = () => {
  const { district, setDistrict } = useContext(DataContext);
  const { subDistrict, setSubDistrict } = useContext(DataContext);
  const { postOffice, setPostOffice } = useContext(DataContext);
  const { barCouncil, setBarCouncil } = useContext(DataContext);
  const { serviceArea, setServiceArea } = useContext(DataContext);
  const { specialities, setSpecialities } = useContext(DataContext);
  const { affiliation, setAffiliation } = useContext(DataContext);

  const { dashboardSummary, setDashboardSummary } = useContext(DataContext);
  const [user, setUser] = useState([]);
  const { addToast } = useToasts();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = e => {
    // e.preventDefault();
    // console.log('update account info', data);

    const legalAid = user?.legalAidServices === 'true' ? true : false;
    const proBono = user?.proBonoServices === 'true' ? true : false;
    // const barCouncilId =
    //   user?.membershipList && user?.membershipList[0]
    //     ? user?.membershipList[0]?.barCouncil?.id
    //     : null;
    // const memberId =
    //   user && user?.membershipList
    //     ? user?.membershipList[0] && user?.membershipList[0]?.memberId
    //     : '';

    // const membershipList =
    //   user && user?.membershipList
    //     ? user?.membershipList[0] &&
    //       user?.membershipList[0]?.barCouncil &&
    //       user?.membershipList[0]?.barCouncil &&
    //       user?.membershipList[0]?.memberId && [
    //         {
    //           barCouncil: {
    //             id: user?.membershipList[0]?.barCouncil?.id,
    //           },
    //           memberId: user?.membershipList[0]?.memberId,
    //         },
    //       ]
    //     : user?.membershipList[0] && !user?.membershipList[0]?.memberId
    //     ? [
    //         {
    //           barCouncil: {
    //             id: user?.membershipList[0]?.barCouncil?.id,
    //           },
    //           memberId: null,
    //         },
    //       ]
    //     : null;

    // const serviceArea =
    //   user && user?.serviceAreaList
    //     ? user?.serviceAreaList[0] && [{ id: user?.serviceAreaList[0]?.id }]
    //     : null;
    // const specialities =
    //   user && user?.specialitiesList
    //     ? user?.specialitiesList[0] && [{ id: user?.specialitiesList[0]?.id }]
    //     : null;
    // const affiliation =
    //   user && user?.affiliationsList
    //     ? user?.affiliationsList[0] && [{ id: user?.affiliationsList[0]?.id }]
    //     : null;

    // const branchList = user && user?.branchList ? [user?.branchList[0]] : null;

    let updateAccountData = {};

    // if (
    //   user?.membershipList === null &&
    //   user?.serviceAreaList === null &&
    //   user?.specialitiesList === null &&
    //   user?.affiliationsList === null &&
    //   user?.branchList === null
    // ) {
    //   updateAccountData = {
    //     picture: 'not available',
    //     phone: user?.phone,
    //     fax: user?.fax,
    //     website: user?.website,
    //     address: {
    //       streetAddress: user?.address?.streetAddress,
    //       postOffice: { id: user?.address?.postOffice?.id },
    //       subDistrict: { id: user?.address?.subDistrict?.id },
    //       district: { id: user?.address?.district?.id },
    //       country: 'Bangladesh',
    //     },
    //     designation: user?.designation,
    //     chamberName: user?.chamberName,
    //     membershipList: [
    //       {
    //         barCouncil: {
    //           id: data?.memberOf,
    //         },
    //         memberId: data?.memberId,
    //       },
    //     ],
    //     serviceAreaList: {
    //       id: data?.serviceArea,
    //     },
    //     specialitiesList: {
    //       id: data?.specialities,
    //     },
    //     affiliationsList: {
    //       id: data?.affiliations,
    //     },
    //     branchList: ['dhaka'],
    //     legalAidServices: legalAid,
    //     proBonoServices: proBono,
    //   };
    // } else {
    //   updateAccountData = {
    //     picture: 'not available',
    //     phone: user?.phone,
    //     fax: user?.fax,
    //     website: user?.website,
    //     address: {
    //       streetAddress: user?.address?.streetAddress,
    //       postOffice: { id: user?.address?.postOffice?.id },
    //       subDistrict: { id: user?.address?.subDistrict?.id },
    //       district: { id: user?.address?.district?.id },
    //       country: 'Bangladesh',
    //     },
    //     designation: user?.designation,
    //     chamberName: user?.chamberName,
    //     membershipList: [
    //       {
    //         barCouncil: {
    //           id: user?.membershipList[0]?.barCouncil?.id,
    //         },
    //         memberId: user?.membershipList[0]?.memberId,
    //       },
    //     ],
    //     serviceAreaList: serviceArea,
    //     specialitiesList: specialities,
    //     affiliationsList: affiliation,
    //     branchList: [user?.branchList[0]],
    //     legalAidServices: legalAid,
    //     proBonoServices: proBono,
    //   };
    // }

    const newUpdateAccountData = JSON.stringify(user);
    const finalUpdateAccountData = newUpdateAccountData.replace(
      /"([^"]+)":/g,
      '$1:'
    );
    // finalUpdateAccountData.proBonoServices = true;
    // finalUpdateAccountData.legalAidServices = true;

    const updateAccountQuery = gql`
      mutation {
        updateAdvocateContactAndOthersInformation(
          advocate: ${finalUpdateAccountData}
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
            chamberName
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
            bloodGroup
            picture
            phoneVerified
            phoneVerifiedTime
            emailVerified
            emailVerifiedTime
            phoneList {
              number
              verified
              verifiedOn
            }
            emailList {
              address
              verified
              verifiedOn
            }
            fax
            website
            membershipList {
              barCouncil {
                id
                name
              }
              memberId
            }
            serviceAreaList {
              id
              name
            }
            specialitiesList {
              id
              name
            }
            affiliationsList {
              id
              name
            }
            branchList
            legalAidServices
            proBonoServices
            pushNotification
            sendAutoSmsToClient
            sendAutoEmailToClient
            newsletterSubscription
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(updateAccountQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateAdvocateContactAndOthersInformation } = res?.data?.data;
        if (updateAdvocateContactAndOthersInformation !== null) {
          const { code, data, errors } =
            res?.data?.data.updateAdvocateContactAndOthersInformation;

          if (code === 200 && data !== null) {
            const { id } =
              res?.data?.data?.updateAdvocateContactAndOthersInformation?.data;

            addToast(`Account Updated Successfully.`, {
              appearance: 'success',
              autoDismiss: true,
            });
          } else if (code !== 200 && data === null) {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
        } else {
          addToast('Something went wrong!!', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      .then(() => {})
      // .then(() => window.location.reload())
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  const [data, setData] = useState({
    website: '',
    chamberName: '',
    memberOf: '',
    memberId: '',
    fax: '',
    designation: '',
    serviceArea: '',
    specialities: '',
    affiliations: '',
    branchList: '',
    legalAidServices: false,
    proBonoServices: false,
  });
  useEffect(() => {
    setUser(dashboardSummary?.advocate);
  }, [dashboardSummary]);

  const handleInputChange = e => {
    if (e.target.name === 'phoneList') {
      setUser({
        ...user,
        phoneList: [e.target.value],
      });
    } else if (e.target.name === 'postOffice') {
      setUser({
        ...user,

        address: {
          ...user?.address,
          [e.target.name]: { id: e.target.value },
        },
        // ...user?.address,
        // [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'subDistrict') {
      setUser({
        ...user,
        address: {
          ...user?.address,
          [e.target.name]: { id: e.target.value },
        },
        // ...user?.address,
        // [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'district') {
      setUser({
        ...user,
        address: {
          ...user?.address,
          [e.target.name]: { id: e.target.value },
        },
        // ...user?.address,
        // [e.target.name]: { id: e.target.value },
      });
    } else if (e.target.name === 'memberOf') {
      if (user?.membershipList !== null) {
        if (e.target.value !== null) {
          user.membershipList[0].barCouncil = { id: e.target.value };
          setUser(user);
        }
        if (user?.membershipList[0] && user?.membershipList[0]?.barCouncil) {
          setUser({
            ...user,
            membershipList: [
              // ...user.membershipList,
              (user.membershipList[0] = {
                ...user?.membershipList[0],
                barCouncil: {
                  id: e.target.value,
                  // ...user.membershipList[0]?.barCouncil,
                },
              }),
            ],
          });
        }
      } else if (
        // user?.membershipList[0] === null &&
        user?.membershipList === null
        // user?.membershipList[0]?.barCouncil === null
      ) {
        user.membershipList = [{ barCouncil: { id: e.target.value } }];
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === 'memberId') {
      if (user && user?.membershipList !== null) {
        setUser({
          ...user,
          membershipList: [
            (user.membershipList[0] = {
              ...user.membershipList[0],
              memberId: e.target.value,
            }),
          ],
        });
      } else {
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === 'serviceArea') {
      if (user && user?.serviceAreaList !== null) {
        user.serviceAreaList = [{ id: e.target.value }];
        setUser({
          ...user,
          serviceAreaList: [
            (user.serviceAreaList[0] = {
              ...user.serviceAreaList[0],
              id: e.target.value,
            }),
          ],
        });
      } else {
        user.serviceAreaList = [{ id: e.target.value }];
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === 'specialities') {
      if (user && user?.specialitiesList !== null) {
        user.specialitiesList = [{ id: e.target.value }];
        setUser({
          ...user,
          specialitiesList: [
            (user.specialitiesList[0] = {
              ...user.specialitiesList[0],
              id: e.target.value,
            }),
          ],
        });
      } else {
        user.specialitiesList = [{ id: e.target.value }];
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === 'affiliations') {
      if (user && user?.affiliationsList !== null) {
        user.affiliationsList = [{ id: e.target.value }];
        setUser({
          ...user,
          affiliationsList: [
            (user.affiliationsList[0] = {
              ...user.affiliationsList[0],
              id: e.target.value,
            }),
          ],
        });
      } else {
        user.affiliationsList = [{ id: e.target.value }];
        setData({
          ...data,
          [e.target.name]: e.target.value,
        });
      }
    } else if (e.target.name === 'branchList') {
      if (user && user?.branchList !== null) {
        user.branchList = [e.target.value];
        setUser({
          ...user,
          branchList: [e.target.value],
        });
      } else {
        user.branchList = [e.target.value];
        setData({
          ...data,
          [e.target.name]: [e.target.value],
        });
      }
    } else if (e.target.name === 'address') {
      setUser({
        ...user,
        address: {
          ...user?.address,
          streetAddress: e.target.value,
        },
      });
    } else if (e.target.name === 'legalAidServices') {
      let le;
      if (e.target.value === 'true') le = true;
      else le = false;
      user.legalAidServices = new Boolean(1);
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === 'proBonoServices') {
      if (e.target.value === 'true') user.proBonoServices = Boolean(true);
      user.proBonoServices = Boolean(false);
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    } else {
      if (e.target.value === 'true') user[e.target.name] = Boolean(true);
      else user[e.target.name] = Boolean(false);
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <>
      <div className='w-full bg-white rounded-md h-104 text-primarydark'>
        <div className='h-13 flex justify-start items-center pl-4 pr-12'>
          <h1 className='font-semibold text-lg'>Update Account</h1>
        </div>
        <Divider />

        <form
          className='w-full lg:px-12 px-4 flex flex-col space-y-6 pb-8 pt-10'
          onSubmit={handleSubmit(onSubmit)}
          // onKeyPress={e => preventFormSubmit(e)}
        >
          {/* <div className='flex justify-center items-center mt-10 mb-10 px-12'>
            <DropzoneArea
              acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
              showPreviews={true}
              maxFileSize={5000000}
              cancelButtonText={'Cancel'}
              submitButtonText={'Submit'}
              showFileNamesInPreview={true}
              dialogTitle={'hello'}
              dropzoneText={'Click or Drag an image to upload'}
            />
          </div> */}
          <ThemeProvider theme={theme}>
            <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-white rounded text-white w-full'
                label='Phone Number'
                id='outlined-basic'
                name='phone'
                variant='outlined'
                color='secondary'
                // {...register('phone', {
                //   required: true,
                //   pattern: /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/,
                // })}
                // error={errors.phone}
                // helperText={
                //   errors.phone?.type === 'required'
                //     ? 'Phone Number is required'
                //     : errors.phone?.type === 'pattern' &&
                //       'Enter a valid phone number'
                // }
                onChange={handleInputChange}
                value={user && user?.phone}
              />

              {/* <TextField
              className='bg-white rounded text-white w-full'
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
                  : errors?.email?.type === 'pattern' && 'Enter a valid email'
              }
            /> */}
              <TextField
                className='bg-white rounded text-white w-full'
                label='Fax'
                id='outlined-basic'
                name='fax'
                variant='outlined'
                color='secondary'
                // {...register('fax', {
                //   required: true,
                // })}
                // error={errors.fax}
                // helperText={
                //   errors.fax?.type === 'required'
                //     ? 'Fax Number is required'
                //     : errors?.fax?.type === 'pattern' &&
                //       'Enter a Valid Fax Number'
                // }
                onChange={handleInputChange}
                value={user && user?.fax ? user?.fax : ''}
              />
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-white rounded text-white w-full'
                label='Website'
                id='outlined-basic'
                name='website'
                variant='outlined'
                color='secondary'
                onChange={handleInputChange}
                value={user && user?.website}
                // {...register('website', {
                //   required: false,
                // })}
                // error={errors.address}
                // helperText={
                //   errors.address?.type === 'required' && 'Address is required'
                // }
              />
              <TextField
                className='bg-white rounded text-white w-full'
                label='Address'
                id='outlined-basic'
                name='address'
                variant='outlined'
                color='secondary'
                onChange={handleInputChange}
                value={user && user?.address && user?.address?.streetAddress}
                // {...register('address', {
                //   required: true,
                // })}
                // error={errors.address}
                // helperText={
                //   errors.address?.type === 'required' && 'Address is required'
                // }
              />
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.district}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Post Office
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Post Office'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  name='postOffice'
                  // {...register('postOffice', { required: false })}
                  onChange={handleInputChange}
                  value={
                    user && user?.address ? user?.address?.postOffice?.id : ''
                  }
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {postOffice.map(postOffice => (
                    <MenuItem value={postOffice.id}>{postOffice.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.postOffice?.type === 'required' &&
                    'Select your post office'}
                </FormHelperText>
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
                  label='Sub District'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  name='subDistrict'
                  onChange={handleInputChange}
                  value={
                    user && user?.address ? user?.address?.subDistrict?.id : ''
                  }
                  // {...register('subDistrict', { required: false })}
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
                // error={errors.district}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  District
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='District'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  name='district'
                  // {...register('district', { required: false })}

                  onChange={handleInputChange}
                  value={
                    user && user?.address ? user?.address?.district?.id : ''
                  }
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
            <h6 className='font-bold'>Advance Information</h6>
            <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <TextField
                className='bg-white rounded text-white w-full my-2'
                label='Chamber Name'
                id='outlined-basic'
                name='chamberName'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                // {...register('chamber_name', {
                //   required: 'chamber name is required',
                // })}
                // error={errors.chamber_name}
                // helperText={errors.chamber_name?.message}
                onChange={handleInputChange}
                value={user && user?.chamberName}
              />

              <TextField
                className='bg-white rounded text-white w-full my-2'
                label='Designation'
                id='outlined-basic'
                name='designation'
                variant='outlined'
                color='secondary'
                // onChange={handleInputChange}
                // {...register('designation', {
                //   required: 'Designation is required',
                // })}
                // error={errors.designation}
                // helperText={errors.designation?.message}
                onChange={handleInputChange}
                value={user && user?.designation}
              />
            </div>
            <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.district}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Member of
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Member of'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  // {...register('barCouncil', { required: false })}
                  name='memberOf'
                  onChange={handleInputChange}
                  value={
                    user && user?.membershipList
                      ? user?.membershipList[0] &&
                        user?.membershipList[0]?.barCouncil &&
                        user?.membershipList[0]?.barCouncil?.id
                      : data?.memberOf
                  }
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {barCouncil.map(barCouncil => (
                    <MenuItem value={barCouncil.id}>{barCouncil.name}</MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors.barCouncil?.type === 'required' &&
                    'Select your Bar Council'}
                </FormHelperText> */}
              </FormControl>

              <TextField
                className='bg-white rounded text-white w-full my-2'
                label='Member Id'
                id='outlined-basic'
                name='memberId'
                variant='outlined'
                color='secondary'
                onChange={handleInputChange}
                value={
                  user && user?.membershipList
                    ? user?.membershipList[0] &&
                      user?.membershipList[0]?.memberId
                    : data.memberId
                }
                // {...register('member_id', {
                //   required: 'member_id is required',
                // })}
                // error={errors.member_id}
                // helperText={errors.member_id?.message}
              />
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.serviceArea}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Service Area
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Service Area'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  // {...register('serviceArea', { required: false })}

                  name='serviceArea'
                  onChange={handleInputChange}
                  value={
                    user && user?.serviceAreaList
                      ? user?.serviceAreaList[0] && user?.serviceAreaList[0]?.id
                      : data.serviceArea
                  }
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {serviceArea.map(serviceArea => (
                    <MenuItem value={serviceArea.id}>
                      {serviceArea.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors?.serviceArea?.type === 'required' &&
                    'Service Are is required'}
                </FormHelperText> */}
              </FormControl>
              <FormControl
                className='w-full'
                variant='outlined'
                error={errors.specialities}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Specialities
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Specialities'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  name='specialities'
                  onChange={handleInputChange}
                  value={
                    user && user?.specialitiesList
                      ? user?.specialitiesList[0] &&
                        user?.specialitiesList[0]?.id
                      : data.specialities
                  }
                  // {...register('specialities', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {specialities.map(specialities => (
                    <MenuItem value={specialities.id}>
                      {specialities.name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>
                  {errors.specialities?.type === 'required' &&
                    'Select your specialities'}
                </FormHelperText>
              </FormControl>
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.affiliation}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Affiliations
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Affiliations'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  // {...register('affiliations', { required: false })}
                  onChange={handleInputChange}
                  name='affiliations'
                  value={
                    user && user?.affiliationsList
                      ? user?.affiliationsList[0] &&
                        user?.affiliationsList[0].id
                      : data.affiliations
                  }
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {affiliation.map(affiliation => (
                    <MenuItem value={affiliation.id}>
                      {affiliation.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors.affiliation?.type === 'required' &&
                    'Select your affiliation'}
                </FormHelperText> */}
              </FormControl>
              <TextField
                className='bg-white rounded text-white w-full my-2'
                label='Branch Name'
                id='outlined-basic'
                name='branchList'
                variant='outlined'
                color='secondary'
                onChange={handleInputChange}
                // {...register('branchName', {
                //   required: 'branchName is required',
                // })}
                // error={errors.branchName}
                // helperText={errors.branchName?.message}
                value={user && user?.branchList ? user?.branchList[0] : ''}
              />
            </div>
            <div className='w-50 flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.subDistrict}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Legal Aid
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Legal Aid'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  name='legalAidServices'
                  onChange={handleInputChange}
                  // {...register('legalAid', { required: false })}
                  value={
                    user && user?.legalAidServices ? user?.legalAidServices : ''
                  }
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='true'>
                    <em>Yes</em>
                  </MenuItem>
                  <MenuItem value='false'>
                    <em>No</em>
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className='w-full'
                variant='outlined'
                // error={errors.district}
              >
                <InputLabel id='demo-simple-select-outlined-label'>
                  Pro Bono Service
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Pro Bono Service'
                  className='bg-white rounded text-white w-full'
                  color='secondary'
                  name='proBonoServices'
                  onChange={handleInputChange}
                  // {...register('proBonoService', { required: false })}
                  value={
                    user && user?.proBonoServices ? user?.proBonoServices : ''
                  }
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value='true'>
                    <em>Yes</em>
                  </MenuItem>
                  <MenuItem value='false'>
                    <em>No</em>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </ThemeProvider>
          <div className='text-center'>
            <button type='submit' style={{ outline: 'none' }}>
              <img src={updateButton} alt='' />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdvocateSettingsPageUpdateAccount;
