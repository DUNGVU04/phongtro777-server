import * as insertService from "../services/insert.js";
export const insert = async (req, res) => {
  try {
    const response = await insertService.insertService();
    return res.status(200).json(response);
  } catch (error) {
    // lỗi ở server
    return res.status(500).json({
      err: -1,
      msg: "Fail at auth controller: " + error,
    });
  }
};