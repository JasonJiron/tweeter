/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

let renderTweets = (tweets) => {
  tweets.forEach((tweet) => {
    $('#all-tweets').prepend(createArticle(tweet))
  })
}

// Data obj destructuring
let createArticle = ({user:{name, avatars, handle}, content, created_at}) => {

  let newTweetArticle = $(' <article class="tweet"></article>');
  let tweetHeader     = $('<header class="tweet-header"></header>');
  let tweetBody       = $(`<p class="user-tweet"></p>`).text(content.text);
  let tweetP          = $(`<p></p>`).text(handle);
  let tweetFooterP    = $(`<p></p>`).text(created_at);
  let tweetFooter     = $('<footer class="tweet-footer"></footer>');
  let tweetDiv        = $('<div></div>');
  let tweetAvatar     = $(`<img src=${avatars.small} />`);
  let tweetName       = $('<h2></h2>').text(name);
  let tweetIconDiv    = $(`
    <div class="icons">
      <i class="far fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="far fa-heart"></i>
    </div>`);
  
  newTweetArticle.append(tweetHeader).append(tweetBody).append(tweetFooter);
  tweetFooter.append(tweetFooterP).append(tweetIconDiv);
  tweetHeader.append(tweetDiv).append(tweetP);
  tweetDiv.append(tweetAvatar).append(tweetName);

  return newTweetArticle;
};

$('form').submit((event) => {
  event.preventDefault();
  let textArea = ".new-tweet textarea";
  if ($(textArea).val().length > 140) {
    $("#error" ).text('Shorten it up!')
  } else if ($(textArea).val() === "") {
    $("#error" ).text('Make it longer, eh')
  } else {
    let newTweet = $('form').serialize();
    $( "#error" ).text('')
    $.post('/tweets', newTweet).then(() => {
      loadTweets((data) => {
        $('#all-tweets').empty();
        renderTweets(data)
        $(textArea).val('')
      })
    })
  }
});

let loadTweets = (cb) => {
  $.get('/tweets').then((data) => {
    console.log(data)
    cb(data)
  })
};

loadTweets((data) => {
  renderTweets(data)
});

$(".new-tweet").slideUp();
$(".button").click(() => {
  $(".new-tweet").slideToggle("slow");
  $('form textarea').focus();
});

$(".new-tweet").click(() => {
  $("#error").text('')
});