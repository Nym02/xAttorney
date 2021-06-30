import Icon from '@iconify/react';
import { Button, Divider, Menu, Paper } from '@material-ui/core';
import moment from 'moment';
import { useContext } from 'react';
import { DataContext } from '../../../../Context Api/ManageData';
import MUIDataTable from 'mui-datatables';

const AdvocateSettingsPageTransactionHistory = () => {
  const { dashboardSummary } = useContext(DataContext);

  let transactionHistory = [];
  dashboardSummary?.onlineTransactionList?.map((value, index) => {
    transactionHistory.push({
      sl: index + 1,
      date: moment(value?.time).format('DD-MM-YYYY'),
      plan: value?.pricingPlan?.planMode,
      amount: value?.pricingPlan?.discountedAmount,
    });
  });

  const columns = [
    {
      name: 'date',
      label: 'Date',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'plan',
      label: 'Package Plan',
      options: {
        filter: true,
        sort: true,
        customBodyRender: plan => {
          return <div>{plan === 'YEARLY' ? 'Premium' : 'Basic'}</div>;
        },
      },
    },
    {
      name: 'plan',
      label: 'Package Duration',
      options: {
        filter: true,
        sort: true,
        customBodyRender: plan => {
          return <div>{plan === 'YEARLY' ? '1 year' : '6 Months'}</div>;
        },
      },
    },
    {
      name: 'amount',
      label: 'Amount',
      options: {
        filter: true,
        sort: true,
        customBodyRender: amount => {
          return (
            <div>
              {amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </div>
          );
        },
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
      <Paper className='w-full rounded-md' elevation={4}>
        <div className='w-full bg-white rounded-md h-104 text-primarydark overflow-y-scroll'>
          <div className='h-13 flex justify-start items-center pl-4 pr-12'>
            <h1 className='font-semibold text-lg'>Transaction History</h1>
          </div>
          <Divider />
          <div className='flex flex-col justify-center items-center w-full lg:px-12 px-4 mt-2'>
            <MUIDataTable
              className='w-full'
              title={'Expenses'}
              data={transactionHistory}
              columns={columns}
              options={options}
            />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default AdvocateSettingsPageTransactionHistory;
