const settings = require("./settings");
const person = process.argv[2];
const result = require('./famous_people_knexfunct');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


knex.select()
    .from('famous_people')
    .where('first_name', person)
    .orWhere('last_name', person)
    .asCallback(function (err, rows) {
      if (err) return console.error(err);
      result.returnFamousPeople(rows, person)
      knex.destroy();
    });

