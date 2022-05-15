"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("markdowns", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            contentHTML: {
                type: DataTypes.TEXT("long"),
            },
            description: {
                type: DataTypes.TEXT("long"),
            },
            doctorId: {
                type: DataTypes.INTEGER,
            },
            specialtyId: {
                type: DataTypes.INTEGER,
            },
            clinicId: {
                type: DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("markdowns");
    },
};
