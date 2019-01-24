let textArea = ".new-tweet textarea";

$(textArea).keyup(function() {
  let counter = $(this).siblings(".counter");
  let inputLength = this.value.length;
  counter.text(140 - inputLength)
  if (inputLength > 140) {
    counter.css('color', 'red')
  } else if (inputLength < 140) {
    counter.css('color', 'black')
  }
});

