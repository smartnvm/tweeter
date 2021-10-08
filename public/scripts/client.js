/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// $(document).ready(() => {


// })


//short hand for ^

$(() => {

  showForm();
  // $('#tweeter-text').on('keypress keydown keyup change', function (e) {


  $('#tweeter-text').on('input', function (e) {
    validateTextArea(e)
  
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";

  })

  fetchTweets();

  const $form = $("#new-tweet-form");
  $form.on("submit", function (event) {
    event.preventDefault();

    let chars = $('#tweeter-text').val().length

    if (!validateForm(chars)) return

    const serializedData = $(this).serialize();

    $.post("/tweets", serializedData, (response) => {
      //onsole.log(response)
      fetchTweets()
    })
    console.log('form was submitted, reset text area');

    $('#tweeter-text').val('')
  })

})


const showForm = () => {

  $('.errmsg').hide();
  $('#maxlim').hide();
  $('#minlim').hide()
  $('#newTweet').hide();
  // $('header').hide();

  let show = true
  $('#showForm').click(function () {
    $(this).toggleClass('change');
    if (show) {
      show = false
      $('#newTweet').slideDown();
    } else {
      $('#newTweet').slideUp();
      show = true
    }
    // $('header').fadeIn();

  })




}
const validateForm = (chars) => {
  // let key
  // key = String.fromCharCode(e.keyCode);

  if (chars === 0) {
    $('#maxlim').hide()
    $('.errmsg').show();
    $('#minlim').show()
    $(this).parent("form").children("div").children("output").removeClass("red");
    validate = false

  }
  (chars > 140) ? validate = false : validate = true
  return validate
}


const autoSize = function (me) {

  me.setAttribute("style", "height:" + (this.scrollHeight) + "px;overflow-y:hidden;");
  me.style.height = "auto";
  me.style.height = (this.scrollHeight) + "px";

}

const validateTextArea = (e) => {
  // let key
  // key = String.fromCharCode(e.keyCode);

  let chars = $('#tweeter-text').val().length

  //update character count
  $('#counter').text(140 - chars);

  //update counter if backspace or delete keys are pressed
  if ((e.keyCode == 8) || (e.keyCode == 46)) {
    chars++
  }
  // e.preventDefault();

  if (chars > 140) {
    $('#minlim').hide();
    $('.errmsg').show();
    $('#maxlim').show();
    $('output').addClass("red")
    validate = false
  } else {
    $('.errmsg').hide();
    $("output").removeClass("red");
    validate = true
  }
  return validate
}

// making a get request to see tweets
const fetchTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: (tweet) => {
      console.log('data:', tweet)
      generateTweets(tweet)
    },
    error: (err) => {
      console.log(`there was an error: ${err}`)
    }
  })

}
const generateTweets = (tweets) => {
  // clear out blog-container
  const $tweetContainer = $(".tweet-container");
  $tweetContainer.empty();

  // repopulate blog-container
  for (const tweet of tweets) {
    const $tweet = createTweet(tweet);
    $tweetContainer.prepend($tweet);
  }
}


const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


// const safeHTML = `<p>${escape(textFromUser)}</p>`;

const createTweet = (tweet) => {

  // const $tweet = $('<article>').addClass('tweet')

  // const $tweetHeader = $('<header>')


  // const $userProfile = $('<div>').addClass('profile')

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
    <div class='profile'>
        <img src="${tweet.user.avatars}">
        <p>${tweet.user.name}</p>
    </div>
        <div class ='handle'>${tweet.user.handle}</div>
      </header>

      <div class='body'>
        <span>${escape(tweet.content.text)}</span>
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
  //       generateTweets(result);
  //     });
  // })
