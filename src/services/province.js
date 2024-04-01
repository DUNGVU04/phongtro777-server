import db from "../models/index.js";

export const getProvinceService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Province.findAll({
        raw: true,
        attributes: ["code", "value"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get prices",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
