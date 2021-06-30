import { ThemeProvider } from '@material-ui/styles';
import { Autocomplete } from '@material-ui/lab';
import theme from '../../../../../theme';
import { Modal, TextField } from '@material-ui/core';
import versus from '../../../../../assets/images/versus.svg';
import { useContext, useState } from 'react';
import { DataContext } from '../../../../../Context Api/ManageData';
import nextPage from '../../../../../assets/images/next-page.svg';
import previousPage from '../../../../../assets/images/previous-page.svg';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FormControl } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { Select } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import gql, { resetCaches } from 'graphql-tag';
import axios from 'axios';
import { MAIN_API } from '../../../../../Utils/APIs';
import { print } from 'graphql';
import { finalNewLoginToken } from '../../../../../Utils/UserToken';
import { useToasts } from 'react-toast-notifications';
import { Icon } from '@iconify/react';
import circlePlus from '@iconify-icons/akar-icons/circle-plus';
import modalClose from '../../../../../assets/images/modal-close.svg';
import addNow from '../../../../../assets/images/add-now.svg';
import { AdvocateApiHelper } from '../../../../../Utils/AdvocateApiHelper';
import { FormHelperText } from '@material-ui/core';

const AppellateDivisionStepTwoForm = () => {
  const [open, setOpen] = useState(false);
  const { client, setClient } = useContext(DataContext);
  const { district, setDistrict } = useContext(DataContext);
  const { clientBehalf, setClientBehalf } = useContext(DataContext);
  const { clientType, setClientType } = useContext(DataContext);
  const { advocateAssociate, setAdvocateAssociate } = useContext(DataContext);
  const { courtDivision, caseId } = useParams();

  const [clientVal, setClientVal] = useState({});
  const [clientInputVal, setClientInputVal] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();
  const { addToast } = useToasts();
  const history = useHistory();

  const newClient = [];
  client.map((item, idx) => {
    newClient.push({
      id: item?.id,
      name: item?.name,
      phone: item?.phoneList[0],
    });
  });
  const onSubmit = data => {
    const caseStepTwoFormData = {
      id: caseId,
      clientBehalf: {
        id: data.client_behalf,
      },
      clientType: {
        id: data.client_type,
      },
      client: [
        {
          id: data.client,
        },
      ],
      assignTo: {
        id: data.assignTo,
      },
      reference: [data.referenceName],
      fileNumber: data.fileNumber,
      opponentList: [
        {
          name: data.opponentName,
          phoneList: [data.opponentPhone],
        },
      ],
      opponentAdvocate: [
        {
          name: data.opponentAdvocate,
        },
      ],
      opponentWitnessList: [data.opponentWitness],
    };
    const newCaseStepTwoFormData = JSON.stringify(caseStepTwoFormData);
    const finalCaseStepTwoFormData = newCaseStepTwoFormData.replace(
      /"([^"]+)":/g,
      '$1:'
    );

    // console.log('step two form -2', caseStepTwoFormData);

    const caseStepTwoFormQuery = gql`
      mutation {
        updateCaseClientAndOpponentInformation(
          case: ${finalCaseStepTwoFormData}
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
            clientBehalf {
              id
            }
            clientType {
              id
            }
            client {
              id
            }
            assignTo {
              id
            }
            reference
            fileNumber
            opponentList {
              name
              phoneList
            }
            opponentAdvocate {
              name
            }
            opponentWitnessList
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(caseStepTwoFormQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { updateCaseClientAndOpponentInformation } = res?.data?.data;
        if (updateCaseClientAndOpponentInformation !== null) {
          const { code, data, errors } =
            res?.data?.data.updateCaseClientAndOpponentInformation;

          if (code === 200 && data !== null) {
            const { id } =
              res?.data?.data?.updateCaseClientAndOpponentInformation?.data;

            addToast(`Case Client Updated successfully`, {
              appearance: 'success',
              autoDismiss: true,
            });
            reset();
            history.push(
              `/dashboard/advocate/case/third-form/${courtDivision}/${id}`
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
      // .then(() => {})
      // .then(() => window.location.reload())
      .catch(err =>
        addToast('Something went wrong', {
          appearance: 'error',
          autoDismiss: true,
        })
      );
  };

  const onCreateClient = (data, e) => {
    const createClientData = {
      name: data.name,
      phoneList: [data.phone],
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
        const { createClient } = res?.data?.data;
        if (createClient !== null) {
          const { code, data, errors } = res?.data?.data?.createClient;

          if (code === 200) {
            addToast('Client has been created succesfully.', {
              appearance: 'success',
              autoDismiss: true,
            });
            AdvocateApiHelper.advClient
              .getClient()
              .then(res => {
                setClient(res?.data?.data?.getClientList?.data?.clientList);
              })
              .then(() => reset2())
              // .then(() =>
              //   setTimeout(() => {
              //     window.location.reload();
              //   }, 100)
              // )
              .then(() => setOpen(false));
          } else {
            addToast(errors[0].description, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
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

  const addClient = (
    <div
      className='2xl:w-1/3 lg:w-1/2 w-11/12 h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add Client</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpen(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='px-6'>
        <form
          className='w-full px-12 flex flex-col space-y-6 pb-8'
          onSubmit={handleSubmit2(onCreateClient)}
        >
          <ThemeProvider theme={theme}>
            <div className='w-full flex flex-col items-center justify-center space-y-6 pt-4'>
              <TextField
                className='bg-lightSilver rounded text-white w-full my-2'
                label='Name'
                id='outlined-basic'
                name='name'
                variant='outlined'
                color='secondary'
                {...register2('name', { required: 'Name is required' })}
                error={errors2.name}
                helperText={errors2.name?.message}
              />
              <FormControl className='w-full' error={errors2.phone}>
                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Phone Number'
                  id='outlined-basic'
                  name='phone'
                  variant='outlined'
                  color='secondary'
                  inputProps={{ maxLength: 11 }}
                  {...register2('phone', {
                    required: true,
                    pattern: /(^(\+88|88)?(01){1}[3456789]{1}(\d){8})$/,
                  })}
                  // onChange={handleInputChange}
                  error={errors2.phone}
                />
                <FormHelperText>
                  {errors2.phone?.type === 'required'
                    ? 'Phone Number is required'
                    : errors2.phone?.type === 'pattern' &&
                      'Enter a valid phone number'}
                </FormHelperText>
              </FormControl>
              <div className='flex items-center justify-center'>
                <button type='submit' style={{ outline: 'none' }}>
                  <img src={addNow} alt='' />
                </button>
              </div>
            </div>
          </ThemeProvider>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center space-y-20 pb-10'
      >
        <ThemeProvider theme={theme}>
          <div className='flex lg:flex-row flex-col items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8 w-full'>
            <div className='flex flex-col space-y-8 w-full'>
              <FormControl className='w-full' variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>
                  Client Behalf
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Client Behalf'
                  name='client_behalf'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('client_behalf', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {clientBehalf.map(clientBehalf => (
                    <MenuItem value={clientBehalf.id}>
                      {clientBehalf.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors.sub_district?.type === 'required' &&
                    'District is required'}
                </FormHelperText> */}
              </FormControl>
              <FormControl className='w-full' variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>
                  Client Type
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Client Type'
                  name='client_type'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('client_type', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {clientType.map(clientType => (
                    <MenuItem value={clientType.id}>{clientType.name}</MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors.sub_district?.type === 'required' &&
                    'District is required'}
                </FormHelperText> */}
              </FormControl>
              <div className='flex items-center space-x-2'>
                <FormControl className='w-full' variant='outlined'>
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Client
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    label='Client'
                    name='client'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    {...register('client', { required: false })}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {client.map(client => (
                      <MenuItem value={client.id}>{client.name}</MenuItem>
                    ))}
                  </Select>
                  {/* <FormHelperText>
                  {errors.sub_district?.type === 'required' &&
                    'District is required'}
                </FormHelperText> */}
                </FormControl>
                <div style={{ outline: 'none' }} onClick={() => setOpen(true)}>
                  <Icon
                    className='text-3xl text-primarylight'
                    icon={circlePlus}
                  />
                </div>
              </div>
              <FormControl className='w-full' variant='outlined'>
                <InputLabel id='demo-simple-select-outlined-label'>
                  Assign To
                </InputLabel>
                <Select
                  labelId='demo-simple-select-outlined-label'
                  id='demo-simple-select-outlined'
                  label='Assign To'
                  name='assignTo'
                  className='bg-lightSilver rounded text-white w-full'
                  color='secondary'
                  {...register('assignTo', { required: false })}
                >
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {advocateAssociate.map(advocateAssociate => (
                    <MenuItem value={advocateAssociate.id}>
                      {advocateAssociate.name}
                    </MenuItem>
                  ))}
                </Select>
                {/* <FormHelperText>
                  {errors.sub_district?.type === 'required' &&
                    'District is required'}
                </FormHelperText> */}
              </FormControl>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Reference Name/No'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('referenceName', { required: false })}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='File No'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('fileNumber', { required: false })}
              />
            </div>

            <div className='self-center lg:flex hidden'>
              <img className='w-32' src={versus} alt='' />
            </div>
            <div className='flex flex-col space-y-8 w-full'>
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Opponent Name'
                id='outlined-basic'
                name='name'
                variant='outlined'
                color='secondary'
                {...register('opponentName', { required: false })}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Phone Number'
                id='outlined-basic'
                name='tel'
                variant='outlined'
                color='secondary'
                {...register('opponentPhone', { required: false })}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Opponent Advocate Name'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('opponentAdvocate', { required: false })}
              />
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                label='Opponent Witness'
                id='outlined-basic'
                name='text'
                variant='outlined'
                color='secondary'
                {...register('opponentWitness')}
              />
            </div>
          </div>
        </ThemeProvider>
        <div className='flex items-center space-x-8'>
          {/* <Link to='/#'>
              <img src={previousPage} alt='' />
            </Link> */}
          {/* <Link
              to={`/dashboard/advocate/case/third-form/${courtDivision}/${caseId}`}
            ></Link> */}
          <button style={{ outline: 'none' }} type='submit'>
            <img src={nextPage} alt='' />
          </button>
        </div>
      </form>
      <Modal
        open={open}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addClient}
      </Modal>
    </>
  );
};

export default AppellateDivisionStepTwoForm;
