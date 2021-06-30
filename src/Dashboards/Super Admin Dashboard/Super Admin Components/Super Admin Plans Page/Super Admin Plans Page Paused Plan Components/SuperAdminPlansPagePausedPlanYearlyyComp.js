import { useContext } from 'react';
import { DataContext } from '../../../../../Context Api/ManageData';
import SuperAdminPlansPagePausedPlanCard from './SuperAdminPlansPagePausedPlanCard';

const SuperAdminPlansPagePausedPlanYearlyyComp = () => {
  const { pricingPlan, setPricingPlan } = useContext(DataContext);

  return (
    <>
      <div className='flex flex-col space-y-6'>
        {pricingPlan.map(
          plan =>
            plan.inactive === true && (
              <SuperAdminPlansPagePausedPlanCard
                packageType={plan.name}
                planMode={plan.planMode}
                discountPrice={plan.discountedAmount}
                mainPrice={plan.price}
                features={plan.featureList}
                benefits={plan.benefitList}
              />
            )
        )}
      </div>
    </>
  );
};

export default SuperAdminPlansPagePausedPlanYearlyyComp;
