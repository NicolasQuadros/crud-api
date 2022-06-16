module.exports = app => {
    const contract = require("../controllers/contract.controller.js");
    var router = require("express").Router();
    
    router.get("/:id", contract.findOne);

    app.use('/contracts', router);
  };
