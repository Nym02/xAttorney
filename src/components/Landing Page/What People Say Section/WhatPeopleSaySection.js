/* eslint-disable */
import ReactOwlCarousel from 'react-owl-carousel';
import SectionHeader from '../../Typographys/Headings/SectionHeader';
import advocateImageOne from '../../../assets/images/advocate-image-1.svg';
import advocateImageTwo from '../../../assets/images/advocate-image-2.svg';
import reviewimage from '../../../assets/images/review-image.svg';
import ReviewComponent from './ReviewComponent';

const WhatPeopleSaySection = () => {
  return (
    <>
      <div className='mb-20'>
        <div
          className='xl:flex hidden whatPeopleSayBackground'
          // style={{
          //   backgroundImage:
          //     'linear-gradient(to right, #ffffff, #f5f5f6, #ececec, #e2e2e3, #d8d9da)',
          //   width: '74%',
          //   height: '403px',
          //   position: 'absolute',
          //   zIndex: -1,
          //   clipPath: 'polygon(0 0, 100% 0, 90% 100%, 0% 100%)',
          // }}
        ></div>
        <div className='pt-14'>
          <SectionHeader title='What People Say!' width='md:w-97 w-full' />
        </div>
        <div className='mt-5 container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4'>
          <h1 className='font-bold text-primarydark text-3xl'>
            We Believe In Proof
          </h1>
          <div className='mt-2'>
            <ReactOwlCarousel
              className='owl-theme flex items-center justify-evenly 2xl:-mt-64 xl:-mt-60 lg:-mt-48 md:-mt-20 mt-0'
              loop={true}
              center={true}
              dots={true}
              autoplay={true}
              autoplayTimeout={5000}
              items={1}
            >
              <ReviewComponent
                content="XATTORNEY is like a digital diary that always stays with me. After I started to use XATTORNEY, I didn't miss any deadlines, hearing dates, or important meetings."
                name='Willian Penn'
                designation='Advocate'
                id='20'
                court='Dahaka Bar Association'
                advocateImage={advocateImageOne}
              />
              <ReviewComponent
                name='Asif'
                designation='Advocate'
                id='12'
                content='I am very satisfied with the performance of XATTORNEY. It is well documented and smart enough to help you all the details you need. I would recommend XATTORNEY!'
                court='High Court'
                advocateImage={advocateImageTwo}
              />
            </ReactOwlCarousel>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatPeopleSaySection;
