const pool = require('./database');
async function createViews() {
    try {
        const viewQueries = [
            `CREATE VIEW StatistiqueMonsterQuete AS
             SELECT
                 Monster.Nom,
                 IFNULL(Quete.Nom_de_la_Quete, 'Aucune quête') AS Nom_de_la_Quete,
                 IFNULL(quete_monster.Date, 'Pas de date') AS Date_Quete
             FROM
                 Monster
             LEFT JOIN
                 quete_monster ON Monster.Monster_ID = quete_monster.Monster_ID
             LEFT JOIN
                 Quete ON quete_monster.Quete_ID = Quete.Quete_ID`,

            `CREATE VIEW StatistiqueEvenement AS
             SELECT ev.Nom as NomEvent,
                    COUNT(DISTINCT cm.Monster_1_ID) + COUNT(DISTINCT cm.Monster_2_ID) as NbParticipants,
                    a.Nom as NomArene,
                    COUNT(eq.Equipement_ID) as NbEquipement,
                    COUNT(c.Combat_ID) as NbCombat
             FROM Evenement ev
             INNER JOIN Arene a ON a.Arene_ID = ev.Arene_ID
             LEFT JOIN Equipement eq ON eq.Arene_ID = a.Arene_ID
             LEFT JOIN Combat c ON c.Evenement_ID = ev.Evenement_ID
             LEFT JOIN combat_monster cm ON cm.Combat_ID = c.Combat_ID
             GROUP BY ev.Nom`
        ];

        for (let query of viewQueries) {
            await pool.query(query);
        }

        console.log("Vues créées avec succès");
    } catch (error) {
        console.error("Erreur lors de la création des vues :", error);
    }
}

function runMonsterTypeProcedure(typeNom) {
    pool.query('CALL MonsterType(?)', [typeNom], (error, results, fields) => {
        if (error) {
            console.error("Erreur lors de l'exécution de MonsterType :", error);
            return;
        }

        if (results[0] && results[0].length) {
            console.log("Résultats de la procédure MonsterType :");
            results[0].forEach(row => {
                console.log(row);
            });
        } else {
            console.log("Aucun résultat trouvé pour le type de monstre spécifié.");
        }
    });
}

function runMiseAJourMonsterProcedure(monsterID, pv, niveau, pointsPuissance, pointExp) {
    pool.query('CALL MiseAJourMonster(?, ?, ?, ?, ?)', [monsterID, pv, niveau, pointsPuissance, pointExp], (error, results, fields) => {
        if (error) {
            console.error("Erreur lors de l'exécution de MiseAJourMonster :", error);
            return;
        }

        console.log("Résultat de la procédure MiseAJourMonster :", results[0]);
    });
}

function fetchCombatPage(pageNumber, pageSize) {
    const offset = (pageNumber - 1) * pageSize;
    const paginatedQuery = `SELECT * FROM Combat ORDER BY Combat_ID LIMIT ? OFFSET ?`;

    pool.query(paginatedQuery, [pageSize, offset], (error, results, fields) => {
        if (error) {
            console.error("Erreur lors de la récupération de la page :", error);
            return;
        }

        console.log("Résultats de la page :", results);
    });
}
function getDistinctAddresses() {
    pool.query('SELECT DISTINCT Adresse FROM Localisation', (error, results, fields) => {
        if (error) {
            console.error("Erreur lors de l'obtention des adresses distinctes :", error);
            return;
        }

        console.log("Adresses distinctes :");
        results.forEach(row => {
            console.log(row.Adresse);
        });
    });
}

async function reinsertLastThreeEquipments() {
    const query = `
        INSERT INTO Equipement (Nom, Type_ID, Arene_ID)
        SELECT Nom, Type_ID, Arene_ID
        FROM (
            SELECT Nom, Type_ID, Arene_ID
            FROM Equipement
            ORDER BY Equipement_ID DESC
            LIMIT 3
        ) AS derniersEquipements;
    `;

    try {
        const results = await pool.query(query);
        console.log("Les trois derniers équipements ont été réinsérés avec succès.");
    } catch (error) {
        console.error("Erreur lors de la réinsertion des trois derniers équipements :", error);
    }
}

module.exports = {
    createViews,
    runMonsterTypeProcedure,
    runMiseAJourMonsterProcedure,
    fetchCombatPage,
    getDistinctAddresses,
    reinsertLastThreeEquipments
};