export function convertMillisecondsToMinutesAndHours(seconds: any) {
  // if (milliseconds < 1000) return milliseconds + " milli sec";
  // let seconds = Math.floor(milliseconds / 1000);
  // let minutes = Math.floor(seconds / 60);
  // let hours = Math.floor(minutes / 60);

  // let remainingSeconds = seconds % 60;
  // let remainingMinutes = minutes % 60;

  // let output = "";
  // if (hours > 0) {
  //   output += hours + " h ";
  // }
  // if (remainingMinutes > 0) {
  //   output += remainingMinutes + " min ";
  // }
  // if (remainingSeconds) {
  //   output += remainingSeconds + " sec ";
  // }
  // return output;
  if (seconds < 60) return seconds + " sec";

  let minutes = Math.floor(seconds / 60);
  let remainingSeconds = seconds % 60;
  let hours = Math.floor(minutes / 60);
  let remainingMinutes = minutes % 60;

  let output = "";
  if (hours > 0) {
    output += hours + " h ";
  }
  if (remainingMinutes > 0) {
    output += remainingMinutes + " min ";
  }
  if (remainingSeconds > 0) {
    output += remainingSeconds + " sec ";
  }
  return output;
}
