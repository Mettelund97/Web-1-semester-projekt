const dbConn = require("../config/db.js");

class StackModel {
  static async createStack(stackData) {
    try {
      const {
        title,
        subdomain,
        status,
        userId,
        portainerStackId,
        groupId,
        template,
      } = stackData;

      const query = `
        INSERT INTO Stacks (
          title,
          subdomain,
          status,
          userId,
          portainerStackId,
          createdAt,
          syncStatus,
          groupId,
          templateId
        ) VALUES (?, ?, ?, ?, ?, NOW(), 'synced', ?, ?)
      `;

      const [result] = await dbConn.query(query, [
        title,
        subdomain,
        status ? 1 : 0,
        userId,
        portainerStackId,
        groupId,
        template,
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

  static async updateStack(stackData) {
    try {
      const { id, status, lastSynced, portainerStackId } = stackData;

      const query = `
        UPDATE Stacks 
        SET 
          status = ?,
          lastSynced = ?,
          portainerStackId = ?,
          syncStatus = 'synced'
        WHERE id = ?
      `;

      const [result] = await dbConn.query(query, [
        status,
        lastSynced,
        portainerStackId,
        id,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating stack in database:", error);
      throw error;
    }
  }

  static async updateSyncStatus(id, syncStatus, syncMessage = null) {
    try {
      const query = `
        UPDATE Stacks 
        SET syncStatus = ?, 
            syncMessage = ?,
            lastSynced = NOW()
        WHERE id = ?
      `;

      const [result] = await dbConn.query(query, [syncStatus, syncMessage, id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating sync status:", error);
      throw error;
    }
  }

  static async findByPortainerStackId(portainerStackId) {
    try {
      const [rows] = await dbConn.query(
        "SELECT * FROM Stacks WHERE portainerStackId = ?",
        [portainerStackId]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("Error finding stack by Portainer ID:", error);
      throw error;
    }
  }

  static async updateStack(stackData) {
    try {
      const { id, status, lastSynced, portainerStackId } = stackData;

      const query = `
        UPDATE Stacks 
        SET 
          status = ?,
          lastSynced = ?,
          portainerStackId = ?,
          syncStatus = 'synced'
        WHERE id = ?
      `;

      const [result] = await dbConn.query(query, [
        status,
        lastSynced,
        portainerStackId,
        id,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating stack in database:", error);
      throw error;
    }
  }

  static async updateSyncStatus(id, syncStatus, syncMessage = null) {
    try {
      const query = `
        UPDATE Stacks 
        SET syncStatus = ?, 
            syncMessage = ?,
            lastSynced = NOW()
        WHERE id = ?
      `;

      const [result] = await dbConn.query(query, [syncStatus, syncMessage, id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error updating sync status:", error);
      throw error;
    }
  }

  static async findByPortainerStackId(portainerStackId) {
    try {
      const [rows] = await dbConn.query(
        "SELECT * FROM Stacks WHERE portainerStackId = ?",
        [portainerStackId]
      );
      return rows[0] || null;
    } catch (error) {
      console.error("Error finding stack by Portainer ID:", error);
      throw error;
    }
  }

  static async getAllStacks() {
    try {
      const query = `
      SELECT 
        s.*, 
        u.firstName, 
        u.lastName, 
        g.name AS groupName, 
        g.id AS groupId, 
        t.name AS templateName
      FROM Stacks s
      LEFT JOIN Users u ON s.userId = u.id
      LEFT JOIN UserGroup ug ON u.id = ug.userId
      LEFT JOIN \`Groups\` g ON ug.groupId = g.id
      LEFT JOIN Templates t ON s.templateId = t.id
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
