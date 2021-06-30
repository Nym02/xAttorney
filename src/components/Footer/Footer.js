import googleplay from '../../assets/images/google-play-badge.png';
import youtube from '../../assets/images/youtube.svg';
import facebook from '../../assets/images/facebook.svg';
import linkedin from '../../assets/images/linkedin.svg';
import twitter from '../../assets/images/twitter.svg';
import logo from '../../assets/images/xattorney-small-logo.svg';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import heartFilled from '@iconify-icons/ant-design/heart-filled';

const Footer = () => {
  return (
    <>
      <div className='bg-deepdark text-white flex flex-col items-center space-y-8 pt-16 pb-15'>
        <div className='flex items-center justify-center'>
          {/* <img src={appstore} alt='' /> */}
          <img className='w-44' src={googleplay} alt='' />
        </div>
        <div className='flex flex-col space-y-4 items-center'>
          <div>
            <img src={logo} alt='' />
          </div>
          <span className='text-center'>
            © 2021 Projext X Ltd. All rights reserved.{' '}
          </span>
        </div>
        <span
          style={{ height: '0.3px' }}
          className='inline-block w-full bg-gray-500 mt-2 mb-4'
        />
        <ul className='flex sm:flex-row flex-col items-center justify-center sm:space-x-8 space-x-0 sm:space-y-0 space-y-8 sm:text-base text-sm'>
          <li>
            <Link className='font-bold text-center' to='/about-us'>
              About Us
            </Link>
          </li>
          <li>
            <Link className='font-bold text-center' to='/terms-and-conditions'>
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link className='font-bold text-center' to='/privacy-policy'>
              Privacy Policy
            </Link>
          </li>

          {/* <li>
            <div
              onClick={() => window.open('https://projectx.com.bd/', '_blank')}
              className='font-bold cursor-pointer'
            >
              Project X Ltd.
            </div>
          </li> */}
        </ul>
        <div>
          <h1 className='flex items-center space-x-2 -mt-4'>
            <span>Made with </span>
            <span>
              <Icon className='text-red-700 animate-pulse' icon={heartFilled} />
            </span>
            <span>in</span>
            <span
              onClick={() => window.open('https://projectx.com.bd/', '_blank')}
              className='text-secondarydark text-xl'
            >
              Project X Ltd
            </span>
            .
          </h1>
        </div>
        <div className='flex justify-center items-center space-x-4'>
          <div
            className='cursor-pointer'
            onClick={() =>
              window.open(
                'https://www.facebook.com/xattorneyapp-110814631149620/',
                '_blank'
              )
            }
          >
            <img src={facebook} alt='' />
          </div>
          <div className='cursor-pointer'>
            <img src={linkedin} alt='' />
          </div>
          <div className='cursor-pointer'>
            <img src={twitter} alt='' />
          </div>
          <div className='cursor-pointer'>
            <img src={youtube} alt='' />
          </div>
        </div>
        <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 mt-48 flex flex-col justify-center items-center w-full'>
          <h1 className='text-white text-base text-center border-b border-lightSilver'>
            Payment Channels
          </h1>
          <div className='w-full'>
            <img src='/SSLCommerz-Pay-With-logo-All-Size-03.png' alt='' />
          </div>
        </div>
        <div>
          <h1>Web App Version: β-1.0.26</h1>
        </div>
      </div>
    </>
  );
};

export default Footer;
