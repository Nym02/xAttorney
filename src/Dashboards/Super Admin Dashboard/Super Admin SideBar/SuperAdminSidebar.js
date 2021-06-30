import { Drawer } from '@material-ui/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import hamburger from '../../../assets/images/dashboard-hamburger.svg';
import sidebarimg from '../../../assets/images/sidebar-image.svg';
import verticalLogo from '../../../assets/images/vertical-logo.svg';
import logo from '../../../assets/images/xattorney-small-logo.svg';
import { SuperAdminSidebarData } from './SuperAdminSidebarData';
import SuperAdminSubMenu from './SuperAdminSubMenu';

const SuperAdminSidebar = () => {
  const [state, setState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ [anchor]: open });
  };

  const sideDrawerList = anchor => (
    <div
      style={{ boxShadow: '0px 4px 14px rgba(34, 37, 169, 0.4)' }}
      className='h-screen lg:w-76 flex fixed  overflow-x-hidden overflow-y-hidden rounded-r-3xl'
    >
      <div
        id='main-scroll-Style'
        className='bg-primarydark w-full h-full flex flex-col overflow-y-scroll justify-between items-center  rounded-r-3xl scrollbar'
      >
        <div className='w-full flex flex-col  items-center z-10'>
          {/* sidebar logo */}
          <div className='my-10 w-full flex justify-center items-center'>
            <Link
              onClick={() => window.location.replace('/')}
              className=' lg:px-8 lg:py-2 lg:rounded-xl'
            >
              <img src={logo} alt='' />
            </Link>
          </div>

          {/* sidebar menu */}
          <div className='w-full'>
            {SuperAdminSidebarData.map((item, key) => {
              return <SuperAdminSubMenu item={item} key={key} />;
            })}
          </div>
        </div>
      </div>
      {/* bg img */}
      <div
        style={{ top: '65%', width: '210%', left: '-35%' }}
        className='absolute opacity-20'
      >
        <img style={{ width: '190%' }} src={sidebarimg} alt='' />
      </div>
    </div>
  );

  return (
    <>
      <div
        style={{ boxShadow: '0px 4px 14px rgba(34, 37, 169, 0.4)' }}
        className='h-screen lg:w-76 lg:flex hidden fixed overflow-hidden  rounded-r-3xl'
      >
        <div
          id='main-scroll-Style'
          className='bg-primarydark overflow-y-scroll w-full flex flex-col justify-between items-center rounded-r-3xl'
        >
          <div className='w-full flex flex-col items-center z-10'>
            {/* sidebar logo */}
            <div className='my-10 w-full flex justify-center items-center'>
              <Link
                onClick={() => window.location.replace('/')}
                className=' lg:px-8 lg:py-2 lg:rounded-xl'
              >
                <img src={logo} alt='' />
              </Link>
            </div>

            {/* sidebar menu */}
            <div className='w-full'>
              {SuperAdminSidebarData.map((item, key) => {
                return <SuperAdminSubMenu item={item} key={key} />;
              })}
            </div>
          </div>
        </div>
        {/* bg img */}
        <div
          style={{ top: '65%', width: '210%', left: '-35%' }}
          className='absolute opacity-20'
        >
          <img style={{ width: '190%' }} src={sidebarimg} alt='' />
        </div>
      </div>

      <div className='lg:hidden flex fixed -ml-2'>
        <div className='flex flex-col items-center'>
          <button
            onClick={toggleDrawer('left', true)}
            className='mt-10'
            style={{ outline: 'none' }}
          >
            <img className='w-20' src={hamburger} alt='' />
          </button>
          <div>
            <img src={verticalLogo} alt='' />
          </div>
        </div>
      </div>
      <Drawer
        anchor='left'
        open={state.left}
        onOpen={toggleDrawer('left', true)}
        onClose={toggleDrawer('left', false)}
      >
        {sideDrawerList('left')}
      </Drawer>
    </>
  );
};

export default SuperAdminSidebar;
