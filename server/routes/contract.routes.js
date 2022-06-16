module.exports = app => {
    const contract = require("../controllers/contract.controller.js");
    var router = require("express").Router();
    
    /**
     * Add routes here
     */

    app.use('/contracts', router);
  };