"use strict";

import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // Lấy thư mục chứa file hiện tại
const resolvedDirname = path.resolve(__dirname, ".."); // Sử dụng path.resolve để loại bỏ phần mở rộng .js

const { basename } = path;
const env = process.env.NODE_ENV || "development";
import configJson from "../config/config.json" assert { type: "json" };
const config = configJson[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

// Kiểm tra xem __dirname có phải là một thư mục không
const isDirectory = fs.statSync(resolvedDirname).isDirectory();

// Nếu __dirname là một thư mục, thực hiện đọc các tệp trong đó
if (isDirectory) {
  fs.readdirSync(resolvedDirname)
    .filter((file) => {
      return (
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
      );
    })
    .forEach(async (file) => {
      const model = (await import(path.join(resolvedDirname, file))).default(
        sequelize,
        Sequelize.DataTypes
      );
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
} else {
  console.error("__dirname is not a directory", resolvedDirname);
  console.log("import.meta.url", fileURLToPath(import.meta.url));
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
