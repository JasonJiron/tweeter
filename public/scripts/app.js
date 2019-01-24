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
    $('#all-tweets').append(createArticle(tweet))
  })
}

let createArticle = ({user:{name, avatars, handle}, content, created_at}) => {

  return `
  <article class="tweet">
    <header class="tweet-header">
      <div>
        <img src=${avatars.small} />
        <h2>${name}</h2>
      </div>
      <p>${handle}</p>
    </header>
    <p class="user-tweet">${content.text}</p>
    <footer class="tweet-footer">
      <p>${created_at}</p>
      <div class="icons">
        <i class="far fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="far fa-heart"></i>
      </div>
    </footer>
  </article>` 
}

renderTweets(data)

$('form').submit((event) => {
  event.preventDefault();

  let textArea = ".new-tweet textarea";

  if ($(textArea).val().length > 140) {
    alert("Shorten it up")
  } else if ($(textArea).val() === "") {
    alert("You gotta enter something")
  } else {
    let newTweet = $('form').serialize();
    $.post('/tweets', newTweet)
    $('tweets').load('/tweets', renderTweets)
  }
});

let loadTweets = (cb) => {
  $.get('/tweets').then((data) => {
    console.log(data);
    cb(data)
  });
} 

loadTweets((data) => {
  renderTweets(data)
});

// $(selector).load(URL,data,callback);

// $(document).ready(function(){
//   $("button").click(function(){
//     $("#div1").load("demo_test.txt #p1");
//   });
// });
