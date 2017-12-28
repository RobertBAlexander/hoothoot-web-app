/**
 * Created by Robert Alexander on 28/12/2017.
 */

//Code obtained from: http://jsfiddle.net/jakie8/ZECEN/

// The rel attribute is the userID you would want to follow

/*
$('button.followButton').live('click', function (e) {
  e.preventDefault();
  $button = $(this);
  if ($button.hasClass('following')) {

    //$.ajax(); Do Unfollow

    $button.removeClass('following');
    $button.removeClass('unfollow');
    $button.text('Follow');
  } else {

    // $.ajax(); Do Follow

    $button.addClass('following');
    $button.text('Following');
  }
});

$('button.followButton').hover(function () {
  $button = $(this);
  if ($button.hasClass('following')) {
    $button.addClass('unfollow');
    $button.text('Unfollow');
  }
}, function () {

  if ($button.hasClass('following')) {
    $button.removeClass('unfollow');
    $button.text('Following');
  }
});
*/
$(".button").click(function() {
  $(".button span").html($(".button span").html() == 'followed' ? 'follow' : 'followed');
});