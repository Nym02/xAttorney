import home from '../../../assets/images/home-icon.svg';
import cases from '../../../assets/images/users-icon.svg';
import client from '../../../assets/images/client-icon.svg';
import contact from '../../../assets/images/contact-icon.svg';
import associate from '../../../assets/images/associate-icon.svg';
import calendar from '../../../assets/images/calendar-icon.svg';
import schedule from '../../../assets/images/schedule-cion.svg';
import list from '../../../assets/images/list-icon.svg';
import staff from '../../../assets/images/staff-icon.svg';
import expense from '../../../assets/images/expense-icon.svg';
import * as RiIcons from 'react-icons/ri';

export const AdvocateSidebarData = [
  {
    title: 'Home',
    path: '/dashboard/advocate',
    img: `${home}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Case',
    path: '/dashboard/advocate/case',
    img: `${cases}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Clients',
    path: '/dashboard/advocate/clients',
    img: `${client}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Contacts',
    path: '/dashboard/advocate/contacts',
    img: `${contact}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Associates',
    path: '/dashboard/advocate/associates',
    img: `${associate}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'Calender',
    path: '/dashboard/advocate/calendar',
    img: `${calendar}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'My Schedule',
    path: '/dashboard/advocate/myschedule',
    img: `${schedule}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'To-do Lists',
    path: '/dashboard/advocate/todolist',
    img: `${list}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

export const AdvocateSidebarMyChamberData = [
  {
    title: 'Staff',
    path: '/dashboard/advocate/staff',
    img: `${staff}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
  {
    title: 'My Expense',
    path: '/dashboard/advocate/myexpense',
    img: `${expense}`,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];
