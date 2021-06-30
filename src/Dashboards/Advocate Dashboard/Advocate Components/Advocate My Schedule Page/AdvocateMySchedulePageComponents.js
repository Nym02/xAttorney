import React from 'react';

import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import AdvocateCasePageTableToday from '../Advocate Case Page/Advocate Case Page Table/AdvocateCasePageTableToday';
import AdvocateCasePageTableTomorrow from '../Advocate Case Page/Advocate Case Page Table/AdvocateCasePageTableTomorrow';
import AdvocateHomePageTodaySchedule from '../Advocate Home Page/AdvocateHomePageTodaySchedule';
import AdvocateMySchedulePageTabComp from './AdvocateMySchedulePageTabComp';
import AdvocateMySchedulePageTableComp from './AdvocateMySchedulePageTableComp';

const AdvocateMySchedulePageComponents = () => {
  return (
    <>
      <DashboardPageHading title='All Schedule' />

      <AdvocateMySchedulePageTabComp
        newChildren={<AdvocateCasePageTableToday />}
        allChildren={<AdvocateCasePageTableTomorrow />}
      />
    </>
  );
};

export default AdvocateMySchedulePageComponents;
