const dbConn = require("../config/db.js");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async () => {
  try {
    const [rows] = await dbConn.query(
      `SELECT Users.id, Users.firstName, Users.lastName, Users.email, Users.password, Users.expiredAt, Users.roleId,
    Roles.type AS roleName
    FROM Users
    JOIN Roles ON Users.RoleId = Roles.id`
    );
    return rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};

exports.getUserById = async (id) => {
  try {
    const [rows] = await dbConn.query("SELECT * FROM Users WHERE id = ?", [id]);
    if (rows.length > 0) {
      return rows[0];
    } else {
      console.log("No user found with the specified ID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

exports.checkUserByEmail = async (email) => {
  try {
    const [rows] = await dbConn.query(
      `SELECT * FROM Users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error;
  }
};

exports.checkIfUserCanLogin = async (email, password) => {
  try {
    const [rows] = await dbConn.query(
      `SELECT * FROM Users WHERE email = ? LIMIT 1`,
      [email]
    );

    if (rows.length === 0) return null;

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error finding", error);
    throw error;
  }
};

exports.createNewUser = async (user, groupId) => {
  const { firstName, lastName, email, password, role } = user;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const userQuery = `
      INSERT INTO Users (firstName, lastName, email, password, roleId)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await dbConn.query(userQuery, [
      firstName,
      lastName,
      email,
      hashedPassword,
      role,
    ]);

    const userId = result.insertId;

    const groupQuery = `INSERT INTO UserGroup (userId, groupId) VALUES (?, ?)`;
    await dbConn.query(groupQuery, [userId, groupId]);

    return {
      success: true,
      message: "User added successfully and assigned to group",
      userId: userId,
    };
  } catch (error) {
    console.error("Error adding user:", error);
    return { success: false, message: "Error adding user" };
  }
};

exports.updateUserRole = async (userId, roleId) => {
  try {
    const updateQuery = `
          UPDATE Users 
          SET roleId = ?
          WHERE id = ?
      `;

    const [result] = await dbConn.query(updateQuery, [roleId, userId]);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      message: "Role updated successfully",
    };
  } catch (error) {
    console.error("Error updating user role:", error);
    return {
      success: false,
      message: "Error updating role",
    };
  }
};
