const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");

const productosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
    minlength: [3, errorMessage.GENERAL.minlength],
  },
  code: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  description: {
    type: String,
    required: [true, errorMessage.GENERAL.campo_obligatorio],
  },
  price: {
    type: Number,
    min: 1,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "categories",
  },
});

productosSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("productos", productosSchema);
