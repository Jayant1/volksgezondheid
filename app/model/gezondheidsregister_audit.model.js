module.exports = (sequelize, Sequelize) => {
  const gezondheidsregister_audit = sequelize.define("gezondheidsregister_audit", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tabel_naam: {
      type: Sequelize.STRING(50),
      allowNull: false
    },
    record_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    gezondheidsdossier_id: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    actie_type: {
      type: Sequelize.ENUM('INSERT', 'UPDATE', 'DELETE', 'VIEW', 'EXPORT'),
      allowNull: false
    },
    oude_waarde: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    nieuwe_waarde: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    gebruikers_identificatienummer: {
      type: Sequelize.STRING(20),
      allowNull: false
    },
    reden_toegang: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    tijdstip: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    ip_adres: {
      type: Sequelize.STRING(45),
      allowNull: true
    }
  });

  gezondheidsregister_audit.associate = function(models) {
    gezondheidsregister_audit.belongsTo(models.gezondheidsdossier, {
      foreignKey: 'gezondheidsdossier_id',
      as: 'dossier'
    });
  };

  return gezondheidsregister_audit;
};
