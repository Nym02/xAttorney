import screens from '../../../assets/images/screens.svg';
import BuyNowButton from '../../Typographys/Buttons/BuyNowButton';
import scale from '../../../assets/images/scale.svg';
import scaleSecond from '../../../assets/images/scale-second.svg';
import hammer from '../../../assets/images/hammer.svg';
import hammer2 from '../../../assets/images/hammer2.svg';
import { Link } from 'react-router-dom';

const AboutUsHeroSection = () => {
  return (
    <>
      <div className='relative h-100 flex justify-center '>
        {/* <div
          style={{ zIndex: '-10' }}
          className='flex items-center justify-center absolute -mt-34 w-full'
        >
          <img className='w-full h-full' src={hero} alt='' />
        </div> */}
        <div
          style={{ zIndex: '-10', height: '779.41px' }}
          className='flex absolute -mt-34 w-full'
        >
          <div className='bg-deepdark w-7/12 relative'>
            <img
              style={{ zIndex: '1', top: '52%', left: '64%' }}
              className='absolute lg:flex hidden'
              src={scale}
              alt=''
            />
            <img
              style={{ zIndex: '1', top: '22%', left: '27%' }}
              className='absolute lg:flex hidden'
              src={scaleSecond}
              alt=''
            />
            <img
              style={{ zIndex: '1', top: '74%', left: '20%' }}
              className='absolute lg:flex hidden'
              src={hammer}
              alt=''
            />
          </div>
          <div className='bg-secondarydark w-5/12 relative'>
            <img
              style={{ zIndex: '1', top: '35%', left: '56%' }}
              className='absolute lg:flex hidden w-24'
              src={scale}
              alt=''
            />
            <img
              style={{ zIndex: '1', top: '35%', left: '13%' }}
              className='absolute lg:flex hidden'
              src={scaleSecond}
              alt=''
            />
            <img
              style={{ zIndex: '1', top: '63%', left: '18%' }}
              className='absolute lg:flex hidden'
              src={hammer2}
              alt=''
            />
          </div>
        </div>
        {/* -------------main content--------------- */}
        <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 relative'>
          {/* texts and staff */}
          <div className='flex justify-between items-center xl:mt-14 -mt-14 relative'>
            <div className='flex flex-col items-center w-full pt-14'>
              <div className='flex flex-col space-y-4 w-full'>
                <span className='lg:text-base text-sm text-secondarydark'>
                  Where You Got Justice
                </span>
                <h1 className='2xl:text-5xl xl:text-4xl text-2xl text-white font-bold'>
                  Get Your Personal Manager
                </h1>
                <div class='flex items-center'>
                  <span class='inline-block h-1 w-28 bg-secondarydark mt-2 mb-4' />
                  <span class='inline-block h-1 w-48 bg-white mt-2 mb-4' />
                </div>
                <p className='text-white lg:text-base text-sm'>
                  The platform enables advocates, law firms and other businesses
                  in the <br /> legal industry to track important deadlines,
                  manage client cases and <br /> documents, bill clients, and
                  accept payments.
                </p>
                <Link
                  to='/buy-now'
                  className='flex justify-start items-center z-30'
                >
                  <BuyNowButton />
                </Link>
              </div>
              <div className='self-end flex xl:justify-end justify-center w-full xl:-mt-44 mt-0'>
                <img src={screens} alt='' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsHeroSection;
