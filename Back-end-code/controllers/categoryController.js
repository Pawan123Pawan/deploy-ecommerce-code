import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = await req.body;
    if (!name) {
      return res
        .status(401)
        .send({ success: false, message: "Name is required" });
    }
    const existingCategory = await categoryModel.findOne({ name: name });
    if (existingCategory) {
      return res
        .status(201)
        .send({ success: false, message: "Category already exists" });
    }
    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    res.status(500).send({ success: false, error, message: "Category error" });
  }
};

// update controller
export const categoryUpdateController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Update Category error" });
  }
};

//get category controllers
export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    if (!category) {
      res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All categories listed successfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Get Category error" });
  }
};

//single get category
export const singleCategoryController = async (req, res) => {
  try {
    const category = await categoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res
        .status(202)
        .send({ success: false, message: "No category found" });
    }
    res.status(200).send({
      success: true,
      message: "Get SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Single Get Category Error" });
  }
};

// delete a category contoller
export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndDelete(id);
    res
      .status(200)
      .send({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ success: false, error, message: "Single Get Category Error" });
  }
};
