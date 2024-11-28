const dbConn = require("../config/db.js");
const bcrypt = require("bcryptjs");

exports.createNewStack = async (stack, userId) => {
    const { title, subDomain, status, template, user } = stack;

    try {
        const stackQuery = `
        INSERT INTO Stacks (title, subDomain, status, template, userId)
        VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await dbConn.query(stackQuery, [
        title,
        subDomain,
        status,
        template,
        user,
    ]);
    const stackId = result.insertId;

    const userQuery = `INSERT INTO Stack`
    }
    
}