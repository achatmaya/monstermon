const pool = require("./database");

module.exports = {
    async dropTables() {
        const tablesInReverseOrder = [
            'combat_monster',
            'quete_monster',
            'Vente',
            'Combat',
            'Equipement',
            'Monster',
            'Dresseur',
            'Evenement',
            'Arene',
            'Magasin',
            'Quete',
            'TypePower',
            'Localisation',
            'Espece',
        ];

        for (const tableName of tablesInReverseOrder) {
            const sql = `DROP TABLE IF EXISTS ${tableName}`;
            try {
                await pool.query(sql);
                console.log(`Table ${tableName} supprimée.`);
            } catch (err) {
                console.error(`Erreur lors de la suppression de la table ${tableName}: ${err.message}`);
                break;
            }
        }
    }
};