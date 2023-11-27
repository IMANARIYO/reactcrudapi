import mongoose from "mongoose";
const { Schema } = mongoose;
const categoriesSchema = new Schema({
    categoryName:{
type:String
    },
    listoffood:[{type:String}],
    description:{type:String}
})
export const category=mongoose.model('categories',categoriesSchema)


const foodSchema = new Schema({
title:{
type:String
    },
image:{type:String,
default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fregencyhealthcare.in%2Fdiabetes%2Fideal-diet-for-the-prevention-of-diabetes%2F&psig=AOvVaw3yOWlFFYOyUbD8JxVrUtpu&ust=1701191939679000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIiglYXY5IIDFQAAAAAdAAAAABAE"},
 categoryName:{type:String},
description:{type:String}

})
export const food=mongoose.model('food',foodSchema)