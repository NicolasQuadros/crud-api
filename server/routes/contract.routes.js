module.exports = app => {
    const contract = require("../controllers/contract.controller.js");
    var router = require("express").Router();
    
    // Create
    router.post("/", contract.create);

    // Delete with id
    router.delete("/:id", contract.delete);

    // Update with id
    router.put("/:id", contract.update);

    // Find with id
    router.get("/:id", contract.findOne);
    // Find all (filter by contractee/contractor) [paginated]
    router.get("/", contract.findAll);

    app.use('/contracts', router);
  };
