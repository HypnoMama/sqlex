const { Client } = require('pg');
const settings = require("./settings");
const person = process.argv[2];


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
      console.log("Searching ...");
      console.log(`Found ${res.rows.length} person(s) by the name '${person}':`);
      let count = 1;
      res.rows.forEach((row) => {
        console.log(`- ${count}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().substring(0, 10)}'`);
        count++;
      })
      client.end();
    }
  })
});
