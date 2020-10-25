var burger = require("../models/burgers.js");
var express = require("express");
var router = express.Router();

//express route to render all data
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var burgerObject = {
      burgers: data,
    };
    res.render("index", burgerObject);
  });
});
//express route to create burger
router.post("/api/burgers", function (req, res) {
  burger.insertOne(["burger_name"], [req.body.burger_name], function (result) {
    res.json({ id: result.insertId });
  });
});
//express route to delete all burgers
router.delete("/api/burgers/all", function (req, res) {
  burger.deleteAll(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//express route to update burger devour state
router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;
  burger.updateOne(
    {
      devoured: req.body.devoured,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

//exporting router
module.exports = router;
