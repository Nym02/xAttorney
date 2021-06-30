import kalotaka from '../../../../assets/images/kalo-taka.svg';
import { Icon } from '@iconify/react';
import arrowDown from '@iconify-icons/akar-icons/arrow-down';

export default function SuperAdminHomePageCard({
  img,
  value,
  title,
  bgColor,
  rate,
}) {
  return (
    <>
      <div
        style={{ boxShadow: '0px 4px 14px rgba(34, 37, 169, 0.4)' }}
        className={`sm:w-52 w-full h-40 ${bgColor} rounded-3xl flex flex-col items-center justify-between py-8 relative`}
      >
        <div>
          <img src={img} alt='' />
        </div>
        <div
          className={
            bgColor === 'bg-primarydark'
              ? 'text-white text-center flex flex-col items-center'
              : 'text-primarydark flex flex-col items-center'
          }
        >
          <h1 className='text-3xl font-bold flex items-center text-center'>
            <img
              className={title === 'Total Income' ? 'mr-1' : 'hidden'}
              src={kalotaka}
              alt=''
            />
            <span>{value === 'undefined' ? '0' : value}</span>
          </h1>
          <span className='text-sm'>{title}</span>
        </div>
        <div
          style={{ top: '7%', left: '63%' }}
          className={
            title === 'New User Today'
              ? 'bg-red-400 text-white text-sm flex items-center justify-center absolute h-6 w-14 rounded'
              : 'hidden'
          }
        >
          <Icon icon={arrowDown} />
          <span>{rate}%</span>
        </div>
      </div>
    </>
  );
}
