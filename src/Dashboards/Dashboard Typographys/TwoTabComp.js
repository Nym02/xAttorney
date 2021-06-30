import { useState } from 'react';

export default function TwoTabComp({
  tabOneComp,
  tabOneTitle,
  tabTwoComp,
  tabTwoTitle,
}) {
  const [toggle, setToggle] = useState(1);
  const toggleChange = index => {
    setToggle(index);
  };

  return (
    <>
      <div className='flex flex-col space-y-5'>
        <div>
          <div className='flex items-center justify-start space-x-4 text-2xl font-medium'>
            <div
              onClick={() => toggleChange(1)}
              className={
                toggle === 1
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-primarydark opacity-40 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>{tabOneTitle}</span>
            </div>
            <div
              onClick={() => toggleChange(2)}
              className={
                toggle === 2
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-primarydark opacity-40 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span>{tabTwoTitle}</span>
            </div>
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
            {tabOneComp}
          </div>

          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 2 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            {tabTwoComp}
          </div>
        </div>
      </div>
    </>
  );
}
