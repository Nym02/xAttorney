import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const AdvocateSubMenu = ({ item, staffCount }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      {/* sidebar main menu */}
      <div className='h-14 flex justify-start items-center py-1'>
        <NavLink
          className='text-lightIndigo flex items-center justify-between border-l-2 border-transparent h-5/6 w-full'
          exact={true}
          activeStyle={{
            borderRight: '2px solid #D3D3FD',
          }}
          activeClassName='border-lightindigo'
          to={item.path}
          onClick={item.subNav && showSubnav}
        >
          {/* sidebar icons and title, title hidden in tab and mobile view */}
          <div className='flex items-center w-full px-6 space-x-24'>
            <div className='flex items-center space-x-4'>
              <img src={item.img} alt='' />
              <div className='text-base'>{item.title}</div>
            </div>
            {/* {item.title === 'Staff' ? (
              <>
                {staffCount !== 0 ? (
                  <>
                    {staffCount > 9 ? (
                      <>
                        <span className='h-6 w-6 rounded-full bg-red-500 text-white text-xs flex justify-center items-center'>
                          9+
                        </span>
                      </>
                    ) : (
                      <span className='h-5 w-5 rounded-full bg-red-500 text-white text-xs flex justify-center items-center'>
                        {staffCount}
                      </span>
                    )}
                  </>
                ) : null}
              </>
            ) : null} */}
          </div>

          {/* sidebar submenu population if subnav is true it will show else it will return null */}
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </NavLink>
      </div>

      {/* subnav design */}
      {subnav &&
        item.subNav.map((item, key) => {
          return (
            <Link key={key} to={item.path}>
              <div className='mb-1 py-3 lg:pl-12 pl-10 hover:bg-orange flex items-center space-x-2 text-gray-700 transition-colors duration-200 ease-in-out w-full'>
                <div>{item.icon}</div>
                <div className=''>{item.title}</div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default AdvocateSubMenu;
