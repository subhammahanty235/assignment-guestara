const { Category, SubCategory, Item } = require('../models');

exports.createCategory = async (req, res) => {
  try {
    const {name, image, description} = req.body;
    if(!name || !image || !description){
        return res.status(404).json({ message: 'Please pass all the required values' });
    }

    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        { 
          model: SubCategory, 
          as: 'subcategories',
          include: [{ model: Item, as: 'items' }]
        }
      ]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        { 
          model: SubCategory, 
          as: 'subcategories',
          include: [{ model: Item, as: 'items' }]
        }
      ]
    });
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    const updatedCategory = await Category.findByPk(req.params.id);
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};