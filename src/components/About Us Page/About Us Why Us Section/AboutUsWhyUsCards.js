export default function AboutUsWhyUsCards({ img, text, title }) {
  return (
    <>
      <div className='xl:w-88 lg:w-1/3 md:w-2/3 sm:h-109 h-auto w-full bg-primarydark px-8 sm:pb-0 pb-3 rounded z-10'>
        <div className='flex justify-center items-center'>
          <img className='-mt-12' src={img} alt='' />
        </div>
        <div className='mt-4 flex flex-col space-y-4'>
          <h1 className='xl:text-2xl lg:text-lg text-2xl font-bold text-center'>
            {title}
          </h1>
          <p className='xl:text-base lg:text-sm text-base font-light leading-relaxed text-justify'>
            {text}
          </p>
        </div>
      </div>
    </>
  );
}
