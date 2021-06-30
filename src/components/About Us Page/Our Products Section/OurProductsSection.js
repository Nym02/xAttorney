import React from 'react';
import { SectionHeaderCenter } from '../../Typographys/Headings/SectionHeaderCenter';

const OurProductsSection = () => {
  return (
    <>
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 -mt-48 mb-24 z-40 relative'>
        <SectionHeaderCenter title='Our Products' />
        <h1 className='lg:text-4xl text-3xl text-primarydark font-bold text-center mt-4 leading-relaxed'>
          Your clients rely on you, <br className='lg:block hidden' /> Advocates
          rely on XATTORNEY
        </h1>
      </div>
    </>
  );
};

export default OurProductsSection;
