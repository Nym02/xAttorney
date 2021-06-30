import arrowUp from '@iconify-icons/akar-icons/arrow-up';
import { Icon } from '@iconify/react';
import { useContext, useEffect, useState } from 'react';

import statisticsdark from '../../../../assets/images/statistics-dark.svg';
import statisticswhite from '../../../../assets/images/statistics-white.svg';
import { DataContext } from '../../../../Context Api/ManageData';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminHomePageCard from './SuperAdminHomePageCard';

const SuperAdminHomePageComponents = () => {
  const { adminDashboardSummary } = useContext(DataContext);
  const loginInfo = localStorage.getItem('loginInfo');
  const newLoginInfo = JSON.parse(loginInfo);

  return (
    <>
      {newLoginInfo?.isLoggedIn && newLoginInfo?.userType === 'SUPER_ADMIN' ? (
        <>
          <DashboardPageHading title='Your Dashboard is updated' />
          <div className='flex flex-col space-y-16'>
            {/* <div className='flex 2xl:flex-row flex-col justify-center items-center 2xl:space-x-10 space-x-0 2xl:space-y-0 space-y-10 w-full'>
              <div className='flex sm:flex-row flex-col justify-start items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-10 sm:w-auto w-full'>
                <SuperAdminHomePageCard
                  img={statisticswhite}
                  bgColor='bg-primarydark'
                  value={`${
                    adminDashboardSummary?.totalSale === null
                      ? 0
                      : adminDashboardSummary?.totalSale
                  }`}
                  title='Total Sale'
                />
                <SuperAdminHomePageCard
                  img={statisticsdark}
                  bgColor='bg-indigoWhite'
                  value={`${
                    adminDashboardSummary?.totalIncome === null
                      ? 0
                      : adminDashboardSummary?.totalIncome
                  }`}
                  title='Total Income'
                />
              </div>

              <div className='flex sm:flex-row flex-col justify-start items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-10 sm:w-auto w-full'>
                <SuperAdminHomePageCard
                  img={statisticswhite}
                  bgColor='bg-primarydark'
                  value={`${
                    adminDashboardSummary?.totalUser === null
                      ? 0
                      : adminDashboardSummary?.totalUser
                  }`}
                  title='Total User'
                />
                <div className='flex flex-col items-start space-y-3 sm:w-1/2 w-full'>
                  <div className='flex flex-col items-start space-y-3 w-full'>
                    <SuperAdminHomePageCard
                      img={statisticsdark}
                      bgColor='bg-indigoWhite'
                      value={`${
                        adminDashboardSummary?.todayNewUserCount === null
                          ? 0
                          : adminDashboardSummary?.todayNewUserCount
                      }`}
                      title='New User Today'
                      rate={`${
                        adminDashboardSummary?.improvementRate === null
                          ? 0
                          : adminDashboardSummary?.improvementRate
                      }`}
                    />
                    
                  </div>
                </div>
              </div>
            </div> */}
            {adminDashboardSummary?.adminDashBoardInformationList?.map(
              (value, index) => (
                <>
                  <div className='flex justify-center items-center pt-10'>
                    <h1 className='text-xl font-bold px-10 py-2 bg-primarydark text-white flex justify-between items-center rounded'>
                      <span>{value?.summaryRange}</span>
                    </h1>
                  </div>
                  <div className='flex 2xl:flex-row flex-col justify-center items-center 2xl:space-x-10 space-x-0 2xl:space-y-0 space-y-10 w-full'>
                    <div className='flex sm:flex-row flex-col justify-start items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-10 sm:w-auto w-full'>
                      <SuperAdminHomePageCard
                        img={statisticsdark}
                        bgColor='bg-indigoWhite'
                        value={`${value?.newUserCount}`}
                        title='New User'
                      />
                      <SuperAdminHomePageCard
                        img={statisticswhite}
                        bgColor='bg-primarydark'
                        value={`${value?.totalActiveUser}`}
                        title='Active User'
                      />
                    </div>
                    <div className='flex sm:flex-row flex-col justify-start items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-10 sm:w-auto w-full'>
                      <SuperAdminHomePageCard
                        img={statisticsdark}
                        bgColor='bg-indigoWhite'
                        value={`${value?.totalIncome}`}
                        title='Total Income'
                      />
                      <SuperAdminHomePageCard
                        img={statisticswhite}
                        bgColor='bg-primarydark'
                        value={value?.totalSale}
                        title='Total Sale'
                      />
                    </div>
                  </div>{' '}
                </>
              )
            )}
          </div>
        </>
      ) : (
        window.location.replace('/signin')
      )}
    </>
  );
};

export default SuperAdminHomePageComponents;
