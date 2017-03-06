
exports.up = function(knex, Promise) {
  return knex.schema.createTable('repos', function(t) {
    t.increments('id').unsigned().primary();
    t.string('Repo Name').notNull();
    t.string('Owner\'s Name').notNull();
    t.integer('stargazers').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('repos');
};
