module.exports = (sequelize, Sequelize) => {
  const verzekering = sequelize.define("verzekering", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    verzekeraar_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    polisnummer: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    verzekering_type: {
      type: Sequelize.ENUM('basis', 'aanvullend', 'particulier'),
      allowNull: false
    },
    start_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    eind_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
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

  verzekering.associate = function(models) {
    verzekering.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    verzekering.belongsTo(models.verzekeraar, {
      foreignKey: 'verzekeraar_id',
      as: 'verzekeraar'
    });
  };

  return verzekering;
};
