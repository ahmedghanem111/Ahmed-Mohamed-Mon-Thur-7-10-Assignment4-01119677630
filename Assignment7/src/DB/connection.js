import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("Assignment7", "root", "", {
    host: "localhost",
    port: 3306,
    dialect: "mysql"
} );

export const TestConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log("DB connected successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error); 
    }
};
