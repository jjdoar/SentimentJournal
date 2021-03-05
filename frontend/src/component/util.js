function pad(num) {
  return ("00" + num).slice(-2);
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function map(value, fromSource, toSource, fromTarget, toTarget) {
  return (
    ((value - fromSource) / (toSource - fromSource)) * (toTarget - fromTarget) +
    fromTarget
  );
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

export function getColour(startColour, endColour, min, max, value) {
  var startRGB = hexToRgb(startColour);
  var endRGB = hexToRgb(endColour);
  var percentFade = map(value, min, max, 0, 1);

  var diffRed = endRGB.r - startRGB.r;
  var diffGreen = endRGB.g - startRGB.g;
  var diffBlue = endRGB.b - startRGB.b;

  diffRed = diffRed * percentFade + startRGB.r;
  diffGreen = diffGreen * percentFade + startRGB.g;
  diffBlue = diffBlue * percentFade + startRGB.b;

  var alpha = Math.max(Math.abs(value), 0.5);

  var result =
    "rgb(" +
    Math.round(diffRed) +
    ", " +
    Math.round(diffGreen) +
    ", " +
    Math.round(diffBlue) +
    ", " +
    alpha +
    ")";
  return result;
}
