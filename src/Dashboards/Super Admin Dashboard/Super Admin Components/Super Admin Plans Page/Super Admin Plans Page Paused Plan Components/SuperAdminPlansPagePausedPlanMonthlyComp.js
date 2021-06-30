import React from 'react';
import SuperAdminPlansPagePausedPlanCard from './SuperAdminPlansPagePausedPlanCard';

const SuperAdminPlansPagePausedPlanMonthlyComp = () => {
  return (
    <>
      <div className='flex flex-col space-y-6'>
        <SuperAdminPlansPagePausedPlanCard
          packageType='Basic'
          discountPrice={null}
          mainPrice={null}
          featureOne='Feature One'
          featureTwo='Feature One'
          featureThree='Feature One'
          featureFour='Feature One'
          featureFive='Feature One'
          benefitOne='Benefit One'
          benefitTwo='Benefit One'
          benefitThree='Benefit One'
          benefitFour='Benefit One'
          benefitFive='Benefit One'
        />
        <SuperAdminPlansPagePausedPlanCard
          packageType='Basic'
          discountPrice='300'
          mainPrice='700'
          featureOne='Feature One'
          featureTwo='Feature One'
          featureThree='Feature One'
          featureFour='Feature One'
          featureFive='Feature One'
          benefitOne='Benefit One'
          benefitTwo='Benefit One'
          benefitThree='Benefit One'
          benefitFour='Benefit One'
          benefitFive='Benefit One'
        />
      </div>
    </>
  );
};

export default SuperAdminPlansPagePausedPlanMonthlyComp;
