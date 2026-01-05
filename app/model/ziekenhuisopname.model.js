module.exports = (sequelize, Sequelize) => {
  const ziekenhuisopname = sequelize.define("ziekenhuisopname", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    zorginstelling_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    afdeling: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    opname_datum: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    opname_tijd: {
      type: Sequelize.TIME,
      allowNull: true
    },
    ontslag_datum: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    ontslag_tijd: {
      type: Sequelize.TIME,
      allowNull: true
    },
    reden_opname: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    behandelend_arts_zorgverlener_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    diagnose: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    uitgevoerde_procedures: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    opname_type: {
      type: Sequelize.ENUM('spoed', 'gepland', 'opname_via_SEH'),
      allowNull: false
    },
    ontslag_status: {
      type: Sequelize.ENUM('genezen', 'verbeterd', 'onveranderd', 'verslechterd', 'overgeplaatst', 'overleden'),
      allowNull: true
    },
    ontslag_bestemming: {
      type: Sequelize.STRING(100),
      allowNull: true
    },
    ontslag_instructies: {
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

  ziekenhuisopname.associate = function(models) {
    ziekenhuisopname.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
    ziekenhuisopname.belongsTo(models.zorginstelling, {
      foreignKey: 'zorginstelling_id',
      as: 'instelling'
    });
    ziekenhuisopname.belongsTo(models.zorgverlener, {
      foreignKey: 'behandelend_arts_zorgverlener_id',
      as: 'behandelend_arts'
    });
  };

  return ziekenhuisopname;
};
