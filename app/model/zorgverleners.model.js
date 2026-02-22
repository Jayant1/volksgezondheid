module.exports = (sequelize, Sequelize) => {
  const zorgverleners = sequelize.define("zorgverleners", {
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
    registratie_nummer: {
      type: Sequelize.STRING(20),
      allowNull: false,
      unique: true
    },
    specialisatie: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    type_zorgverlener: {
      type: 'zorgverlener_type_enum',
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
    tableName: 'zorgverleners',
    timestamps: false
  });

  zorgverleners.associate = function(models) {
    zorgverleners.hasMany(models.patienten, {
      foreignKey: 'huisarts_zorgverleners_id',
      as: 'patienten'
    });
    zorgverleners.hasMany(models.medische_keuringen, {
      foreignKey: 'zorgverleners_id',
      as: 'medische_keuringen'
    });
    zorgverleners.hasMany(models.consultaties, {
      foreignKey: 'zorgverleners_id',
      as: 'consultaties'
    });
  };

  return zorgverleners;
};
