$(document).ready(function() {
  $.ajax( {
      url: 'http://quotesondesign.com//wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      success: function(data) {
        var post = data.shift(); // The data is an array of posts. Grab the first one.
        post.content = post.content.replace(/<(?:.|\n)*?>/gm, '');
        $("#headline #quote").text(post.content);
        $("#headline #author").text(post.title);
      },
      cache: false
    });
});