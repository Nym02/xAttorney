import { Icon } from '@iconify/react';
import crossIcon from '@iconify-icons/akar-icons/cross';
import { useState } from 'react';

const QuestionBoxComp = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='flex flex-col'>
        <div
          onClick={() => setOpen(!open)}
          className={
            open
              ? 'w-full border border-white rounded-t h-15 flex justify-between items-center px-7 py-4'
              : 'w-full border border-white rounded h-15 flex justify-between items-center px-7 py-4'
          }
        >
          <span className='lg:text-base text-sm'>{question}</span>
          <div className={open ? '' : 'transform -rotate-45'}>
            <Icon onClick={() => setOpen(!open)} icon={crossIcon} />
          </div>
        </div>
        <div
          className={
            open
              ? 'w-full border border-white rounded-b flex justify-between items-center px-7 py-4'
              : 'hidden'
          }
        >
          {answer}
        </div>
      </div>
    </>
  );
};

export default QuestionBoxComp;
