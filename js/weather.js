// http://openweathermap.org/
$(document).ready(function() {
  var cityIds = {
    "Montpellier": "2992165",
    "Paris": "2988507"
  };
  
  $("#weather div").each(function(){
    var city = {
      id: $(this).attr('id'),
      owid: $(this).data('owid') //openweather Id
    }
    
    console.log(city);
  });
  
});