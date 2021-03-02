function pad(num) {
  return ("00" + num).slice(-2);
}

export function formatDateObj(date) {
  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(date.getUTCDate())
  );
}

export function getFirstDayofMonth(date) {
  return (
    date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(1)
  );
}

export function getLastDayofMonth(date) {
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return (
    date.getUTCFullYear() +
    "-" +
    pad(date.getUTCMonth() + 1) +
    "-" +
    pad(lastDay.getUTCDate())
  );
}
