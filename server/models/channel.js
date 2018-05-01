export default (sequelize, DataTypes) => {
  const Channel = sequelize.define('channel', {
    name: { 
        type: DataTypes.STRING
    },
    public: { 
        type: DataTypes.BOOLEAN
    }
  });

  Channel.associate = (models) => {
      // 1:M
      Channel.belongsTo(models.Team, {
          foreignKey: 'teamId'
      });
  };

  return Channel;
};