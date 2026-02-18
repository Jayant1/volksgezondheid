module.exports = (sequelize, Sequelize) => {
  const landen = sequelize.define("landen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    land_code: {
      type: Sequelize.STRING(3),
      allowNull: false,
      unique: true
    },
    landnaam: {
      type: Sequelize.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'landen',
    timestamps: false
  });

  landen.associate = function(models) {
    // No associations based on the database schema
  };

  return landen;
};
