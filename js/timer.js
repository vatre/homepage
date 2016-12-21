$(document).ready(function() {
  function validInput(input) {
    var reg = /^[0-9]{0,3}:[0-9]{0,3}$/g;
    return reg.test(input);
  }
  
  function Timer(input) {
    var self = this;
    self.minutes = input.split(':')[0];
    self.seconds = input.split(':')[1];
    
    self.minutes = isNaN(self.minutes) || self.minutes === "" ? 0 : parseInt(self.minutes);
    self.seconds = isNaN(self.seconds) || self.seconds === "" ? 0 : parseInt(self.seconds);
    
    self.toString = function() {
      var min = self.minutes.toString();
      var sec = self.seconds.toString();
      if (sec.length === 1) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    }
    
    self.update = function() {
      if (self.seconds === 0) {
        if (self.minutes === 0) {
          var audio = new Audio('img/alarm-sound.mp3');
          audio.play();
          return;
        }
        self.minutes -= 1;
        self.seconds = 59;
      } else {
        self.seconds -= 1;
      }
      $("#timer-input").val(self.toString());
      $("head title").text(self.toString());
      setTimeout(self.update, 1000);
    }
    
    self.launch = function() {
      $("#timer-input").attr('disabled', 'disabled')
        .css('text-align', 'center');
      $("head title").text($("#timer-input").val());
      setTimeout(self.update, 1000);
    };
  }
  
  var timer;
  $("#timer-input").keydown(function(e) {
    if (e.keyCode == 13) {
      var val = $("#timer-input").val();
      $("#timer-input").removeClass("error");
      if (validInput(val)) {
        timer = new Timer($("#timer-input").val());
        timer.launch();
      } else {
        $("#timer-input").addClass("error");
      }
    }
  });
  
});