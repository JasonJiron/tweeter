console.log('this is your script file here');

let textArea = ".new-tweet textarea";
let counter = ".new-tweet .counter";

$(textArea).keyup(function() {
  let inputLength = this.value.length;
  $(counter)[0].innerText = 140 - inputLength
  if (inputLength > 140) {
    $(counter).css('color', 'red')
  } else if (inputLength < 140) {
    $(counter).css('color', 'black')
  }
})



//  minus (this.placeholder.length)

// this.value.length -> length of input
// this.innerText -> character count value