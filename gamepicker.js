import open from 'open'
import axios from 'axios'
import weightedRand from 'weighted-random'

// open = require('open');
// const axios = require('axios');
// const weightedRand = require('weighted-random');

const Moby = {
  id: 0,
  weight: 100
};
  
const IGDB = {
  id: 1,
  weight: 50,
};

const rawgIO = {
  id: 2,
  weight: 25,
};

const mobyApiKey = '';
const twitchClientID = '';
const twitchClientSecret = '';
const rawgApiKey = '';
const weights = [0, 40, 60, 70, 80, 90];
    
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

async function getIGDBGame(offset, rating, token) {
  try {
    var query =
      rating === 0
        ? `fields *; where rating > ${rating} | rating = null; limit 1; offset ${offset};`
        : `fields *; where rating >= ${rating}; limit 1; offset ${offset};`;
    var response = await axios({
      url: 'https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': twitchClientID,
        Authorization: `Bearer ${token}`,
      },
      data: query,
    });
    return response.data[0];
  } catch (err) {
    console.error(err);
  }
}

async function authenticateTwitch() {
  try {
    const response = await axios({
      url: `https://id.twitch.tv/oauth2/token?client_id=${twitchClientID}&client_secret=${twitchClientSecret}&grant_type=client_credentials`,
      method: 'POST',
    });

    return response.data.access_token;
  } catch (err) {
    console.error(err);
  }
}

async function getCount(authToken, rating) {
  try {
    const response = await axios({
      url: 'https://api.igdb.com/v4/games/count',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': twitchClientID,
        Authorization: `Bearer ${authToken}`,
      },
      data: `where rating > ${rating};`,
    });

    return response.data.count;
  } catch (err) {
    console.error(err);
  }
}

async function getRawgCount() {
  try { 
    const response = await axios({
	    url: `https://api.rawg.io/api/games?key=${rawgApiKey}&ordering=name`,
		method: 'GET',
		headers: { 'User-Agent': 'Random Game Picker' },
    });

    return response.data.count;
  } catch (err) {
    console.error(err);
  }
}

async function fetchRawgSlug(number) {
  try {
    const response = await axios({
	  url: `https://api.rawg.io/api/games?key=${rawgApiKey}&page_size=1&page=${number}`,
      method: 'GET',
      headers: { 'User-Agent': 'Random Game Picker' },
    });

    return response.data.results[0].slug;
  } catch (err) {
    console.error(err);
  }
}

async function getMobyGame() {
  try {
	const response = await axios({
	  url: `https://api.mobygames.com/v1/games/random?api_key=${mobyApiKey}`,
	  method: 'GET',
	});

    var mobyGames = response.data.games;
	
	var randomInRandom = getRandomInt(0,100);
	
	return response.data.games[randomInRandom];
  } catch (err) {
	console.error(err);
  }
}
	  

async function pickGame() {
  var whichDB = weightedRand([Moby.weight, IGDB.weight, rawgIO.weight]);
    
  if (whichDB === Moby.id) {
	try {
	  var game = await getMobyGame();
	  
	  var url = `https://mobygames.com/game/${game}`
	  
	  open(url);
	}
    catch (err) {
	console.error (err);
    } 
  } else if (whichDB === IGDB.id) {
    try {
      var selectionIndex = weightedRand(weights);
      var rating = weights[selectionIndex];
      var twitchAuthToken = await authenticateTwitch();
      var count = await getCount(twitchAuthToken, rating);
      var offset = getRandomInt(1, count);
      var game = await getIGDBGame(offset, rating, twitchAuthToken);
      while (isEmptyObject(game)) {
        offset = getRandomInt(1, count);
        game = await getIGDBGame(offset, rating, twitchAuthToken);
      }

      open(game.url);
    } catch (err) {
      console.error(err);
    }
} else if (whichDB === rawgIO.id) {

    var count = await getRawgCount();
    var randomNumber = getRandomInt(1, count);
    var slug = await fetchRawgSlug(randomNumber);
    open('https://rawg.io/games/' + slug);
  }
}

pickGame();
