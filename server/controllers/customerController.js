const Customer = require("../models/Customer");
const mongoose = require("mongoose");
// GET Homepage
exports.homepage = async (req, res) => {
  const messages = await req.consumeFlash("info");

  const locals = {
    title: "NodeJS",
    description: "Free NodeJS User Management",
  };

  // Pagination
  let perPage = 10;
  let page = req.query.page || 1;

  try {
    // const customers = await Customer.find({}).limit(22);
    // res.render("index", { locals, messages, customers });

    const customers = await Customer.aggregate([{ $sort: { updatedAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.count();

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET new customer form
exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add New User",
    description: "Free NodeJS User Management",
  };
  res.render("customer/add", locals);
};

// POST create new customer

exports.postCustomer = async (req, res) => {
  console.log(req.body);

  const newCustomer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    lastName: req.body.lastName,
    details: req.body.details,
    tel: req.body.tel,
    email: req.body.email,
  });

  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New Customer has been added");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// get customer date
exports.view = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "View Customer Data",
      description: "Free Nodejs User Management System",
    };

    res.render("customer/view", { locals, customer });
  } catch (error) {
    console.log(error);
  }
};

// edit customer data
exports.edit = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "Edit Customer Data",
      description: "Free Nodejs User Management System",
    };

    res.render("customer/edit", { locals, customer });
  } catch (error) {
    console.log(error);
  }
};

// Update Customer Data
exports.editPost = async (req, res) => {
  try {
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      tel: req.body.tel,
      email: req.body.email,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    res.redirect(`/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// delete
exports.deleteCustomer = async (req, res) => {
  try {
    await Customer.deleteOne({ _id: req.params.id });
    res.redirect(`/`);
  } catch (error) {
    console.log(error);
  }
};

// search
exports.searchCustomer = async (req, res) => {
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const customers = await Customer.find({
      $or: [
        { firstName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { lastName: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      customers,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.about = async (req, res) => {
  res.render("about");
};
