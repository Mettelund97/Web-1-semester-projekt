const dbConn = require("../config/db.js");

exports.getAllTemplates = async () => {
  try {
    const [rows] = await dbConn.query(
      `SELECT id, name, service FROM Templates`
    );
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};

exports.getTemplateById = async (templateId) => {
  try {
    const query = "SELECT * FROM Templates WHERE id = ?";
    const [result] = await dbConn.query(query, [templateId]);

    if (result.length === 0) {
      return null;
    }

    return result[0];
  } catch (error) {
    console.error("Error fetching template by ID:", error);
    throw error;
  }
};
