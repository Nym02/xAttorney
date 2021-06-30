import DateFnsUtils from '@date-io/date-fns';
import bxsDownArrow from '@iconify-icons/bx/bxs-down-arrow';
import bxsRightArrow from '@iconify-icons/bx/bxs-right-arrow';
import { Icon } from '@iconify/react';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Chip, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { ThemeProvider } from '@material-ui/styles';
import axios from 'axios';
import { print } from 'graphql';
import gql from 'graphql-tag';
import ChipInput from 'material-ui-chip-input';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import nextPage from '../../../../../assets/images/next-page.svg';
import { DataContext } from '../../../../../Context Api/ManageData';
import theme from '../../../../../theme';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';

const AppellateDivisionStepOneForm = props => {
  const [selectedDate, setSelectedDate] = useState(null);

  const { addToast } = useToasts();
  const [primaryDate, setPrimaryDate] = useState(null);
  const [judgementDate, setJudgementDate] = useState(null);
  const [bailOnDate, setBailOnDate] = useState();
  const [wakalatnamaDate, setWakalatnamaDate] = useState(null);

  const { district, setDistrict } = useContext(DataContext);
  const { caseCategory, setCaseCategory } = useContext(DataContext);
  const { caseType, setCaseType } = useContext(DataContext);
  const { courtName, setCourtName } = useContext(DataContext);
  const { court } = useContext(DataContext);
  const { primaryResult, setPrimaryResult } = useContext(DataContext);
  const { judgementResult, setJudgementResult } = useContext(DataContext);
  const [lessForm, setLessForm] = useState(false);

  const [caseId, setCaseId] = useState('');
  const [caseTypeByCourtId, setCaseTypeByCourtId] = useState([]);
  const [policeStation, setPoliceStation] = useState([]);
  const [
    courtNameByCourtIdAndCaseCategoryIdCaseTypeId,
    setCourtNameByCourtIdAndCaseCategoryIdCaseTypeId,
  ] = useState([]);
  const [caseCategoryId, setCaseCategoryId] = useState('');
  const [caseTypeId, setCaseTypeId] = useState('');
  const { courtDivision } = useParams();
  const [
    courtDetailsInformationByCourtId,
    setCourtDetailsInformationByCourtId,
  ] = useState([]);

  const history = useHistory();

  // console.log(
  //   'courtNameByCourtIdAndCaseCategoryIdCaseTypeId',
  //   courtNameByCourtIdAndCaseCategoryIdCaseTypeId
  // );

  console.log('police station', policeStation);

  // console.log(
  //   'courtDetailsInformationByCourtId',
  //   courtDetailsInformationByCourtId
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //handle filling date
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  //handle primary date
  const hanldePrimaryDate = date => {
    setPrimaryDate(date);
  };

  //handle judgement date
  const handleJudgementDate = date => {
    setJudgementDate(date);
  };

  //hanlde bail on date
  const handleBailOnDate = date => {
    setBailOnDate(date);
  };

  // handle wakalatnama date
  const handleWakalatnamaDate = date => {
    setWakalatnamaDate(date);
  };

  // console.log('court name', courtDivision);
  // console.log('hello from nowhere');

  //================================================
  //-------------- court details by id -------------
  //================================================
  const getCourtByCourtId = courtDivision => {
    console.log('courtDivision', courtDivision);
    // ApiHelper.subDistrict
    //   .subDistrictById(districtId)
    //   .then(res => console.log('sub district by id', res));

    const newCourtId = JSON.stringify(courtDivision);
    const finalCourtId = newCourtId.replace(/"([^"]+)":/g, '$1:');

    const caseDetailsInformationByCourtId = gql`
        query {
          getCourtDetailsInformationByCourtId(
            courtId: ${finalCourtId}
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
              court {
                id
                name
                country
              }
              courtNameList {
                id
                name
                court {
                  id
                  name
                  country
                }
              }
              caseCategoryList {
                id
                name
                court {
                  id
                  name
                  country
                }
              }
              caseTypeList {
                id
                name
                court {
                  id
                  name
                  country
                }
              }
              judgmentResultList {
                id
                name
                court {
                  id
                  name
                  country
                }
              }
              primaryResultList {
                id
                name
                court {
                  id
                  name
                  country
                }
              }
            }
          }
        }
      `;
    console.log('course details called');
    axios
      .post(
        MAIN_API,

        {
          method: 'POST',
          query: print(caseDetailsInformationByCourtId),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        console.log('course details called');
        setCourtDetailsInformationByCourtId(
          res?.data?.data?.getCourtDetailsInformationByCourtId?.data
        );
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCourtByCourtId(courtDivision);
  }, [courtDivision]);

  //================================================
  //-------------- court details by id -------------
  //================================================

  //====================================================
  //------------ case type by case category ------------
  //====================================================
  const getCaseTypeByCaseCategory = caseCateGoryId => {
    const newCourtId = JSON.stringify(courtDivision);
    const finalCourtId = newCourtId.replace(/"([^"]+)":/g, '$1:');
    const newCaseCategoryId = JSON.stringify(caseCateGoryId);
    const finalCaseCategoryId = newCaseCategoryId.replace(/"([^"]+)":/g, '$1:');

    const caseTypeByCaseCategory = gql`
      query {
        getCaseTypeListByCourtIdAndCaseCategoryId(courtId: ${finalCourtId}, caseCategoryId: ${finalCaseCategoryId}) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data {
            caseTypeList {
              id
              name
              court {
                id
                name
                country
              }
              caseCategory {
                id
                name
                court {
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
          query: print(caseTypeByCaseCategory),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        console.log(
          'case category list',
          res?.data?.data?.getCaseTypeListByCourtIdAndCaseCategoryId?.data
            ?.caseTypeList
        );
        setCaseTypeByCourtId(
          res?.data?.data?.getCaseTypeListByCourtIdAndCaseCategoryId?.data
            ?.caseTypeList
        );
      })
      .catch(err => console.log(err));
  };
  const handleCaseCateGoryChange = e => {
    setCaseCategoryId(e.target.value);
    getCaseTypeByCaseCategory(e.target.value);
    getCourtNameByCaseTypeCaseCategoryAndCourtId(e.target.value);
  };
  //====================================================
  //------------ case type by case category ------------
  //====================================================

  //====================================================
  //------------ court name by case type ---------------
  //------------ case category, court id ---------------
  //====================================================
  console.log('case category id', caseTypeByCourtId?.caseCategory?.id);
  const getCourtNameByCaseTypeCaseCategoryAndCourtId = caseTypeIdR => {
    const newCaseTypeId = JSON.stringify(caseTypeIdR);
    const finalCaseTypeId = newCaseTypeId.replace(/"([^"]+)":/g, '$1:');

    const newCourtId = JSON.stringify(courtDivision);
    const finalCourtId = newCourtId.replace(/"([^"]+)":/g, '$1:');

    const newCaseCategoryId = JSON.stringify(caseCategoryId);
    const finalCaseCategoryId = newCaseCategoryId.replace(/"([^"]+)":/g, '$1:');

    const courtNameByCaseTypeCaseCategory = gql`
      {
        getCourtNameListByCourtIdAndCaseCategoryIdAndCaseTypeId(
          courtId: ${finalCourtId}
          caseCategoryId: ${finalCaseCategoryId}
          caseTypeId: ${finalCaseTypeId}
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
            courtNameList {
              id
              name
              court {
                id
                name
                country
              }
              caseType {
                id
                name
                court {
                  id
                  name
                  country
                }
                caseCategory {
                  id
                  name
                  court {
                    id
                    name
                    country
                  }
                }
              }
              caseCategory {
                id
                name
                court {
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
          query: print(courtNameByCaseTypeCaseCategory),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        console.log(
          'court name list',
          res?.data?.data
            ?.getCourtNameListByCourtIdAndCaseCategoryIdAndCaseTypeId?.data
            ?.courtNameList
        );
        setCourtNameByCourtIdAndCaseCategoryIdCaseTypeId(
          res?.data?.data
            ?.getCourtNameListByCourtIdAndCaseCategoryIdAndCaseTypeId?.data
            ?.courtNameList
        );
      })
      .catch(err => console.log(err));
  };

  const handleCaseTypeChange = e => {
    setCaseTypeId(e.target.value);
    getCourtNameByCaseTypeCaseCategoryAndCourtId(e.target.value);
  };
  //====================================================
  //------------ court name by case type ---------------
  //------------ case category, court id ---------------
  //====================================================

  //===================================================
  //--------- police station by district id -----------
  //===================================================
  const getPoliceStationByDistrictId = districtId => {
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
        setPoliceStation(
          res?.data?.data?.getPoliceStationListByDistrictId?.data
            ?.policeStationList
        );
      })
      .catch(err => console.log(err));
  };

  const handleDistrictChange = e => {
    getPoliceStationByDistrictId(e.target.value);
  };

  //===================================================
  //--------- police station by district id -----------
  //===================================================

  // useEffect(() => {
  //   getCaseTypeByCaseCategory(courtDetailsInformationByCourtId);
  // }, [courtDetailsInformationByCourtId?.]);

  //submitting case data
  const onSubmit = data => {
    let appellateCaseData = {};
    if (courtDivision === '1' || courtDivision === '2') {
      appellateCaseData = {
        district: {
          id: data.district,
        },
        caseType: {
          id: data.caseType,
        },
        caseNumber: data.caseNumber,
        year: parseInt(data.caseYear),
        primaryResult: {
          id: data.primaryResult,
        },
        primaryResultDate: primaryDate,
        reminderForExtension: data.reminderForExtension,
        caseCategory: {
          id: data.caseCategory,
        },
        courtName: {
          id: data.courtName,
        },
        filingDate: selectedDate,
        judgementDate: judgementDate,
        judgementResult: {
          id: data.judgementResult,
        },
        bellOnStayFor: data.bailOnStayFor,
        wakalatnamaList: [
          {
            number: data.wakalatnamaNumber,
            entryDate: wakalatnamaDate,
          },
        ],
        judgeNameList: [data.judgeName],
        actList: [data.applicableActs],
        transferredCourtName: '',
        arisingOutOfList: [data.arisingOutOf],
        witnessList: [data.witness],
        description: data.description,
        newCaseNumber: [],
      };
    } else if (courtDivision === '5') {
      appellateCaseData = {
        district: {
          id: data.district,
        },
        caseType: {
          id: data.caseType,
        },
        policeStation: {
          id: data.policeStation,
        },
        // TODO add police station data input
        caseNumber: data.caseNumber,
        year: parseInt(data.caseYear),
        reminderForExtension: parseInt(data.reminderForExtension),
        caseCategory: {
          id: data.caseCategory,
        },
        courtName: {
          id: data.courtName,
        },
        filingDate: selectedDate,
        bellOnStayFor: parseInt(data.bailOnStayFor),
        wakalatnamaList: [
          {
            number: data.wakalatnamaNumber,
            entryDate: wakalatnamaDate,
          },
        ],
        judgeNameList: [data.judgeName],
        actList: [data.applicableActs],
        transferredCourtName: data.transferredCourtName,
        arisingOutOfList: [data.arisingOutOf],
        witnessList: [data.witness],
        description: data.description,
        newCaseNumber: [data.newCaseNumber],
      };
    } else {
      appellateCaseData = {
        district: {
          id: data.district,
        },
        caseType: {
          id: data.caseType,
        },
        caseNumber: data.caseNumber,
        year: parseInt(data.caseYear),
        reminderForExtension: parseInt(data.reminderForExtension),
        caseCategory: {
          id: data.caseCategory,
        },
        courtName: {
          id: data.courtName,
        },
        filingDate: selectedDate,
        bellOnStayFor: parseInt(data.bailOnStayFor),
        wakalatnamaList: [
          {
            number: data.wakalatnamaNumber,
            entryDate: wakalatnamaDate,
          },
        ],
        judgeNameList: [data.judgeName],
        actList: [data.applicableActs],
        transferredCourtName: data.transferredCourtName,
        arisingOutOfList: [data.arisingOutOf],
        witnessList: [data.witness],
        description: data.description,
        newCaseNumber: [data.newCaseNumber],
      };
    }

    const newAppellateCaseData = JSON.stringify(appellateCaseData);
    const finalAppellateCaseData = newAppellateCaseData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    const appellateCaseQuery = gql`
      mutation {
        createCase(
          case: ${finalAppellateCaseData}
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
            district {
              id
            }
            policeStation {
              id
            }
            caseType {
              id
            }
            caseNumber
            year
            primaryResult {
              id
            }
            primaryResultDate
            reminderForExtension
            caseCategory {
              id
            }
            courtName {
              id
            }
            filingDate
            judgementDate
            judgementResult {
              id
            }
            bellOnStayFor
            wakalatnamaList {
              number
              entryDate
            }
            judgeNameList
            actList
            transferredCourtName
            arisingOutOfList
            witnessList
            description
            newCaseNumber
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(appellateCaseQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        console.log('first case form', res);
        const { createCase } = res?.data?.data;
        if (createCase !== null) {
          const { code, data, errors } = res?.data?.data.createCase;

          if (code === 200 && data !== null) {
            const { id } = res?.data?.data?.createCase?.data;
            setCaseId(id);

            addToast(`Case created successfully`, {
              appearance: 'success',
              autoDismiss: true,
            });
            history.push(
              `/dashboard/advocate/case/second-form/${courtDivision}/${id}`
            );
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
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='mb-20'>
        <ThemeProvider theme={theme}>
          <div className='flex flex-col space-y-8'>
            {courtDivision === '5' ? (
              <>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
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
                      {...register('district', { required: true })}
                      onChange={handleDistrictChange}
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
                        'District is required'}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    error={errors.policeStation}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Police Station
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Police Station'
                      name='district'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register('policeStation', { required: true })}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {policeStation?.map(policeStation => (
                        <MenuItem value={policeStation.id}>
                          {policeStation.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {errors.policeStation?.type === 'required' &&
                        'Case Category is required'}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    error={errors.caseCategory}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Case Category
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Case Category'
                      name='district'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register('caseCategory', { required: true })}
                      onChange={handleCaseCateGoryChange}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {courtDetailsInformationByCourtId?.caseCategoryList?.map(
                        caseCategory => (
                          <MenuItem value={caseCategory.id}>
                            {caseCategory.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <FormHelperText>
                      {errors.caseCategory?.type === 'required' &&
                        'Case Category is required'}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    error={errors.caseType}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Case Type
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Case Type'
                      name='caseType'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register('caseType', { required: true })}
                      onChange={handleCaseTypeChange}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {caseTypeByCourtId?.map(caseType => (
                        <MenuItem value={caseType.id}>{caseType.name}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {errors.caseType?.type === 'required' &&
                        'Case Type is required'}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    error={errors.courtName}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Court Name
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Court Name'
                      name='courtName'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register('courtName', { required: true })}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {courtNameByCourtIdAndCaseCategoryIdCaseTypeId?.map(
                        courtName => (
                          <MenuItem value={courtName.id}>
                            {courtName.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <FormHelperText>
                      {errors.courtName?.type === 'required' &&
                        'Case Type is required'}
                    </FormHelperText>
                  </FormControl>
                  <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                    <FormControl error={errors.caseNumber} className='w-full'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Case No'
                        id='outlined-basic'
                        name='text'
                        variant='outlined'
                        color='secondary'
                        error={errors.caseNumber}
                        {...register('caseNumber', { required: true })}
                      />
                      <FormHelperText>
                        {errors?.caseNumber?.type === 'required' &&
                          'Case No. is required'}
                      </FormHelperText>
                    </FormControl>

                    <FormControl error={errors.caseYear} className='w-full'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Case year'
                        id='outlined-basic'
                        name='year'
                        inputProps={{ min: 1971, max: 2022 }}
                        type='number'
                        variant='outlined'
                        color='secondary'
                        error={errors.caseYear}
                        {...register('caseYear', { required: true })}
                      />
                      <FormHelperText>
                        {errors?.caseYear?.type === 'required' &&
                          'Case Year is required'}
                      </FormHelperText>
                    </FormControl>
                  </div>
                </div>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      className='bg-lightSilver rounded text-white w-full'
                      disableToolbar
                      variant='inline'
                      inputVariant='outlined'
                      color='secondary'
                      format='MM/dd/yyyy'
                      label='Filing Date'
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      // error={errors.fillingDate}
                      // {...register("fillingDate", { required: true })}
                      // helperText={
                      //   errors?.fillingDate?.type === "required" && "aldkfjsl"
                      // }
                    />
                  </MuiPickersUtilsProvider>
                  <div className='lg:flex hidden lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'></div>
                </div>
              </>
            ) : (
              <>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
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
                        'District is required'}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    error={errors.caseCategory}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Case Category
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Case Category'
                      name='district'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register('caseCategory', { required: true })}
                      onChange={handleCaseCateGoryChange}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {courtDetailsInformationByCourtId?.caseCategoryList?.map(
                        caseCategory => (
                          <MenuItem value={caseCategory.id}>
                            {caseCategory.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <FormHelperText>
                      {errors.caseCategory?.type === 'required' &&
                        'Case Category is required'}
                    </FormHelperText>
                  </FormControl>
                </div>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    error={errors.caseType}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Case Type
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Case Type'
                      name='caseType'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register('caseType', { required: true })}
                      onChange={handleCaseTypeChange}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {caseTypeByCourtId?.map(caseType => (
                        <MenuItem value={caseType.id}>{caseType.name}</MenuItem>
                      ))}
                    </Select>
                    <FormHelperText>
                      {errors.caseType?.type === 'required' &&
                        'Case Type is required'}
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    className='w-full'
                    variant='outlined'
                    error={errors.courtName}
                  >
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Court Name
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      label='Court Name'
                      name='courtName'
                      className='bg-lightSilver rounded text-white w-full'
                      color='secondary'
                      {...register('courtName', { required: true })}
                    >
                      <MenuItem value=''>
                        <em>None</em>
                      </MenuItem>
                      {courtNameByCourtIdAndCaseCategoryIdCaseTypeId?.map(
                        courtName => (
                          <MenuItem value={courtName.id}>
                            {courtName.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                    <FormHelperText>
                      {errors.courtName?.type === 'required' &&
                        'Case Type is required'}
                    </FormHelperText>
                  </FormControl>
                </div>

                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                    <FormControl error={errors.caseNumber} className='w-full'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Case No'
                        id='outlined-basic'
                        name='text'
                        variant='outlined'
                        color='secondary'
                        error={errors.caseNumber}
                        {...register('caseNumber', { required: true })}
                      />
                      <FormHelperText>
                        {errors?.caseNumber?.type === 'required' &&
                          'Case No. is required'}
                      </FormHelperText>
                    </FormControl>

                    <FormControl error={errors.caseYear} className='w-full'>
                      <TextField
                        className='bg-lightSilver rounded text-white w-full'
                        label='Case year'
                        id='outlined-basic'
                        name='year'
                        inputProps={{ min: 1971, max: 2022 }}
                        type='number'
                        variant='outlined'
                        color='secondary'
                        error={errors.caseYear}
                        {...register('caseYear', { required: true })}
                      />
                      <FormHelperText>
                        {errors?.caseYear?.type === 'required' &&
                          'Case Year is required'}
                      </FormHelperText>
                    </FormControl>
                  </div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      autoOk
                      className='bg-lightSilver rounded text-white w-full'
                      disableToolbar
                      variant='inline'
                      inputVariant='outlined'
                      color='secondary'
                      format='MM/dd/yyyy'
                      label='Filing Date'
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      // error={errors.fillingDate}
                      // {...register("fillingDate", { required: true })}
                      // helperText={
                      //   errors?.fillingDate?.type === "required" && "aldkfjsl"
                      // }
                    />
                  </MuiPickersUtilsProvider>
                </div>
              </>
            )}
            {courtDivision === '1' || courtDivision === '2' ? (
              <>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                    <FormControl
                      className='w-full'
                      variant='outlined'
                      // error={errors.primaryResult}
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Primary Result
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='Primary Result'
                        name='primaryResult'
                        className='bg-lightSilver rounded text-white w-full'
                        color='secondary'
                        {...register('primaryResult', { required: false })}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {courtDetailsInformationByCourtId?.primaryResultList?.map(
                          primaryResult => (
                            <MenuItem value={primaryResult.id}>
                              {primaryResult.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      {/* <FormHelperText>
                  {errors.primaryResult?.type === "required" &&
                    "Case Type is required"}
                </FormHelperText> */}
                    </FormControl>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        className='bg-lightSilver rounded text-white w-full'
                        disableToolbar
                        variant='inline'
                        inputVariant='outlined'
                        color='secondary'
                        format='MM/dd/yyyy'
                        label='Primary Date'
                        value={primaryDate}
                        onChange={hanldePrimaryDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        autoOk
                        className='bg-lightSilver rounded text-white w-full'
                        disableToolbar
                        variant='inline'
                        inputVariant='outlined'
                        color='secondary'
                        format='MM/dd/yyyy'
                        label='Judgement Date'
                        value={judgementDate}
                        onChange={handleJudgementDate}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <FormControl
                      className='w-full'
                      variant='outlined'
                      // error={errors.primaryResult}
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Judgement Result
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='Judgement Result'
                        name='judgementResult'
                        className='bg-lightSilver rounded text-white w-full'
                        color='secondary'
                        {...register('judgementResult', { required: false })}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {courtDetailsInformationByCourtId?.judgmentResultList?.map(
                          judgementResult => (
                            <MenuItem value={judgementResult.id}>
                              {judgementResult.name}
                            </MenuItem>
                          )
                        )}
                      </Select>
                      {/* <FormHelperText>
                  {errors.primaryResult?.type === "required" &&
                    "Case Type is required"}
                </FormHelperText> */}
                    </FormControl>
                  </div>
                </div>
                <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Reminder for Extension'
                    id='outlined-basic'
                    name='text'
                    variant='outlined'
                    color='secondary'
                    type='number'
                    {...register('reminderForExtension', {
                      required: false,
                    })}
                  />
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Bail or Stay For'
                    id='outlined-basic'
                    name='text'
                    variant='outlined'
                    color='secondary'
                    type='number'
                    {...register('bailOnStayFor', {
                      required: false,
                    })}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div
            onClick={() => setLessForm(!lessForm)}
            className='flex items-center w-full mt-17 mb-7 space-x-2 cursor-pointer'
          >
            <div className='flex items-center space-x-2'>
              {lessForm === true ? (
                <>
                  <span className='text-primarydark text-xl'>Less</span>
                  <Icon className='text-primarydark' icon={bxsDownArrow} />
                </>
              ) : (
                <>
                  <span className='text-primarydark text-xl'>More</span>
                  <Icon className='text-primarydark' icon={bxsRightArrow} />
                </>
              )}
            </div>
            <div className='border border-primarydark border-opacity-40 w-full'></div>
          </div>
          <div
            className={
              lessForm === true ? 'flex flex-col space-y-8 pb-10' : 'hidden'
            }
          >
            <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label=' Wakalatnama No'
                  id='outlined-basic'
                  name='text'
                  variant='outlined'
                  color='secondary'
                  {...register('wakalatnamaNumber', { required: false })}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    className='bg-lightSilver rounded text-white w-full'
                    disableToolbar
                    variant='inline'
                    inputVariant='outlined'
                    color='secondary'
                    format='yyyy/MM/dd'
                    label='Wakalatnama Entry Date'
                    value={wakalatnamaDate}
                    onChange={handleWakalatnamaDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Arising Out Of'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('arisingOutOf', { required: false })}
              />
            </div>
            <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label="Judge's Name"
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('judgeName', { required: false })}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Applicable Acts'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('applicableActs', { required: false })}
              />
            </div>
            <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Witness'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('witness', { required: false })}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Description'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('description', { required: false })}
              />
            </div>
            {courtDivision === '3' ||
            courtDivision === '5' ||
            courtDivision === '4' ||
            courtDivision === '6' ? (
              <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Transferred Court Name'
                  id='outlined-basic'
                  name='text'
                  variant='outlined'
                  color='secondary'
                  {...register('transferredCourtName', { required: false })}
                />
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='New Case No.'
                  id='outlined-basic'
                  name='text'
                  variant='outlined'
                  color='secondary'
                  {...register('newCaseNumber', { required: false })}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </ThemeProvider>
        <div className='flex justify-center items-center'>
          {/* <Link
            to={`/dashboard/advocate/case/second-form/${courtDivision}/${caseId}`}
            style={{ outline: 'none' }}
          >
          </Link> */}
          <button style={{ outline: 'none' }}>
            <img src={nextPage} alt='' />
          </button>
        </div>
      </form>
    </>
  );
};

export default AppellateDivisionStepOneForm;
