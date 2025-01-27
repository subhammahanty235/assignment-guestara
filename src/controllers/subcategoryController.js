const { SubCategory, Category, Item } = require('../models');

exports.createSubCategory = async (req, res) => {
  try {
    const { categoryId } = req.body;
    
    // Verify category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const {name, image, description} = req.body;
    if(!name || !image || !description){
        return res.status(404).json({ message: 'Please pass all the required values' });
    }

    const subCategory = await SubCategory.create(req.body);
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    const { categoryId } = req.query;
    
    const whereCondition = categoryId 
      ? { categoryId } 
      : {};

    const subCategories = await SubCategory.findAll({
      where: whereCondition,
      include: [
        { model: Category, as: 'category' },
        { model: Item, as: 'items' }
      ]
    });
    
    res.json(subCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByPk(req.params.id, {
      include: [
        { model: Category, as: 'category' },
        { model: Item, as: 'items' }
      ]
    });
    
    if (!subCategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    res.json(subCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const [updated] = await SubCategory.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (!updated) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    
    const updatedSubCategory = await SubCategory.findByPk(req.params.id);
    res.json(updatedSubCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};