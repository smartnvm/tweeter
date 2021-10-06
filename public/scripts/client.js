/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => {

  let keyPressed = true

  $('#tweeter-text').on('keypress keydown keyup change', function (e) {
    // let key
    // key = String.fromCharCode(e.keyCode);
    
    let chars = 140 - $('#tweeter-text').val().length
    
    //update character count
    $('#counter').text(chars);
  

    //update counter if backspace or delete keys are pressed
    if ((e.keyCode == 8) || (e.keyCode == 46)) {
      chars++
    }

    if (chars === 0) {
      e.preventDefault();
      $(this).parent("form").children("div").children("output").addClass("red")

    } else {
      $(this).parent("form").children("div").children("output").removeClass("red");
    }

  })

});
