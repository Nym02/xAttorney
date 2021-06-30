import { useState } from 'react';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import AdvocateStaffPageTableComp from './AdvocateStaffPageTableComp';

const AdvocateStaffPageComponents = () => {
  const [toggle, setToggle] = useState(1);
  const toggleChange = index => {
    setToggle(index);
  };

  return (
    <>
      <DashboardPageHading title='All Staff' />
      <div className='flex flex-col space-y-4'>
        <div className='flex justify-between border-b border-deepIndigo border-opacity-60'>
          <div className='flex items-center justify-start space-x-4 text-base font-medium'>
            <div
              onClick={() => toggleChange(1)}
              className={
                toggle === 1
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>All</span>
            </div>
            {/* <div
              onClick={() => toggleChange(2)}
              className={
                toggle === 2
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>Inactive</span>
            </div> */}
          </div>
        </div>
        {/* toggle components */}
        <div>
          {/* toggle 1 new users */}
          <div
            className={
              toggle === 1 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateStaffPageTableComp />
          </div>
          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 2 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateStaffPageTableComp />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvocateStaffPageComponents;
