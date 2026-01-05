module.exports = (sequelize, Sequelize) => {
  const medische_aandoening = sequelize.define("medische_aandoening", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    aandoening_naam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    icd10_code: {
      type: Sequelize.STRING(10),
      allowNull: true
    },
    diagnose_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('actief', 'behandeld', 'chronisch', 'in_remissie'),
      defaultValue: 'actief'
    },
    ernst: {
      type: Sequelize.ENUM('mild', 'matig', 'ernstig', 'kritiek'),
      allowNull: true
    },
    gediagnosticeerd_door_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    behandeling_beschrijving: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    notities: {
      type: Sequelize.TEXT,
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

  medische_aandoening.associate = function(models) {
    medische_aandoening.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    medische_aandoening.belongsTo(models.zorgverlener, {
      foreignKey: 'gediagnosticeerd_door_zorgverlener_id',
      as: 'gediagnosticeerd_door'
    });
  };

  return medische_aandoening;
};
