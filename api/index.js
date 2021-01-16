
const express = require('express');
const cors = require('cors');
var bodyparser = require('body-parser');





const axios = require('axios');
const cheerio = require('cheerio');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);
 
const cookieJar = new tough.CookieJar();
 






const search_lyrics = require('./search_lyrics');
const song_lyrics = require('./song_lyrics');

const app = express();
app.use(cors());
app.use(bodyparser.json());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.send('connected!');
});

/*
app.get('/search/', async (req, res) => {
    
    res.send({"response":await search_lyrics(req.body.name)});
});

app.get('/song/', async (req, res) => {
    res.send(await song_lyrics(req.body.url));
});
*/

app.use('/search', search_lyrics);


app.listen(process.env.PORT || 2210, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
