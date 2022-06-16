// Defines the contract table
module.exports = (sequelize, Sequelize) => {
    const Contract = sequelize.define("contract", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },  
        contractee: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        contractor: {
            type: Sequelize.STRING(250),
            allowNull: false
        },
        start_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        end_date: {
            type: Sequelize.DATEONLY
        },
        amount: {
            type: Sequelize.DOUBLE(100, 2),
            allowNull: false
        },

    }, {
        timestamps: false, //doesn't add createdAt and updatedAt
        freezeTableName: true //doesn't pluralize the table name
    });
    return Contract;
  };