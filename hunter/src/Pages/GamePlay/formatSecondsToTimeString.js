const formatSecondsToTimeString = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(14, 5);
};
export default formatSecondsToTimeString;
