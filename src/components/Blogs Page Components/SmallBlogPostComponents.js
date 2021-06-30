import bloggerimage from '../../assets/images/emon.jpeg';
import { Icon } from '@iconify/react';
import comment12Regular from '@iconify-icons/fluent/comment-12-regular';
import calenderIcon from '@iconify-icons/uim/calender';

const SmallBlogPostComponents = ({ img, title }) => {
  return (
    <>
      <div
        className='w-72 h-48 rounded-lg '
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className='flex flex-col space-y-5 text-white mt-18'>
          <h1 className='font-medium text-sm leading-relaxed w-full sm:w-full ml-4'>
            {title}
          </h1>
          <div className='flex items-center justify-start space-x-3 md:space-x-2  sm:space-x-10 ml-4 '>
            <div className='w-10 h-10 rounded-full'>
              <img
                className='w-10 h-10 rounded-full'
                src={bloggerimage}
                alt=''
              />
            </div>
            <div className='flex space-x-1 sm:space-x-1 items-center text-xs sm:text-xs'>
              <div className='flex space-x-1 items-center border-r border-white pr-3'>
                <Icon className='text-lg' icon={calenderIcon} />
                <span>16 Jun, 2021</span>
              </div>
              <div className='flex space-x-2 items-center'>
                <Icon className='text-lg' icon={comment12Regular} />
                <span>3 Comments</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SmallBlogPostComponents;
