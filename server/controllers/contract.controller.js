const db = require("../models/sequelize");
const Contract = db.contract;
const Op = db.Sequelize.Op;

// Create a new contract
exports.create = (req, res) => {
    console.log(`\n[REQUEST: CREATE CONTRACT]`);
    // Set new contract values
    const contract = {
        contractee: req.body.contractee,
        contractor: req.body.contractor,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        amount: req.body.amount
    };
    Contract.create(contract)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || `An error occurred while updating the contract.`
        });
    });
};
// Delete a contract
exports.delete = (req, res) => {
    const id = req.params.id;
    console.log(`\n[REQUEST: DELETE CONTRACT WITH ID=${id}]`);
    Contract.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contract was deleted successfully!"
            });
        } else {
            res.send({
                message: `Cannot delete Contract with id=${id}. Maybe Contract was not found!`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || `An error occurred while deleting a contract with id=${id}.`
        });
    });
};