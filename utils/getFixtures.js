const axios = require('axios').default;
const Fixtures = require('../models/Fixture');
const FixturesModel = require('../models/Fixture');

Fixtures.deleteMany({}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Fixtures removed!');
  }
});

const oddsArr = [];
let fixturesArr = [];
let dataArr = [];

const getDataPerDay = async (days = 0) => {
  for (let i = 0; i < days; i++) {
    let currentDate = new Date();
    let result = new Date();
    result.setDate(currentDate.getDate() + i);
    currentDate = result;
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    // let options = {
    //   method: 'GET',
    //   url: 'https://api-football-v1.p.rapidapi.com/v3/odds',
    //   params: {
    //     timezone: 'Europe/Sofia',
    //     date: `${year}-${
    //       month.toString().length === 1 ? (month = `0${month}`) : month
    //     }-${date.toString().length === 1 ? (date = `0${date}`) : date}`,
    //     page: '1',
    //     bookmaker: '8',
    //     bet: '1',
    //   },
    //   headers: {
    //     'x-rapidapi-key': '8c8198bc3fmsh1b23c461c94ca05p19e3c9jsn07c842ff0389',
    //     'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    //   },
    // };
    // let response = await axios.request(options);
    // let pageTotal = response.data.paging.total;
    let pageTotal = 2;
    await getOddsPerPage(pageTotal, date, month, year);
    await getFixturesPerDay(date, month, year);
  }
  mergeFixturesAndOdds();
};

const mergeFixturesAndOdds = () => {
  console.log(oddsArr, oddsArr.length);

  dataArr = fixturesArr
    .map((fixtureItem) => ({
      ...fixtureItem,
      ...oddsArr.find(
        (oddItem) => oddItem.fixtureId === fixtureItem.fixture.id
      ),
    }))
    .filter((item) => item.odds);
};

const getOddsPerPage = async (totalPages = 1, date, month, year) => {
  for (let i = 1; i <= totalPages; i++) {
    let response = await requestData(
      'https://api-football-v1.p.rapidapi.com/v3/odds',
      date,
      month,
      year,
      i,
      '8',
      '1'
    );
    const responseOdds = response.data.response;
    responseOdds.forEach((el) => {
      let odds = el.bookmakers[0].bets[0].values;
      let fixtureId = el.fixture.id;
      let oddsObject = {
        fixtureId,
        odds,
      };
      oddsArr.push(oddsObject);
    });
  }
};

const getFixturesPerDay = async (date, month, year) => {
  let response = await requestData(
    'https://api-football-v1.p.rapidapi.com/v3/fixtures',
    date,
    month,
    year
  );
  const responseFixtures = response.data.response;
  fixturesArr = fixturesArr.concat(responseFixtures);
};

const requestData = async (url, date, month, year, page, bookmaker, bet) => {
  let options = {
    method: 'GET',
    url: url,
    params: {
      timezone: 'Europe/Sofia',
      date: `${year}-${
        month.toString().length === 1 ? (month = `0${month}`) : month
      }-${date.toString().length === 1 ? (date = `0${date}`) : date}`,
    },
    headers: {
      'x-rapidapi-key': '8c8198bc3fmsh1b23c461c94ca05p19e3c9jsn07c842ff0389',
      'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    },
  };
  page && (options.params.page = page);
  bookmaker && (options.params.bookmaker = bookmaker);
  bet && (options.params.bet = bet);
  return await axios.request(options);
};

const insertFixtures = async (days = 0) => {
  await getDataPerDay(days);
  FixturesModel.insertMany(dataArr, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Fixtures updated!');
    }
  });
};

const exportObject = {
  insertFixtures,
};

module.exports = exportObject;
