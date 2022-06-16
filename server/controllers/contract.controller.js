const db = require("../models/sequelize");
const Contract = db.contract;
const Op = db.Sequelize.Op;

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

