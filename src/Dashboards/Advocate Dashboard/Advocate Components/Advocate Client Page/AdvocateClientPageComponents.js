import DashboardPageHading from "../../../Dashboard Typographys/DashboardPageHading";
import AdvocateClientTabComp from "./AdvocateClientPageTabComp";
import AdvocateClientPageTableComp from "./AdvocateClientPageTableComp";

const AdvocateClientPageComponents = () => {
  return (
    <>
      <DashboardPageHading title="All Clients" />

      <AdvocateClientTabComp
        newChildren={<AdvocateClientPageTableComp />}
        allChildren={<AdvocateClientPageTableComp />}
      />
    </>
  );
};

export default AdvocateClientPageComponents;
