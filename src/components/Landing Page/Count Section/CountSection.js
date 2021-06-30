import happy from '../../../assets/images/happy.svg';
import handcuffs from '../../../assets/images/handcuffs.svg';
import judge from '../../../assets/images/judge.svg';
import CountSectionCard from './CountSectionCard';
import { useContext } from 'react';
import { DataContext } from '../../../Context Api/ManageData';

const CountSection = () => {
  const { landingPageSummary } = useContext(DataContext);

  return (
    <>
      <div className='container mx-auto 2xl:px-48 xl:px-20 lg:px-10 px-4 flex lg:flex-row flex-col justify-between items-center lg:space-x-8 space-x-0 lg:space-y-0 space-y-8'>
        <CountSectionCard
          img={handcuffs}
          count={landingPageSummary?.totalCases}
          title='Cases Closed'
        />
        <CountSectionCard
          img={judge}
          count={landingPageSummary?.totalChambers}
          title='Law Chambers'
        />
        <CountSectionCard
          img={happy}
          count={landingPageSummary?.totalAdvocates}
          title='Happy Clients'
        />
      </div>
    </>
  );
};

export default CountSection;
