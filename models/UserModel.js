const dbConn = require("../config/db.js");

// getting all users from the database
exports.getAllUsers = async () => {
  try {
    const [rows] = await dbConn.query(
      //   `SELECT id, firstName, lastName, email, password, expiredAt, roleId FROM Users`
      // );
      `SELECT Users.id, Users.firstName, Users.lastName, Users.email, Users.password, Users.expiredAt, Users.RoleId,
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

// getting a user by it's ID from the database
exports.getUserById = async (id) => {
  try {
    const [rows] = await dbConn.query("SELECT * FROM Users WHERE id = ?", [id]);
    if (rows.length > 0) {
      // sends the userdata back
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

// database function to check if there already is a user with that email.
exports.checkUserByEmail = async (email) => {
  try {
    const [rows] = await dbConn.query(
      `SELECT * FROM Users WHERE email = ? LIMIT 1`,
      [email]
    );
    // if the users email match a existing email in db then go inside the if-statement.
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

// create a single user to the database with group and role
exports.createNewUser = async (user, groupId) => {
  const { firstName, lastName, email, password, role } = user;

  try {
    // Step 1: Insert the new user into the Users table
    const userQuery = `
      INSERT INTO Users (firstName, lastName, email, password, roleId)
      VALUES (?, ?, ?, SHA2(?, 256), ?)
    `;

    // Execute the query with parameters
    const [result] = await dbConn.query(userQuery, [
      firstName,
      lastName,
      email,
      password,
      role,
    ]);

    // Get the newly created user's ID
    const userId = result.insertId;

    // Step 2: Insert into the UserGroup table to link user with the group
    const groupQuery = `
      INSERT INTO UserGroup (userId, groupId)
      VALUES (?, ?)
    `;
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

// todo: Update and delete user missing:



/*

// Update user in the database
exports.updateUser = async (userId, userData, groupId) => {
  const { firstName, lastName, email, roleId } = userData;
  
  try {
    // Begin transaction
    await dbConn.beginTransaction();

    // Update user information
    const updateUserQuery = `
      UPDATE Users 
      SET firstName = ?,
          lastName = ?,
          email = ?,
          roleId = ?
      WHERE id = ?
    `;

    await dbConn.query(updateUserQuery, [
      firstName,
      lastName,
      email,
      roleId,
      userId
    ]);

    // Update user's group if provided
    if (groupId) {
      // First delete existing group association
      await dbConn.query('DELETE FROM UserGroup WHERE userId = ?', [userId]);
      
      // Then insert new group association
      await dbConn.query('INSERT INTO UserGroup (userId, groupId) VALUES (?, ?)', [userId, groupId]);
    }

    await dbConn.commit();
    
    return {
      success: true,
      message: "User updated successfully"
    };
  } catch (error) {
    await dbConn.rollback();
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "Error updating user"
    };
  }
};

// Delete user from the database
exports.deleteUser = async (userId) => {
  try {
    // Begin transaction
    await dbConn.beginTransaction();

    // First delete from UserGroup table (foreign key constraint)
    await dbConn.query('DELETE FROM UserGroup WHERE userId = ?', [userId]);
    
    // Then delete from Users table
    const [result] = await dbConn.query('DELETE FROM Users WHERE id = ?', [userId]);
    
    await dbConn.commit();

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "User not found"
      };
    }

    return {
      success: true,
      message: "User deleted successfully"
    };
  } catch (error) {
    await dbConn.rollback();
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "Error deleting user"
    };
  }
};

*/