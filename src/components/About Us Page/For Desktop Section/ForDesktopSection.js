import desktop from '../../../assets/images/desktop-screen.svg';
import badge from '../../../assets/images/badge.svg';
import bulb from '../../../assets/images/bulb.svg';
import earth from '../../../assets/images/earth.svg';
import WhyUsFeatureCard from '../../Landing Page/Why Us Section/WhyUsFeatureCard';
import SectionHeader from '../../Typographys/Headings/SectionHeader';
import BuyNowButton from '../../Typographys/Buttons/BuyNowButton';
import { useContext } from 'react';
import { DataContext } from '../../../Context Api/ManageData';

const ForDesktopSection = () => {
  const { landingPageSummary } = useContext(DataContext);

  return (
    <>
      <SectionHeader title='For Desktop' width='md:w-97 w-full' />
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 text-primarydark mb-27'>
        <div className='flex lg:flex-row flex-col justify-between items-center'>
          {/* text contents */}
          <div className='flex flex-col space-y-4 lg:w-7/12 w-full lg:order-none order-2 lg:mt-0 mt-10'>
            <h1 className='lg:text-4xl text-3xl font-bold leading-relaxed'>
              Intuitive case management <br className='lg:block hidden' />
              software for the modern{' '}
              <span className='text-secondarydark'>Law Firm</span>
            </h1>
            <p className='text-base'>
              XATTORNEY is an Intuitive case & chamber management software that
              tracks and solicits billable time, computerized significant
              archives, and gives simple admittance to every one of your clients
              and their case records. By using this future proof automated
              software you can eliminate so many complications that you would
              face when you do it manually. <br /> <br />
              XATTORNEY utilizes the latest cloud innovation to assist attorneys
              with working together, collaborate with clients and get a precise
              image of their issues.
            </p>
            <div className='flex justify-start items-center'>
              <BuyNowButton />
            </div>
          </div>

          {/* video contents */}
          <div className='lg:order-none order-1'>
            <img className='lg:mt-20 mt-6' src={desktop} alt='' />
          </div>
        </div>

        {/* feature cards */}
        <div className='mt-16 flex lg:flex-row flex-col justify-between items-center lg:space-x-4 space-x-0 lg:space-y-0 space-y-6'>
          <WhyUsFeatureCard
            img={badge}
            title='Experts Recommendations'
            description={`${landingPageSummary?.totalAdvocates} Experts are relying on Us.`}
          />
          <WhyUsFeatureCard
            img={earth}
            title='Fully Online & Trusted'
            description='Access your data anywhere you want.'
          />
          <WhyUsFeatureCard
            img={bulb}
            title='Auto Back Up'
            description='Automatic data backup everyday.'
          />
        </div>
      </div>
    </>
  );
};

export default ForDesktopSection;
