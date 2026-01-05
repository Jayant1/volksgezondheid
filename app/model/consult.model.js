module.exports = (sequelize, Sequelize) => {
  const consult = sequelize.define("consult", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    zorginstelling_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    consult_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    consult_tijd: {
      type: Sequelize.TIME,
      allowNull: true
    },
    reden_bezoek: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    diagnose: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    behandeling: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    verwijzing_naar: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    vervolgafspraak_nodig: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    vervolgafspraak_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    status: {
      type: Sequelize.ENUM('gepland', 'uitgevoerd', 'geannuleerd', 'no-show'),
      defaultValue: 'gepland'
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

  consult.associate = function(models) {
    consult.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    consult.belongsTo(models.zorgverlener, {
      foreignKey: 'zorgverlener_id',
      as: 'zorgverlener'
    });
    consult.belongsTo(models.zorginstelling, {
      foreignKey: 'zorginstelling_id',
      as: 'instelling'
    });
    consult.hasMany(models.laboratorium_uitslag, {
      foreignKey: 'consult_id',
      as: 'lab_uitslagen'
    });
    consult.hasMany(models.medisch_beeldmateriaal, {
      foreignKey: 'consult_id',
      as: 'beeldmateriaal'
    });
  };

  return consult;
};
