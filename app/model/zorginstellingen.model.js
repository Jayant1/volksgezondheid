module.exports = (sequelize, Sequelize) => {
  const zorginstellingen = sequelize.define("zorginstellingen", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    naam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    type_instelling: {
      type: Sequelize.ENUM('ziekenhuis', 'kliniek', 'polikliniek', 'gezondheidscentrum', 'apotheek', 'laboratorium', 'andere'),
      allowNull: false
    },
    adres: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    distrikten_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    wijken_id: {
      type: Sequelize.INTEGER,
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
    tableName: 'zorginstellingen',
    timestamps: false
  });

  zorginstellingen.associate = function(models) {
    zorginstellingen.belongsTo(models.distrikten, {
      foreignKey: 'distrikten_id',
      as: 'distrikt'
    });
    zorginstellingen.belongsTo(models.wijken, {
      foreignKey: 'wijken_id',
      as: 'wijk'
    });
    zorginstellingen.hasMany(models.consultaties, {
      foreignKey: 'zorginstellingen_id',
      as: 'consultaties'
    });
  };

  return zorginstellingen;
};
