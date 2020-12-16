const axios = require('axios');
const cheerio = require('cheerio');
const song_lyrics = require('./song_lyrics');

//const url = 'https://search.azlyrics.com/search.php?q=really+love&w=songs&p=1';

const search_lyrics = async (param) => {
	try {
		const url = 'https://search.azlyrics.com/search.php?q=' + param.replace(' ', '+') + '&w=songs&p=1';
		const { data } = await axios.get(url);

		const $ = cheerio.load(data);
		
		const postTitles = [];

/*
		$('td.visitedlyr > a').each((_idx, el) => {
			const postTitle = $(el.text);
			postTitles.push(postTitle);
		});
*/

		//console.log($('td.visitedlyr > a', data).length);
		//console.log($('td.visitedlyr > a', data));

		var temp = $('td.visitedlyr', data).text().split('\n');
		var temp2 = [];


		for (var a = 0; a < temp.length; a++) {
			var name = temp[a].trim();
			name = name.replace(/\s{3,}/gi, null)

			temp2.push(name);
		}

		temp2 = temp2.filter(String);

		var names = temp2.filter(function (el) {
			return el != null;
		});

		for (let i = 0; i < $('td.visitedlyr > a', data).length; i++) {
			postTitles.push(
				{
					name: names[i].replace("null", " ").replace(/\d{1,}.\s/gi, ""),
					url: $('td.visitedlyr > a', data)[i].attribs.href
				}
			);
			console.log(i);
			//await lyric_search($('td.visitedlyr > a', data)[i].attribs.href);
			//console.log(await lyric_search($('td.visitedlyr > a', data)[i].attribs.href));
		}

		console.log(postTitles);
		return postTitles;
	} catch (error) {
		throw error;
	}
};

//getPostTitles();
module.exports = search_lyrics;