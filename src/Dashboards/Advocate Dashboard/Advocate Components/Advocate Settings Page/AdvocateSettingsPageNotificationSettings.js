import { Divider, ThemeProvider } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { useState } from 'react';
import theme from '../../../../theme';

const AdvocateSettingsPageNotificationSettings = () => {
  const [state, setState] = useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
    checkedD: true,
    checkedE: true,
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <>
      <Paper className='w-full rounded-md' elevation={4}>
        <div className='w-full bg-white rounded-md h-104 text-primarydark'>
          <div className='h-13 flex justify-start items-center pl-4 pr-12'>
            <h1 className='font-semibold text-lg'>Notification Settings</h1>
          </div>
          <Divider />

          {/* name settings */}
          <ThemeProvider theme={theme}>
            <div className='h-16 flex justify-start items-center pl-4 pr-12 w-full'>
              <div className='flex items-center justify-between space-x-8 w-full'>
                <span className='w-4/5 flex justify-start items-center'>
                  Allow Push Notification From XATTORNEY
                </span>
                <Switch
                  checked={state.checkedA}
                  onChange={handleChange}
                  color='primary'
                  name='checkedA'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
            </div>
            <Divider />

            {/* phone settings */}
            <div className='h-16 flex justify-start items-center pl-4 pr-12 w-full'>
              <div className='flex items-center justify-between space-x-8 w-full'>
                <span className='w-4/5 flex justify-start items-center'>
                  Send Auto SMS To Your Client’s About Court Attend Date
                </span>
                <Switch
                  checked={state.checkedB}
                  onChange={handleChange}
                  color='primary'
                  name='checkedB'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
            </div>
            <Divider />

            {/* email settings */}
            <div className='h-16 flex justify-start items-center pl-4 pr-12 w-full'>
              <div className='flex items-center justify-between space-x-8 w-full'>
                <span className='w-4/5 flex justify-start items-center'>
                  Send Auto Email To Your Client’s About Court Attend Date
                </span>
                <Switch
                  checked={state.checkedC}
                  onChange={handleChange}
                  color='primary'
                  name='checkedC'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
            </div>
            <Divider />
            <div className='h-16 flex justify-start items-center pl-4 pr-12 w-full'>
              <div className='flex items-center justify-between space-x-8 w-full'>
                <span className='w-4/5 flex justify-start items-center'>
                  Notify About Future Updates and News
                </span>
                <Switch
                  checked={state.checkedD}
                  onChange={handleChange}
                  color='primary'
                  name='checkedD'
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              </div>
            </div>
            <Divider />
          </ThemeProvider>
        </div>
      </Paper>
    </>
  );
};

export default AdvocateSettingsPageNotificationSettings;
