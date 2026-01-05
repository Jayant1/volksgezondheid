module.exports = (sequelize, Sequelize) => {
  const zorgverlener = sequelize.define("zorgverlener", {
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
    registratie_nummer: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false
    },
    specialisatie: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    type_zorgverlener: {
      type: Sequelize.ENUM('huisarts', 'specialist', 'verpleegkundige', 'tandarts', 'apotheker', 'fysiotherapeut', 'andere'),
      allowNull: false
    },
    praktijk_naam: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    telefoon: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    email: {
      type: Sequelize.STRING(100),
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

  zorgverlener.associate = function(models) {
    zorgverlener.hasMany(models.zorgverlener_instelling, {
      foreignKey: 'zorgverlener_id',
      as: 'instellingen'
    });
    zorgverlener.hasMany(models.gezondheidsdossier, {
      foreignKey: 'huisarts_zorgverlener_id',
      as: 'patienten'
    });
    zorgverlener.hasMany(models.allergie, {
      foreignKey: 'vastgesteld_door_zorgverlener_id',
      as: 'vastgestelde_allergieen'
    });
    zorgverlener.hasMany(models.medicatie, {
      foreignKey: 'voorgeschreven_door_zorgverlener_id',
      as: 'voorgeschreven_medicatie'
    });
    zorgverlener.hasMany(models.vaccinatie, {
      foreignKey: 'toegediend_door_zorgverlener_id',
      as: 'toegediende_vaccinaties'
    });
    zorgverlener.hasMany(models.medische_aandoening, {
      foreignKey: 'gediagnosticeerd_door_zorgverlener_id',
      as: 'gediagnosticeerde_aandoeningen'
    });
    zorgverlener.hasMany(models.consult, {
      foreignKey: 'zorgverlener_id',
      as: 'consulten'
    });
    zorgverlener.hasMany(models.ziekenhuisopname, {
      foreignKey: 'behandelend_arts_zorgverlener_id',
      as: 'behandelde_opnames'
    });
  };

  return zorgverlener;
};
