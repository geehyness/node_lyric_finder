const axios = require('axios');
const cheerio = require('cheerio');

const song_lyrics = async (url) => {
	try {
		const { data } = await axios.get(url);

		const $ = cheerio.load(data);

		const re_ft = /\"\"/gi;
		const re = /\"/gi;
		const re_nl = /(\r\n|\r|\n){3,}/gi;
		//const re_clear_front = /\w{1,}Lyrics\n\n/gi

		const song = {
			name: $('b', data).text().replace(re_ft, " / Album - ").replace(re, "").replace("Lyrics", "- "),
			lyrics: $('div.col-xs-12 > div', data).text().replace(re_nl, "\n\n").trim(),
		};
		
		console.log(song.name);

		return song;
	} catch (error) {
		throw error;
	}
};

module.exports = song_lyrics;
