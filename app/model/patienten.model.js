module.exports = (sequelize, Sequelize) => {
  const patienten = sequelize.define("patienten", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    identificatienummer: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    bloedgroep: {
      type: 'bloedgroep_type',
      defaultValue: 'onbekend'
    },
    rhesus_factor: {
      type: 'rhesus_factor_type',
      defaultValue: 'onbekend'
    },
    huisarts_zorgverleners_id: {
      type: Sequelize.INTEGER,
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
    tableName: 'patienten',
    timestamps: false
  });

  patienten.associate = function(models) {
    patienten.belongsTo(models.zorgverleners, {
      foreignKey: 'huisarts_zorgverleners_id',
      as: 'huisarts'
    });
    patienten.hasMany(models.medische_keuringen, {
      foreignKey: 'patienten_id',
      as: 'medische_keuringen'
    });
    patienten.hasMany(models.consultaties, {
      foreignKey: 'patienten_id',
      as: 'consultaties'
    });
  };

  return patienten;
};
