// Calendário graduação em: https://www.dirgrad.cefetmg.br/dirgrad/calendario/
// Calendário médio-técnico em: https://www.ns.cefetmg.br/calendarios/

// Util 1: https://www.npmjs.com/package/twit   ||    https://github.com/ttezel/twit
// Util 2: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

const express = require("express");

const TweetFerias = require("./controllers/main.js")

const app = express();
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Server initialized on port ${PORT}`);
})

// 600000ms = 10min
// 5400000ms = 1h30
// 3600000ms = 1h
// 39600000ms = 11h
// 43200000ms = 12h
// 82800000ms = 23h
// 86400000ms = 24h

// Setting update interval between main() calling:
const cooldownUpdate = 60000;

TweetFerias.post();
setInterval(TweetFerias.post, cooldownUpdate);
