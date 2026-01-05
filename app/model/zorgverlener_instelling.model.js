module.exports = (sequelize, Sequelize) => {
  const zorgverlener_instelling = sequelize.define("zorgverlener_instelling", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    zorginstelling_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    functie: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    start_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    eind_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    is_actief: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  });

  zorgverlener_instelling.associate = function(models) {
    zorgverlener_instelling.belongsTo(models.zorgverlener, {
      foreignKey: 'zorgverlener_id',
      as: 'zorgverlener'
    });
    zorgverlener_instelling.belongsTo(models.zorginstelling, {
      foreignKey: 'zorginstelling_id',
      as: 'zorginstelling'
    });
  };

  return zorgverlener_instelling;
};
