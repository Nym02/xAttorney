import advocate from '../../../assets/images/advocate.svg';
import reviewimage from '../../../assets/images/review-image.svg';

import { Icon } from '@iconify/react';
import quoteIcon from '@iconify-icons/gg/quote';

const ReviewComponent = ({
  name,
  content,
  designation,
  id,
  court,
  advocateImage,
}) => {
  return (
    <>
      <div className='flex md:flex-row flex-col justify-between md:items-end items-center mt-1 h-auto'>
        <div className='flex flex-col mt-2 pb-6 h-full md:w-1/2 w-full'>
          <div className='text-primarydark flex items-center justify-between pb-4 md:order-none order-2 md:mt-0 mt-4'>
            <span className='flex justify-start items-start self-start -mt-2'>
              <Icon className='text-3xl' icon={quoteIcon} />
            </span>
            <span className='md:text-left text-center'>{content}</span>
            <span className='flex justify-end items-end self-end -mb-2'>
              <Icon className='text-3xl' icon={quoteIcon} />
            </span>
          </div>
          <div className='flex md:flex-row flex-col items-center md:space-x-3 space-x-0 md:space-y-0 md:space-y-3 md:order-none order-1 '>
            {/* <div className='w-24 h-24 rounded-full'>
              <img className='h-full w-full' src={reviewimage} alt='' />
            </div> */}
            <div className='flex flex-col justify-between text-primarydark md:text-left text-center ml-7 opacity-0'>
              <h1 className='font-bold uppercase'>{name}</h1>
              <span className='text-sm'>{designation}</span>
              <span className='text-sm'>Member Id - {id}</span>
              <span className='text-sm'>{court}</span>
            </div>
          </div>
        </div>
        <div className='md:w-1/3 w-full md:flex hidden'>
          <img className='md:w-full w-2' src={advocateImage} alt='' />
        </div>
      </div>
    </>
  );
};

export default ReviewComponent;
