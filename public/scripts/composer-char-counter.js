$(document).ready(function() {
  console.log('this is your script file here');

  let textArea = ".new-tweet textarea";
  let counter = ".new-tweet .counter";

  $(textArea).keydown(function() {
    let inputLength = this.value.length;
    $(counter)[0].innerText = 140 - inputLength
  })

});


//  minus (this.placeholder.length)

// this.value.length -> length of input
// this.innerText -> character count value