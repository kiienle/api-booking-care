const { Sequelize } = require('@sequelize/core');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('hoiDanIt', 'root', null, {
  host: 'localhost',
  dialect: 'mysql',
});

let connectDB = () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};

module.exports = connectDB