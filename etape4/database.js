const { dataBaseISCreated, config } = require('./config');
const mysql = require('mysql');

if (dataBaseISCreated) {
    config.database = 'monstermon';
}

const connection = mysql.createConnection(config);

connection.connect(err => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("Connected to the database!");
});
// connection.end(err => {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
//     console.log("Connection closed!");
// });

module.exports = connection;
// const mysql = require('mysql');
// const config = require('./config');

// let connection = mysql.createConnection(config.db);

// // Fonction pour reconfigurer la connexion
// function reconfigureConnection(newConfig) {
//     connection.end(); // Fermer la connexion existante
//     connection = mysql.createConnection(newConfig); // Créer une nouvelle connexion
//     connection.connect(error => {
//         if (error) {
//             console.error('Erreur de connexion:', error);
//             return;
//         }
//         console.log('Connexion reconfigurée avec succès.');
//     });
// }

// module.exports = {
//     connection,
//     reconfigureConnection
// };
