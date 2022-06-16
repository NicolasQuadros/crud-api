const db = require("../models/sequelize");
const Contract = db.contract;
const Op = db.Sequelize.Op;

// Update a contract
exports.update = (req, res) => {
    const id = req.params.id;
    console.log(`\n[REQUEST: UPDATE CONTRACT WITH ID=${id}]`);
    Contract.update(req.body, {
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "The contract was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update contract with id=${id}. Maybe Contract was not found or req.body is empty.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || `An error occurred while updating a contract with id=${id}.`
        });
    });
};
