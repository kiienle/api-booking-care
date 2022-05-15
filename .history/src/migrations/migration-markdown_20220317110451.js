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
                allowNull: false,
                type: DataTypes.TEXT("long"),
            },
            contentMarkdown: {
                allowNull: false,
                type: DataTypes.TEXT("long"),
            },
            description: {
                allowNull: true,
                type: DataTypes.TEXT("long"),
            },
            doctorId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            specialtyId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            clinicId: {
                allowNull: false,
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
