import { useContext, useEffect } from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useParams,
} from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';

// navbar and footer pages
import Footer from './components/Footer/Footer';
import NavigationBar from './components/Navigation Bar/NavigationBar';
import BackToTop from './components/Typographys/BackToTop';
import ScrollToTop from './components/Typographys/ScrollToTop';
import ErrorPage from './components/Unknown Page/ErrorPage';
import { ManageData } from './Context Api/ManageData';
import AdvocateAssociatePageCreateNewAssociate from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Associate Page/Advocate Associate Page Create New Associate/AdvocateAssociatePageCreateNewAssociate';
import AdvocateAssociatePageShowNewAssociateDetails from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Associate Page/Advocate Associate Page Create New Associate/AdvocateAssociatePageShowNewAssociateDetails';
import CaseFirstPage from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Case Page/Appellate Division Page/CaseFirstPage';
import CaseSecondPage from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Case Page/Appellate Division Page/CaseSecondPage';
import CaseThirdPage from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Case Page/Appellate Division Page/CaseThirdPage';
import AdvocateClientPageUpdateClient from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Client Page/Advocate Clinet Page Create New Client/AdvocateClientPageUpdateClient';
import AdvocateClinetPageCreateNewClient from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Client Page/Advocate Clinet Page Create New Client/AdvocateClinetPageCreateNewClient';
import AdvocateStaffPageAddStaff from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Staff Page/Advocate Staff Page Add Staff/AdvocateStaffPageAddStaff';
import AdvocateStaffPageUpdateStaff from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Staff Page/Advocate Staff Page Add Staff/AdvocateStaffPageUpdateStaff';
// advocate page components
import AdvocateNavbar from './Dashboards/Advocate Dashboard/Advocate NavBar/AdvocateNavbar';
import AdvocateSidebar from './Dashboards/Advocate Dashboard/Advocate SideBar/AdvocateSidebar';
import AdvocateAssociatePageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateAssociatePageView';
import AdvocateCalendarPageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateCalendarPageView';
import AdvocateCasePageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateCasePageView';
import AdvocateClientPageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateClientPageView';
import AdvocateContactPageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateContactPageView';
import AdvocateHomePageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateHomePageView';
import AdvocateMyExpensePageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateMyExpensePageView';
import AdvocateMySchedulePageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateMySchedulePageView';
import AdvocateSettingsPageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateSettingsPageView';
import AdvocateStaffPageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateStaffPageView';
import AdvocateToDoListPageView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocateToDoListPageView';
// superadmin dashboard page components
import SuperAdminNavbar from './Dashboards/Super Admin Dashboard/Super Admin Dashboard Navbar/SuperAdminNavbar';
import SuperAdminSidebar from './Dashboards/Super Admin Dashboard/Super Admin SideBar/SuperAdminSidebar';
import SuperAdminAffeliationPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminAffeliationPageView';
import SuperAdminBarCouncilPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminBarCouncilPageView';
import SuperAdminCaseCategoryPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminCaseCategoryPageView';
import SuperAdminCaseTypePageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminCaseTypePageView';
import SuperAdminClientBehalfPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminClientBehalfPageView';
import SuperAdminClientTypePageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminClientTypePageView';
import SuperAdminCourtNamePageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminCourtNamePageView';
import SuperAdminCourtPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminCourtPageView';
import SuperAdminDistrictPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminDistrictPageView';
import SuperAdminDivisionPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminDivisionPageView';
import SuperAdminHomePageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminHomePageView';
import SuperAdminJudgementResultPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminJudgementResultPageView';
import SuperAdminPlansPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminPlansPageView';
import SuperAdminPoliceStationPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminPoliceStationPageView';
import SuperAdminPostOfficePageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminPostOfficePageView';
import SuperAdminPrimaryResultPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminPrimaryResultPageView';
import SuperAdminRequestForCalllPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminRequestForCalllPageView';
import SuperAdminServiceAreaPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminServiceAreaPageView';
import SuperAdminSpecialitiesPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminSpecialitiesPageView';
import SuperAdminSubDistrictView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminSubDistrictView';
import SuperAdminSuperAdminsPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminSuperAdminsPageView';
import SuperAdminUsersPageView from './Dashboards/Super Admin Dashboard/Super Admin Views/SuperAdminUsersPageView';
import PrivateAdvocateRoute from './Utils/ProtectedRoute/PrivateAdvocateRoute';
import PrivateRoute from './Utils/ProtectedRoute/PrivateRoute';
// page view components
import AboutUsPageView from './views/AboutUsPageView';
import BuyNowPageView from './views/BuyNowPageView';
import ContactUsePageView from './views/ContactUsePageView';
import LandingPageView from './views/LandingPageView';
import PaymentConfirmationPageView from './views/PaymentConfirmationPageView';
import PaymentDetailsPageView from './views/PaymentDetailsPageView';
import PrivacyPoliciesPageView from './views/PrivacyPoliciesPageView';
import RefundPolicyPageView from './views/RefundPolicyPageView';
import SignInPageView from './views/SignInPageView';
import TermsAndConditionsPageView from './views/TermsAndConditionsPageView';

// -----------------------owl carousel css----------------------------
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import {
  emailVerified,
  finalNewLoginToken,
  latestPlanId,
  refreshAccessToken,
} from './Utils/UserToken';
import { Paper } from '@material-ui/core';
import ForgotPasswordView from './views/ForgotPasswordView';
import ResetPasswordView from './views/ResetPasswordView';
import AdvocateBuyPackage from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Buy Package/AdvocateBuyPackage';
import jwt from 'jsonwebtoken';
import AdvocateEmailVerification from './Dashboards/Advocate Dashboard/Advocate Components/Advocate Email Verification/AdvocateEmailVerification';
import PostPaymentView from './views/PostPaymentView';
import AdvocatePakagePaymentView from './Dashboards/Advocate Dashboard/Advocate Views/AdvocatePakagePaymentView';
import BlogHomePageView from './views/BlogHomePageView';
import BlogSinglePageComponents from './components/Blogs Page Components/Blog Single Page Components/BlogSinglePageComponents';
import axios from 'axios';
import dayjs from 'dayjs';

const App = () => {
  console.log("WHAT ARE YOU LOOKING FOR AND WHAT'S THE POINT?");
  const path = window.location.pathname;
  const splittedPath = path.split('/');
  const isAdvocateDashboard = splittedPath[2]
    ? splittedPath[2].split('-')[0] === 'advocate'
    : false;
  const isSuperAdminDashboard = splittedPath[2]
    ? splittedPath[2].split('-')[0] === 'superadmin'
    : false;
  const isLandingPage =
    isAdvocateDashboard === true || isSuperAdminDashboard === true
      ? false
      : true;

  //localstorage data
  const activePlan = latestPlanId;

  const loginInfo = localStorage?.getItem('loginInfo');
  const newLoginInfo = JSON.parse(loginInfo);

  const LandingRoutes = (
    <>
      <ManageData>
        <NavigationBar />
        <ToastProvider>
          <Switch>
            <Route path='/' exact component={LandingPageView} />
            <Route path='/about-us' exact component={AboutUsPageView} />
            <Route path='/contact-us' exact component={ContactUsePageView} />
            {/* payment pages */}
            <Route path='/buy-now' exact component={BuyNowPageView} />
            <Route
              path='/buynow/payment-details'
              exact
              component={PaymentDetailsPageView}
            />
            {/* <Route
              path='/buynow/payment-details/:status'
              exact
              component={PostPaymentView}
            /> */}
            {/* terms and privacy pages */}
            <Route
              path='/terms-and-conditions'
              exact
              component={TermsAndConditionsPageView}
            />
            <Route
              path='/privacy-policy'
              exact
              component={PrivacyPoliciesPageView}
            />
            <Route
              path='/refund-policy'
              exact
              component={RefundPolicyPageView}
            />
            {/* sign in page */}
            <Route path='/signin' exact component={SignInPageView} />
            <Route
              path='/forgot-password'
              exact
              component={ForgotPasswordView}
            />
            <Route
              path='/reset-password/:token'
              exact
              component={ResetPasswordView}
            />
            {/* blogs page  */}
            <Route path='/blogs' exact component={BlogHomePageView} />
            <Route
              path='/blog/:id'
              exact
              component={BlogSinglePageComponents}
            />
            <Route path='*' component={ErrorPage} />
          </Switch>
        </ToastProvider>
        <BackToTop />
        <ScrollToTop />
        <Footer />
      </ManageData>
    </>
  );

  const SuperAdminDashboardRoutes = (
    <>
      <ManageData>
        <ToastProvider>
          <SuperAdminSidebar />
          <Switch>
            <div className='lg:pl-17 pl-20 lg:ml-76 ml-0 lg:pr-8 pr-6 lg:mt-0 -mt-6'>
              <SuperAdminNavbar />
              {/* <Route
                exact
                path='/dashboard/superadmin'
                component={SuperAdminHomePageView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin'>
                <SuperAdminHomePageView />
              </PrivateRoute>
              {/* <Route
                exact
                path='/dashboard/superadmin/users'
                component={SuperAdminUsersPageView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin/users'>
                <SuperAdminUsersPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path='/dashboard/superadmin/callrequest'
                component={SuperAdminRequestForCalllPageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/callrequest'>
                <SuperAdminRequestForCalllPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/plans"
                component={SuperAdminPlansPageView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin/plans'>
                <SuperAdminPlansPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/servicearea"
                component={SuperAdminServiceAreaPageView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin/servicearea'>
                <SuperAdminServiceAreaPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/affeliation"
                component={SuperAdminAffeliationPageView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin/affeliation'>
                <SuperAdminAffeliationPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/barcouncil"
                component={SuperAdminBarCouncilPageView}

              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/barcouncil'>
                <SuperAdminBarCouncilPageView />
              </PrivateRoute>

              {/* <Route
                exact
                path="/dashboard/superadmin/specialities"
                component={SuperAdminSpecialitiesPageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/specialities'>
                <SuperAdminSpecialitiesPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/superadmins"
                component={SuperAdminSuperAdminsPageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/superadmins'>
                <SuperAdminSuperAdminsPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/court"
                component={SuperAdminCourtPageView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin/court'>
                <SuperAdminCourtPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/casetype"
                component={SuperAdminCaseTypePageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/casetype'>
                <SuperAdminCaseTypePageView />
              </PrivateRoute>

              {/* <Route
                exact
                path="/dashboard/superadmin/casecategory"
                component={SuperAdminCaseCategoryPageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/casecategory'>
                <SuperAdminCaseCategoryPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/division"
                component={SuperAdminDivisionPageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/division'>
                <SuperAdminDivisionPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/district"
                component={SuperAdminDistrictPageView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin/district'>
                <SuperAdminDistrictPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/subdistrict"
                component={SuperAdminSubDistrictView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin/subdistrict'>
                <SuperAdminSubDistrictView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/postoffice"
                component={SuperAdminPostOfficePageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/postoffice'>
                <SuperAdminPostOfficePageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/policestation"
                component={SuperAdminPoliceStationPageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/policestation'>
                <SuperAdminPoliceStationPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/clientbehalf"
                component={SuperAdminClientBehalfPageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/clientbehalf'>
                <SuperAdminClientBehalfPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/clienttype"
                component={SuperAdminClientTypePageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/clienttype'>
                <SuperAdminClientTypePageView />
              </PrivateRoute>

              {/* <Route
                exact
                path="/dashboard/superadmin/courtname"
                component={SuperAdminCourtNamePageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/courtname'>
                <SuperAdminCourtNamePageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/judgementresult"
                component={SuperAdminJudgementResultPageView}
              /> */}
              <PrivateRoute exact path='/dashboard/superadmin/judgementresult'>
                <SuperAdminJudgementResultPageView />
              </PrivateRoute>
              {/* <Route
                exact
                path="/dashboard/superadmin/primaryresult"
                component={SuperAdminPrimaryResultPageView}
              /> */}

              <PrivateRoute exact path='/dashboard/superadmin/primaryresult'>
                <SuperAdminPrimaryResultPageView />
              </PrivateRoute>
            </div>
          </Switch>
        </ToastProvider>
      </ManageData>
    </>
  );

  const AdvocateDashboardRoutes = (
    <>
      <ManageData>
        <AdvocateSidebar />
        <ToastProvider>
          {emailVerified === false ? (
            <div>
              <AdvocateEmailVerification />
            </div>
          ) : (
            <div className='hidden'>hello</div>
          )}
          {emailVerified === true && activePlan === 'No Plan' ? (
            <>
              <AdvocateBuyPackage />
            </>
          ) : (
            <></>
          )}
          <Switch>
            <div
              onClick={() => refreshAccessToken()}
              className='lg:pl-17 ml-20 lg:ml-64 lg:pr-8 pr-6 lg:mt-0 -mt-6 relative'
            >
              <AdvocateNavbar />
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate'
                // component={AdvocateHomePageView}
              >
                <AdvocateHomePageView />
              </PrivateAdvocateRoute>

              {/* case pages */}
              {/* <Route
                exact
                path='/dashboard/advocate/case'
                component={AdvocateCasePageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/case'>
                <AdvocateCasePageView></AdvocateCasePageView>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/case/:courtDivision'
                component={CaseFirstPage}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/case/:courtDivision'
              >
                <CaseFirstPage></CaseFirstPage>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/case/second-form/:courtDivision/:caseId'
                component={CaseSecondPage}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/case/second-form/:courtDivision/:caseId'
              >
                <CaseSecondPage></CaseSecondPage>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/case/third-form/:courtDivision/:caseId'
                component={CaseThirdPage}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/case/third-form/:courtDivision/:caseId'
              >
                <CaseThirdPage></CaseThirdPage>
              </PrivateAdvocateRoute>
              {/* client pages */}
              {/* <Route
                exact
                path='/dashboard/advocate/clients'
                component={AdvocateClientPageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/clients'>
                <AdvocateClientPageView></AdvocateClientPageView>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/client/add-new-client'
                component={AdvocateClinetPageCreateNewClient}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/client/add-new-client'
              >
                <AdvocateClinetPageCreateNewClient></AdvocateClinetPageCreateNewClient>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/client/update-client/:clientId'
                component={AdvocateClientPageUpdateClient}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/client/update-client/:clientId'
              >
                <AdvocateClientPageUpdateClient></AdvocateClientPageUpdateClient>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/contacts'
                component={AdvocateContactPageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/contacts'>
                <AdvocateContactPageView></AdvocateContactPageView>
              </PrivateAdvocateRoute>
              {/* associate pages */}
              {/* <Route
                exact
                path='/dashboard/advocate/associates'
                component={AdvocateAssociatePageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/associates'>
                <AdvocateAssociatePageView></AdvocateAssociatePageView>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/associates/add-new-associate'
                component={AdvocateAssociatePageCreateNewAssociate}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/associates/add-new-associate'
              >
                <AdvocateAssociatePageCreateNewAssociate></AdvocateAssociatePageCreateNewAssociate>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/associates/show-new-associate'
                component={AdvocateAssociatePageShowNewAssociateDetails}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/associates/show-new-associate'
              >
                <AdvocateAssociatePageShowNewAssociateDetails></AdvocateAssociatePageShowNewAssociateDetails>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/calendar'
                component={AdvocateCalendarPageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/calendar'>
                <AdvocateCalendarPageView></AdvocateCalendarPageView>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/myschedule'
                component={AdvocateMySchedulePageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/myschedule'>
                <AdvocateMySchedulePageView></AdvocateMySchedulePageView>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/todolist'
                component={AdvocateToDoListPageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/todolist'>
                <AdvocateToDoListPageView></AdvocateToDoListPageView>
              </PrivateAdvocateRoute>
              {/* staff pages */}
              {/* <Route
                exact
                path='/dashboard/advocate/staff'
                component={AdvocateStaffPageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/staff'>
                <AdvocateStaffPageView></AdvocateStaffPageView>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/staff/add-staff'
                component={AdvocateStaffPageAddStaff}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/staff/add-staff'
              >
                <AdvocateStaffPageAddStaff></AdvocateStaffPageAddStaff>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/staff/update-staff/:staffId'
                component={AdvocateStaffPageUpdateStaff}
              /> */}
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/staff/update-staff/:staffId'
              >
                <AdvocateStaffPageUpdateStaff></AdvocateStaffPageUpdateStaff>
              </PrivateAdvocateRoute>
              {/* <Route
                exact
                path='/dashboard/advocate/myexpense'
                component={AdvocateMyExpensePageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/myexpense'>
                <AdvocateMyExpensePageView></AdvocateMyExpensePageView>
              </PrivateAdvocateRoute>
              {/* advocate settings page */}
              {/* <Route
                exact
                path='/dashboard/advocate/settings'
                component={AdvocateSettingsPageView}
              /> */}
              <PrivateAdvocateRoute exact path='/dashboard/advocate/settings'>
                <AdvocateSettingsPageView></AdvocateSettingsPageView>
              </PrivateAdvocateRoute>
              <PrivateAdvocateRoute
                exact
                path='/dashboard/advocate/payment/:status'
              >
                <AdvocatePakagePaymentView />
              </PrivateAdvocateRoute>
            </div>
          </Switch>
        </ToastProvider>
      </ManageData>
    </>
  );

  return (
    <Router>
      {isAdvocateDashboard === true ? AdvocateDashboardRoutes : <></>}
      {isSuperAdminDashboard === true ? SuperAdminDashboardRoutes : <></>}
      {isLandingPage === true ? LandingRoutes : <></>}
    </Router>
  );
};

export default App;
