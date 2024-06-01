const insertTable = require('./insertTables');
const insertData = require('./insertData');
const deleteTables = require('./deleteQueries');
const clearTables = require('./truncateTables');
const dropDatabase = require('./dropDatabase');
const readline = require('readline');

require('dotenv').config();

async function insertTables() {
    try {
        await insertTable();
    } catch (error) {
        console.error(error);
    }
}

async function insertDataintoTables() {
    try {
        await insertData();
    } catch (error) {
        console.error(error);
    }
}

async function dropAllTables() {
    try {
        await deleteTables.dropTables();
        console.log("Toutes les tables ont été supprimées.");
    } catch (error) {
        console.error("Erreur lors de la suppression des tables:", error);
    }
}

async function clearDataFromTables() {
    try {
        await clearTables.clearTables();
        console.log("Les données de toutes les tables ont été supprimées.");
    } catch (error) {
        console.error("Erreur lors de la vidange des tables:", error);
    }
}

async function confirmAndDropDatabase() {
    rl.question("Êtes-vous absolument sûr de vouloir supprimer la base de données ? Cette action est irréversible. Tapez 'oui' pour confirmer: ",
        async (confirmation) => {
        if (confirmation.toLowerCase() === 'oui') {
            await dropDatabase(process.env.MONSTERMON_DB_NAME);
            console.log("La base de données a été détruite.");
            rl.close();
            process.exit(0);
        } else {
            console.log("Suppression annulée.");
            menu();
        }
    });
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("===== Menu =====");
    console.log("1. Insérer des tables");
    console.log("2. Insérer des données dans les tables");
    console.log("3. Supprimer toutes les tables");
    console.log("4. Effacer les données des tables");
    console.log("5. Détruire la base de données");
    console.log("6. Quitter");

    rl.question("Choisissez une option (1, 2, 3, 4, 5 ou 6) : ", function(choice) {
        switch (choice) {
            case '1':
                insertTables().then(() => menu());
                break;
            case '2':
                insertDataintoTables().then(() => menu());
                break;
            case '3':
                dropAllTables().then(() => menu());
                break;
            case '4':
                clearDataFromTables().then(() => menu());
                break;
            case '5':
                confirmAndDropDatabase();
                break;
            case '6':
                console.log("Au revoir !");
                rl.close();
                break;
            default:
                console.log("Option invalide. Veuillez choisir une option valide.");
                menu();
                break;
        }
    });
}
menu();
