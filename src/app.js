// Util 1: https://www.npmjs.com/package/twit   ||    https://github.com/ttezel/twit
// Util 2: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

const express = require("express");

const TweetFerias = require("./controllers/main.js")

const app = express();
const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log(`Servidor inicializado na porta: ${PORT}`);
})

// Setting update interval between main() calling:
const cooldownUpdate = 86400000;

TweetFerias.post();
setInterval(TweetFerias.post, cooldownUpdate);
