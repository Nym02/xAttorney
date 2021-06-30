import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import TwoTabComp from '../../../Dashboard Typographys/TwoTabComp';
import SuperAdminPlansPageActivePlanComponents from './Super Admin Plans Page Active Plan Components/SuperAdminPlansPageActivePlanComponents';
import SuperAdminPlansPagePausedPlanComponents from './Super Admin Plans Page Paused Plan Components/SuperAdminPlansPagePausedPlanComponents';

const SuperAdminPlansPageComponents = () => {
  return (
    <>
      <DashboardPageHading title='Plans' />
      <TwoTabComp
        tabOneTitle='Active Plans'
        tabOneComp={<SuperAdminPlansPageActivePlanComponents />}
        tabTwoTitle='Paused Plans'
        tabTwoComp={<SuperAdminPlansPagePausedPlanComponents />}
      />
    </>
  );
};

export default SuperAdminPlansPageComponents;
