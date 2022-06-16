module.exports = app => {
    const contract = require("../controllers/contract.controller.js");
    var router = require("express").Router();
    
    // Create
    router.post("/", contract.create);

    // Delete with id
    router.delete("/:id", contract.delete);

    app.use('/contracts', router);
  };