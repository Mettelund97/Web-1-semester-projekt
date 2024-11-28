const dbConn = require("../config/db.js");

class StackModel {
  static async createStack(stackData) {
    try {
      const { title, subdomain, status, template, userId } = stackData;

      const query = `
        INSERT INTO Stacks (
          title,
          subdomain,
          status,
          template,
          userId,
          createdAt,
          lastStarted
        ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())
      `;

      const [result] = await dbConn.query(query, [
        title,
        subdomain,
        status,
        template,
        userId,
      ]);

      return {
        success: true,
        id: result.insertId,
        message: "Stack created successfully",
      };
    } catch (error) {
      console.error("Error creating stack in database:", error);
      throw error;
    }
  }

  // static async createStack(stackData) {
  //   try {
  //     const { title, subdomain, status, template, userId } = stackData;

  //     const query = `
  //       INSERT INTO Stacks (
  //         title,
  //         subdomain,
  //         status,
  //         templateId,
  //         userId,
  //         createdAt,
  //         lastStarted
  //       ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())
  //     `;

  //     const [result] = await dbConn.query(query, [
  //       title,
  //       subdomain,
  //       status,
  //       templateId,
  //       userId,
  //     ]);

  //     return {
  //       success: true,
  //       id: result.insertId,
  //       message: "Stack created successfully",
  //     };
  //   } catch (error) {
  //     console.error("Error creating stack in database:", error);
  //     throw error;
  //   }
  // }

  static async getAllStacks() {
    try {
      const query = `
        SELECT s.*, u.firstName, u.lastName 
        FROM Stacks s
        LEFT JOIN Users u ON s.userId = u.id
        ORDER BY s.createdAt DESC
      `;

      const [rows] = await dbConn.query(query);
      return rows;
    } catch (error) {
      console.error("Error fetching stacks from database:", error);
      throw error;
    }
  }

  static async getStackById(id) {
    try {
      const query = `
        SELECT s.*, u.firstName, u.lastName 
        FROM Stacks s
        LEFT JOIN Users u ON s.userId = u.id
        WHERE s.id = ?
      `;

      const [rows] = await dbConn.query(query, [id]);
      return rows[0] || null;
    } catch (error) {
      console.error("Error fetching stack from database:", error);
      throw error;
    }
  }

  static async updateStackStatus(id, status) {
    try {
      const query = `
        UPDATE Stacks 
        SET 
          status = ?,
          ${status ? "lastStarted = NOW()" : "lastStopped = NOW()"}
        WHERE id = ?
      `;

      const [result] = await dbConn.query(query, [status, id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating stack status in database:", error);
      throw error;
    }
  }

  static async deleteStack(id) {
    try {
      const query = "DELETE FROM Stacks WHERE id = ?";
      const [result] = await dbConn.query(query, [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting stack from database:", error);
      throw error;
    }
  }
}

module.exports = StackModel;
