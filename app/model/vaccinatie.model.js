module.exports = (sequelize, Sequelize) => {
  const vaccinatie = sequelize.define("vaccinatie", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    vaccin_naam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    vaccin_code: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    ziekte_bescherming: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    batch_nummer: {
      type: Sequelize.STRING(50),
      allowNull: true
    },
    toegediend_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    toegediend_door_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    zorginstelling_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    locatie_toediening: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    vervaldatum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    herhaling_nodig: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    volgende_vaccinatie_datum: {
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
    }
  });

  vaccinatie.associate = function(models) {
    vaccinatie.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    vaccinatie.belongsTo(models.zorgverlener, {
      foreignKey: 'toegediend_door_zorgverlener_id',
      as: 'toegediend_door'
    });
    vaccinatie.belongsTo(models.zorginstelling, {
      foreignKey: 'zorginstelling_id',
      as: 'instelling'
    });
  };

  return vaccinatie;
};
