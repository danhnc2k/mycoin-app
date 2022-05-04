export const convertTimestampToDateTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return (
    addZeroPrefix(date.getDate()) +
    '/' +
    addZeroPrefix(date.getMonth() + 1) +
    '/' +
    date.getFullYear() +
    ' ' +
    addZeroPrefix(date.getHours()) +
    ':' +
    addZeroPrefix(date.getMinutes()) +
    ':' +
    addZeroPrefix(date.getSeconds())
  );
};

const addZeroPrefix = (number) => {
  return number < 10 ? '0' + number : number;
};
