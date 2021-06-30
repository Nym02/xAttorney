import statisticswhite from '../../../../assets/images/statistics-white.svg';
import statisticsdark from '../../../../assets/images/statistics-dark.svg';
import DashboardPageHading from '../../../Dashboard Typographys/DashboardPageHading';
import SuperAdminHomePageCard from '../../../Super Admin Dashboard/Super Admin Components/Super Admin Home Page/SuperAdminHomePageCard';
import { useContext, useState } from 'react';
import { DataContext } from '../../../../Context Api/ManageData';
import AdvocateToDoListPending from '../Advocate ToDo List Page/AdvocateToDoListPending';
import AdvocateHomePageTodaySchedule from './AdvocateHomePageTodaySchedule';
import addNewCase from '../../../../assets/images/add-new-case.svg';
import myCalendar from '../../../../assets/images/my-calender.svg';
import appellate from '../../../../assets/images/appellate-division.svg';
import districtCourt from '../../../../assets/images/district-court.svg';
import highCourt from '../../../../assets/images/high-court.svg';
import magistrateCourt from '../../../../assets/images/magistrate-court.svg';
import modalClose from '../../../../assets/images/modal-close.svg';
import otherCourt from '../../../../assets/images/other-court.svg';
import spacialTribunal from '../../../../assets/images/spacial-tribunal.svg';
import { Link } from 'react-router-dom';
import { Modal, Paper } from '@material-ui/core';
import { Icon } from '@iconify/react';
import bxMenuAltRight from '@iconify-icons/bx/bx-menu-alt-right';

const AdvocateHomePageComponents = () => {
  const { dashboardSummary } = useContext(DataContext);
  const [addCase, setAddCase] = useState(false);
  const [tabMenu, setTabMenu] = useState(false);

  const { advocateThisMonthExpense, setAdvocateThisMonthExpense } =
    useContext(DataContext);

  const [toggle, setToggle] = useState(1);
  const toggleChange = index => {
    setToggle(index);
  };

  let finalTotalEarning = 0;

  advocateThisMonthExpense?.map(
    (item, index) =>
      (finalTotalEarning =
        parseFloat(finalTotalEarning) + parseFloat(item?.amount))
  );

  // ############################## case court card ##############################
  const CaseCourtCard = ({ path, img, title }) => {
    return (
      <Link to={path}>
        <Paper
          elevation={4}
          style={{
            width: '148px',
          }}
          className='h-34 flex justify-center items-center'
        >
          <div className='w-full h-full bg-white text-primarydark flex flex-col justify-center items-center space-y-3 py-6 border border-secondarydark border-opacity-40'>
            <div>
              <img src={img} alt='' />
            </div>
            <div className='text-xsm text-center'>
              <h1 className='capitalize'>{title}</h1>
            </div>
          </div>
        </Paper>
      </Link>
    );
  };

  const addNewCaseModal = (
    <div
      className='w-auto h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Select Court Type</span>
        <div style={{ top: '-31%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setAddCase(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div className='flex lg:flex-row flex-col items-center lg:space-x-4 space-x-0 lg:space-y-0 space-y-4 px-4 pb-8'>
        <div className='flex lg:flex-col flex-row items-center justify-between lg:space-y-4 space-y-0 lg:space-x-0 space-x-4'>
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'1'}`}
            title='Appellate Division'
            img={appellate}
          />
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'4'}`}
            title='Special Tribunal Court'
            img={spacialTribunal}
          />
        </div>

        <div className='flex lg:flex-col flex-row items-center justify-between lg:space-y-4 space-y-0 lg:space-x-0 space-x-4'>
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'2'}`}
            title='High Court Division'
            img={highCourt}
          />
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'5'}`}
            title='Magistrate Court'
            img={magistrateCourt}
          />
        </div>

        <div className='flex lg:flex-col flex-row items-center justify-between lg:space-y-4 space-y-0 lg:space-x-0 space-x-4'>
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'3'}`}
            title='District Court'
            img={districtCourt}
          />
          <CaseCourtCard
            path={`/dashboard/advocate/case/${'6'}`}
            title='Others Court'
            img={otherCourt}
          />
        </div>
      </div>
    </div>
  );
  // ############################## case court card ##############################

  const tabs = (
    <div
      className='w-88 bg-white absolute text-primarydark flex flex-col items-center justify-between p-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
        height: '350px',
      }}
    >
      <div className='flex flex-col space-y-3 items-center px-10'>
        <div
          onClick={() => toggleChange(1) || setTabMenu(false)}
          className={
            toggle === 1
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span className='text-2xl'>My Schedule</span>
        </div>
        <div
          onClick={() => toggleChange(2) || setTabMenu(false)}
          className={
            toggle === 2
              ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
              : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
          }
        >
          <span className='text-2xl'>To Do List</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DashboardPageHading title='Dashboard' />
      <div className='flex flex-col space-y-10'>
        <div className='flex flex-col space-y-10 items-center justify-center'>
          <div className='flex 2xl:flex-row flex-col justify-center items-center 2xl:space-x-10 space-x-0 2xl:space-y-0 space-y-10 w-full'>
            <div className='flex sm:flex-row flex-col justify-start items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-10 sm:w-auto w-full'>
              <SuperAdminHomePageCard
                img={statisticswhite}
                bgColor='bg-primarydark'
                value={`${dashboardSummary?.todayCaseCount}`}
                title="Today's Case"
              />
              <SuperAdminHomePageCard
                img={statisticsdark}
                bgColor='bg-indigoWhite'
                value={`${dashboardSummary?.yesterdayCaseCount}`}
                title="Yesterday's Case"
              />
            </div>
            <div className='flex sm:flex-row flex-col justify-start items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-10 sm:w-auto w-full'>
              <SuperAdminHomePageCard
                img={statisticswhite}
                bgColor='bg-primarydark'
                value={`${dashboardSummary?.thisMonthCaseCount}`}
                title='This Month Cases'
              />
              <SuperAdminHomePageCard
                img={statisticsdark}
                bgColor='bg-indigoWhite'
                value={`${dashboardSummary?.totalCaseCount}`}
                title='Total Cases'
              />
            </div>
          </div>
          <div className='flex 2xl:flex-row flex-col justify-center items-center 2xl:space-x-10 space-x-0 2xl:space-y-0 space-y-10 w-full'>
            <div className='flex sm:flex-row flex-col justify-start items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-10 sm:w-auto w-full'>
              <SuperAdminHomePageCard
                img={statisticsdark}
                bgColor='bg-indigoWhite'
                value={`${dashboardSummary?.totalAssociate}`}
                title='Total Associates'
              />
              <SuperAdminHomePageCard
                img={statisticswhite}
                bgColor='bg-primarydark'
                value={`${dashboardSummary?.totalClient}`}
                title='Total Clients'
              />
            </div>
            <div className='flex sm:flex-row flex-col justify-start items-center sm:space-x-10 space-x-0 sm:space-y-0 space-y-10 sm:w-auto w-full'>
              <SuperAdminHomePageCard
                img={statisticsdark}
                bgColor='bg-indigoWhite'
                value={`${dashboardSummary?.totalStaffs}`}
                title='Total Staffs'
              />
              <SuperAdminHomePageCard
                img={statisticswhite}
                bgColor='bg-primarydark'
                value={finalTotalEarning
                  ?.toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                title='Total Expenses'
              />
            </div>
          </div>
        </div>

        <div className='flex justify-between border-b border-deepIndigo border-opacity-60'>
          <div className='xl:hidden flex justify-start mt-10 relative'>
            <div>
              <Icon
                onClick={() => setTabMenu(!tabMenu)}
                className='text-3xl text-primarylight cursor-pointer'
                icon={bxMenuAltRight}
              />
            </div>
          </div>
          <div className='lg:flex hidden items-center justify-start space-x-4 text-base font-medium mt-10'>
            <div
              onClick={() => toggleChange(1)}
              className={
                toggle === 1
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span className='text-2xl'>My Schedule</span>
            </div>
            <div
              onClick={() => toggleChange(2)}
              className={
                toggle === 2
                  ? 'text-primarydark cursor-pointer border-b-2 border-primarydark'
                  : 'text-deepIndigo opacity-80 cursor-pointer border-b-2 border-transparent'
              }
            >
              <span className='text-2xl'>To Do List</span>
            </div>
          </div>
          <div className='flex items-center justify-end space-x-4 h-10 mt-10'>
            <button
              onClick={() => setAddCase(true)}
              style={{ outline: 'none' }}
            >
              <img className='lg:w-full w-40' src={addNewCase} alt='' />
            </button>
            <Link to='/dashboard/advocate/calendar' style={{ outline: 'none' }}>
              <img className='lg:w-full w-40' src={myCalendar} alt='' />
            </Link>
          </div>
        </div>
        <div>
          {/* toggle 1 new users */}
          <div
            className={
              toggle === 1 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateHomePageTodaySchedule />
          </div>
          {/* toggle 2 Request a call */}
          <div
            className={
              toggle === 2 ? 'w-full h-full flex flex-col space-y-8' : 'hidden'
            }
          >
            <AdvocateToDoListPending />
          </div>
        </div>
        {/* <div className='w-full'>
          <div className='w-full mt-20'>
            <AdvocateHomePageTodaySchedule />
          </div>
        </div>
        <div className='flex lg:flex-row flex-col justify-between items-start lg:space-x-8 space-x-0 lg:space-y-0 space-y-8'>
          <div className='w-full'>
            <AdvocateToDoListPending />
          </div>
          <div className='lg:w-1/2 w-full'>
            <AdvocateHomePageTodaySchedule />
          </div>
        </div> */}
        <Modal
          open={addCase}
          onClose={() => setAddCase(false)}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {addNewCaseModal}
        </Modal>
        <Modal
          open={tabMenu}
          onClose={() => setTabMenu(false)}
          aria-labelledby='simple-modal-title'
          aria-describedby='simple-modal-description'
        >
          {tabs}
        </Modal>
      </div>
    </>
  );
};

export default AdvocateHomePageComponents;
