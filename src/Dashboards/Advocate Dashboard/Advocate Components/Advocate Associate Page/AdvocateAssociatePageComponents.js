import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import AdvocateAssociatePageTabComp from './AdvocateAssociatePageTabComp';
import AdvocateAssociatePageTableComp from './AdvocateAssociatePageTableComp';

const AdvocateAssociatePageComponents = () => {
  return (
    <>
      <DashboardPageHading title='All Associate' />

      <AdvocateAssociatePageTabComp
        newChildren={<AdvocateAssociatePageTableComp />}
        allChildren={<AdvocateAssociatePageTableComp />}
      />
    </>
  );
};

export default AdvocateAssociatePageComponents;
