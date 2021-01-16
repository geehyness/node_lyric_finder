const express = require('express');
const router = express.Router();


const got = require("got");

const axios = require('axios');
const cheerio = require('cheerio');
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');

axiosCookieJarSupport(axios);
 
const cookieJar = new tough.CookieJar();



router.get("/", async (req, res)=>{
    try {
		const url = 'https://search.azlyrics.com/search.php?q=' + req.body.name.replace(' ', '+') + '&w=songs&p=1';
//res.send("test");
		await axios.get(url, {
            jar: cookieJar, // tough.CookieJar or boolean
			//credentials: 'include',
			withCredentials: true, // If true, send cookie stored in jar
			headers: {'X-Requested-With':'XMLHttpRequest'}
		})
		/*got.get(url)*/
		.then((response) => {
			const $ = cheerio.load(response.body);
			
			const postTitles = [];

			var temp = $('td.visitedlyr', response.data).text().split('\n');
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

			for (let i = 0; i < $('td.visitedlyr > a', response.body).length; i++) {
				postTitles.push(
					{
						name: names[i].replace("null", " ").replace(/\d{1,}.\s/gi, ""),
						url: $('td.visitedlyr > a', response.body)[i].attribs.href
					}
				);
				console.log(i);
			}

			console.log(postTitles);
			res.status(200).send(postTitles);
		})
		.catch((error) => {
			console.error(error);
			res.status(400).send(error);
		});
	} catch (error) {
		console.log(error);
		res.status(400).send(error);
	}
});

//getPostTitles();
module.exports = router;
