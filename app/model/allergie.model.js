module.exports = (sequelize, Sequelize) => {
  const allergie = sequelize.define("allergie", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    allergie_type: {
      type: Sequelize.ENUM('medicatie', 'voedsel', 'stuifmeel', 'insect', 'contact', 'andere'),
      allowNull: false
    },
    allergie_naam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    ernst: {
      type: Sequelize.ENUM('mild', 'matig', 'ernstig', 'levensgevaarlijk'),
      allowNull: false
    },
    reactie_beschrijving: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    datum_vastgesteld: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    vastgesteld_door_zorgverlener_id: {
      type: Sequelize.INTEGER,
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

  allergie.associate = function(models) {
    allergie.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    allergie.belongsTo(models.zorgverlener, {
      foreignKey: 'vastgesteld_door_zorgverlener_id',
      as: 'vastgesteld_door'
    });
  };

  return allergie;
};
