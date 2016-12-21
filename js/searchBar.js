$(document).ready(function() {
  var searchEngines = [{
    id: "google",
    prefix: "https://www.google.fr/#q=",
    suffix: ""
  }, {
    id: "duck",
    prefix: "https://duckduckgo.com/?q=",
    suffix: ""
  }, {
    id: "ecosia",
    prefix: "https://www.ecosia.org/search?q=",
    suffix: ""
  }]
  var engineIndex = 0;

  function incrementEngine() {
    var sel;
    sel = "#engine-" + searchEngines[engineIndex].id;
    $(sel).css('display', 'none');
    engineIndex = (engineIndex + 1) % searchEngines.length;
    sel = "#engine-" + searchEngines[engineIndex].id;
    $(sel).css('display', 'initial');
  }
  
  $("#engine-" + searchEngines[0].id).css('display', 'initial');


  $("#search").keypress(function(e) {
    if (e.keyCode == 13) {
      var url = searchEngines[engineIndex].prefix;
      url += $("#search-bar").val();
      url += searchEngines[engineIndex].suffix;
      window.location.href = url;
    } else if (e.keyCode == 249) {
      e.preventDefault();
      incrementEngine();
    }
  });
});