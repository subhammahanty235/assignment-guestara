const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    description: {
        type: DataTypes.TEXT
    },
    taxApplicable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    tax: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    taxType: {
      type: DataTypes.TEXT,
    }
  }, {
    tableName: 'categories'
  });

  return Category;
};