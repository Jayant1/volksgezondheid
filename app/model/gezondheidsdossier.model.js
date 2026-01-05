module.exports = (sequelize, Sequelize) => {
  const gezondheidsdossier = sequelize.define("gezondheidsdossier", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false
    },
    bloedgroep: {
      type: Sequelize.ENUM('A', 'B', 'AB', 'O', 'onbekend'),
      defaultValue: 'onbekend'
    },
    rhesus_factor: {
      type: Sequelize.ENUM('+', '-', 'onbekend'),
      defaultValue: 'onbekend'
    },
    orgaan_donor: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    huisarts_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    laatst_gezien_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    notities: {
      type: Sequelize.TEXT,
      allowNull: true
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

  gezondheidsdossier.associate = function(models) {
    gezondheidsdossier.belongsTo(models.zorgverlener, {
      foreignKey: 'huisarts_zorgverlener_id',
      as: 'huisarts'
    });
    gezondheidsdossier.hasMany(models.allergie, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'allergieen'
    });
    gezondheidsdossier.hasMany(models.medicatie, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'medicaties'
    });
    gezondheidsdossier.hasMany(models.vaccinatie, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'vaccinaties'
    });
    gezondheidsdossier.hasMany(models.medische_aandoening, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'aandoeningen'
    });
    gezondheidsdossier.hasMany(models.medische_keuring, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'keuringen'
    });
    gezondheidsdossier.hasMany(models.consult, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'consulten'
    });
    gezondheidsdossier.hasMany(models.ziekenhuisopname, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'opnames'
    });
    gezondheidsdossier.hasMany(models.laboratorium_uitslag, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'lab_uitslagen'
    });
    gezondheidsdossier.hasMany(models.medisch_beeldmateriaal, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'beeldmateriaal'
    });
    gezondheidsdossier.hasMany(models.zwangerschap, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'zwangerschappen'
    });
    gezondheidsdossier.hasMany(models.verzekering, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'verzekeringen'
    });
    gezondheidsdossier.hasMany(models.noodcontact, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'noodcontacten'
    });
    gezondheidsdossier.hasMany(models.gezondheidsregister_audit, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'audit_logs'
    });
  };

  return gezondheidsdossier;
};
