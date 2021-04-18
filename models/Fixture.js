const mongoose = require('mongoose');

const FixtureSchema = mongoose.Schema({
  fixture: {
    type: Object,
    id: String,
    referee: String,
    timezone: String,
    date: String,
    timestamp: Number,
    periods: {
      type: Object,
      first: Number,
      second: Number,
    },
    venue: {
      type: Object,
      id: String,
      name: String,
      city: String,
    },
    status: {
      type: Object,
      long: String,
      short: String,
      elapsed: Number,
    },
  },
  league: {
    type: Object,
    id: String,
    name: String,
    country: String,
    logo: String,
    flag: String,
    season: Number,
    round: String,
  },
  teams: {
    type: Object,
    home: {
      type: Object,
      id: Number,
      name: String,
      logo: String,
      winner: String,
    },
    away: {
      type: Object,
      id: Number,
      name: String,
      logo: String,
      winner: String,
    },
  },
  goals: {
    type: Object,
    home: Number,
    away: Number,
  },
  score: {
    type: Object,
    halftime: {
      type: Object,
      home: Number,
      away: Number,
    },
    fulltime: {
      type: Object,
      home: Number,
      away: Number,
    },
    extratime: {
      type: Object,
      home: Number,
      away: Number,
    },
    penalty: {
      type: Object,
      home: Number,
      away: Number,
    },
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
