module.exports = (sequelize, Sequelize) => {
  const medisch_beeldmateriaal = sequelize.define("medisch_beeldmateriaal", {
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
    beeldtype: {
      type: Sequelize.ENUM('rontgen', 'CT', 'MRI', 'echo', 'andere'),
      allowNull: false
    },
    lichaamsdeel: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    onderzoek_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    bevindingen: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    conclusie: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    aangevraagd_door_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    uitgevoerd_door_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    zorginstelling_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    bestandslocatie: {
      type: Sequelize.STRING(500),
      allowNull: true
    },
    datum_aanmaak: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  medisch_beeldmateriaal.associate = function(models) {
    medisch_beeldmateriaal.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    medisch_beeldmateriaal.belongsTo(models.consult, {
      foreignKey: 'consult_id',
      as: 'consult'
    });
    medisch_beeldmateriaal.belongsTo(models.zorgverlener, {
      foreignKey: 'aangevraagd_door_zorgverlener_id',
      as: 'aangevraagd_door'
    });
    medisch_beeldmateriaal.belongsTo(models.zorgverlener, {
      foreignKey: 'uitgevoerd_door_zorgverlener_id',
      as: 'uitgevoerd_door'
    });
    medisch_beeldmateriaal.belongsTo(models.zorginstelling, {
      foreignKey: 'zorginstelling_id',
      as: 'instelling'
    });
  };

  return medisch_beeldmateriaal;
};
