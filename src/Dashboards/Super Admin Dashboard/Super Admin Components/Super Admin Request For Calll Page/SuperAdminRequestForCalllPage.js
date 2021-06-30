import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminUserPageTabComps from '../Super Admin Users Page/Super Admin User Page Tables/SuperAdminUserPageTabComps';
import SuperAdminRequestForCallTableComponent from './SuperAdminRequestForCallTableComponent';

const SuperAdminRequestForCalllPage = () => {
  return (
    <>
      <DashboardPageHading title='Request For Call' />
      <SuperAdminUserPageTabComps
        allChildren={<SuperAdminRequestForCallTableComponent />}
        newChildren={<SuperAdminRequestForCallTableComponent />}
      />
    </>
  );
};

export default SuperAdminRequestForCalllPage;
