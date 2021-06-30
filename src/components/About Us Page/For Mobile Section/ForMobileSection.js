import mobile from '../../../assets/images/mobile-screen.svg';
import calender from '../../../assets/images/calender.svg';
import search from '../../../assets/images/search.svg';
import settings from '../../../assets/images/settings.svg';
import bag from '../../../assets/images/bag.svg';
import bell from '../../../assets/images/bell.svg';
import wallet from '../../../assets/images/wallet.svg';
import SectionHeader from '../../Typographys/Headings/SectionHeader';
import BuyNowButton from '../../Typographys/Buttons/BuyNowButton';
import AboutUsFeatureCard from '../About Us Feature Card/AboutUsFeatureCard';
import { useContext } from 'react';
import { DataContext } from '../../../Context Api/ManageData';

const ForMobileSection = () => {
  const { landingPageSummary } = useContext(DataContext);
  return (
    <>
      <SectionHeader title='For Mobile' width='md:w-97 w-full' />
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 text-primarydark lg:mb-36 mb-20'>
        <div className='flex lg:flex-row flex-col justify-between items-center 2xl:-mt-20 mt-0'>
          {/* text contents */}
          <div className='flex flex-col space-y-4 lg:w-7/12 w-full lg:order-none order-2'>
            <h1 className='lg:text-4xl text-3xl font-bold leading-relaxed'>
              Take your law firm on-the-go with{' '}
              <br className='lg:block hidden' /> the{' '}
              <span className='text-secondarydark'>XATTORNEY</span> App that’s
              right
            </h1>
            <p className='text-base'>
              XATTORNEY brings you a cost-effective way of managing cases,
              chambers & clients by storing and tracking cases. Work from your
              computer or other devices in the private cloud while incorporating
              different applications. The software works on most tablets, cell
              phones, laptops, and desktops. No matter where you are you can
              fully access your system. <br /> <br />
              You can access the system at any time, from anywhere. You could be
              saving a substantial amount of money on managing costs of both
              your firm and your clients as well.
            </p>
            <div className='flex justify-start items-center'>
              <BuyNowButton />
            </div>
          </div>

          {/* video contents */}
          <div className='lg:-mt-10 -mt-20 lg:order-none order-1'>
            <img className='mt-20' src={mobile} alt='' />
          </div>
        </div>

        {/* feature cards */}
        <div className='mt-16 flex 2xl:flex-row flex-col 2xl:justify-between justify-center items-center 2xl:space-x-6 space-x-0 2xl:space-y-0 lg:space-y-12 space-y-6 w-full'>
          <div className='flex 2xl:flex-col lg:flex-row flex-col 2xl:space-y-6 lg:space-y-0 space-y-6 2xl:space-x-0 lg:space-x-12 space-x-0 w-full 2xl:justify-start justify-center 2xl:items-start items-center'>
            <AboutUsFeatureCard
              img={calender}
              title='Calendar'
              description='Court & Bangldesh Govt. Calender.'
            />
            <AboutUsFeatureCard
              img={wallet}
              title='Legal Cases & Matters'
              description={`${landingPageSummary?.totalCases} Cases handle by XATTORNEY.`}
            />
          </div>
          <div className='flex 2xl:flex-col lg:flex-row flex-col 2xl:space-y-6 lg:space-y-0 space-y-6 2xl:space-x-0 lg:space-x-12 space-x-0 w-full  2xl:justify-start justify-center 2xl:items-start items-center'>
            <AboutUsFeatureCard
              img={search}
              title='Search and Navigation'
              description='Your digital Manager. '
            />
            <AboutUsFeatureCard
              img={bag}
              title='Easy Case Entry'
              description='Easier than your record keeping.'
            />
          </div>
          <div className='flex 2xl:flex-col lg:flex-row flex-col 2xl:space-y-6 lg:space-y-0 space-y-6 2xl:space-x-0 w-full lg:space-x-12 space-x-0  2xl:justify-start justify-center 2xl:items-start items-center'>
            <AboutUsFeatureCard
              img={settings}
              title='Regular Update & Support'
              description='End to end encryption.'
            />
            <AboutUsFeatureCard
              img={bell}
              title='Notifications'
              description='Date wise notification.'
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForMobileSection;
