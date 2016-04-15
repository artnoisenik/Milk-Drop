$(function() {
  if ($('.ratings').hasClass('1')) {
    $('.1').html('<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>');
  }
  if ($('.ratings').hasClass('2')) {
    $('.2').html('<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>');
  }
  if ($('.ratings').hasClass('3')) {
    $('.3').html('<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>');
  }
  if ($('.ratings').hasClass('4')) {
    $('.4').html('<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star-empty" aria-hidden="true"></span>');
  }
  if ($('.ratings').hasClass('5')) {
    $('.5').html('<span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span><span class="glyphicon glyphicon-star" aria-hidden="true"></span>');
  }

    // var divs=$('.accordion>div').hide(); //Hide/close all containers
    // var h3s=$('.test').click(function (event) {
    //     event.preventDefault();
    //     $(this).slideUp();
    //     $(this).addClass('hidden');
    //     $('.barImage').addClass('hidden');
    //     $('.barImage').slideUp();
    //      h3s.not(this).removeClass('hidden').slideDown();
    //      $('.barImage').not('.hidden').removeClass('hidden').slideDown();
    //     //  $('.barImage').not(this).slideDown();
    //      divs.not($(this).next()).slideUp()
    //      $(this).next().slideToggle()
    //      return false;
    //  });
    // $(".shadow").click(function(){
    //          window.location=$(this).find("a").attr("href");
    //          return false;
    //     });
    setTimeout(function(){ $('.gif').fadeOut() }, 3600);
    // $(".gif").delay(4000).fadeOut();

});
