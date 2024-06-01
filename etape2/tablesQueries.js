
const pool = require("./database");
module.exports = {
    async CreateEspece() {
        sql = `
        CREATE TABLE if not exists Espece (
            Espece_ID INT PRIMARY KEY,
            Nom VARCHAR(255) NOT NULL
            )`
        pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    } ,
    async CreateLocation() {
        sql = `
        CREATE TABLE if not exists Localisation (
            Localisation_ID INT PRIMARY KEY,
            Adresse VARCHAR(255) NOT NULL
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });

    } ,
    async CreateTypePower() {
        sql = `
        CREATE TABLE if not exists TypePower (
            Type_ID INT PRIMARY KEY,
            Nom VARCHAR(55) NOT NULL
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    } ,
    async CreateMagazin() {
        sql = `
        CREATE TABLE if not exists Magasin (
            Magasin_ID INT PRIMARY KEY,
            Nom VARCHAR(55),
            Localisation_ID INT,
            FOREIGN KEY (Localisation_ID) REFERENCES Localisation(Localisation_ID)
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    } ,
    async CreateArene() {      
        const sql = `
            CREATE TABLE if not exists Arene (
            Arene_ID INT PRIMARY KEY,
            Taille INT ,
            Nombre_de_places INT ,
            Localisation_ID INT,
            Nom VARCHAR(255) NOT NULL,
            FOREIGN KEY (Localisation_ID) REFERENCES Localisation(Localisation_ID)
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    } ,
    async CreateEquipement() {
        const sql = `
    CREATE TABLE if not exists Equipement (
        Equipement_ID INT AUTO_INCREMENT PRIMARY KEY,
        Nom varchar(55),
        Type_ID INT NOT NULL,
        Arene_ID INT NOT NULL,
        FOREIGN KEY (Arene_ID) REFERENCES Arene(Arene_ID),
        FOREIGN KEY (Type_ID) REFERENCES TypePower(Type_ID)
    )`;
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table Equipement created");
        });
    },

    async CreateEvenement() {
        sql = `
            CREATE TABLE if not exists Evenement (
            Evenement_ID INT PRIMARY KEY,
            Cout INT NOT NULL,
            Capacite INT ,
            Arene_ID INT,
            Nom VARCHAR(255) NOT NULL,
            Date_de_debut DATETIME NOT NULL,
            Date_de_fin DATETIME NOT NULL,
            
            FOREIGN KEY (Arene_ID) REFERENCES Arene(Arene_ID)
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    } ,
    async CreateDresseur() {      
        const sql = `
        CREATE TABLE if not exists Dresseur(
            Dresseur_ID INT PRIMARY KEY,
            Nom VARCHAR(255) NOT NULL,
            prenom varchar(55) not null,
            Date_inscription DATETIME,
            Status VARCHAR(255) ,
            Localisation_ID INT,
            Est_professeur BOOLEAN  DEFAULT false,
            Genre VARCHAR(50) NOT NULL,
            Coache_ID INT,
            FOREIGN KEY (Localisation_ID) REFERENCES Localisation(Localisation_ID),
            FOREIGN KEY (Coache_ID) REFERENCES Dresseur(Dresseur_ID)
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    } ,
    async CreateMonster() {
        sql = `
        CREATE TABLE if not exists Monster (
            Monster_ID INT PRIMARY KEY,
            Nom VARCHAR(255) UNIQUE NOT NULL,
            Point_Experience INT NOT NULL ,
            Points_de_vie INT NOT NULL,
            Type_ID INT NOT NULL,
            Espece_ID INT,
            Poids DECIMAL(10, 2) NOT NULL,
            Taille DECIMAL(10, 2) NOT NULL,
            Points_de_puissance INT NOT NULL,
            Niveau INT NOT NULL,
            Capturee BOOLEAN,
            Date_Capture DATE ,
            Dresseur_ID INT,
            FOREIGN KEY (Dresseur_ID) REFERENCES Dresseur(Dresseur_ID),
            FOREIGN KEY (Espece_ID) REFERENCES Espece(Espece_ID),
            FOREIGN KEY (Type_ID) REFERENCES TypePower(Type_ID)
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    } ,
    async CreateVente() {
        sql = `CREATE TABLE if not exists Vente (
            Vente_ID INT PRIMARY KEY,
            Numero_vente INT,
            Date DATETIME NOT NULL,
            Monster_ID INT,
            Magasin_ID INT,
            Dresseur_ID INT,
            Prix DECIMAL(10, 2) NOT NULL,
            FOREIGN KEY (Monster_ID) REFERENCES Monster(Monster_ID),
            FOREIGN KEY (Magasin_ID) REFERENCES Magasin(Magasin_ID),
            FOREIGN KEY (Dresseur_ID) REFERENCES Dresseur(Dresseur_ID)
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    } ,
    async CreateQuete() {
        sql = `
        CREATE TABLE if not exists Quete (
        Quete_ID INT PRIMARY KEY,
        Points_experience INT NOT NULL,
        Debut DATETIME NOT NULL,
        Fin DATETIME ,
        Localisation_ID INT,
        Nom_de_la_Quete VARCHAR(255) NOT NULL,
        FOREIGN KEY (Localisation_ID) REFERENCES Localisation(Localisation_ID)
        )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    } ,
    async createCombat (){
        sql = `
        CREATE TABLE if not exists Combat (
            Combat_ID INT PRIMARY KEY,
            Date DATETIME NOT NULL,
            Evenement_ID INT,
            Point_Gagnee INT,
            FOREIGN KEY (Evenement_ID) REFERENCES Evenement(Evenement_ID)
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    },
    async createCombatMonster (){
        sql = `
        CREATE TABLE if not exists combat_monster (
            Combat_ID INT,
            Monster_1_ID INT,
            Monster_2_ID INT,
            Gagner TINYINT(1) DEFAULT 0,
            PRIMARY KEY (Combat_ID, Monster_1_ID , Monster_2_ID),
            FOREIGN KEY (Combat_ID) REFERENCES Combat(Combat_ID),
            FOREIGN KEY (Monster_1_ID) REFERENCES Monster(Monster_ID),
            FOREIGN KEY (Monster_2_ID) REFERENCES Monster(Monster_ID)
            )`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });
    },
    async CreateQueteMonster (){
        sql = `
        CREATE TABLE if not exists quete_monster (
            Monster_ID INT,
            Quete_ID INT,
            Date Date ,
            Acompli TINYINT(1) DEFAULT 0,
            PRIMARY KEY (Monster_ID, Quete_ID),
            FOREIGN KEY (Monster_ID) REFERENCES Monster(Monster_ID),
            FOREIGN KEY (Quete_ID) REFERENCES Quete(Quete_ID))`
        await pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");

        });
    },
}
