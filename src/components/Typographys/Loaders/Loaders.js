import { useState } from 'react';
import PuffLoader from 'react-spinners/PuffLoader';

const Loaders = () => {
  let [loading, setLoading] = useState(true);

  return (
    <>
      <div
        className='w-106 h-auto bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
        style={{
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%)`,
        }}
      >
        <PuffLoader loading={loading} size={150} />
      </div>
    </>
  );
};

export default Loaders;
