import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  ThemeProvider,
} from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useState } from 'react';
import addNewPlans from '../../../../../assets/images/add-new-plans.svg';
import modalClose from '../../../../../assets/images/modal-close.svg';
import addNow from '../../../../../assets/images/add-now.svg';
import theme from '../../../../../theme';
import SuperAdminPlansPagePausedPlanMonthlyComp from './SuperAdminPlansPagePausedPlanMonthlyComp';
import SuperAdminPlansPagePausedPlanYearlyyComp from './SuperAdminPlansPagePausedPlanYearlyyComp';

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

const SuperAdminPlansPagePausedPlanComponents = () => {
  const [toggle, setToggle] = useState(1);
  const toggleChange = index => {
    setToggle(index);
  };

  const [open, setOpen] = useState(false);

  const addNewPlan = (
    <div
      className='2xl:w-2/3 w-full h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Add A Plan</span>
        <div style={{ top: '-32%', left: '98.8%' }} className='absolute w-8'>
          <img
            onClick={() => setOpen(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>

      {/* main content */}
      <div className='w-full px-12 flex flex-col space-y-6 pb-8'>
        <ThemeProvider theme={theme}>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Plan Name'
              id='outlined-basic'
              name='text'
              variant='outlined'
              color='secondary'
              required
            />
            <FormControl className='w-full' variant='outlined'>
              <InputLabel id='demo-simple-select-outlined-label'>
                Plan Mode
              </InputLabel>
              <Select
                labelId='demo-simple-select-outlined-label'
                id='demo-simple-select-outlined'
                label='District'
                className='bg-lightSilver rounded text-white w-full'
                color='secondary'
              >
                <MenuItem value=''>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Monthly</MenuItem>
                <MenuItem value={20}>Yearly</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Regular Price'
              id='outlined-basic'
              name='number'
              type='number'
              variant='outlined'
              color='secondary'
              required
            />
            <TextField
              className='bg-lightSilver rounded text-white w-full'
              label='Discounted Price'
              id='outlined-basic'
              name='number'
              type='number'
              variant='outlined'
              color='secondary'
              required
            />
          </div>
          <div className='w-full flex items-center justify-between space-x-8'>
            <div className='flex flex-col space-y-2 w-full h-full'>
              <h1 className='text-primarydark font-medium'>
                Feature List (Max Five)
              </h1>
              <ChipInput
                chipRenderer={chipRenderer}
                className='bg-lightSilver rounded text-white w-full'
                label='Add Feature List'
                variant='outlined'
                color='secondary'
              />
            </div>
            <div className='flex flex-col space-y-2 w-full h-full'>
              <h1 className='text-primarydark font-medium'>
                Benefit List (Max Five)
              </h1>
              <ChipInput
                chipRenderer={chipRenderer}
                className='bg-lightSilver rounded text-white w-full'
                label='Add Benefit List'
                variant='outlined'
                color='secondary'
              />
            </div>
          </div>
        </ThemeProvider>

        <div className='w-full flex justify-center items-center space-x-6'>
          <button
            style={{ outline: 'none' }}
            className='rounded-md border border-secondarydark text-secondarydark text-sm font-semibold bg-white h-9 w-48'
          >
            Reset
          </button>
          <button style={{ outline: 'none' }}>
            <img src={addNow} alt='' />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className='flex flex-col space-y-6'>
        <div className='flex justify-between border-b border-deepIndigo border-opacity-60'>
          <div className='flex items-center justify-start space-x-4 text-base font-medium -mb-4   '>
            <div
              onClick={() => toggleChange(1)}
              className={
                toggle === 1
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>Yearly</span>
            </div>
            <div
              onClick={() => toggleChange(2)}
              className={
                toggle === 2
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>Monthly</span>
            </div>
          </div>
          {/* datepicker */}
          <button
            style={{ outline: 'none' }}
            onClick={() => setOpen(true)}
            className='mb-1'
          >
            <img src={addNewPlans} alt='' />
          </button>
        </div>
        {/* toggle components */}
        <div>
          {/* toggle 1 new users */}
          <div
            className={
              toggle === 1 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <SuperAdminPlansPagePausedPlanYearlyyComp />
          </div>
          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 2 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <SuperAdminPlansPagePausedPlanMonthlyComp />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {addNewPlan}
      </Modal>
    </>
  );
};

export default SuperAdminPlansPagePausedPlanComponents;
