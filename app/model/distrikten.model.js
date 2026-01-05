module.exports = (sequelize, Sequelize) => {
  const distrikten = sequelize.define("distrikten", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    distrikt_code: {
      type: Sequelize.STRING(10),
      unique: true,
      allowNull: false
    },
    distriktnaam: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  });

  distrikten.associate = function(models) {
    distrikten.hasMany(models.wijken, {
      foreignKey: 'distrikten_id',
      as: 'wijken'
    });
    distrikten.hasMany(models.zorginstelling, {
      foreignKey: 'distrikten_id',
      as: 'zorginstellingen'
    });
  };

  return distrikten;
};
