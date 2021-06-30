import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  ThemeProvider,
} from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import { RadioGroup } from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { Modal } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import modalClose from '../../../../assets/images/modal-close.svg';
import warn from '../../../../assets/images/warn.svg';
import submit from '../../../../assets/images/submit-Button.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import moment from 'moment';
import { Icon } from '@iconify/react';
import tickIcon from '@iconify-icons/typcn/tick';
import crossIcon from '@iconify-icons/entypo/cross';
import { TextField } from '@material-ui/core';
import { ApiHelper } from '../../../../Utils/ApiHelper';
import { useToasts } from 'react-toast-notifications';
import { useForm } from 'react-hook-form';

const SuperAdminRequestForCallTableComponent = () => {
  const [open, setOpen] = useState(false);
  const { requestForContact, setRequestForContact } = useContext(DataContext);
  const [calledModal, setCalledModal] = useState(false);
  const [requestForContactId, setRequestForContactId] = useState('');
  const [calledNote, setCalledNote] = useState('');
  const { addToast } = useToasts();
  const [value, setValue] = useState('Already Called This User');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCalled = id => {
    setRequestForContactId(id);
    setCalledModal(true);
  };

  const handleDeclinedCall = id => {
    setRequestForContactId(id);
    setOpen(true);
  };

  // ------------------------------- decline call status -------------------------------
  const onSubmit = (data, e) => {
    const requestForContactData = {
      id: requestForContactId,
      callStatus: 'DECLINED',
      note: data.decline_messages,
    };

    const onSuccessCreateRequestForContact = result => {
      addToast('Call status has been updated to "Declined"', {
        appearance: 'success',
        autoDismiss: true,
      });
      ApiHelper.requestForContact
        .getRequestForContact()
        .then(res => {
          setRequestForContact(
            res?.data?.data?.getRequestForContactList?.data
              ?.requestForContactList
          );
          setValue(e.target.value);
          setCalledNote('');
        })
        // .then(() => window.location.reload())
        .catch(err =>
          addToast('Something wrong happend', {
            appearance: 'error',
            autoDismiss: true,
          })
        );
    };
    const onErrorCreateRequestForContact = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.requestForContact
      .updateRequestForContactCallStatus({
        data: requestForContactData,
      })
      .then(onSuccessCreateRequestForContact)
      .catch(onErrorCreateRequestForContact);

    setOpen(false);
  };

  // ------------------------------- change status to called -------------------------------
  const onCalledMessage = e => {
    e.preventDefault();
    const requestForContactData = {
      id: requestForContactId,
      callStatus: 'CALLED',
      note: calledNote,
    };
    const onSuccessCreateRequestForContact = result => {
      e.target.reset();
      addToast('Call status has been updated to "Called"', {
        appearance: 'success',
        autoDismiss: true,
      });
      ApiHelper.requestForContact
        .getRequestForContact()
        .then(res => {
          setRequestForContact(
            res?.data?.data?.getRequestForContactList?.data
              ?.requestForContactList
          );
          setValue(e.target.value);
          setCalledNote('');
        })
        // .then(() => window.location.reload())
        .catch(err =>
          addToast('Something wrong happend', {
            appearance: 'error',
            autoDismiss: true,
          })
        );
    };
    const onErrorCreateRequestForContact = err => {
      addToast('Something wrong happend', {
        appearance: 'error',
        autoDismiss: true,
      });
    };

    ApiHelper.requestForContact
      .updateRequestForContactCallStatus({
        data: requestForContactData,
      })
      .then(onSuccessCreateRequestForContact)
      .catch(onErrorCreateRequestForContact);

    setCalledModal(false);
  };

  let newRequestForContact = [];
  requestForContact.map((item, index) => {
    newRequestForContact.push({
      sl: index + 1,
      requestDate: moment(item?.contactTime).format('DD-MM-YYYY'),
      clientName: item?.name,
      clientPhone: item?.phone,
      email: item?.email,
      subject: item?.subject,
      message: item?.message,
      ipAddress: item?.ipAddress,
      callingStatus: item?.callStatus,
      callNote: item?.note,
      callStatusChangeTime: moment(item?.callStatusChangeTime).format(
        'DD-MM-YYYY'
      ),
      id: item?.id,
    });
  });

  // ------------------------------- columns -------------------------------
  const columns = [
    {
      name: 'requestDate',
      label: 'Request Date',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientName',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientPhone',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'subject',
      label: 'Subject',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'message',
      label: 'Message',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'ipAddress',
      label: 'IP Address',
      options: {
        display: false,
      },
    },

    {
      name: 'callingStatus',
      label: 'Calling Status',
      options: {
        filter: true,
        sort: false,
        customBodyRender: (callingStatus, value) => {
          if (callingStatus === 'PENDING') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div
                    onClick={() => handleCalled(value.rowData[9])}
                    className='text-deepGreen flex flex-col space-y-1 items-center cursor-pointer'
                  >
                    <div className='p-2 rounded-full bg-deepGreen'>
                      <Icon className='text-white text-2xl' icon={tickIcon} />
                    </div>
                    <span>Done</span>
                  </div>
                  <div
                    onClick={() => handleDeclinedCall(value.rowData[9])}
                    className='text-red-500 flex flex-col space-y-1 items-center cursor-pointer'
                  >
                    <div className='p-2 rounded-full bg-red-600'>
                      <Icon className='text-white text-2xl' icon={crossIcon} />
                    </div>
                    <span>Decline</span>
                  </div>
                </div>
              </>
            );
          }
          if (callingStatus === 'CALLED') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-green-500 text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      CALLED
                    </span>
                    <span>
                      <span className='font-semibold'>Note:</span>{' '}
                      {value.rowData[8]}
                    </span>
                  </div>
                </div>
              </>
            );
          }
          if (callingStatus === 'DECLINED') {
            return (
              <>
                <div className='flex space-x-8 items-center'>
                  <div className='flex flex-col items-start space-y-2'>
                    <span className='bg-red-400 text-white font-semibold w-20 py-1 rounded flex justify-center items-center'>
                      DECLINED
                    </span>
                    <span>
                      <span className='font-semibold'>Reason:</span>{' '}
                      {value.rowData[8]}
                    </span>
                  </div>
                </div>
              </>
            );
          }
          return <div>Unknown</div>;
        },
      },
    },
    {
      name: 'callNote',
      label: 'Note',
      options: {
        display: false,
      },
    },
    {
      name: 'id',
      label: 'Id',
      options: {
        display: false,
      },
    },
    {
      name: 'callStatusChangeTime',
      label: 'Calling Time',
      options: {
        filter: true,
        sort: true,
        customBodyRender: callStatusChangeTime => {
          if (callStatusChangeTime === 'Invalid date') {
            return <span></span>;
          } else {
            return <span>{callStatusChangeTime}</span>;
          }
        },
      },
    },
  ];

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  // ------------------------------- called modal -------------------------------
  const calledModalView = (
    <>
      <div
        className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
        }}
      >
        <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
          <span>Choose A Reason</span>
          <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
            <img
              onClick={() => setCalledModal()}
              className='w-full cursor-pointer'
              src={modalClose}
              alt=''
            />
          </div>
        </div>
        <ThemeProvider theme={theme}>
          <form
            className='w-full px-12 flex flex-col space-y-6 pb-8'
            onSubmit={onCalledMessage}
          >
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              InputLabelProps={{ className: 'textfield__label' }}
              id='margin-normal'
              label='Your Message'
              name='contactRequest_note'
              onChange={e => setCalledNote(e.target.value)}
              multiline
              rows={4}
              variant='outlined'
              color='primary'
            />
            <button
              className='flex justify-center items-center'
              style={{ outline: 'none' }}
              type='submit'
            >
              <img src={submit} alt='' />
            </button>
          </form>
        </ThemeProvider>
      </div>
    </>
  );

  // ------------------------------- call decline modal -------------------------------
  const declineMessageData = [
    {
      id: '1',
      note: 'Already called',
    },
    {
      id: '2',
      note: 'Annoying call',
    },
    {
      id: '3',
      note: 'Wrong person',
    },
  ];

  const declineModal = (
    <div
      className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Choose A Reason</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpen(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full px-12 flex flex-col space-y-6 pb-8'
      >
        <ThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <FormControl
              className='w-full'
              variant='outlined'
              error={errors.decline_messages}
            >
              {/* <InputLabel id='demo-simple-select-outlined-label'>
                Select your message
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='Select your message'
                name='decline_messages'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
                {...register('decline_messages', { required: true })}
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                {declineMessageData.map(value => (
                  <MenuItem value={value.note}>{value.note}</MenuItem>
                ))}
              </Select> */}
              <TextField
                className='bg-lightSilver rounded text-white w-full'
                InputLabelProps={{ className: 'textfield__label' }}
                id='margin-normal'
                label='Your Message'
                name='contactRequest_note'
                onChange={e => setCalledNote(e.target.value)}
                multiline
                rows={4}
                variant='outlined'
                color='primary'
                {...register('decline_messages', { required: true })}
              />
              <FormHelperText>
                {errors.decline_messages?.type === 'required' &&
                  'Decline messages is required'}
              </FormHelperText>
            </FormControl>
          </div>
        </ThemeProvider>
        <div className='w-full flex justify-center items-center'>
          <button type='submit' style={{ outline: 'none' }}>
            <img className='rounded' src={submit} alt='' />
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <>
      <MUIDataTable
        title={'Call Request List'}
        data={newRequestForContact}
        columns={columns}
        options={options}
      />

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {declineModal}
      </Modal>

      <Modal
        open={calledModal}
        onClose={() => setCalledModal(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {calledModalView}
      </Modal>
    </>
  );
};

export default SuperAdminRequestForCallTableComponent;

// {/* <div>
//   <div className='flex items-center justify-between h-10'>
//     <div className='flex items-center space-x-6 h-10'>
//       filter button
//       <div className='h-10 w-24 px-2 flex justify-center items-centeritems-center space-x-2 text-primarydark text-base border border-deepIndigo rounded-md'>
//         <img src={filter} alt='' />
//         <span>Filter</span>
//       </div>

//       searchbox
//       <div className='bg-deepIndigo bg-opacity-20 relative h-full flex items-center rounded-md w-96'>
//         <div style={{ left: '2%' }} className='absolute'>
//           <SearchIcon className='text-deepIndigo' />
//         </div>
//         <InputBase
//           className='pl-10 text-white w-full'
//           placeholder='Search Users by Name, Phone No or Date'
//           inputProps={{ 'aria-label': 'search' }}
//         />
//       </div>
//     </div>
//     <button style={{ outline: 'none' }}>
//       <img src={addNewButton} alt='' />
//     </button>
//   </div>
// </div> */}

// const addModal = (
//   <div
//     className='2xl:w-1/3 xl:w-2/3 lg:w-1/2 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
//     style={{
//       top: '50%',
//       left: '50%',
//       transform: `translate(-50%, -50%)`,
//     }}
//   >
//     <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
//       <span>Choose A Reason</span>
//       <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
//         <img
//           onClick={() => setOpen(false)}
//           className='w-full cursor-pointer'
//           src={modalClose}
//           alt=''
//         />
//       </div>
//     </div>
//     <div className='w-full px-12 flex flex-col space-y-6 pb-8'>
//       <ThemeProvider theme={theme}>
//         <FormControl component='fieldset'>
//           <FormLabel component='legend'>Decline Reason</FormLabel>
//           <RadioGroup
//             aria-label='Decline Reason'
//             name='declineReason'
//             value={value}
//             onChange={handleChange}
//             color='primary'
//           >
//             <FormControlLabel
//               value='Annoying Call'
//               control={<Radio />}
//               label='Annoying Call'
//             />
//             <FormControlLabel
//               value='Already Called This User'
//               control={<Radio />}
//               label='Already Called This User'
//             />
//             <FormControlLabel
//               value='Annoying Call1'
//               control={<Radio />}
//               label='Annoying Call'
//             />
//             <FormControlLabel
//               value='Annoying Call2'
//               control={<Radio />}
//               label='Annoying Call'
//             />
//           </RadioGroup>
//         </FormControl>
//       </ThemeProvider>
//       <div className='w-full flex justify-center items-center'>
//         <button onClick={() => setOpen(false)} style={{ outline: 'none' }}>
//           <img className='rounded' src={submit} alt='' />
//         </button>
//       </div>
//     </div>
//   </div>
// );
