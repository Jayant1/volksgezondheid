module.exports = (sequelize, Sequelize) => {
  const zwangerschap = sequelize.define("zwangerschap", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    graviditeit_nummer: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    pariteit_nummer: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    zwangerschap_start_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    uitgerekende_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    bevalling_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    bevalling_type: {
      type: Sequelize.ENUM('natuurlijk', 'keizersnede', 'vacuumextractie', 'tangverlossing'),
      allowNull: true
    },
    aantal_kinderen: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    zwangerschap_status: {
      type: Sequelize.ENUM('lopend', 'voltooid', 'miskraam', 'abortus'),
      defaultValue: 'lopend'
    },
    begeleidend_verloskundige_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    begeleidend_gynaecoloog_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    zorginstelling_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    complicaties: {
      type: Sequelize.TEXT,
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

  zwangerschap.associate = function(models) {
    zwangerschap.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    zwangerschap.belongsTo(models.zorgverlener, {
      foreignKey: 'begeleidend_verloskundige_zorgverlener_id',
      as: 'verloskundige'
    });
    zwangerschap.belongsTo(models.zorgverlener, {
      foreignKey: 'begeleidend_gynaecoloog_zorgverlener_id',
      as: 'gynaecoloog'
    });
    zwangerschap.belongsTo(models.zorginstelling, {
      foreignKey: 'zorginstelling_id',
      as: 'instelling'
    });
  };

  return zwangerschap;
};
