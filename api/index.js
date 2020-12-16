
const express = require('express');
const cors = require('cors');
var bodyparser = require('body-parser');

const search_lyrics = require('./search_lyrics');
const song_lyrics = require('./song_lyrics');

const app = express();
app.use(cors());
app.use(bodyparser.json());

const PORT = process.env.PORT || 2210;

app.get('/search/', async (req, res) => {
    //res.send('Hello World!');
    console.log(req.body);
    res.send(await search_lyrics(req.body.name));
})

app.get('/song/', async (req, res) => {
    //res.send('Hello World!');
    res.send(await song_lyrics(req.body.url));
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
