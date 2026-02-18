module.exports = (sequelize, Sequelize) => {
  const distrikten = sequelize.define("distrikten", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    distrikt_code: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true
    },
    distriktnaam: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'distrikten',
    timestamps: false
  });

  distrikten.associate = function(models) {
    distrikten.hasMany(models.zorginstellingen, {
      foreignKey: 'distrikten_id',
      as: 'zorginstellingen'
    });
    distrikten.hasMany(models.wijken, {
      foreignKey: 'distrikten_id',
      as: 'wijken'
    });
  };

  return distrikten;
};
