const play = require('audio-play');
const load = require('audio-loader');
const app = require('express')();

let bell;
load('./bell-ringing.wav').then(x => bell = x);
function ring(cb, n = 1) {
  if (n > 0) {
    play(bell, () => setTimeout(() => ring(cb, n - 1), 200));
  } else {
    cb();
  }
}

app.get('/', (req, res) => res.send(`
<html>
  <head><title>Christmas Bells</title></head>
  <body>
    <form method=post>
      <button type=submit style="width:100%;height:10em;">Ring!</button>
    </form>
  </body>
</html>
`));

app.post('/', (req, res) => ring(() => res.redirect('/'), 2));

app.listen(3000, () => console.log(`Listening on port 3000!`));
