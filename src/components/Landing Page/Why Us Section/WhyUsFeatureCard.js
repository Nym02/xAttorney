import Paper from '@material-ui/core/Paper';

export default function WhyUsFeatureCard({ img, title, description }) {
  return (
    <>
      <Paper
        elevation={4}
        className='xl:w-88 lg:w-1/3 md:w-2/3 w-full h-24 bg-lightSilver shadow-lg rounded flex items-center space-x-3 lg:pl-9 pl-4 py-6'
      >
        <img src={img} alt='' />
        <div className='flex flex-col text-primarydark'>
          <h1 className='font-bold lg:text-base text-sm'>{title}</h1>
          <span className='font-light lg:text-sm text-xsm'>{description}</span>
        </div>
      </Paper>
    </>
  );
}
