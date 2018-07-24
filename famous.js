const { Client } = require('pg');
const settings = require("./settings");
const person = process.argv[2];
const result = require('./return_famous_people');

const client = new Client ({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const text = "SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text";
const values = [person];

client.connect((err) => {
  if (err) {
    return console.error(err);
  }
  client.query(text, values, (err, res) => {
    if (err) {
      return console.log(err.stack);
    } else {
      result.returnFamousPeople(res, person);
      }
      client.end();
    }
  )
});
