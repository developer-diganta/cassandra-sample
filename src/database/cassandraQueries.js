const selectTextsByUserStmt = 'SELECT id, content FROM texts WHERE user=? ';
const insertTextStmt = 'INSERT INTO texts (id, user,content) VALUES (?,?,?)';
const checkTextAuthorStmt = 'SELECT * FROM texts WHERE user=? AND id=?';
const editTextStmt = 'UPDATE texts SET content=? WHERE user=? AND id=?';
const deleteTextSmt = 'DELETE FROM texts WHERE user=? AND id=?';

const selectImageStmt = 'SELECT id,image FROM images WHERE user=? ';
const selectParticularImageStmt = 'SELECT image FROM images WHERE user=? AND id=?';
const insertImageStmt = 'INSERT INTO images (id,user,image) VALUES (?,?,?)';
const deleteImageStmt = 'DELETE FROM images WHERE user=? AND id=?';

const selectUsersStmtPublic = 'SELECT name,email FROM users';
const selectUserStmt = 'SELECT * FROM users WHERE id=?';
const selectUserStmtPublic = 'SELECT name, email, id WHERE email=? OR id=?';
const insertUser = 'INSERT INTO users (id,email,name,password) VALUES(?,?,?,?) IF NOT EXISTS';
const checkUserCredentialsStmt = "SELECT name FROM users WHERE id=? AND email=?";
const verifyUserStmt = 'SELECT * FROM users WHERE email=? ALLOW FILTERING';
module.exports = {
    selectTextsByUserStmt,
    insertTextStmt,
    checkTextAuthorStmt,
    editTextStmt,
    deleteTextSmt,
    selectImageStmt,
    selectParticularImageStmt,
    insertImageStmt,
    deleteImageStmt,
    selectUsersStmtPublic,
    selectUserStmt,
    selectUserStmtPublic,
    insertUser,
    checkUserCredentialsStmt,
    verifyUserStmt
}
