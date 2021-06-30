import features from '../../../assets/images/feature-group.svg';
import scrollNav from '../../../assets/images/side-nav.svg';
import success from '../../../assets/images/hero-feature-one.svg';
import greenCircle from '../../../assets/images/hero-feature-two.svg';
import humanStar from '../../../assets/images/hero-feature-three.svg';
import BuyNowButton from '../../Typographys/Buttons/BuyNowButton';
import scale from '../../../assets/images/scale.svg';
import scaleSecond from '../../../assets/images/scale-second.svg';
import hammer from '../../../assets/images/hammer.svg';
import hammer2 from '../../../assets/images/hammer2.svg';
import clear from '../../../assets/images/clear.svg';
import honest from '../../../assets/images/honest.svg';
import smart from '../../../assets/images/smart.svg';

const HeroSection = () => {
  return (
    <>
      <div className='relative xl:h-100 h-auto flex justify-center xl:mb-0 mb-20'>
        {/* <div
          style={{ zIndex: '-10' }}
          className='flex items-center justify-center absolute -mt-34 w-full'
        >
          <img className='w-full h-full' src={hero} alt='' />
        </div> */}

        <div
          style={{ zIndex: '-10' }}
          className='flex absolute -mt-34 w-full lg:h-108 h-full'
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
          <div className='flex justify-between items-center lg:mt-14 mt-0 relative'>
            <div className='flex lg:flex-row flex-col items-center lg:justify-start justify-center w-full'>
              <div className='flex flex-col space-y-4 lg:self-center self-start lg:w-1/2 w-full'>
                <span className='lg:text-base text-sm text-secondarydark'>
                  Where You Got Justice
                </span>
                <h1 className='2xl:text-5xl xl:text-4xl text-2xl text-white font-bold'>
                  For Getting Your Justice
                </h1>
                <div className='flex items-center'>
                  <span className='inline-block h-1 w-28 bg-secondarydark mt-2 mb-4' />
                  <span className='inline-block h-1 w-48 bg-white mt-2 mb-4' />
                </div>
                <p className='text-white lg:text-base text-sm'>
                  XATTORNEY is a Artificial Intelligence based Case & Chamber
                  Management System for Advocates. The platform enables
                  advocates, law firms and other businesses in the legal
                  industry to track important deadlines, manage cases, clients
                  and documents, bill clients, and accept payments.
                </p>
                <div className='flex justify-start items-center w-auto'>
                  <BuyNowButton />
                </div>
                <div className='lg:hidden flex justify-center items-center space-x-4 w-full'>
                  <img className='w-1/4 mt-4' src={honest} alt='' />
                  <img className='w-1/4 mt-4' src={clear} alt='' />
                  <img className='w-1/4 mt-4' src={smart} alt='' />
                </div>
              </div>
              {/* hero image */}
              <div className='lg:flex hidden justify-end items-center w-1/2'>
                <img className='w-10/12 self-end' src={features} alt='' />
              </div>
            </div>
            {/* <div
              style={{ left: '78.8%' }}
              className='fixed xl:flex justify-end hidden'
            >
              <img src={scrollNav} alt='' />
            </div> */}
          </div>
          {/* cards */}
          <div className='flex lg:flex-row xl:flex-nowrap lg:flex-wrap flex-nowrap flex-col items-center justify-center mt-14 md:space-y-0 space-y-8'>
            <div className='bg-primarydark text-white sm:w-88 w-full lg:h-52 md:h-28 h-40 sm:px-7 px-2 lg:rounded-none rounded flex items-center space-x-4 xl:m-0 lg:m-6 md:m-2 m-0'>
              <img src={success} alt='' />
              <div className='flex flex-col space-y-2'>
                <h1 className='font-bold sm:text-base text-sm'>
                  Unlimited Case Entry
                </h1>
                <p className='lg:text-sm text-xsm leading-relaxed font-light text-justify'>
                  It's Easier than your manual record keeping. Store your case
                  details and client’s info as much as you want.
                </p>
              </div>
            </div>
            <div className='bg-secondarylight text-primarydark xl:w-96 xl:h-60 sm:w-88 w-full lg:h-52 md:h-28 h-40 sm:px-3 px-2 lg:rounded-none rounded xl:border-b-8 border-b-none border-primarydark flex items-center space-x-2 xl:m-0 lg:m-6 md:m-2 m-0'>
              <img src={greenCircle} alt='' />
              <div className='flex flex-col space-y-2'>
                <h1 className='font-bold sm:text-xl text-sm'>
                  Customizable Fields
                </h1>
                <p className='sm:text-sm text-xsm leading-relaxed font-light text-justify'>
                  You can customize fields like Police Station, FIR Number,
                  Investigatiing Officer to you liking.
                </p>
              </div>
            </div>
            <div className='bg-primarydark text-white sm:w-88 w-full lg:h-52 md:h-28 h-40 sm:px-7 px-2 lg:rounded-none rounded flex items-center space-x-4 xl:m-0 lg:m-6 md:m-2 m-0'>
              <img src={humanStar} alt='' />
              <div className='flex flex-col space-y-2'>
                <h1 className='font-bold sm:text-base text-sm'>
                  Case History & Reports
                </h1>
                <p className='sm:text-sm text-xsm leading-relaxed font-light text-justify'>
                  Track your case history , generate & print reports in PDF,
                  EXCEL file at any time, from anywhere.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
