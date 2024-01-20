import express from 'express'
import {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories,
  deleteAllCategories
} from '../controllers/categorycontrollers.js'
const crouter = express.Router()
crouter.post('/createCategory', createCategory)
crouter.delete('/deleteCategory/:categoryId', deleteCategory)
crouter.put('/updateCategory/:categoryId', updateCategory)
crouter.get('/getAllCategories', getAllCategories)
crouter.delete('/deleteAllCategories', deleteAllCategories);

export default crouter
