const knexConfig = require('../knexfile') //knex init
const env = 'development';
const knex = require('knex')(knexConfig[env]);


exports.up = function(knex, Promise) {
  return  Promise.all([
    knex.schema.table('milestones', function(table) {
      // table.increments('id');
      // table.string('description');
      // table.date('date_achieved');
      table.integer('famous_people_id')
      table.foreign('famous_people_id').references('famous_people.id')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropColumn('famous_people_id')
    ])
};
