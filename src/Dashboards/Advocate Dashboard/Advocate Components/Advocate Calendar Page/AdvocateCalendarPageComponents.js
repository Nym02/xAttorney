import moment from 'moment';
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

import event, { events } from './event';
import './calendar.css';
import modalClose from '../../../../assets/images/modal-close.svg';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { createMuiTheme, MenuItem, Modal } from '@material-ui/core';
import gql from 'graphql-tag';
import axios from 'axios';
import { MAIN_API } from '../../../../Utils/APIs';
import { print } from 'graphql';
import { finalNewLoginToken } from '../../../../Utils/UserToken';
import { useEffect } from 'react';
import { Menu } from '@material-ui/icons';
import MUIDataTable from 'mui-datatables';

const AdvocateCalendarPageComponents = () => {
  const localizer = momentLocalizer(moment);
  const [calenderEvent, setCalenderEvent] = useState([]);
  const [eventCaseList, setEventCaseList] = useState([]);
  const [eventPopup, setEventPopup] = useState(false);

  //date conversion
  const firstDayOfCurrentYear = new Date(new Date().getFullYear(), 0, 1);
  const lastDayOfCurrentYear = new Date(new Date().getFullYear(), 11, 31);

  const convertDateToString = date => {
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }

    let fullDate = `${yyyy}-${mm}-${dd}`;

    return fullDate;
  };

  const firstDay = convertDateToString(firstDayOfCurrentYear);
  const lastDay = convertDateToString(lastDayOfCurrentYear);

  const advocateEvents = e => {
    const newFirstDay = JSON.stringify(firstDay);
    const newLastDay = JSON.stringify(lastDay);

    const finalFirstDay = newFirstDay.replace(/"([^"]+)":/g, '$1:');
    const finalLastDay = newLastDay.replace(/"([^"]+)":/g, '$1:');

    const eventsQuery = gql`
      {
        getAllCaseCalendarInformationByDateRange(
          startDate: ${finalFirstDay}
          endDate: ${finalLastDay}
        ) {
          status
          code
          errors {
            code
            field
            message
            description
          }
          data {
            caseCalendarInformationList {
              date
              caseList {
                id
                district {
                  id
                  name
                }
                caseType {
                  id
                  name
                }
                caseNumber
                year
                primaryResult {
                  id
                  name
                }
                primaryResultDate
                reminderForExtension
                caseCategory {
                  id
                  name
                }
                courtName {
                  id
                  name
                }
                filingDate
                judgementDate
                judgementResult {
                  id
                  name
                }
                client {
                  id
                  name
                  phoneList
                }
                bellOnStayFor
                opponentList {
                  name
                  phoneList
                }
                opponentWitnessList
                wakalatnamaList {
                  number
                  entryDate
                }
                caseUpdates {
                  courtName {
                    id
                  }
                  nextDate
                  nextStep
                  description
                  orderDate
                  caseStatus
                }
                disposed
                noNextDate
                caseStatus
                judgeNameList
                actList
                transferredCourtName
                arisingOutOfList
                witnessList
                description
                newCaseNumber
              }
            }
            offset
            limit
            numberOfElements
            totalElements
            totalPages
            first
            last
          }
        }
      }
    `;

    axios
      .post(
        MAIN_API,
        {
          query: print(eventsQuery),
        },
        {
          headers: {
            Authorization: `Bearer ${finalNewLoginToken}`,
          },
        }
      )
      .then(res => {
        setCalenderEvent(
          res?.data?.data?.getAllCaseCalendarInformationByDateRange?.data
            ?.caseCalendarInformationList
        );
      });
  };
  useEffect(() => {
    advocateEvents();
  }, []);

  events(calenderEvent);

  let newCase = [];
  eventCaseList?.map((item, idx) => {
    newCase?.push({
      sl: idx + 1,
      clientName: item.client,
      // clientPhone: item?.client[0]?.phoneList[0],
      caseNumber: item?.caseNumber,
      clientOpponentName: item?.opponentList,
      courtName: item?.courtName,
      id: item?.id,
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
                value?.map(k => {
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
      name: 'clientName',
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
                      return <span>N/A</span>;
                    } else if (k?.phoneList !== null) {
                      return (
                        <span>
                          {k?.phoneList[0] === null || k?.phoneList[0] === ''
                            ? k?.phoneList[0]
                            : 'N/A'}
                        </span>
                      );
                    }
                  })
                : 'No Phone Number'}
            </div>
          );
        },
      },
    },
    {
      name: 'caseNumber',
      label: 'Case No.',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'clientOpponentName',
      label: 'Opponent Name',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => {
          return (
            <div>
              {value !== null
                ? value?.map(k => <span>{k.name}</span>)
                : 'No Opponent'}
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
        customBodyRender: value => {
          return <div>{value !== null ? value?.name : 'N/A'}</div>;
        },
      },
    },
    // {
    //   name: 'id',
    //   label: 'Actions',
    //   options: {
    //     filter: true,
    //     sort: false,
    //     customBodyRender: (value, item) => {
    //       return (
    //         <div>
    //           <Button
    //             style={{ outline: 'none' }}
    //             aria-controls='simple-menu'
    //             aria-haspopup='true'
    //             onClick={e => handleClick(e, value, item)}
    //           >
    //             <Icon
    //               className='text-2xl text-purple-400'
    //               icon={overflowMenuVertical}
    //             />
    //           </Button>
    //           <Menu
    //             id='simple-menu'
    //             anchorEl={anchorEl}
    //             keepMounted
    //             open={Boolean(anchorEl)}
    //             onClose={handleClose}
    //           >
    //             <MenuItem
    //               className='flex space-x-2 items-center'
    //               onClick={() => setUpdateCaseInfoModal(true)}
    //             >
    //               <Icon icon={clockCircleOutlined} />
    //               <span>Update</span>
    //             </MenuItem>
    //             <MenuItem
    //               className='flex space-x-2 items-center'
    //               onClick={() => setUpdateFeesInfoModal(true)}
    //             >
    //               <Icon icon={moneyDollarCircleLine} />
    //               <span>Add Fees & Cost</span>
    //             </MenuItem>
    //             <MenuItem
    //               className='flex space-x-2 items-center'
    //               onClick={() => setOpenViewHistory(true)}
    //             >
    //               <Icon icon={moneyDollarCircleLine} />
    //               <span>History</span>
    //             </MenuItem>
    //             <MenuItem
    //               className='flex space-x-2 items-center'
    //               onClick={() => setOpen(true)}
    //             >
    //               <Icon icon={eyeIcon} />
    //               <span>View</span>
    //             </MenuItem>
    //             <MenuItem
    //               className='flex space-x-2 items-center'
    //               onClick={() => setDeleteModal(true)}
    //             >
    //               <Icon icon={trashCan} />
    //               <span>Delete</span>
    //             </MenuItem>
    //           </Menu>
    //         </div>
    //       );
    //     },
    //   },
    // },
  ];

  const options = {
    ilter: true,
    filterType: 'input',
    responsive: 'stacked',
  };

  // -------------------------------- event modal --------------------------------
  const deleteTableData = (
    <div
      className='xl:w-2/3 md:w-2/3 w-11/12 h-auto bg-white absolute text-primarydark flex flex-col space-y-12 rounded-lg'
      style={{
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%)`,
      }}
    >
      <div className='h-9 w-full bg-deepdark rounded-t-lg text-white font-semibold flex justify-center items-center relative'>
        <span>Case List</span>
        <div style={{ top: '-32%', left: '97.8%' }} className='absolute w-8'>
          <img
            onClick={() => setEventPopup(false)}
            className='w-full cursor-pointer'
            src={modalClose}
            alt=''
          />
        </div>
      </div>
      <div
        style={{ width: '100% !important' }}
        className='flex flex-col space-y-3 justify-center items-center px-8 pb-10 w-full'
      >
        <MUIDataTable
          className='w-full'
          title={'Case List'}
          data={newCase}
          columns={columns}
          options={options}
        />
      </div>
    </div>
  );

  return (
    <>
      <div style={{ height: 700 }}>
        <Calendar
          localizer={localizer}
          // defaultDate={new Date()}
          popup={true}
          onSelectEvent={(data, e) => {
            setEventPopup(true);
            setEventCaseList(data.case);
          }}
          onSelecting={(start, end) => {}}
          onNavigate={length => {}}
          defaultView='month'
          events={events(calenderEvent)}
          style={{ height: '80vh' }}
        />
      </div>

      <div className='w-1 h-1 opacity-0 absolute hidden'>
        <MUIDataTable
          title={'Associate List'}
          columns={columns}
          options={options}
        />
      </div>
      <Modal
        open={eventPopup}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {deleteTableData}
      </Modal>
    </>
  );
};

export default AdvocateCalendarPageComponents;
