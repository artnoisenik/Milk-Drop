$(function() {
  //Rating
  $(".rating input:radio").attr("checked", false);
    $('.rating input').click(function () {
        $(".rating span").removeClass('checked');
        $(this).parent().addClass('checked');
    });

    $('input:radio').change(
    function(){
      //userRating for value
        var userRating = this.value;
    });
});
