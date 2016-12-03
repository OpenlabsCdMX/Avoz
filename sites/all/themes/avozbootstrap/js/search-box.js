jQuery(document).ready(function($) {

    $('#search-main-btn').click(function(){
              $('#search-main-btn').attr("href",$('#search-main-btn').attr("href")+$('#search-title').val());
    });
});
