import { useContext, useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router';

import { DataContext } from '../../Context Api/ManageData';

function PrivateRoute({ children, ...rest }) {
  const { loggedInUser, setLoggedInUser } = useContext(DataContext);
  const [log, setLog] = useState({});

  const loginInfo = localStorage.getItem('loginInfo');
  const newLoginInfo = JSON.parse(loginInfo);
  // const currUser = { ...loggedInUser };

  // currUser.isSignedIn = newLoginInfo.isLoggedIn;
  // currUser.userType = newLoginInfo.userType;
  // setLoggedInUser(currUser);
  // console.log(newLoginInfo.userType, newLoginInfo.isLoggedIn);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        newLoginInfo?.isLoggedIn && newLoginInfo?.userType == 'SUPER_ADMIN'
          ? children
          : window.location.replace('/signin')
      }
    />
  );
}

export default PrivateRoute;
