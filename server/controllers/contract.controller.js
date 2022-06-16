const db = require("../models/sequelize");
const Contract = db.contract;
const Op = db.Sequelize.Op;

// Find one contract
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log(`\n[REQUEST: FIND CONTRACT WITH ID=${id}]`);
    Contract.findByPk(id)
    .then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find contract with id=${id}.`
        });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || `An error occurred while finding a contract with id=${id}.`
        });
    });
  };
