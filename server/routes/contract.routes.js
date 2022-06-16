module.exports = app => {
    const contract = require("../controllers/contract.controller.js");
    var router = require("express").Router();
    
   // Update with id
    router.put("/:id", contract.update);

    app.use('/contracts', router);
  };
