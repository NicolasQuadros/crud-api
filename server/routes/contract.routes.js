module.exports = app => {
    const contract = require("../controllers/contract.controller.js");
    var router = require("express").Router();
    
    // Find all (filter by contractee/contractor) [paginated]
    router.get("/", contract.findAll);

    app.use('/contracts', router);
  };