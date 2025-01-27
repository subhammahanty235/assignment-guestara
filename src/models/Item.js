const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Item = sequelize.define('Item', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        subCategoryId: {
            type: DataTypes.UUID,
            allowNull: true,
            field: 'subcategory_id'
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
        },
        baseAmount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        totalAmount: {
            type: DataTypes.INTEGER,
        }
    }, {
        tableName: 'items',
        hooks: {
            beforeSave: (item) => {
                item.totalAmount = item.baseAmount - item.discount;
            }
        }
    });

    return Item;
};