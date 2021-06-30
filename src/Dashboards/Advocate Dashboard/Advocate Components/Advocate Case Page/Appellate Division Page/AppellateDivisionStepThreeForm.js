import { FormControl } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import finishButton from '../../../../../assets/images/fnish-button.svg';
import previousPage from '../../../../../assets/images/previous-page.svg';

import { DataContext } from '../../../../../Context Api/ManageData';
import theme from '../../../../../theme';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';

const AppellateDivisionStepThreeForm = () => {
  const { courtDivision, caseId } = useParams();
  const [policeStationByDistrict, setPoliceStationByDistrict] = useState([]);
  const [caseDetById, setCaseDetById] = useState({});
  // const [districtId, setDistrictId] = useState('');
  const { addToast } = useToasts();
  const history = useHistory();

  console.log('court id', courtDivision);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //==============================================
  //---------- case by case id ------------------
  //============================================
  const getCaseByCaseId = caseId => {
    const newCaseId = JSON.stringify(caseId);
    const finalCaseId = newCaseId.replace(/"([^"]+)":/g, '$1:');

    const getCaseDetailsByCaseId = gql`
      {
        getCaseById(caseId: ${finalCaseId}) {
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
            district {
              id
              name
            }
            policeStation {
              id
              name
            }
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(getCaseDetailsByCaseId),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        console.log('case details by id', res?.data?.data?.getCaseById?.data);
        setCaseDetById(res?.data?.data?.getCaseById?.data);
      })
      .then(() => {})
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCaseByCaseId(caseId);
  }, [caseId]);
  //==============================================
  //---------- case by case id ------------------
  //============================================

  //==============================================
  //---------- police station by district -------
  //============================================
  let districtId = caseDetById?.district?.id;

  const getPoliceStationByDistrictId = districtId => {
    if (!districtId) return;
    const newPoliceStationId = JSON.stringify(districtId);
    const finalPoliceStationId = newPoliceStationId.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const policeStationbytDistrictId = gql`
      query {
        getPoliceStationListByDistrictId(
          districtId: ${finalPoliceStationId}
          size: 10
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
            policeStationList {
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
          query: print(policeStationbytDistrictId),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        setPoliceStationByDistrict(
          res?.data?.data?.getPoliceStationListByDistrictId?.data
            ?.policeStationList
        );
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getPoliceStationByDistrictId(districtId);
  }, [districtId]);
  //==============================================
  //---------- police station by district -------
  //============================================

  //================================================
  //---------- submitting step three form ----------
  //================================================
  const onSubmit = data => {
    let stepThreeData = {};
    if (courtDivision === '5') {
      stepThreeData = {
        id: caseId,
        policeStation: {
          id: caseDetById?.policeStation?.id,
        },
        fir: [data.firNo],
        investigationOfficerList: [
          {
            name: data.investigationOfficer,
            phoneList: [data.phoneNumber],
          },
        ],
      };
    } else {
      stepThreeData = {
        id: caseId,
        policeStation: {
          id: data.policeStation,
        },
        fir: [data.firNo],
        investigationOfficerList: [
          {
            name: data.investigationOfficer,
            phoneList: [data.phoneNumber],
          },
        ],
      };
    }

    const newStepThreeData = JSON.stringify(stepThreeData);
    const finalStepThreeData = newStepThreeData.replace(/"([^"]+)":/g, '$1:');

    const stepThreeQuery = gql`
      mutation {
        updateAdditionalInformation(
          case: ${finalStepThreeData}
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
            policeStation {
              id
            }
            fir
            investigationOfficerList {
              name
              phoneList
            }
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(stepThreeQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        console.log('step three form', res);
        const { updateAdditionalInformation } = res?.data?.data;
        if (updateAdditionalInformation !== null) {
          const { code, data, errors } =
            res?.data?.data.updateAdditionalInformation;

          if (code === 200 && data !== null) {
            const { id } = res?.data?.data?.updateAdditionalInformation?.data;

            addToast(
              `Case Client Additional Information Updated successfully`,
              {
                appearance: 'success',
                autoDismiss: true,
              }
            );
            window.location.replace(`/dashboard/advocate/case`);
          } else if (code !== 200 && data === null) {
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
      .then(() => {})
      // .then(() => window.location.reload())
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
  //================================================
  //---------- submitting step three form ----------
  //================================================

  return (
    <>
      <form
        className='flex flex-col items-center space-y-20'
        onSubmit={handleSubmit(onSubmit)}
      >
        <ThemeProvider theme={theme}>
          {courtDivision === '5' ? (
            <>
              <div className='flex flex-col items-start lg:space-y-8 space-y-0 lg:space-x-0 space-x-8 w-full'>
                <div className='flex lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='FIR No'
                    id='outlined-basic'
                    name='number'
                    variant='outlined'
                    color='secondary'
                    {...register('firNo', { required: false })}
                  />
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Investigating Officer'
                    id='outlined-basic'
                    name='text'
                    variant='outlined'
                    color='secondary'
                    {...register('investigationOfficer', { required: false })}
                  />
                </div>
                <div className='flex lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Phone No'
                    id='outlined-basic'
                    name='tel'
                    variant='outlined'
                    color='secondary'
                    {...register('phoneNumber', { required: false })}
                  />
                  <div className='lg:flex hidden lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'></div>
                </div>
              </div>{' '}
            </>
          ) : (
            <>
              {' '}
              <div className='flex flex-col items-start lg:space-y-8 space-y-0 lg:space-x-0 space-x-8 w-full'>
                <div className='flex lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    // error={errors.caseType}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Police Station{' '}
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Police Station'
                      name='policeStation'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register('policeStation', { required: false })}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {policeStationByDistrict.map(policeStation => (
                        <MenuItem value={policeStation.id}>
                          {policeStation.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText>
                  {errors.policeStation?.type === "required" &&
                    "Case Type is required"}
                </FormHelperText> */}
                  </FormControl>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='FIR No'
                    id='outlined-basic'
                    name='number'
                    variant='outlined'
                    color='secondary'
                    {...register('firNo', { required: false })}
                  />
                </div>
                <div className='flex lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Investigating Officer'
                    id='outlined-basic'
                    name='text'
                    variant='outlined'
                    color='secondary'
                    {...register('investigationOfficer', { required: false })}
                  />
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Phone No'
                    id='outlined-basic'
                    name='tel'
                    variant='outlined'
                    color='secondary'
                    {...register('phoneNumber', { required: false })}
                  />
                </div>
              </div>
            </>
          )}
        </ThemeProvider>
        <div className='flex items-center space-x-8'>
          {/* <Link to='#'>
            <img src={previousPage} alt='' />
          </Link> */}
          {/* <Link
            to={`/dashboard/advocate/case/third-form/${courtDivision}/${id}`}
          >
          </Link> */}
          <button>
            <img src={finishButton} alt='' />
          </button>
        </div>
      </form>
    </>
  );
};

export default AppellateDivisionStepThreeForm;
