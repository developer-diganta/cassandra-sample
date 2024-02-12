const selectTextsByUserStmt = 'SELECT content FROM texts WHERE user=? ';
const insertTextStmt = 'INSERT INTO texts (id, user,content) VALUES (?,?,?)';
const checkTextAuthorStmt = 'SELECT * FROM texts WHERE user=? AND id=?';
const editTextStmt = 'UPDATE texts SET content = ? WHERE user = ? AND id = ?';
module.exports = {
    selectTextsByUserStmt,
    insertTextStmt,
    checkTextAuthorStmt,
    editTextStmt
}
