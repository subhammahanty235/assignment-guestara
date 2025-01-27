require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const categoryRoutes = require('./routes/category');
const subCategoryRoutes = require('./routes/subcategory');
const itemRoutes = require('./routes/item');
const {sequelize} = require('./models')
const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/items', itemRoutes);

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;