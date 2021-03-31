const mongoose = require('mongoose');

const FixtureSchema = mongoose.Schema({
  fixture_id: String,
  league_id: Number,
  league: {
    type: Object,
    name: String,
    country: String,
    logo: String,
    flag: String,
  },
  event_date: String,
  event_timestamp: Number,
  firstHalfStart: Number,
  secondHalfStart: Number,
  round: String,
  status: String,
  statusShort: String,
  elapsed: Number,
  venue: String,
  referee: String,
  homeTeam: {
    type: Object,
    team_id: Number,
    team_name: String,
    logo: String,
  },
  awayTeam: {
    type: Object,
    team_id: Number,
    team_name: String,
    logo: String,
  },
  goalsHomeTeam: Number,
  goalsAwayTeam: Number,
  score: {
    type: Object,
    halftime: String,
    fulltime: String,
    extratime: String,
    penalty: String,
  },
  odds: [
    {
      type: Object,
      value: String,
      odd: String,
    },
    {
      type: Object,
      value: String,
      odd: String,
    },
    {
      type: Object,
      value: String,
      odd: String,
    },
  ],
});

module.exports = mongoose.model('Fixture', FixtureSchema);
