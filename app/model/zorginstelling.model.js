module.exports = (sequelize, Sequelize) => {
  const zorginstelling = sequelize.define("zorginstelling", {
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
    straatnaam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    huisnummer: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    toevoeging: {
      type: Sequelize.STRING(20),
      allowNull: true
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
    is_actief: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    datum_aanmaak: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  zorginstelling.associate = function(models) {
    zorginstelling.belongsTo(models.distrikten, {
      foreignKey: 'distrikten_id',
      as: 'distrikt'
    });
    zorginstelling.belongsTo(models.wijken, {
      foreignKey: 'wijken_id',
      as: 'wijk'
    });
    zorginstelling.hasMany(models.zorgverlener_instelling, {
      foreignKey: 'zorginstelling_id',
      as: 'zorgverleners'
    });
    zorginstelling.hasMany(models.vaccinatie, {
      foreignKey: 'zorginstelling_id',
      as: 'vaccinaties'
    });
    zorginstelling.hasMany(models.consult, {
      foreignKey: 'zorginstelling_id',
      as: 'consulten'
    });
    zorginstelling.hasMany(models.ziekenhuisopname, {
      foreignKey: 'zorginstelling_id',
      as: 'opnames'
    });
    zorginstelling.hasMany(models.laboratorium_uitslag, {
      foreignKey: 'laboratorium_zorginstelling_id',
      as: 'lab_uitslagen'
    });
    zorginstelling.hasMany(models.medisch_beeldmateriaal, {
      foreignKey: 'zorginstelling_id',
      as: 'beeldmateriaal'
    });
    zorginstelling.hasMany(models.zwangerschap, {
      foreignKey: 'zorginstelling_id',
      as: 'zwangerschappen'
    });
  };

  return zorginstelling;
};
