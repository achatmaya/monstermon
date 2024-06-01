const readline = require('readline');
const dbOps = require('./operations');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function menu() {
    console.log("\n===== Menu Principal =====");
    console.log("1. Créer des vues statistiques");
    console.log("2. Exécuter la procédure MonsterType");
    console.log("3. Exécuter la procédure MiseAJourMonster");
    console.log("4. Pagination de la liste des combats");
    console.log("5. lister toutes les adresses du jeu sans doublon");
    console.log("6. Insérez à nouveau les trois derniers équipements");
    console.log("7. Quitter");

    rl.question("\nChoisissez une option: ", (choice) => {
        switch (choice) {
            case '1':
                dbOps.createViews().then(() => menu());
                break;
            case '2':
                rl.question("Entrez le type de monstre: ", (typeNom) => {
                    dbOps.runMonsterTypeProcedure(typeNom);
                    menu();
                });
                break;
            case '3':
                updateMonsterProcedure();
                break;
            case '4':
                rl.question("Numéro de la page (10 combats par page): ", (pageNumber) => {
                    dbOps.fetchCombatPage(parseInt(pageNumber), 10);
                    menu();
                });
                break;
            case '5':
                dbOps.getDistinctAddresses();
                menu();
                break;
            case '6':
                dbOps.reinsertLastThreeEquipments().then(() => menu());
                break;
            case '7':
                console.log("Au revoir !");
                rl.close();
                break;
            default:
                console.log("Option invalide. Veuillez réessayer.");
                menu();
        }
    });
}

function updateMonsterProcedure() {
    rl.question("Entrez l'ID du monstre: ", (monsterID) => {
        rl.question("Entrez les points de vie: ", (pv) => {
            rl.question("Entrez le niveau: ", (niveau) => {
                rl.question("Entrez les points de puissance: ", (pointsPuissance) => {
                    rl.question("Entrez les points d'expérience: ", (pointExp) => {
                        dbOps.runMiseAJourMonsterProcedure(parseInt(monsterID), parseInt(pv), parseInt(niveau), parseInt(pointsPuissance), parseInt(pointExp));
                        menu();
                    });
                });
            });
        });
    });
}

menu();