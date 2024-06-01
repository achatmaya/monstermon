const pool = require("./database");

module.exports = {
    async clearTables() {
        const tablesInOrder = [
            'Espece',
            'TypePower',
            'Localisation',
            'Magasin',
            'Arene',
            'Dresseur',
            'Equipement',
            'Monster',
            'Evenement',
            'Combat',
            'Vente',
            'Quete',
            'combat_monster',
            'quete_monster',
        ];

        for (const tableName of tablesInOrder) {
            try {
                const sql = `DELETE FROM ${tableName}`;
                await pool.query(sql);
                console.log(`Données supprimées de la table ${tableName}.`);
            } catch (err) {
                console.error(`Erreur lors de la suppression des données de la table ${tableName}: ${err.message}`);
                break;
            }
        }
    }
};