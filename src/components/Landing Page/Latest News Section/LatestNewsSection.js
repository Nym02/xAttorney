import React from 'react';
import { SectionHeaderCenter } from '../../Typographys/Headings/SectionHeaderCenter';

const LatestNewsSection = () => {
  return (
    <>
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 mt-28 mb-24'>
        <SectionHeaderCenter title='Latest News' />
        <h1 className='text-3xl text-primarydark font-bold text-center mt-4'>
          Join Our Community
        </h1>
      </div>
    </>
  );
};

export default LatestNewsSection;
