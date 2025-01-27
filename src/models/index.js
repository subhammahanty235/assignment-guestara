const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.SERVICE_URI, {
  dialect: 'mysql',
  logging: false
});

const Category = require('./Category')(sequelize);
const SubCategory = require('./SubCategory')(sequelize);
const Item = require('./Item')(sequelize);

Category.hasMany(SubCategory, { 
  foreignKey: 'categoryId',
  as: 'subcategories'
});
SubCategory.belongsTo(Category, {
  foreignKey: 'categoryId',
  as: 'category'
});


SubCategory.hasMany(Item, { 
  foreignKey: 'subCategoryId',
  as: 'items'
});
Item.belongsTo(SubCategory, {
  foreignKey: 'subCategoryId',
  as: 'subcategory'
});

module.exports = {
  sequelize,
  Category,
  SubCategory,
  Item
};