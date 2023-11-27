import {
  createfood,
  foodForCategory,
  deletefood,
  updatefood,
  deleteAllFoodForCategory
} from '../controllers/foodcontrollers.js'
import express from 'express'
const frouter = express.Router()
import { uploaded } from '../../utils/iamgeuploading&saving.js'
frouter.post('/createfood/:categoryId',uploaded, createfood)
frouter.get('/foodForCategory/:categoryId', foodForCategory)
frouter.delete('/deletefood/:foodId', deletefood)
frouter.put('/updatefood/:foodId', uploaded,updatefood)
frouter.delete(
  '/deleteAllFoodForCategory/:categoryId',
  deleteAllFoodForCategory
)

export default frouter
