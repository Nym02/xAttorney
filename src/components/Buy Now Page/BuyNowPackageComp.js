import { Link } from 'react-router-dom';
import secondsubmit from '../../assets/images/secondary-buynow-button.svg';
import { Icon } from '@iconify/react';
import tickSolid from '@iconify-icons/teenyicons/tick-solid';

export default function BuyNowPackageComp({
  mainPrice,
  discountedPrice,
  duration,
  benefits,
}) {
  return (
    <>
      {/* package and prices */}
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='font-bold text-3xl'>Basic</h1>
          <span className='inline-block h-1 w-8 bg-primarydark mt-3 mb-4' />
        </div>
        <div className='flex flex-col items-end'>
          <div className='flex items-baseline space-x-1'>
            <span className='line-through text-base font-semibold uppercase'>
              {mainPrice} Tk
            </span>
            <span className='text-3xl font-bold uppercase'>
              {discountedPrice} Tk
            </span>
          </div>
          <span className='text-base capitalize font-semibold'>{duration}</span>
        </div>
      </div>

      {/* package details */}
      <div className='flex flex-col space-y-6'>
        <p className='text-lg font-medium'>
          All of the benefits from this package
        </p>
        <div className='flex flex-col space-y-4'>{benefits}</div>
        <Link
          to='/buynow/payment-details'
          style={{ outline: 'none' }}
          className='self-center'
        >
          <img src={secondsubmit} alt='' />
        </Link>
      </div>
    </>
  );
}
