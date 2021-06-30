import DateFnsUtils from '@date-io/date-fns';
import editIcon from '@iconify-icons/akar-icons/edit';
import eyeIcon from '@iconify-icons/akar-icons/eye';
import trashCan from '@iconify-icons/akar-icons/trash-can';
import clockCircleOutlined from '@iconify-icons/ant-design/clock-circle-outlined';
import overflowMenuVertical from '@iconify-icons/carbon/overflow-menu-vertical';
import { Icon } from '@iconify/react';
import { Divider, Modal, ThemeProvider } from '@material-ui/core';
import { FormControl } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Menu } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { InputLabel } from '@material-ui/core';
import { FormHelperText } from '@material-ui/core';
import { Select } from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';
import { print } from 'graphql';
import gql, { resetCaches } from 'graphql-tag';
import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import addNow from '../../../../assets/images/add-now.svg';
import addAssociate from '../../../../assets/images/add-staff.svg';
// import filter from '../../../../../assets/images/filter.svg';
// import SearchIcon from '@material-ui/icons/Search';
import addVroucher from '../../../../assets/images/addVroucher.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import theme from '../../../../theme';
import { MAIN_API } from '../../../../Utils/APIs';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import warn from '../../../../assets/images/warn.svg';
import { AdvocateApiHelper } from '../../../../Utils/AdvocateApiHelper';
import numToWords from 'num-to-words';

const AdvocateMyExpenseTodayComp = () => {
  const [paymentDate, setPaymentDate] = useState(new Date());
  const [deleteModal, setDeleteModal] = useState(false);
  const [expenseView, setExpenseView] = useState(false);
  const [showExpenseDetails, setShowExpenseDetails] = useState(false);
  const { advocateExpense, setAdvocateExpense } = useContext(DataContext);
  const [expenseId, setExpenseId] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { addToast } = useToasts();

  const [anchorEl, setAnchorEl] = useState(null);
  const [payMode, setPayMode] = useState('');

  const handleClick = (e, id) => {
    setAnchorEl(e.currentTarget);
    setExpenseId(id);
  };
  const viewExpenseDetailsById = advocateExpense?.find(
    ({ id }) => id === expenseId
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  //handling payment date
  const handlePaymentDate = date => {
    setPaymentDate(date);
  };
  //prevent form submit on enter

  const preventFormSubmit = e => {
    if (e.key == 'Enter') {
      e.preventDefault();
    }
  };

  //submitting form

  const onSubmit = data => {
    const payment = data.paymentAmount;

    let expenseData = {};
    if (payMode === 'BANK') {
      expenseData = {
        dateTime: paymentDate,
        head: data.expenseHead,
        amount: parseFloat(data.paymentAmount),
        details: data.description,
        paymentDetails: {
          payMode: data.payementMode,
          note: data.note,
          bankPayment: {
            name: data.bankName,
            branch: data.branchName,
            accountNumber: data.accountNumber,
            depositSlipNumber: data.depositSlipNumber,
          },
        },
      };
    } else if (payMode === 'CASH') {
      expenseData = {
        dateTime: paymentDate,
        head: data.expenseHead,
        amount: parseFloat(data.paymentAmount),
        details: data.description,
        paymentDetails: {
          payMode: data.payementMode,
          note: data.note,
          cashPayment: {
            place: data.place,
          },
        },
      };
    } else if (payMode === 'MOBILE_BANKING') {
      expenseData = {
        dateTime: paymentDate,
        head: data.expenseHead,
        amount: parseFloat(data.paymentAmount),
        details: data.description,
        paymentDetails: {
          payMode: data.payementMode,
          note: data.note,
          mobileBankingPayment: {
            platform: data.platform,
            transactionId: data.transactionId,
            sentFromMobile: data.sentFromMobile,
            sentToMobile: data.sentToMobile,
          },
        },
      };
    }

    const newExpenseData = JSON.stringify(expenseData);
    const finalExpenseData = newExpenseData.replace(/"([^"]+)":/g, '$1:');
    const createExpenseQuery = gql`
      mutation {
        createExpense(
          expense: ${finalExpenseData}
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
            invoiceId
            dateTime
            head
            amount
            details
            paymentDetails {
              payMode
              note
              bankPayment {
                name
                branch
                accountNumber
                depositSlipNumber
              }
            }
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(createExpenseQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        const { createExpense } = res?.data?.data;
        if (createExpense !== null) {
          const { code, data, errors } = res?.data?.data.createExpense;

          if (code === 200 && data !== null) {
            AdvocateApiHelper.advExpense
              .getExpense()
              .then(res => {
                setAdvocateExpense(
                  res?.data?.data?.getExpenseList?.data?.expenseList
                );
              })
              .then(() => window.location.reload())
              .then(() => setExpenseView(false))
              .then(() => {
                addToast('Expense Created Successfully', {
                  appearance: 'success',
                  autoDismiss: true,
                });
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

    handleClose();
  };

  //delete expense
  const deleteExpense = () => {
    const onSuccessDeleteExpense = () => {
      AdvocateApiHelper.advExpense
        .getExpense()
        .then(res => {
          setAdvocateExpense(
            res?.data?.data?.getExpenseList?.data?.expenseList
          );
          addToast('Expense has been deleted succesfully', {
            appearance: 'success',
            autoDismiss: true,
          });
        })
        .then(() =>
          setTimeout(() => {
            window.location.reload();
          }, 200)
        )
        .catch();
    };
    const onErrorDeleteExpense = error => {};

    AdvocateApiHelper.advExpense
      .deleteExpense(expenseId)
      .then(res => {
        const { deleteExpense } = res?.data?.data;
        if (deleteExpense !== null) {
          const { code, data, errors } = res?.data?.data?.deleteExpense;
          if (code == 200) {
            return onSuccessDeleteExpense();
          } else {
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
      .catch(onErrorDeleteExpense);

    setAnchorEl(null);
    setDeleteModal(false);
    handleClose();
  };

  let newExpenseData = [];
  advocateExpense.map((item, idx) => {
    if (
      moment(item?.dateTime).format('DD-MM-YYYY') ===
      moment(new Date()).format('DD-MM-YYYY')
    )
      newExpenseData.push({
        sl: idx + 1,
        paymentDate: moment(item?.dateTime).format('DD-MM-YYYY'),
        partyName: item?.head,
        paymentMode: item?.paymentDetails?.payMode,
        provider: item?.paymentDetails?.bankPayment?.name,
        amount: item?.amount,
        id: item?.id,
      });
  });

  let finalTotalEarning = 0;

  newExpenseData?.map(
    (item, index) =>
      (finalTotalEarning =
        parseFloat(finalTotalEarning) + parseFloat(item?.amount))
  );

  const columns = [
    // {
    //   name: 'sl',
    //   label: 'Voucher No',
    //   options: {
    //     filter: true,
    //     sort: true,
    //   },
    // },
    {
      name: 'paymentDate',
      label: 'Payment Date',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'partyName',
      label: 'Party Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'paymentMode',
      label: 'Payment Mode',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'provider',
      label: 'Provider',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'amount',
      label: 'Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: amount => {
          return (
            <div>
              {amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          );
        },
      },
    },
    {
      name: 'id',
      label: 'Action',
      options: {
        filter: true,
        sort: false,
        customBodyRender: value => {
          return (
            <div>
              <Button
                style={{ outline: 'none' }}
                aria-controls='simple-menu'
                aria-haspopup='true'
                onClick={e => handleClick(e, value)}
              >
                <Icon
                  className='text-2xl text-purple-400'
                  icon={overflowMenuVertical}
                />
              </Button>
              <Menu
                id='simple-menu'
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setShowExpenseDetails(true)}
                >
                  <Icon icon={eyeIcon} />
                  <span>View</span>
                </MenuItem>
                <MenuItem
                  className='flex space-x-2 items-center'
                  onClick={() => setDeleteModal(true)}
                >
                  <Icon icon={trashCan} />
                  <span>Delete</span>
                </MenuItem>
              </Menu>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  //======================================================================
  //========================= Create expense modal =========================
  //======================================================================
  const handleCloseModal = () => {
    setExpenseView(false);
    reset();
  };
  const expenseViewModal = (
    <div
      className='xl:w-2/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        maxHeight: '80%',
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add Expense</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => handleCloseModal()}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      {/* main content */}
      <div
        id='main-scroll-Style'
        className='w-full px-12 flex flex-col space-y-6 pb-8 overflow-y-scroll scrollbar'
      >
        <div className='w-full flex justify-center items-center space-x-6'>
          <form
            className='w-full px-12 flex flex-col space-y-6 pb-8'
            onSubmit={handleSubmit(onSubmit)}
            onKeyPress={e => preventFormSubmit(e)}
          >
            <h6 className='font-bold'>Basic Information</h6>
            <ThemeProvider theme={theme}>
              <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    className='bg-lightSilver rounded text-white w-full'
                    disableToolbar
                    variant='inline'
                    inputVariant='outlined'
                    color='secondary'
                    format='yyyy/MM/dd'
                    label='Date'
                    value={paymentDate}
                    onChange={handlePaymentDate}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
                <FormControl error={errors?.expenseHead} className='w-full'>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Expense Head*'
                    id='outlined-basic'
                    name='expenseHead'
                    variant='outlined'
                    color='secondary'
                    error={errors?.expenseHead}
                    // onChange={handleInputChange}
                    {...register('expenseHead', { required: true })}
                  />
                  <FormHelperText>
                    {errors?.expenseHead?.type === 'required' &&
                      'Expense Head is required.'}
                  </FormHelperText>
                </FormControl>
              </div>
              <div className='w-full flex lg:flex-row flex-col items-start justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                <FormControl error={errors?.paymentAmount} className='w-full'>
                  <TextField
                    className='bg-lightSilver rounded text-white w-full'
                    label='Payment Amount*'
                    id='outlined-basic'
                    name='payementAmount'
                    variant='outlined'
                    color='secondary'
                    // onChange={handleInputChange}
                    error={errors?.paymentAmount}
                    {...register('paymentAmount', { required: true })}
                  />
                  <FormHelperText>
                    {errors?.paymentAmount?.type === 'required' &&
                      'Payment Amount is required'}
                  </FormHelperText>
                </FormControl>

                <TextField
                  className='bg-lightSilver rounded text-white w-full'
                  label='Description'
                  id='outlined-basic'
                  name='description'
                  variant='outlined'
                  dense={true}
                  color='secondary'
                  {...register('description', { required: false })}
                  // onChange={handleInputChange}
                />
              </div>

              <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-y-0 space-y-6'>
                <FormControl
                  className='w-full'
                  variant='outlined'
                  error={errors.payementMode}
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Payment Mode*
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    label='Payment Mode*'
                    id='demo-simple-select-outlined'
                    className='bg-lightSilver rounded text-white w-full'
                    color='secondary'
                    {...register('payementMode', { required: true })}
                    onChange={e => setPayMode(e.target.value)}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value='BANK'>BANK</MenuItem>
                    <MenuItem value='CASH'>CASH</MenuItem>
                    <MenuItem value='MOBILE_BANKING'>MOBILE BANKING</MenuItem>
                  </Select>
                  <FormHelperText
                    style={{ color: 'red !important', marginLeft: '0px' }}
                  >
                    {errors.payementMode?.type === 'required' &&
                      'Payement Mode is required'}
                  </FormHelperText>
                </FormControl>

                {/* <TextField
                  className="bg-lightSilver rounded text-white w-full"
                  label="Relation"
                  id="outlined-basic"
                  name="relation"
                  variant="outlined"
                  dense={true}
                  color="secondary"
                  {...register("erelation", { required: false })}
                  // onChange={handleInputChange}
                /> */}
              </div>
              {payMode === 'BANK' ? (
                <>
                  <h6 className='font-bold'>Bank Account Info</h6>
                  <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Bank Name'
                      id='outlined-basic'
                      name='ename'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('bankName', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Branch Name'
                      id='outlined-basic'
                      name='branchName'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('branchName', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Account Number'
                      id='outlined-basic'
                      name='accountNumber'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('accountNumber', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                  </div>
                  <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Deposit Slip Number'
                      id='outlined-basic'
                      name='depositSlipNumber'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('depositSlipNumber', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Note'
                      id='outlined-basic'
                      name='note'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('note', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
              {payMode === 'CASH' ? (
                <>
                  <h6 className='font-bold'>Cash Payment Info</h6>
                  <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Place'
                      id='outlined-basic'
                      name='place'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('place', { required: false })}
                      error={errors.place}
                      helperText={
                        errors.place?.type === 'required' && 'Place is required'
                      }
                    />
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Note'
                      id='outlined-basic'
                      name='note'
                      variant='outlined'
                      color='secondary'
                      error={errors?.note}
                      // onChange={handleInputChange}
                      {...register('note', { required: false })}
                      helperText={
                        errors.note?.type === 'required' && 'Note is required'
                      }
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
              {payMode === 'MOBILE_BANKING' ? (
                <>
                  <h6 className='font-bold'>Mobile Banking Info</h6>
                  <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <FormControl
                      className='w-full'
                      variant='outlined'
                      error={errors.platform}
                    >
                      <InputLabel id='demo-simple-select-outlined-label'>
                        Platform*
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-outlined-label'
                        id='demo-simple-select-outlined'
                        label='Platform*'
                        className='bg-lightSilver rounded text-white w-full'
                        color='secondary'
                        {...register('platform', { required: true })}
                        // onChange={e => setPayMode(e.target.value)}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='BKASH'>bKash</MenuItem>
                        <MenuItem value='ROCKET'>Rocket</MenuItem>
                      </Select>
                      <FormHelperText style={{ color: 'red !important' }}>
                        {errors.platform?.type === 'required' &&
                          'Payement Mode is required'}
                      </FormHelperText>
                    </FormControl>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Transaction ID'
                      id='outlined-basic'
                      name='transactionId'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('transactionId', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                  </div>
                  <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Sent From'
                      id='outlined-basic'
                      name='sentFromMobile'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('sentFromMobile', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Sent To'
                      id='outlined-basic'
                      name='sentToMobile'
                      variant='outlined'
                      color='secondary'
                      // onChange={handleInputChange}
                      {...register('sentToMobile', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                  </div>
                  <div className='w-full flex lg:flex-row flex-col items-center justify-between lg:space-x-8 space-x-0 lg:space-y-0 space-y-6'>
                    <TextField
                      className='bg-lightSilver rounded text-white w-full'
                      label='Note'
                      id='outlined-basic'
                      name='note'
                      variant='outlined'
                      color='secondary'
                      style={{ width: '49%' }}
                      // onChange={handleInputChange}
                      {...register('note', { required: false })}
                      // error={errors.ename}
                      // helperText={
                      //   errors.ename?.type === 'required' &&
                      //   'Emergency Contact Name is required'
                      // }
                    />
                  </div>
                </>
              ) : (
                <></>
              )}
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
    </div>
  );

  // -------------------------------- delete modal --------------------------------
  const deleteTableData = (
    <div
      className='xl:w-1/3 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Confirm Delete</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setDeleteModal(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col space-y-3 justify-center items-center'>
        <div className='-mt-7'>
          <img src={warn} alt='' />
        </div>
        <h1 className='text-xl'>This action is not reversible.</h1>
        <h1 className='text-xl'>Are you sure to delete this?</h1>
      </div>
      <div className='w-full flex justify-center items-center space-x-6 pb-6'>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-primarydark text-white text-sm font-semibold bg-primarydark h-11 w-48 capitalize'
          onClick={() => deleteExpense()}
        >
          Confirm
        </button>
        <button
          style={{ outline: 'none' }}
          className='rounded-md border border-red-800 text-white text-sm font-semibold bg-red-800 h-11 w-48 capitalize'
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );

  //======================================================
  //=============== show expense data ====================
  //======================================================
  const textNumber = viewExpenseDetailsById?.amount;

  const showExpenseDetailsModal = (
    <div
      className='xl:w-2/5 lg:w-1/2 md:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-20 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Overview</span>
        <div style={{ top: '-20%', left: '98%' }} className='absolute w-8'>
          <img
            onClick={() => setShowExpenseDetails(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex flex-col space-y-3 justify-center items-center w-full px-8 pb-10'>
        <div className='flex items-start justify-between space-x-10 w-full -mt-10'>
          <div className='flex flex-col space-y-3 space-x-3 items-start'>
            <h1 className='font-bold'>Party Info</h1>
            <div className='flex space-x-10'>
              <div className='flex flex-col space-y-1 space-x-3'>
                <h1 className='font-light text-sm'>Voucher Id</h1>
                <span className='text-deepdark text-base font-medium'>
                  {viewExpenseDetailsById?.invoiceId}
                </span>
              </div>
              <div className='flex flex-col space-y-1 space-x-3'>
                <h1 className='font-light text-sm'>Payment Mode</h1>
                <span className='text-deepdark text-base font-medium'>
                  {viewExpenseDetailsById?.paymentDetails?.payMode}
                </span>
              </div>
            </div>
            <div className='flex flex-col space-y-1 space-x-3'>
              <h1 className='font-light text-sm'>Description</h1>
              <span className='text-deepdark text-base font-medium'>
                {viewExpenseDetailsById?.details}
              </span>
            </div>
          </div>
          <div className='flex items-start space-x-2'>
            <h1 className='font-bold'>Date:</h1>
            <span className='font-bold'>
              {moment(viewExpenseDetailsById?.dateTime).format('DD-MM-YYYY')}
            </span>
          </div>
        </div>
        <div className='w-full'>
          <div className='flex flex-col space-y-2'>
            <div className='flex justify-start items-center font-bold border border-deepdark rounded px-2 space-x-2'>
              <h1 className='w-1/5'>Sl. No.</h1>
              <h1 className='w-1/5'>Expense Head</h1>
              <h1 className='w-1/5'>Amount</h1>
              <h1 className='w-1/5'>Mode </h1>
              <h1 className='w-1/5'>Total</h1>
            </div>
            <div className='flex justify-end items-start px-2 space-x-2 text-sm border-b border-deepdark pb-2'>
              <h1 className='w-1/5'>1.</h1>
              <h1 className='w-1/5'>{viewExpenseDetailsById?.head}</h1>
              <h1 className='w-1/5'>
                {viewExpenseDetailsById?.amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </h1>
              <h1 className='w-1/5'>
                {viewExpenseDetailsById?.paymentDetails?.payMode}
              </h1>
              <h1 className='w-1/5'>
                {viewExpenseDetailsById?.amount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              </h1>
            </div>
          </div>
          <div className='flex items-center space-x-1 mt-3 italic'>
            <h1 className='font-bold'>In Text: </h1>
            <span className='capitalize '>
              Tk. {numToWords(textNumber)} Only
            </span>
          </div>
          {viewExpenseDetailsById?.paymentDetails?.payMode === 'BANK' && (
            <>
              <div className='mt-6 font-bold'>
                <h1>Bank Account Info</h1>
              </div>
              <div className='flex flex-col space-y-2'>
                <div className='flex justify-start items-center font-bold border border-deepdark rounded px-2 space-x-2 text-sm'>
                  <h1 className='w-1/5'>Sl. No.</h1>
                  <h1 className='w-1/5'>Account Number</h1>
                  <h1 className='w-1/5'>Branch Name</h1>
                  <h1 className='w-1/5'>Bank Name</h1>
                  <h1 className='w-1/5'>Description</h1>
                </div>
                <div className='flex justify-end items-start px-2 space-x-2 text-sm border-b border-deepdark pb-2'>
                  <h1 className='w-1/5'>1.</h1>
                  <h1 className='w-1/5'>
                    {
                      viewExpenseDetailsById?.paymentDetails?.bankPayment
                        ?.accountNumber
                    }
                  </h1>
                  <h1 className='w-1/5'>
                    {
                      viewExpenseDetailsById?.paymentDetails?.bankPayment
                        ?.branch
                    }
                  </h1>
                  <h1 className='w-1/5'>
                    {viewExpenseDetailsById?.paymentDetails?.bankPayment?.name}
                  </h1>
                  <h1 className='w-1/5'>
                    {viewExpenseDetailsById?.paymentDetails?.note}
                  </h1>
                </div>
              </div>
            </>
          )}

          {viewExpenseDetailsById?.paymentDetails?.payMode ===
            'MOBILE_BANKING' && (
            <>
              <div className='mt-6 font-bold'>
                <h1>Transaction Info</h1>
              </div>
              <div className='flex flex-col space-y-2'>
                <div className='flex justify-start items-center font-bold border border-deepdark rounded px-2 space-x-2 text-sm'>
                  <h1 className='w-1/5'>Sl. No.</h1>
                  <h1 className='w-1/5'>Transaction Id</h1>
                  <h1 className='w-1/5'>Platform</h1>
                  <h1 className='w-1/5'>From</h1>
                  <h1 className='w-1/5'>To</h1>
                </div>
                <div className='flex justify-start items-start px-2 space-x-2 text-sm border-b border-deepdark pb-2'>
                  <h1 className='w-1/5'>1.</h1>
                  <h1 className='w-1/5 flex flex-wrap'>
                    {
                      viewExpenseDetailsById?.paymentDetails
                        ?.mobileBankingPayment?.transactionId
                    }
                  </h1>
                  <h1 className='w-1/5'>
                    {
                      viewExpenseDetailsById?.paymentDetails
                        ?.mobileBankingPayment?.platform
                    }
                  </h1>
                  <h1 className='w-1/5'>
                    {
                      viewExpenseDetailsById?.paymentDetails
                        ?.mobileBankingPayment?.sentFromMobile
                    }
                  </h1>
                  <h1 className='w-1/5'>
                    {
                      viewExpenseDetailsById?.paymentDetails
                        ?.mobileBankingPayment?.sentToMobile
                    }
                  </h1>
                </div>
              </div>
            </>
          )}
          <div
            className={`text-sm text-center flex flex-col space-y-2 mt-6 ${
              viewExpenseDetailsById?.paymentDetails?.payMode !== 'BANK' &&
              viewExpenseDetailsById?.paymentDetails?.payMode !==
                'MOBILE_BANKING'
                ? 'border-t border-deepdark pt-6'
                : ''
            }`}
          >
            <h1>
              This is computer generated copy. No signature is required for
              company.
            </h1>
            <h1>
              This Voucher was generated with the help of Project X. To learn
              more, Visit - projectx.com.bd.{' '}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className='flex items-center justify-end h-10 -mt-16'>
        <button
          style={{ outline: 'none' }}
          onClick={() => setExpenseView(true)}
        >
          <img src={addVroucher} alt='' />
        </button>
      </div>

      <div className='flex items-center justify-end font-semibold space-x-2'>
        <h1 className='text-xl text-primarydark'>Total Expenses:</h1>
        <span className='text-secondarydark text-xl'>
          {finalTotalEarning.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}/-
          Taka
        </span>
      </div>
      <MUIDataTable
        title={'Expenses'}
        data={newExpenseData}
        columns={columns}
        options={options}
      />
      {/* <Modal
        open={createUser}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addNewUser}
      </Modal> */}
      <Modal
        open={showExpenseDetails}
        onClose={() => setShowExpenseDetails(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {showExpenseDetailsModal}
      </Modal>
      <Modal
        open={deleteModal}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
      </Modal>
      <Modal
        open={expenseView}
        onClose={() => setExpenseView(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {expenseViewModal}
      </Modal>
    </>
  );
};

export default AdvocateMyExpenseTodayComp;
