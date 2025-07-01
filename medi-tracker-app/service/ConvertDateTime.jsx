import moment from "moment";

// Convert a timestamp (number or string) into a JS Date
export const FormatDate = (timestamp) => {
  return new Date(timestamp);
};

// Format a Date or moment-able value into a human-readable 'll' format (e.g. 'Jul 1, 2025')
export const formatDateForText = (date) => {
  return moment(date).format('ll');
};

// Format a timestamp into 'HH:mm' time string
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  const timeString = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return timeString;
};

// Generate an array of 'MM/DD/YYYY' strings from startDate to endDate (inclusive)
// Accepts Date objects, timestamps, or moment-compatible strings
export const getDatesRange = (startDate, endDate) => {
  const start = moment(startDate);
  const end = moment(endDate);
  const dates = [];

  while (start.isSameOrBefore(end, 'day')) {
    dates.push(start.format('MM/DD/YYYY'));
    start.add(1, 'day');
  }
  return dates;
};

// Prepare the next 8 days for display in a date picker
// Returns objects with day, date, and formattedDate fields
export const GetDateRangeToDisplay = () => {
  const dateList = [];
  for (let i = 0; i <= 7; i++) {
    const m = moment().add(i, 'days');
    dateList.push({
      date: m.format('DD'),
      day: m.format('dd'),
      formattedDate: m.format('MM/DD/YYYY'),
    });
  }
  return dateList;
};
