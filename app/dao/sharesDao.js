const pool = require("./pool");

const create = async (share) => {
    try {
        const { rows } = await pool.query(
            `INSERT INTO shares (job_role_id, recipient_id)
            VALUES ($1, $2)
            RETURNING id;`, [share.jobRoleId, share.recipientId]
        );
        // qq also add a Message to notify the recipient that the role has been shared to them
        return rows && rows[0] && rows[0].id;
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

module.exports = {
    create: create
}