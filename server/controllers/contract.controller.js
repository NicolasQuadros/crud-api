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

// Find all contracts (can filter by contractee or contractor)
exports.findAll = (req, res) => {
    //items in each page
    const size = 3;
    //set page = 0 if not defined in query string, not a number or < 0
    const page = (parseInt(req.query.page) > 0) ? parseInt(req.query.page) : 0;

    // Find all contracts by contractee
    if(req.query.contractee) {
        const contractee = req.query.contractee;
        console.log(`\n[REQUEST: FIND CONTRACTS WITH CONTRACTEE="${contractee}"]`);

        Contract.findAndCountAll({
            where: {contractee: { [Op.like]: contractee } },
            limit: size,
            offset: size * page //skip first items
        })
        .then(data => {
            const totalPages = parseInt((data.count % size) ? (data.count / size)+1 : (data.count / size));
            const contracts = data.rows;

            //set previous and next page queries when those pages exist
            let prev = (page && page < (totalPages)) ? `?page=${page-1}` : undefined;
            let next = (page < (totalPages-1)) ? `?page=${page+1}` : undefined;

            res.send({ contracts , prev , next });
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "An error occurred while finding contracts."
            });
        });

    // Find all contracts by contractor
    } else if(req.query.contractor){
        const contractor = req.query.contractor;
        console.log(`\n[REQUEST: FIND CONTRACTS WITH CONTRACTOR="${contractor}"]`);

        Contract.findAndCountAll({
            where: {contractor: { [Op.like]: contractor } },
            limit: size,
            offset: size * page //skip first items
        })
        .then(data => {
            const totalPages = parseInt((data.count % size) ? (data.count / size)+1 : (data.count / size));
            const contracts = data.rows;

            //set previous and next page queries when those pages exist
            let prev = (page && page < (totalPages)) ? `?page=${page-1}` : undefined;
            let next = (page < (totalPages-1)) ? `?page=${page+1}` : undefined;

            res.send({ contracts , prev , next });
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "An error occurred while finding contracts."
            });
        });

    // Find all contracts
    } else {
        console.log(`\n[REQUEST: FIND ALL CONTRACTS]`);

        Contract.findAndCountAll({
            where: {id: { [Op.like]: `%%` } },
            limit: size,
            offset: size * page //skip first items
        })
        .then(data => {
            const totalPages = parseInt((data.count % size) ? (data.count / size)+1 : (data.count / size));
            const contracts = data.rows;

            //set previous and next page queries when those pages exist
            let prev = (page && page < (totalPages)) ? `?page=${page-1}` : undefined;
            let next = (page < (totalPages-1)) ? `?page=${page+1}` : undefined;

            res.send({ contracts , prev , next });
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "An error occurred while finding contracts."
            });
        });
    }
};
