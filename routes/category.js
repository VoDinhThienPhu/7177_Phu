var express = require('express');
var router = express.Router();
let categoryModel = require('../schemas/categoryy');
let { CreateErrorRes, CreateSuccessRes } = require('../utils/responseHandler');

/* GET all categories */
router.get('/', async function (req, res, next) {
  try {
    let categories = await categoryModel.find({ isDeleted: false });
    CreateSuccessRes(res, categories, 200);
  } catch (error) {
    next(error);
  }
});

/* GET a single category by ID */
router.get('/:id', async function (req, res, next) {
  try {
    let category = await categoryModel.findOne({ _id: req.params.id, isDeleted: false });
    CreateSuccessRes(res, category, 200);
  } catch (error) {
    next(error);
  }
});

/* CREATE a new category */
router.post('/', async function (req, res, next) {
  try {
    let body = req.body;
    let newCategory = new categoryModel({ name: body.name });
    await newCategory.save();
    CreateSuccessRes(res, newCategory, 200);
  } catch (error) {
    next(error);
  }
});

/* UPDATE an existing category */
router.put('/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    let body = req.body;
    let updatedInfo = {};
    if (body.name) {
      updatedInfo.name = body.name;
    }
    let updatedCategory = await categoryModel.findByIdAndUpdate(id, updatedInfo, { new: true });
    CreateSuccessRes(res, updatedCategory, 200);
  } catch (error) {
    next(error);
  }
});

/* DELETE a category (soft delete) */
router.delete('/:id', async function (req, res, next) {
  let id = req.params.id;
  try {
    let updatedCategory = await categoryModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    CreateSuccessRes(res, updatedCategory, 200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;