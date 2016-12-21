$(document).ready(function() {
  var searchEngines = [{
    id: "google",
    prefix: "https://www.google.fr/#q=",
    suffix: ""
  }, {
    id: "youtube",
    prefix: "https://www.youtube.com/results?search_query=",
    suffix: ""
  }, {
    id: "wikipedia",
    prefix: "https://fr.wikipedia.org/w/index.php?search=",
    suffix: ""
  },  {
    id: "wiktionary",
    prefix: "https://fr.wiktionary.org/wiki/Special:Search?search=",
    suffix: ""
  }, {
    id: "duck",
    prefix: "https://duckduckgo.com/?q=",
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