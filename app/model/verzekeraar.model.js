module.exports = (sequelize, Sequelize) => {
  const verzekeraar = sequelize.define("verzekeraar", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    verzekeraar_naam: {
      type: Sequelize.STRING(200),
      allowNull: false
    },
    verzekeraar_code: {
      type: Sequelize.STRING(20),
      unique: true,
      allowNull: false
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

  verzekeraar.associate = function(models) {
    verzekeraar.hasMany(models.verzekering, {
      foreignKey: 'verzekeraar_id',
      as: 'verzekeringen'
    });
  };

  return verzekeraar;
};
