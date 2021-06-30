import logo from '../../assets/images/xattorney-small-logo.svg';
import telephone from '../../assets/images/telephone-icon.svg';
import navmenu from '../../assets/images/navbar-menu.svg';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Drawer } from '@material-ui/core';

const NavigationBar = () => {
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
      className='w-full bg-secondarydark text-white text-3xl font-semibold h-full flex flex-col items-center space-y-8'
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Link
        className='bg-primarydark py-10 w-full flex justify-center items-center'
        to='/'
      >
        <img className='sm:w-full w-44' src={logo} alt='xattorney logo' />
      </Link>
      <div className='w-full flex flex-col items-start space-y-8 px-10'>
        <NavLink
          activeClassName='text-primarydark'
          exact={true}
          className='h-full flex justify-center items-center hover:underline'
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          activeClassName='text-primarydark'
          className='h-full flex justify-center items-center hover:underline'
          exact={true}
          to='/about-us'
        >
          About Us
        </NavLink>
        <NavLink
          activeClassName='text-primarydark'
          className='h-full flex justify-center items-center hover:underline'
          exact={true}
          to='/contact-us'
        >
          Contact Us
        </NavLink>
        <NavLink
          activeClassName='text-primarydark'
          to='/signin'
          className='h-full flex justify-center items-center hover:underline'
          exact={true}
        >
          Sign In
        </NavLink>
        <NavLink
          activeClassName='text-primarydark'
          to='/buy-now'
          className='h-full flex justify-center items-center hover:underline'
          exact={true}
        >
          Buy now
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      <section className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 h-34 text-white relative z-50'>
        {/* pre nav informatons */}
        <div className='flex justify-between items-center pt-7'>
          <Link to='/'>
            <img className='sm:w-full w-44' src={logo} alt='xattorney logo' />
          </Link>
          <div className='flex space-x-4 items-center'>
            <div className='sm:flex hidden space-x-2 items-center sm:border-r border-none border-primarydark border-opacity-40 pr-4'>
              <img src={telephone} alt='' />
              <a href='tel:+8801886012021' className='flex flex-col'>
                <span className='font-bold text-xs'>Contact Us</span>
                <span className='text-xs'>01834911911</span>
              </a>
            </div>
            <Link
              to='/signin'
              className='text-xs font-bold text-white hover:text-white bg-transparent hover:bg-secondarydark border border-white hover:border-white px-8 py-3 rounded transition-colors duration-200 ease-in-out sm:flex hidden'
            >
              Sign In
            </Link>
            <div className='lg:hidden flex'>
              <img
                className='sm:w-10'
                onClick={toggleDrawer('left', true)}
                src={navmenu}
                alt=''
              />
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

        {/* navbar menu lists */}
        <div className='h-12 bg-white rounded mt-4 text-primarydark lg:flex hidden items-center justify-between relative px-5'>
          <div className='flex items-center h-full text-sm pl-7'>
            <NavLink
              exact={true}
              className='h-full flex justify-center items-center'
              activeStyle={{
                marginLeft: '-26px',
                height: '55px',
                width: '91px',
                backgroundColor: '#C8AC48',
                borderRadius: '4px',
                color: '#ffffff',
              }}
              to='/'
            >
              Home
            </NavLink>

            <NavLink
              className='h-full flex justify-center items-center ml-16'
              activeStyle={{
                height: '55px',
                width: '91px',
                backgroundColor: '#C8AC48',
                borderRadius: '4px',
                color: '#ffffff',
              }}
              exact={true}
              to='/about-us'
            >
              About Us
            </NavLink>
            <NavLink
              className='h-full flex justify-center items-center ml-17'
              activeStyle={{
                height: '55px',
                width: '91px',
                backgroundColor: '#C8AC48',
                borderRadius: '4px',
                color: '#ffffff',
              }}
              exact={true}
              to='/contact-us'
            >
              Contact Us
            </NavLink>
          </div>
          <Link
            to='/buy-now'
            className='text-xs font-bold text-white hover:text-secondarydark bg-secondarydark hover:bg-white border border-secondarydark hover:border-secondarydark px-8 py-3 rounded transition-colors duration-200 ease-in-out'
          >
            Buy now
          </Link>
        </div>
      </section>
    </>
  );
};

export default NavigationBar;
