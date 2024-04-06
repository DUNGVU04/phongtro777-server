import { Sequelize } from "sequelize";

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize("d-phongtro777", "root", "240402", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false, // không log ra những thứ không cần thiết
});
// kiểm tra xem kết nối db chưa
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
export default connectDatabase;
