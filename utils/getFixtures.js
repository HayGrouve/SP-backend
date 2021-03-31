const axios = require('axios').default;
const Fixtures = require('../models/Fixture');

Fixtures.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Fixtures removed!');
  }
});

const leagueIdSet = new Set();

const getOddsPerDay = async (days = 0) => {
  for (let i = 0; i < days; i++) {
    let currentDate = new Date();
    let result = new Date();
    result.setDate(currentDate.getDate() + i);
    currentDate = result;
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let options = {
      method: 'GET',
      url: `https://api-football-v1.p.rapidapi.com/v2/odds/date/${year}-${
        month.toString().length === 1 ? (month = `0${month}`) : month
      }-${
        date.toString().length === 1 ? (date = `0${date}`) : date
      }/bookmaker/8?page=1`,
      params: { timezone: 'Europe/Sofia' },
      headers: {
        'x-rapidapi-key': '8c8198bc3fmsh1b23c461c94ca05p19e3c9jsn07c842ff0389',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      },
    };
    let response = await axios.request(options);
    let pageTotal = response.data.api.paging.total;
    await getOddsPerPage(pageTotal, date, month, year);
  }
  console.log(leagueIdSet);
};

const getOddsPerPage = async (totalPages = 1, date, month, year) => {
  for (let i = 1; i <= totalPages; i++) {
    let options = {
      method: 'GET',
      url: `https://api-football-v1.p.rapidapi.com/v2/odds/date/${year}-${
        month.toString().length === 1 ? (month = `0${month}`) : month
      }-${
        date.toString().length === 1 ? (date = `0${date}`) : date
      }/bookmaker/8?page=${i}`,
      params: { timezone: 'Europe/Sofia' },
      headers: {
        'x-rapidapi-key': '8c8198bc3fmsh1b23c461c94ca05p19e3c9jsn07c842ff0389',
        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
      },
    };
    let response = await axios.request(options);
    const odds = response.data.api.odds;
    odds.forEach((el) => {
      leagueIdSet.add(el.fixture.league_id);
    });
  }
};

module.exports = getOddsPerDay;
