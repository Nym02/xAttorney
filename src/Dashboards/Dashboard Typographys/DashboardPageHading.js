export default function DashboardPageHading({ title }) {
  return (
    <>
      <div className='lg:-mt-22 -mt-10 mb-9'>
        <h1 className='lg:text-4xl sm:text-2xl text-xl text-primarydark font-bold capitalize'>
          {title}
        </h1>
      </div>
    </>
  );
}
