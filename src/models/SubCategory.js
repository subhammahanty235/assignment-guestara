const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SubCategory = sequelize.define('SubCategory', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        categoryId: {
            type: DataTypes.UUID,
            allowNull: false,
            field: 'category_id'
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
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
        }
    }, {
        tableName: 'subcategories'
    });

    return SubCategory;
};