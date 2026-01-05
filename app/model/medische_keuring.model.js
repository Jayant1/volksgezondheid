module.exports = (sequelize, Sequelize) => {
  const medische_keuring = sequelize.define("medische_keuring", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    keuring_type: {
      type: Sequelize.ENUM('rijbewijs', 'werk', 'school', 'sport', 'andere'),
      allowNull: false
    },
    keuring_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    uitgevoerd_door_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    uitslag: {
      type: Sequelize.ENUM('goedgekeurd', 'afgekeurd', 'onder_voorwaarden'),
      allowNull: false
    },
    beperkingen: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    geldig_tot: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    certificaat_nummer: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    notities: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });

  medische_keuring.associate = function(models) {
    medische_keuring.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    medische_keuring.belongsTo(models.zorgverlener, {
      foreignKey: 'uitgevoerd_door_zorgverlener_id',
      as: 'uitgevoerd_door'
    });
  };

  return medische_keuring;
};
