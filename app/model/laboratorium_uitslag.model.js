module.exports = (sequelize, Sequelize) => {
  const laboratorium_uitslag = sequelize.define("laboratorium_uitslag", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    consult_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    test_naam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    test_code: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    test_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    uitslag_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    uitslag_waarde: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    eenheid: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    referentie_ondergrens: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    referentie_bovengrens: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    },
    is_afwijkend: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    interpretatie: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    aangevraagd_door_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    laboratorium_zorginstelling_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    datum_aanmaak: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  laboratorium_uitslag.associate = function(models) {
    laboratorium_uitslag.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    laboratorium_uitslag.belongsTo(models.consult, {
      foreignKey: 'consult_id',
      as: 'consult'
    });
    laboratorium_uitslag.belongsTo(models.zorgverlener, {
      foreignKey: 'aangevraagd_door_zorgverlener_id',
      as: 'aangevraagd_door'
    });
    laboratorium_uitslag.belongsTo(models.zorginstelling, {
      foreignKey: 'laboratorium_zorginstelling_id',
      as: 'laboratorium'
    });
  };

  return laboratorium_uitslag;
};
