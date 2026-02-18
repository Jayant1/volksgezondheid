module.exports = (sequelize, Sequelize) => {
  const consultaties = sequelize.define("consultaties", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patienten_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    zorgverleners_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    zorginstellingen_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    datum_consultatie: {
      type: Sequelize.DATEONLY,
      allowNull: false
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
    verwezen_naar: {
      type: Sequelize.STRING(200),
      allowNull: true
    },
    datum_vervolgafspraak: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    notities: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    ingevoerd_door: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    gewijzigd_door: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    datum_ingevoerd: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    datum_gewijzigd: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'consultaties',
    timestamps: false
  });

  consultaties.associate = function(models) {
    consultaties.belongsTo(models.patienten, {
      foreignKey: 'patienten_id',
      as: 'patient'
    });
    consultaties.belongsTo(models.zorgverleners, {
      foreignKey: 'zorgverleners_id',
      as: 'zorgverlener'
    });
    consultaties.belongsTo(models.zorginstellingen, {
      foreignKey: 'zorginstellingen_id',
      as: 'zorginstelling'
    });
  };

  return consultaties;
};
