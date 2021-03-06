const displaySeleTime = document.querySelectorAll(".timer-content-data");
const timerDataWrapper = document.querySelectorAll(
  ".timer-content-data-wrapper"
);
(function seleTimer() {
  const nextFinDays = 2 - (~~(new Date().getTime() / 1000 / 60 / 60 / 24) % 3);
  const finDate = new Date();
  finDate.setDate(finDate.getDate() + nextFinDays);
  finDate.setHours(23);
  finDate.setMinutes(59);
  finDate.setSeconds(59);
  let diff = finDate.getTime() - new Date().getTime();
  let seconds = Math.round((diff / 1000) % 60);
  let minutes = ~~((diff / 1000 / 60) % 60);
  let hours = ~~((diff / 1000 / 60 / 60) % 24);
  let days = ~~(diff / 1000 / 60 / 60 / 24);
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (days < 10) {
    days = "0" + days;
  }
  displaySeleTime[0].innerText = days;
  displaySeleTime[1].innerText = hours;
  displaySeleTime[2].innerText = minutes;
  displaySeleTime[3].innerText = seconds;
  setTimeout(seleTimer, 1000);
})();
