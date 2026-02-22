module.exports = (sequelize, Sequelize) => {
  const medische_keuringen = sequelize.define("medische_keuringen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    patienten_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    keuring_type: {
      type: 'keuring_type_enum',
      allowNull: false
    },
    datum_keuring: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    zorgverleners_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    uitslag: {
      type: 'uitslag_enum',
      allowNull: false
    },
    beperkingen: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    datum_geldig_tot: {
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
    tableName: 'medische_keuringen',
    timestamps: false
  });

  medische_keuringen.associate = function(models) {
    medische_keuringen.belongsTo(models.patienten, {
      foreignKey: 'patienten_id',
      as: 'patient'
    });
    medische_keuringen.belongsTo(models.zorgverleners, {
      foreignKey: 'zorgverleners_id',
      as: 'zorgverlener'
    });
  };

  return medische_keuringen;
};
