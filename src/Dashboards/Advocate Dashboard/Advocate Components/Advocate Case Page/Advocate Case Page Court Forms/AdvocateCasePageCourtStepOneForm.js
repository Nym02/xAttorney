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
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { useToasts } from 'react-toast-notifications';

import { DataContext } from '../../../../../Context Api/ManageData';
import theme from '../../../../../theme';
import { MAIN_API } from '../../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';

const chipRenderer = ({ chip, className, handleClick, handleDelete }, key) => (
  <Chip
    className={className}
    key={key}
    label={chip}
    onClick={handleClick}
    onDelete={handleDelete}
    color='primary'
  />
);

const AdvocateCasePageStepOneForm = props => {
  const [selectedDate, setSelectedDate] = useState(
    new Date('2014-08-18T21:11:54')
  );

  const { addToast } = useToasts();
  const [primaryDate, setPrimaryDate] = useState(new Date());
  const [judgementDate, setJudgementDate] = useState(new Date());
  const [bailOnDate, setBailOnDate] = useState(new Date());
  const [wakalatnamaDate, setWakalatnamaDate] = useState(new Date());

  const { district, setDistrict } = useContext(DataContext);
  const { caseCategory, setCaseCategory } = useContext(DataContext);
  const { caseType, setCaseType } = useContext(DataContext);
  const { courtName, setCourtName } = useContext(DataContext);
  const { primaryResult, setPrimaryResult } = useContext(DataContext);
  const { judgementResult, setJudgementResult } = useContext(DataContext);
  const [lessForm, setLessForm] = useState(false);

  const [caseId, setCaseId] = useState('');
  const { courtDivision } = useParams();

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

  //submitting case data
  const onSubmit = data => {
    //     applicableActs: "sdfsdf"
    // arisingOutOf: "123"
    // caseCategory: "60a219f722ef6b4e367d1378"
    // caseNumber: "2"
    // caseType: "60a8aff8ea41b92c4b6c119a"
    // caseYear: "2021"
    // courtName: "609aef1422ef6b803ef05584"
    // description: "sdfsdf"
    // district: "60a79204ea41b9184122646b"
    // judgeName: "sfsdf"
    // judgementResult: "609ae8e622ef6b77831ae22b"
    // primaryResult: "609ae0a822ef6b678d4af567"
    // reminderForExtension: "11111"
    // wakalatnamaNumber: "2323"
    // witness: "sdfsdf"

    let appellateCaseData = {};
    if (
      courtDivision === 'appellate-division' ||
      courtDivision === 'high-court'
    ) {
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
        reminderForExtension: parseInt(data.reminderForExtension),
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
        bellOnStayFor: parseInt(data.bailOnStayFor),
        wakalatnamaList: [
          {
            number: data.wakalatnamaNumber,
            entryDate: data.wakalatnamaDate,
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
        primaryResult: {
          id: data.primaryResult,
        },
        reminderForExtension: parseInt(data.reminderForExtension),
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
        bellOnStayFor: parseInt(data.bailOnStayFor),
        wakalatnamaList: [
          {
            number: data.wakalatnamaNumber,
            entryDate: data.wakalatnamaDate,
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
        const { createCase } = res?.data?.data;
        if (createCase !== null) {
          const { code, data, errors } = res?.data?.data.createCase;

          if (code === 200 && data !== null) {
            const { id } = res?.data?.data?.createCase?.data;
            setCaseId(id);

            addToast(`Case created successfully ${id}`, {
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
          addToast('Something went wrong', {
            appearance: 'error',
            autoDismiss: true,
          });
        }
      })
      // .then(() => window.location.reload())
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <div className='flex flex-col space-y-8'>
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
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {caseCategory.map(caseCategory => (
                    <MenuItem value={caseCategory.id}>
                      {caseCategory.name}
                    </MenuItem>
                  ))}
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
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {caseType.map(caseType => (
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
                  {courtName.map(courtName => (
                    <MenuItem value={courtName.id}>{courtName.name}</MenuItem>
                  ))}
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
                    {primaryResult.map(primaryResult => (
                      <MenuItem value={primaryResult.id}>
                        {primaryResult.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                  {errors.primaryResult?.type === "required" &&
                    "Case Type is required"}
                </FormHelperText> */}
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
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
                    {judgementResult.map(judgementResult => (
                      <MenuItem value={judgementResult.id}>
                        {judgementResult.name}
                      </MenuItem>
                    ))}
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
                {...register('arisingOutOf', { required: true })}
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
            {courtDivision === 'district-court' ||
            courtDivision === 'magistrate-court' ||
            courtDivision === 'special-tribunal-court' ||
            courtDivision === 'others-court' ? (
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
        <button>add</button>
        {courtDivision}
      </form>
    </>
  );
};

export default AdvocateCasePageStepOneForm;
