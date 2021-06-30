import { Link } from 'react-router-dom';
import buyNow from '../../../assets/images/buy-now-button.svg';

export default function BuyNowButton() {
  return (
    <>
      <Link to='/buy-now'>
        <img className='mt-4' src={buyNow} alt='' />
      </Link>
    </>
  );
}
