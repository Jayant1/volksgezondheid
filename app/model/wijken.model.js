module.exports = (sequelize, Sequelize) => {
  const wijken = sequelize.define("wijken", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    distrikten_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    wijk_code: {
      type: Sequelize.STRING(10),
      allowNull: false,
      unique: true
    },
    wijknaam: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'wijken',
    timestamps: false
  });

  wijken.associate = function(models) {
    wijken.belongsTo(models.distrikten, {
      foreignKey: 'distrikten_id',
      as: 'distrikt'
    });
    wijken.hasMany(models.zorginstellingen, {
      foreignKey: 'wijken_id',
      as: 'zorginstellingen'
    });
  };

  return wijken;
};
