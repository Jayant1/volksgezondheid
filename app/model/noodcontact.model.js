module.exports = (sequelize, Sequelize) => {
  const noodcontact = sequelize.define("noodcontact", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    naam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    relatie: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    telefoon_primair: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    telefoon_secundair: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    adres: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    prioriteit: {
      type: Sequelize.INTEGER,
      defaultValue: 1
    },
    is_actief: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
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

  noodcontact.associate = function(models) {
    noodcontact.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
  };

  return noodcontact;
};
