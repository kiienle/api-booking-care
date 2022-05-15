const { Sequelize } = require('@sequelize/core');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hoiDanIt', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
});
