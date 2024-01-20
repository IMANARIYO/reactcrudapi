import { food, category } from '../model.js'
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

export const createfood = async (req, res) => {
  console.log("in food   dfstgyjdsfafhjklhdsafhjklhgfdsfhjklhgfdsfghjkljhgfdsfghjkhgfdsadfghjkhgfdsadfghjkhgfdsdfghjkljhgfdghjkl")
  try {
  
    let newObject = { ...req.body };
    if (req.files && req.files.image) {
      console.log("----------------foodimage----- tackulating");
      newObject.image = (await cloudinary.uploader.upload(
        req.files.image[0].path
      )).secure_url;
    }
    let newFood = await food.create(newObject)
console.log(newFood)
    res
      .status(201)
      .json({ message: 'Food item created successfully', data: newFood })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const foodForCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    // Check if the category exists
    const existingCategory = await category.findById(categoryId)
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }
    let categoryName = existingCategory.categoryName
    const foodItems = await food.find({ categoryName: categoryName })
    res
      .status(200)
      .json({
        message: `Food items   for ${categoryName}  retrieved successfully`,
        data: foodItems
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}


export const updatefood = async (req, res) => {
  try {
    const foodId = req.params.foodId

    // Check if the food item exists
    const existingFood = await food.findById(foodId)
    if (!existingFood) {
      return res.status(404).json({ message: 'Food item not found' })
    }

    let newObject = { ...req.body };
    if (req.files && req.files.image) {
      console.log("----------------foodimage----- tackulating");
      newObject.image = (await cloudinary.uploader.upload(
        req.files.image[0].path
      )).secure_url;
    }

    let foodupdate = newObject
    await food.findByIdAndUpdate(foodId, foodupdate)

    res
      .status(200)
      .json({ message: 'Food item updated successfully', data: foodupdate })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const deleteAllFoodForCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId

    // Check if the category exists
    const existingCategory = await category.findById(categoryId)
    if (!existingCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    let categoryName = existingCategory.categoryName

    // Delete all food items for the category
    await food.deleteMany({ category: categoryName })

    res
      .status(200)
      .json({
        message: 'All food items for the category deleted successfully'
      })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}









export const getAllFood = async (req, res) => {
  try {
    const allFoodItems = await food.find();
    res.status(200).json({ message: 'List of all food items', data: allFoodItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
