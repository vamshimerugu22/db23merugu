const mongoose = require("mongoose") 
const pancakeSchema = mongoose.Schema({ pancake_type: String, price: Number,  toppings: String }) 
 module.exports = mongoose.model("pancake", pancakeSchema) 