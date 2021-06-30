import playButton from '../../../assets/images/play-button.svg';
import clients from '../../../assets/images/clients.svg';
import safetyShield from '../../../assets/images/safety-shield.svg';
import supportFfull from '../../../assets/images/support-full.svg';
import imageOne from '../../../assets/images/video-image-1.svg';
import imageTwo from '../../../assets/images/video-image-2.svg';
import imageThree from '../../../assets/images/video-image-3.svg';
import imageFour from '../../../assets/images/video-image-3 (1).svg';
// import ReactPlayer from 'react-player';
import WhyUsFeatureCard from './WhyUsFeatureCard';
import SectionHeader from '../../Typographys/Headings/SectionHeader';
import { useContext } from 'react';
import { DataContext } from '../../../Context Api/ManageData';

const WhyUsSection = () => {
  const { landingPageSummary } = useContext(DataContext);

  return (
    <>
      <SectionHeader title='Why Us?' width='md:w-97 w-full' />
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 text-primarydark mb-27'>
        <div className='flex lg:flex-row flex-col justify-between items-center'>
          {/* text contents */}
          <div className='flex flex-col space-y-4 lg:w-6/12 w-full lg:mb-0 mb-14'>
            <h1 className='text-3xl font-bold leading-relaxed'>
              XATTORNEY here to serve you <br /> with{' '}
              <span className='text-secondarydark'>experience</span>
            </h1>
            <p className='text-base'>
              Xattorney is a cloud-based case & chamber management system
              suitable for Individual advocates or small to large law firms. The
              platform enables law firms and other businesses in the legal
              industry to track important deadlines, manage client cases and
              documents, bill clients, and accept payments. <br /> <br />
              Case & chamber management has never been easier until cloud-based
              solutions arrived and XATTORNEY made it even more suitable for
              you. We will make sure you get the best experience possible.
            </p>
          </div>

          {/* video contents */}
          <div className='flex flex-col items-center space-y-3 relative'>
            <div className='flex items-end space-x-3'>
              <div className='rounded sm:w-44 sm:h-44 w-32 h-32 bg-secondarylight'>
                {/* <ReactPlayer url='https://www.youtube.com/watch?v=Q3oItpVa9fs&t=199s&ab_channel=NigelJohnStanford' /> */}
                <img src={imageOne} alt='' />
              </div>
              <div className='rounded sm:w-56 sm:h-56 w-44 h-44 bg-primarydark'>
                <img src={imageTwo} alt='' />
              </div>
            </div>
            <div className='flex items-start space-x-3'>
              <div className='rounded sm:w-36 w-24 sm:h-36 h-24 bg-secondarydark'>
                <img src={imageThree} alt='' />
              </div>
              <div className='rounded sm:w-48 w-36 sm:h-48 h-36 bg-primarylight'>
                <img src={imageFour} alt='' />
              </div>
            </div>
            <div
              style={{ top: '40%', left: '33%' }}
              className='absolute flex justify-center items-center'
            >
              <img src={playButton} alt='' />
            </div>
          </div>
        </div>

        {/* feature cards */}
        {/* <div className='mt-16 flex lg:flex-row flex-col items-center 2xl:justify-between justify-center 2xl:flex-nowrap lg:flex-wrap flex-nowrap lg:space-y-0 space-y-8'> */}
        <div className='mt-16 flex lg:flex-row flex-col justify-between items-center lg:space-x-4 space-x-0 lg:space-y-0 space-y-6'>
          <WhyUsFeatureCard
            img={clients}
            title='Our Clients'
            description={`${landingPageSummary?.totalAdvocates
              ?.toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ${
              landingPageSummary?.totalAdvocates <= 1 ? 'Advocate' : 'Advocates'
            }`}
          />
          <WhyUsFeatureCard
            img={safetyShield}
            title='Protected Data'
            description='Bank-grade security of your data.'
          />
          <WhyUsFeatureCard
            img={supportFfull}
            title='24/7 Customer Service'
            description='Giving Our Best.'
          />
        </div>
      </div>
    </>
  );
};

export default WhyUsSection;
