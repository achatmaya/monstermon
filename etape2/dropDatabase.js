const pool = require("./database"); // Utilisez votre module de connexion à la base de données personnalisé

async function dropDatabase(databaseName) {
    try {
        const sql = `DROP DATABASE ${databaseName}`;
        const result = await pool.query(sql);
        console.log(`La base de données ${databaseName} a été supprimée avec succès.`);
    } catch (err) {
        console.error(`Erreur lors de la suppression de la base de données: ${err.message}`);
    } finally {
        pool.end();
    }
}
module.exports = dropDatabase;