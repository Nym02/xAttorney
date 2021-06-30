import BuyNowButton from '../../Typographys/Buttons/BuyNowButton';
import SectionHeader from '../../Typographys/Headings/SectionHeader';
import web from '../../../assets/images/web.svg';
import erp from '../../../assets/images/erp.svg';
import hr from '../../../assets/images/hr.svg';
import mobileapp from '../../../assets/images/mobile-app.svg';
import software from '../../../assets/images/software.svg';
import consultency from '../../../assets/images/consultency.svg';
import WhatWeDoFeatureCard from './WhatWeDoFeatureCard';

const WhatWeDoSection = () => {
  return (
    <>
      <div className='bg-deepdark pt-20 pb-24'>
        <SectionHeader
          title='What Project X Ltd.- do?'
          width='md:w-97 w-full'
        />
        <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 text-white flex xl:flex-row flex-col xl:space-x-4 space-x-0 xl:space-y-0 space-y-4'>
          <div className='flex flex-col space-y-4 w-full 2xl:mb-0 mb-20'>
            <h1 className='text-3xl font-bold'>Our Services</h1>
            <p className='text-base font-light'>
              XATTORNEY is a digital service of Project X Ltd. Project X Ltd, a
              software development and IT service provider company in
              Bangladesh. We have highly skilled software development
              consultants to give you high performing back-end and stunning
              front-end for web & mobile.
            </p>
            <div className='flex justify-start items-center'>
              <BuyNowButton />
            </div>
          </div>
          {/* md:flex-row flex-col justify-center items-center md:space-x-4
          space-x-0 md:space-y-0 space-y-4 2xl:-mt-13 mt-0 2xl:w-auto w-full */}
          {/* card contents */}
          <div className='flex justify-center items-center w-full'>
            <div className='flex md:flex-row flex-col justify-center items-center md:space-x-4 space-x-0 md:space-y-0 space-y-4 xl:-mt-14 mt-0'>
              <div className='flex md:flex-col sm:flex-row justify-between flex-col md:space-y-4 sm:space-y-0 space-y-4 md:space-x-0 sm:space-x-4 space-x-0 w-full'>
                <WhatWeDoFeatureCard
                  img={web}
                  title='Web Development'
                  description='Project X Ltd. deliver highly available, functional and visually engaging web solutions for enterprises.'
                />
                <WhatWeDoFeatureCard
                  img={erp}
                  title='ERP Solution'
                  description='Our ERP solutions plan and transform complicated business management systems into user-friendly technology.'
                />
              </div>
              <div className='flex md:flex-col sm:flex-row flex-col md:space-y-4 sm:space-y-0 space-y-4 md:space-x-0 sm:space-x-4 space-x-0 w-full'>
                <WhatWeDoFeatureCard
                  img={software}
                  title='Custom Software Development'
                  description='We design, create, deploy and maintain software for a specific set of users, functions, or organizations.'
                />
                <WhatWeDoFeatureCard
                  img={hr}
                  title='HR & Payroll Software'
                  description='We offer HR & Payroll Software that simplifies and optimizes HRM in a very creative way and also manages the payroll.'
                />
              </div>
              <div className='flex md:flex-col sm:flex-row flex-col md:space-y-4 sm:space-y-0 space-y-4 md:space-x-0 sm:space-x-4 space-x-0 w-full'>
                <WhatWeDoFeatureCard
                  img={mobileapp}
                  title='Mobile Apps  Development '
                  description='At Project X, solid experts will develop your desired application to your specific requirements.'
                />
                <WhatWeDoFeatureCard
                  img={consultency}
                  title='Software Consultancy'
                  description='We offer great software consultancy by combining media, technology & creativity to deliver better results.'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatWeDoSection;
