require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs').promises;
const marked = require('marked');
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

app.use(express.static('public'));
app.get('/', async (req, res) => {
  try {
    const readmePath = path.join(__dirname, '..', 'readme.md');
    const readmeContent = await fs.readFile(readmePath, 'utf-8');
    const htmlContent = marked.parse(readmeContent);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Guestara Menu Management API</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css">
          <style>
            .markdown-body {
              box-sizing: border-box;
              min-width: 200px;
              max-width: 980px;
              margin: 0 auto;
              padding: 45px;
            }
            @media (max-width: 767px) {
              .markdown-body {
                padding: 15px;
              }
            }
          </style>
        </head>
        <body>
          <div class="markdown-body">
            ${htmlContent}
          </div>
        </body>
      </html>
    `;

    res.send(html);
  } catch (error) {
    console.error('Error rendering README:', error);
    res.status(500).send('Error loading documentation');
  }
});

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
