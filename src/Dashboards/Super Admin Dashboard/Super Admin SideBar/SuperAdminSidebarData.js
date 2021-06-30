import * as RiIcons from 'react-icons/ri';

import affeliation from '../../../assets/images/affeliation-icon.svg';
import barcouncil from '../../../assets/images/bar-councin-icon.svg';
import callRequest from '../../../assets/images/call-icon.svg';
import caseCategory from '../../../assets/images/case-category-icon.svg';
import caseType from '../../../assets/images/case-icon.svg';
import court from '../../../assets/images/court-icon.svg';
import home from '../../../assets/images/home-icon.svg';
import plans from '../../../assets/images/plans-icon.svg';
import service from '../../../assets/images/service-icon.svg';
import specialities from '../../../assets/images/specialities-icon.svg';
import superadmins from '../../../assets/images/super-admin-icon.svg';
import users from '../../../assets/images/users-icon.svg';

export const SuperAdminSidebarData = [
  {
    title: 'Home',
    path: '/dashboard/superadmin',
    img: `${home}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Users',
    path: '/dashboard/superadmin/users',
    img: `${users}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Super Admins',
    path: '/dashboard/superadmin/superadmins',
    img: `${superadmins}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Request For Contact',
    path: '/dashboard/superadmin/callrequest',
    img: `${callRequest}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Pricing Plan',
    path: '/dashboard/superadmin/plans',
    img: `${plans}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Service Area',
    path: '/dashboard/superadmin/servicearea',
    img: `${service}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Affeliation',
    path: '/dashboard/superadmin/affeliation',
    img: `${affeliation}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Bar Council',
    path: '/dashboard/superadmin/barcouncil',
    img: `${barcouncil}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Specialities',
    path: '/dashboard/superadmin/specialities',
    img: `${specialities}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Division',
    path: '/dashboard/superadmin/division',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'District',
    path: '/dashboard/superadmin/district',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Sub District',
    path: '/dashboard/superadmin/subdistrict',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Post Office',
    path: '/dashboard/superadmin/postoffice',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Police Station',
    path: '/dashboard/superadmin/policestation',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Court',
    path: '/dashboard/superadmin/court',
    img: `${court}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Court Name',
    path: '/dashboard/superadmin/courtname',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Case Type',
    path: '/dashboard/superadmin/casetype',
    img: `${caseType}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Case Category',
    path: '/dashboard/superadmin/casecategory',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Client Behalf',
    path: '/dashboard/superadmin/clientbehalf',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Client Type',
    path: '/dashboard/superadmin/clienttype',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },

  {
    title: 'Judgement Result',
    path: '/dashboard/superadmin/judgementresult',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Primary Result',
    path: '/dashboard/superadmin/primaryresult',
    img: `${caseCategory}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

// District, Division, PostOffice, PoliceStation, SubDistrict;
