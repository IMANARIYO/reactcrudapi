import express from 'express'
import {
  createCategory,
  deleteCategory,
  updateCategory,
  getAllCategories
} from '../controllers/categorycontrollers.js'
const crouter = express.Router()
crouter.post('/createCategory', createCategory)
crouter.delete('/deleteCategory/:categoryId', deleteCategory)
crouter.put('/updateCategory/:categoryId', updateCategory)
crouter.get('/getAllCategories', getAllCategories)

export default crouter
