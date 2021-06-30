export const SectionHeaderCenter = ({ title }) => {
  return (
    <>
      <div className='flex items-center space-x-4 justify-center'>
        <span className='inline-block h-1 bg-secondarylight mt-4 mb-4 md:w-52 sm:w-1/3 w-auto' />
        <h1 className='font-bold text-secondarydark capitalize'>{title}</h1>
        <span className='inline-block h-1 bg-secondarylight mt-4 mb-4 md:w-52 sm:w-1/3 w-auto' />
      </div>
    </>
  );
};
