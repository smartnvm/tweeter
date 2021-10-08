/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// $(document).ready(() => {


// })


//short hand for ^

$(() => {

  $('#newTweet').hide();
  // $('header').hide();

  $('.errmsg').hide();

  let show = true
  $('#showForm').mouseenter(function () {

    // $(this).toggleClass('flipV');

    if (show) {
      show = false
      $('#newTweet').slideDown();
    } else {
      $('#newTweet').slideUp();
      show = true
    }
    // $('header').fadeIn();

  })


  let keyPressed = true

  // $('#tweeter-text').on('keypress keydown keyup change', function (e) {
  $('#tweeter-text').on('input', function (e) {
    // let key
    // key = String.fromCharCode(e.keyCode);

    let chars = 140 - $('#tweeter-text').val().length

    //update character count
    $('#counter').text(chars);


    //update counter if backspace or delete keys are pressed
    if ((e.keyCode == 8) || (e.keyCode == 46)) {
      chars++
    }

    if (chars < 0) {
      e.preventDefault();
      $(this).parent("form").children("div").children("output").addClass("red")

    } else {
      $(this).parent("form").children("div").children("output").removeClass("red");
    }

  })



  loadTweets();
  const $form = $("#new-tweet-form");
  $form.on("submit", function (event) {
    event.preventDefault();
    console.log('form was submitted');

    let chars = 140 - $('#tweeter-text').val().length

    // validateForm (chars)
    if (chars > 140) {
      $('.errmsg').show()
      return
    }

    const serializedData = $(this).serialize();

    $.post("/tweets", serializedData, (response) => {
      //onsole.log(response)
      loadTweets()
    })
  })

})


const validateForm = (charLength) => {
  if (charLength > 140) {
    $('.errmsg').slideDown()
  }
}

// making a get request to see tweets
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: (tweet) => {
      console.log('data:', tweet)
      renderTweets(tweet)
    },
    error: (err) => {
      console.log(`there was an error: ${err}`)
    }
  })

}
const renderTweets = (tweets) => {
  // clear out blog-container
  const $tweetContainer = $(".tweet-container");
  $tweetContainer.empty();

  // repopulate blog-container
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.prepend($tweet);
  }
}


const createTweetElement = (tweet) => {

  // const $tweet = $('<article>').addClass('tweet')

  // const $tweetHeader = $('<header>')


  // const $userProfile = $('<div>').addClass('avatar-name')

  // const $avatar = $("<img>").attr({
  //   "src": tweet.user.avatars,
  //   "alt": 'avatar'
  // });

  // const $name = $("<span>").text(tweet.user.name)
  // $userProfile.append($avatar, $name)

  // const $handle = $("<div>").addClass('text-muted').text(tweet.user.handle)

  // $tweetHeader.append($userProfile, $handle)


  // const $tweetBody = $("<div>").addClass('body').text(tweet.content.text)

  // const $tweetFooter = $('<footer>')

  // const $footerTime = $("<span>").addClass('tweetage').text(timeago.format(tweet.created_at))

  // const $tweetReactions = $("<div>").addClass('reactions')

  // const $flag = $("<i>").addClass('fa fa-xs fa-flag')
  // const $retweet = $("<i>").addClass('fa fa-xs fa-retweet')
  // const $like = $("<i>").addClass('fa fa-xs fa-heart')

  // $tweetReactions.append($flag, $retweet, $like)


  // $tweetFooter.append($footerTime, $tweetReactions)

  // // const $body = $("<h2>").text(tweet.content.text)
  // // const $timestamp = time(tweet.created_at)
  // // const $dateCreated = $("<h1>").text($timestamp)

  // // $tweet.append($avatar, $name, $handle, $body, $dateCreated)
  // $tweet.append($tweetHeader, $tweetBody, $tweetFooter)





  const $tweet = $(`
  <article class="tweet">
    <header> 
    <div class='avatar-name'>
        <img src="${tweet.user.avatars}">              <p>${tweet.user.name}</p>
        </div>
        <p>${tweet.user.handle}</p>
      </header>

      <div class='body'>
        <span>${tweet.content.text}</span>
      </div>
      <br>
      <footer> 
        <span class class="tweetage">${timeago.format(tweet.created_at)}</span>
        <div class="reactions">
          <i class="fa fa-xs fa-flag"></i>
          <i class="fa fa-xs fa-retweet"></i>
          <i class="fa fa-xs fa-heart"></i>
        </div>
      </footer>

    </article>`);
  return $tweet
}





  // const $form = $("#new-tweet-form");
  // $form.on("submit", function (event) {

  //   $.ajax({
  //     url: "/tweets",
  //     method: "POST",
  //     data: $(this).serialize()
  //   })
  //     .then((result) => {
  //       console.log(result, "tweet sent!")
  //     });

  //   $.ajax({
  //     url: "/tweets",
  //     method: "GET"
  //   })
  //     .then((result) => {
  //       console.log('GET result:', result)
  //       renderTweets(result);
  //     });
  // })
