$(document).ready(function() {
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  function updateTime() {
    var datetime = new Date();

    var time = datetime.getHours() + ":";
    var minutes = datetime.getMinutes().toString();
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    time += minutes + ":";
    var seconds = datetime.getSeconds().toString();
    if (seconds.length == 1) {
      seconds = "0" + seconds;
    }
    time += seconds;
    $("#headline #hour").text(time);

    setTimeout(updateTime, 1000);
  }

  function updateDate() {
    var datetime = new Date();

    var date = "";
    date += days[datetime.getDay()];
    date += ", " + months[datetime.getMonth()] + " ";
    date += datetime.getDate() + ", ";
    date += datetime.getFullYear();
    
    $("#headline #date").text(date);
  }
  
  updateDate();
  updateTime();
});