const settings = require("./settings");
const first = process.argv[2];
const last = process.argv[3];
const dob = process.argv[4];

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});


knex('famous_people')
  .returning("id")
  .insert({
    first_name: first,
    last_name: last,
    birthdate: dob
  })
  .asCallback((err, rows) => {
    if (err) return console.error(err);
    console.log("Famous person added!")
    knex.destroy();
  });

