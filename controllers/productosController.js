const productosModel = require("../models/productosModel");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const productos = await productosModel.find();
      res.json(productos);
    } catch (e) {
      next(e);
    }
  },
  getAllPaginate: async function (req, res, next) {
    try {
      const productos = await productosModel.paginate("", {
        limit: 4,
      });
      res.json(productos.docs);
    } catch (e) {
      next(e);
    }
  },
  getById: async function (req, res, next) {
    try {
      const producto = await productosModel.findById(req.params.id);
      res.json(producto);
    } catch (e) {
      next(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const producto = new productosModel({
        name: req.body.name,
        code: req.body.sku,
        description: req.body.description,
        price: req.body.price,
        category: req.body.categoryId,
      });

      const documento = await producto.save();
      res.json(documento);
    } catch (e) {
      console.log(e);
      next(e);
    }
  },
  update: async function (req, res, next) {
    try {
      const producto = await productosModel.updateOne(
        { _id: req.params.id },
        req.body
      );
      res.json(producto);
    } catch (e) {
      next(e);
    }
  },
  delete: async function (req, res, next) {
    try {
      const producto = await productosModel.deleteOne({ _id: req.params.id });
      res.json(producto);
    } catch (e) {
      next(e);
    }
  },
};
