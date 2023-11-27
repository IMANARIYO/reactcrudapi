import { food, category } from '../model.js'

// Create Category
export const createCategory = async (req, res) => {
  try {
    const newCategory = await category.create(req.body)
    console.log(req.body,"--------------------------------------------------------------------------")
    res
      .status(201)
      .json({ message: 'Category created successfully', data: newCategory })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Delete Category
export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId

    // Find the category
    const existingCategory = await category.findById(categoryId)
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    // Delete the category
    await category.findByIdAndDelete(categoryId)

    // Delete associated food items
    await food.deleteMany({ categoryName: existingCategory.categoryName })

    res
      .status(200)
      .json({
        message: 'Category and associated food items deleted successfully'
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Update Category
export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId

    // Find the category
    const existingCategory = await category.findById(categoryId)
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    // Update the category
    const updatedCategory = await category.findByIdAndUpdate(
      categoryId,
      req.body,
      { new: true }
    )

    // Update associated food items
    await food.updateMany(
      { categoryName: existingCategory.categoryName },
      { categoryName: updatedCategory.categoryName }
    )

    res
      .status(200)
      .json({
        message: 'Category and associated food items updated successfully',
        data: updatedCategory
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

// Get All Categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await category.find()
    res.status(200).json({ message: 'List of categories', data: categories })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
