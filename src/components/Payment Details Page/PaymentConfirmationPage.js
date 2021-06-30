/* eslint-disable */
import { Modal } from '@material-ui/core';
import { useEffect, useState } from 'react';
import greentick from '../../assets/images/greentick.svg';
import done from '../../assets/images/done.svg';
import { useLocation } from 'react-router';

const PaymentConfirmationPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const search = useLocation().search;

  // useEffect(() => {
  //   const modal = new URLSearchParams(search).get('success');
  //   {
  //     modal === 'true'
  //       ? setOpen(modal)
  //       : window.location.replace('/buynow/payment-details/?error=true');
  //   }
  // }, []);

  const body = (
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
      <p className='text-2xl font-medium text-center leading-relaxed'>
        We have sent you instruction <br /> at{' '}
        <span className='font-bold'>abc@abc.com</span>
      </p>
      <button style={{ outline: 'none' }}>
        <img src={done} alt='' />
      </button>
    </div>
  );
  return (
    <>
      <div className='relative h-auto flex justify-center'>
        <div className='-mt-34 w-full bg-deepdark pb-16'>
          {/* -------------main content--------------- */}
          <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 relative flex flex-col mt-44 w-full z-50 h-screen'>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
            >
              {body}
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentConfirmationPage;
