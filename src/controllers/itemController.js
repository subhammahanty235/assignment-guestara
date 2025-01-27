const { Item, SubCategory, Category } = require('../models');
const { Op } = require('sequelize');

exports.createItem = async (req, res) => {
  try {
    const { subCategoryId } = req.body;
    const subCategory = await SubCategory.findByPk(subCategoryId);
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }

    const {name, image, description} = req.body;
    if(!name || !image || !description){
        return res.status(404).json({ message: 'Please pass all the required values' });
    }


    const item = await Item.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    const { subCategoryId } = req.query;

    const whereCondition = subCategoryId 
      ? { subCategoryId } 
      : {};

    const items = await Item.findAll({
      where: whereCondition,
      include: [
        { model: SubCategory, as: 'subcategory', include: [{ model: Category, as: 'category' }] }
      ]
    });
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchItems = async (req, res) => {
  try {
    const { query } = req.query;

    const items = await Item.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`
        }
      },
      include: [
        { model: SubCategory, as: 'subcategory', include: [{ model: Category, as: 'category' }] }
      ]
    });
    
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateItem = async (req, res) => {
  try {
    const [updated] = await Item.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Item not found' });
    }
    
    const updatedItem = await Item.findByPk(req.params.id);
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};