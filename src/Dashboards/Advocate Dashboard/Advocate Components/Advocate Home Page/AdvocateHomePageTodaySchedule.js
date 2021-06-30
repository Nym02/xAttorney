import moment from 'moment';
import MUIDataTable from 'mui-datatables';
import { useContext } from 'react';
import { DataContext } from '../../../../Context Api/ManageData';

const AdvocateHomePageTodaySchedule = () => {
  const { dashboardSummary } = useContext(DataContext);

  let schedule = [];
  dashboardSummary?.upcomingCaseScheduleList?.map((item, index) => {
    schedule.push({
      sl: index + 1,
      caseNumber: item?.caseNumber,
      clientName: item?.client,
      clientPhone: item?.client,
      courtName: item?.courtName?.name,
      nextStep: item?.caseUpdates,
    });
  });

  const columns = [
    {
      name: 'sl',
      label: 'SL. No',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'caseNumber',
      label: 'Case Number',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientName',
      label: 'Client Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <div>
              {value === null ? (
                <span>No Client Info</span>
              ) : (
                value.map(k => {
                  if (k?.name === null) {
                    return <span>No Client Name</span>;
                  } else if (k?.name !== null) {
                    return <span>{k?.name}</span>;
                  }
                })
              )}
            </div>
          );
        },
      },
    },
    {
      name: 'clientPhone',
      label: 'Phone Number',
      options: {
        filter: true,
        sort: true,
        customBodyRender: clientName => {
          return (
            <div>
              {clientName !== null
                ? clientName?.map(k => {
                    if (k?.phoneList === null) {
                      return <span>No Phone Numberr</span>;
                    } else if (k?.phoneList !== null) {
                      return <span>{k?.phoneList[0]}</span>;
                    }
                  })
                : 'No Phone Number'}
            </div>
          );
        },
      },
    },
    {
      name: 'courtName',
      label: 'Court Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'nextStep',
      label: 'Next Step',
      options: {
        filter: true,
        sort: true,
        customBodyRender: nextStep => {
          return (
            <div>
              {nextStep !== null
                ? nextStep?.map(k => {
                    if (
                      moment(k?.nextDate).format('DD-MM-YYYY') ===
                      moment(new Date()).format('DD-MM-YYYY')
                    ) {
                      return <span>{k?.nextStep}</span>;
                    }
                  })
                : 'No Phone Number'}
            </div>
          );
        },
      },
    },

    // {
    //   name: 'id',
    //   label: 'Action',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (id, value) => {
    //       return (
    //         <div className='flex justify-center items-center'>
    //           <div
    //             onClick={() => handleCalled(value.rowData[6])}
    //             className='text-deepGreen flex justify-center items-center cursor-pointer'
    //           >
    //             <div className='p-2 rounded-full bg-red-800'>
    //               <Icon className='text-white text-2xl' icon={deleteOutlined} />
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     },
    //   },
    // },
    {
      name: 'id',
      label: 'Id',
      options: {
        display: false,
      },
    },
  ];

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  return (
    <>
      <MUIDataTable
        title={'Schedule'}
        data={schedule}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default AdvocateHomePageTodaySchedule;
