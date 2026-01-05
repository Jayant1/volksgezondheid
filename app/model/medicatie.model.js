module.exports = (sequelize, Sequelize) => {
  const medicatie = sequelize.define("medicatie", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    medicijn_naam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    atc_code: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    dosering: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    frequentie: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    toedieningswijze: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    reden_voorschrift: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    voorgeschreven_door_zorgverlener_id: {
      type: Sequelize.INTEGER,
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
    },
    datum_aanmaak: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    datum_laatste_wijziging: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  medicatie.associate = function(models) {
    medicatie.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    medicatie.belongsTo(models.zorgverlener, {
      foreignKey: 'voorgeschreven_door_zorgverlener_id',
      as: 'voorgeschreven_door'
    });
  };

  return medicatie;
};
