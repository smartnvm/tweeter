/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(() => {
  //initialize the form
  showForm();

  //auto size form textarea
  $("#tweeter-text").on("input", function (e) {
    updateCounter(e);

    this.setAttribute(
      "style",
      "height:" + this.scrollHeight + "px;overflow-y:hidden;"
    );
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });

  //fetch tweet from server
  fetchTweets();

  const $form = $("#new-tweet-form");
  $form.on("submit", function (event) {
    event.preventDefault();

    let chars = $("#tweeter-text").val().length;

    if (!validateForm(chars)) return;

    const serializedData = $(this).serialize();
    $.post("/tweets", serializedData, (response) => {
      fetchTweets();
    });
    //form was submitted, reset text area and counter
    $("#tweeter-text").val("");
    $("#counter").text(140);
  });
});

const showForm = () => {
  $(".errmsg").hide();
  $("#maxlim").hide();
  $("#minlim").hide();
  $("#newTweet").hide();

  let show = true;
  $("#showForm").click(function () {
    $(this).toggleClass("change");
    if (show) {
      show = false;
      $("#newTweet").slideDown();
    } else {
      $("#newTweet").slideUp();
      show = true;
    }
  });
};

const updateCounter = (e) => {
  $(".errmsg").hide();

  let chars = $("#tweeter-text").val().length;

  //update character count
  $("#counter").text(140 - chars);

  //update counter if backspace or delete keys are pressed
  if (e.keyCode == 8 || e.keyCode == 46) {
    chars++;
  }
  if (chars > 140) {
    $("output").addClass("red");
    validate = false;
  } else {
    $("output").removeClass("red");
  }
};

const validateForm = (chars) => {
  if (chars > 140) {
    $("#minlim").hide();
    $(".errmsg").show();
    $("#maxlim").show();
    $("output").addClass("red");
    validate = false;
  } else if (chars === 0) {
    $("#maxlim").hide();
    $(".errmsg").show();
    $("#minlim").show();
    validate = false;
  } else {
    $(".errmsg").hide();
    $("output").removeClass("red");
    validate = true;
  }

  return validate;
};

// making a get request to see tweets
const fetchTweets = () => {
  $.ajax({
    url: "/tweets",
    method: "GET",
    dataType: "json",
    success: (tweet) => {
      generateTweets(tweet);
    },
    error: (err) => {
      console.log(`there was an error: ${err}`);
    },
  });
};
const generateTweets = (tweets) => {
  // clear out blog-container
  const $tweetContainer = $(".tweet-container");
  $tweetContainer.empty();

  // repopulate blog-container
  for (const tweet of tweets) {
    const $tweet = createTweet(tweet);
    $tweetContainer.prepend($tweet);
  }
};

//escape function to mitigate against XSS
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweet = (tweet) => {
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
  return $tweet;
};
