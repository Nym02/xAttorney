import React from 'react';

const ErrorPage = () => {
  return (
    <>
      <div className='h-screen flex space-y-10 items-center justify-center bg-deepdark -mt-34'>
        <div className='flex flex-col justify-center items-center space-y-10 bg-white h-92 w-92 rounded'>
          <div>
            <img className='w-72' src='/xattorney-png-logo.png' alt='' />
          </div>
          <h1 className='text-xl text-primarydark text-center'>
            Page Not Fount
          </h1>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
