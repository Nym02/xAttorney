import filter from '../../../../../../assets/images/filter.svg';
import SearchIcon from '@material-ui/icons/Search';
import { InputBase } from '@material-ui/core';
import addNewButton from '../../../../../../assets/images/add-new-button.svg';

const SuperAdminHomePageNewUsersTableComp = () => {
  return (
    <>
      <div>
        <div className='flex items-center justify-between h-10'>
          <div className='flex items-center space-x-6 h-10'>
            {/* filter button */}
            <div className='h-10 w-24 px-2 flex justify-center items-center space-x-2 text-primarydark text-base border border-deepIndigo rounded-md'>
              <img src={filter} alt='' />
              <span>Filter</span>
            </div>

            {/* searchbox */}
            <div className='bg-deepIndigo bg-opacity-20 relative h-full flex items-center rounded-md w-96'>
              <div style={{ left: '2%' }} className='absolute'>
                <SearchIcon className='text-deepIndigo' />
              </div>
              <InputBase
                className='pl-10 text-white w-full'
                placeholder='Search Users by Name, Phone No or Date'
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
          </div>
          <button style={{ outline: 'none' }}>
            <img src={addNewButton} alt='' />
          </button>
        </div>
      </div>
    </>
  );
};

export default SuperAdminHomePageNewUsersTableComp;
