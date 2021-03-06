export const events = calendarEvents => {
  let newEvent = [];

  calendarEvents?.map(event => {
    if (event.caseList.length > 0) {
      newEvent.push({
        case: event?.caseList,
        title: `${event?.caseList.length} cases`,
        start: new Date(dateForm(event.date)),
        end: new Date(dateForm(event.date)),
      });
    }
  });

  return newEvent;
};

let dateForm = date => {
  let l = date.split('-');

  let year = l[0];
  let month = parseInt(l[1]);
  let day = l[2];

  let d = `${year}, ${month}, ${day}`;

  return d;
};

export default [
  {
    title: '10 Total Cases',
    start: new Date(2021, 0, 1),
    end: new Date(2021, 0, 1),
  },
  {
    title: 'Long Event',
    start: new Date(),
    end: new Date(),
  },

  // {
  //   title: 'DTS STARTS',
  //   start: new Date(2021, 2, 13, 0, 0, 0),
  //   end: new Date(2021, 2, 20, 0, 0, 0),
  // },

  // {
  //   title: 'DTS ENDS',
  //   start: new Date(2016, 10, 6, 0, 0, 0),
  //   end: new Date(2016, 10, 13, 0, 0, 0),
  // },

  // {
  //   title: 'Some Event',
  //   start: new Date(2015, 3, 9, 0, 0, 0),
  //   end: new Date(2015, 3, 9, 0, 0, 0),
  // },
  // {
  //   title: 'Conference',
  //   start: new Date(2015, 3, 11),
  //   end: new Date(2015, 3, 13),
  //   desc: 'Big conference for important people',
  // },
  // {
  //   title: 'Meeting',
  //   start: new Date(2015, 3, 12, 10, 30, 0, 0),
  //   end: new Date(2015, 3, 12, 12, 30, 0, 0),
  //   desc: 'Pre-meeting meeting, to prepare for the meeting',
  // },
  // {
  //   title: 'Lunch',
  //   start: new Date(2015, 3, 12, 12, 0, 0, 0),
  //   end: new Date(2015, 3, 12, 13, 0, 0, 0),
  //   desc: 'Power lunch',
  // },
  // {
  //   title: 'Meeting',
  //   start: new Date(2015, 3, 12, 14, 0, 0, 0),
  //   end: new Date(2015, 3, 12, 15, 0, 0, 0),
  // },
  // {
  //   title: 'Happy Hour',
  //   start: new Date(2015, 3, 12, 17, 0, 0, 0),
  //   end: new Date(2015, 3, 12, 17, 30, 0, 0),
  //   desc: 'Most important meal of the day',
  // },
  // {
  //   title: 'Dinner',
  //   start: new Date(2015, 3, 12, 20, 0, 0, 0),
  //   end: new Date(2015, 3, 12, 21, 0, 0, 0),
  // },
  // {
  //   title: 'Birthday Party',
  //   start: new Date(2015, 3, 13, 7, 0, 0),
  //   end: new Date(2015, 3, 13, 10, 30, 0),
  // },
  // {
  //   title: 'Birthday Party 2',
  //   start: new Date(2015, 3, 13, 7, 0, 0),
  //   end: new Date(2015, 3, 13, 10, 30, 0),
  // },
  // {
  //   title: 'Birthday Party 3',
  //   start: new Date(2015, 3, 13, 7, 0, 0),
  //   end: new Date(2015, 3, 13, 10, 30, 0),
  // },
  // {
  //   title: 'Late Night Event',
  //   start: new Date(2015, 3, 17, 19, 30, 0),
  //   end: new Date(2015, 3, 18, 2, 0, 0),
  // },
  // {
  //   title: 'Multi-day Event',
  //   start: new Date(2015, 3, 20, 19, 30, 0),
  //   end: new Date(2015, 3, 22, 2, 0, 0),
  // },
];
