"use strict";

const db = require("../models/index.model");
const Database = db.drivers;
const Op = db.Sequelize.Op;
const func = db.Sequelize;


module.exports = {
  findall: async function (req, res) {
    const name = req.query.name;
    const licenseNumber = req.query.licenseNumber;
    const desc = req.query.desc;
    const rating = req.query.rating;
    const status = req.query.status;
    const limit = req.query.limit;
    const page = req.query.page;

    var conditions = {};
    if (name) conditions.name = { [Op.like]: `%${name}%` };
    if (licenseNumber) conditions.name = { [Op.like]: `%${licenseNumber}%` };
    if (desc) conditions.name = { [Op.like]: `%${desc}%` };
    if (rating) conditions.name = { [Op.like]: `%${rating}%` };
    if (status) conditions.name = { [Op.like]: `%${status}%` };

    var lim = limit ? limit : 10;
    var offs = page ? (page - 1) * lim : 0;
    const order = req.query.order ? req.query.order.toUpperCase() : "DESC";


    await Database.findAll({
      where: conditions,
      limit: parseInt(lim, 10),
      offset: parseInt(offs, 0),
      order: [["id", order]],
    })
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving drivers.",
        });
      });
  },


  findone: async function (req, res) {
    const id = req.params.id;

    await Database.findByPk(id)
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving the drivers.",
        });
      });
  },

  create: async function (req, res) {
    var tmpData = {
      name: req.body.name,
      licenseNumber: req.body.licenseNumber,
      desc: req.body.desc,
      rating: req.body.rating,
      status: req.body.status,
    };

    await Database.create(tmpData)
      .then((data) => {
        res.status(200);
        res.send({ status: "created" });
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while creating the drivers.",
        });
      });
  },

  update: async function (req, res) {
    console.log("Todo " + req.params.id + " updated");
    const id = req.params.id;
    var tmpData = {
      name: req.body.name,
      licenseNumber: req.body.licenseNumber,
      desc: req.body.desc,
      rating: req.body.rating,
      status: req.body.status,
    };

    await Database.update(tmpData, {
      where: { id: id },
    })
      .then((data) => {
        res.status(200);
        res.send({ status: "updated" });
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while retrieving drivers.",
        });
      });
  },

  delete: async function (req, res) {
    console.log("Delete " + req.params.id);
    const id = req.params.id;

    await Database.destroy({
      where: { id: id },
    })
      .then(() => {
        res.status(200);
        res.send({ status: "deleted" });
      })
      .catch((err) => {
        res.status(500);
        res.send({
          message:
            err.message || "Some error occurred while deleting the drivers.",
        });
      });
  },

};
