import Sequelize from 'sequelize';
import path from 'path';

const sequelize = new Sequelize('slack', 'postgres', 'postgres', {
  dialect: 'postgres',
  host: 'jhydb1.cgiopeghcwn4.us-east-2.rds.amazonaws.com',
  define: {
    underscored: true
  },
  operatorsAliases: Sequelize.Op
});

const models = {
    User: sequelize.import(path.join(__dirname, '/user')),
    Channel: sequelize.import(path.join(__dirname, '/channel')),
    Message: sequelize.import(path.join(__dirname, '/message')),
    Team: sequelize.import(path.join(__dirname, '/team'))
};

Object.keys(models).forEach(modelName => {
  if('associate' in models[modelName]){
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;