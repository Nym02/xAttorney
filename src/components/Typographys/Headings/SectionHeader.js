export default function SectionHeader({ title, width }) {
  return (
    <>
      <div>
        <h1 className='font-bold text-secondarydark container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 capitalize'>
          {title}
        </h1>
        <span
          className={`inline-block h-1 ${width} bg-secondarylight mt-2 mb-4`}
        />
      </div>
    </>
  );
}
