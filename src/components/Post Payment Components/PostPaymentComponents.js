import { Modal } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import paynow from '../../assets/images/pay-now-dark.svg';
import confirm from '../../assets/images/confirm-button.svg';
import warn from '../../assets/images/taka.svg';
import proceed from '../../assets/images/proceed-to-payment.svg';
import error from '../../assets/images/error.svg';
import tryagain from '../../assets/images/try-again.svg';
import greentick from '../../assets/images/greentick.svg';

const PostPaymentComponents = () => {
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const { status } = useParams();

  useEffect(() => {
    if (status === 'success') {
      setPaymentSuccessful(true);
    } else if (status === 'failed') {
      setErrorOpen(true);
    } else {
    }
  }, [status]);

  const paymentSuccess = (
    <div
      className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
      }}
    >
      <h1 className='text-3xl font-bold text-center'>Well Done!</h1>
      <div className='flex justify-center items-center'>
        <img width={100} src={greentick} alt='' />
      </div>
      <p className='text-lg font-medium text-center leading-relaxed'>
        Your subscription pacakage has been renewed. <br />
      </p>
      <Link
        className='px-5 py-2 bg-primarydark border border-primarydark hover:bg-white text-white hover:text-primarydark transition duration-200 ease-in-out rounded'
        to='/signin'
      >
        Go To Sign In
      </Link>
    </div>
  );

  const paymentError = (
    <div
      className='w-106 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '508px',
      }}
    >
      <h1 className='text-3xl font-bold text-center'>Payment Failed</h1>
      <div className='flex justify-center items-center'>
        <img src={error} alt='' />
      </div>
      <p className='text-lg font-medium text-center leading-relaxed'>
        Your payment has been declined or failed. <br /> Please sign in into
        Xattorney to confirm your payment status!
      </p>
      <Link
        className='px-5 py-2 bg-primarydark border border-primarydark hover:bg-white text-white hover:text-primarydark transition duration-200 ease-in-out rounded'
        to='/signin'
      >
        Go To Sign In
      </Link>
    </div>
  );

  return (
    <>
      <div className='h-screen bg-deepdark -mt-34'></div>
      <Modal
        open={paymentSuccessful}
        onClose={() => setPaymentSuccessful(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {paymentSuccess}
      </Modal>
      <Modal
        open={errorOpen}
        onClose={() => setErrorOpen(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {paymentError}
      </Modal>
    </>
  );
};

export default PostPaymentComponents;
