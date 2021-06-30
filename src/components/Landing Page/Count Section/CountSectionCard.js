import Paper from '@material-ui/core/Paper';

const CountSectionCard = ({ count, title, img }) => {
  return (
    <>
      <Paper
        elevation={4}
        className='flex flex-col items-center justify-center space-y-7 p-8 2xl:w-88 lg:w-1/3 sm:w-2/3 w-full h-60 bg-lightSilver shadow-lg rounded'
      >
        <div>
          <img src={img} alt='' />
        </div>
        <div className='flex flex-col items-center space-y-3 text-center'>
          <span className='font-bold text-3xl text-secondarydark text-center'>
            {count}
          </span>
          <span className='text-primarydark text-center text-base'>
            {title}
          </span>
        </div>
      </Paper>
    </>
  );
};

export default CountSectionCard;
