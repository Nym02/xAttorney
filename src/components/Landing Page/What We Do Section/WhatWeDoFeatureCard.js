import courthouse from '../../../assets/images/courthouse.svg';
import courthouseWhite from '../../../assets/images/courthouse-white.svg';
import { Icon } from '@iconify/react';
import bankLine from '@iconify-icons/ri/bank-line';

export default function WhatWeDoFeatureCard({ title, description, img }) {
  return (
    <>
      <div
        className={
          title === 'Custom Software Development'
            ? 'md:w-58 w-full h-46 bg-primarydark hover:bg-secondarydark transition duration-700 ease-in-out text-secondarydark hover:text-white flex md:flex-col flex-row justify-center md:items-start items-center md:space-y-1 space-y-0 md:space-x-0 space-x-4  rounded cursor-pointer p-2'
            : 'md:w-58 w-full h-46 bg-primarydark hover:bg-secondarydark transition duration-700 ease-in-out text-secondarydark hover:text-white flex md:flex-col flex-row justify-center md:items-start items-center md:space-y-3 space-y-0 md:space-x-0 space-x-4  rounded cursor-pointer p-4'
        }
      >
        <div className='md:w-auto w-1/3 flex md:justify-start justify-end items-center'>
          <img className='md:w-auto w-20' src={img} alt='' />
        </div>
        <div className='flex flex-col space-y-4 md:w-auto w-2/3 text-white'>
          <h1 className='text-base font-bold'>{title}</h1>
          <span className='font-light text-xs'>{description}</span>
        </div>
      </div>
    </>
  );
}
