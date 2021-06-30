import { Paper } from '@material-ui/core';

export default function AboutUsFeatureCard({ img, title, description }) {
  return (
    <>
      <Paper
        elevation={4}
        className='sm:w-88 w-full h-24 bg-lightSilver shadow-lg rounded flex items-center space-x-3 pl-9 py-6'
      >
        <img src={img} alt='' />
        <div className='flex flex-col text-primarydark'>
          <h1 className='font-bold text-base'>{title}</h1>
          <span className='font-light text-sm'>{description}</span>
        </div>
      </Paper>
    </>
  );
}
