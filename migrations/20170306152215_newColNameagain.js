
exports.up = function(knex, Promise) {
  return knex.schema.createTable('repos', function(t) {
    t.increments('id').unsigned().primary();
    t.string('RepoName').notNull();
    t.string('ownersName').notNull();
    t.integer('stargazers').notNull();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('repos');
};
