const fs = require('fs');
let c = fs.readFileSync('main.html', 'utf8');

// Fix 1: mouseleave translate(0,0) -> empty string
const old1 = "this.style.transform = 'translate(0, 0)';";
const new1 = "this.style.transform = '';";
let count = 0;
if (c.includes(old1)) {
  c = c.split(old1).join(new1);
  count++;
  console.log('Fix 1 applied!');
} else {
  console.log('Fix 1 NOT found!');
}

// Fix 2: Remove poll-bar-track from ripple selector
const old2 = "'button, .magnetic, .poll-bar-track, .memories-7a1-reaction-btn'";
const new2 = "'button, .magnetic, .memories-7a1-reaction-btn'";
if (c.includes(old2)) {
  c = c.split(old2).join(new2);
  count++;
  console.log('Fix 2 applied!');
} else {
  console.log('Fix 2 NOT found!');
}

fs.writeFileSync('main.html', c, 'utf8');
console.log('Done! ' + count + ' fixes applied.');
