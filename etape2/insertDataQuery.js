const pool = require("./database");
const parserCSV = require('./ParserCsv')
const generateRandomSalesNumber = require("./getRandomNumber")
module.exports = {
    async  InsertDataEspece() {
        const path = "./fichier_csv/initialespece.csv"
        Results = await parserCSV(path)
        console.log(Results)
        console.log(!Results)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Espece( Espece_ID , Nom) values (? , ?)'
                    await pool.query(sqlQuery,
                        [   item.ID ,
                            item.Nom
                        ])
                    console.log(`Insertion réussie pour ${item.Nom}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }
        } 
        else{

            console.log("aucune données")
        }   
    },
    async  InsertLocalisation() {
        const path = "./fichier_csv/initiallocalisation.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Localisation( Localisation_ID , Adresse) values (? , ?)'
                    await pool.query(sqlQuery,
                        [   item.ID,
                            item.Adresse
                        ])
                    console.log(`Insertion réussie pour ${item.Adresse}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Adresse}: ${error.message}`);
                }
            }
        }   
        else{

            console.log("aucune données")
        } 
    },
    async  InsertTypePower() {
        const path = "./fichier_csv/initialtype.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into TypePower( Type_ID , Nom) values (? , ?)'
                    await pool.query(sqlQuery,
                        [   item.ID ,
                            item.Nom
                        ])
                    console.log(`Insertion réussie pour ${item.Nom}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }   
        }
        else{

            console.log("aucune données")
        } 
    },
    async  InsertMagasin() {
        const path = "./fichier_csv/initialmagasin.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Magasin(Magasin_ID , Nom , Localisation_ID) values (? , ? , ?)'
                    await pool.query(sqlQuery,
                        [   item.ID,
                            item.Nom,
                            item.Localisation
                        ])
                    console.log(`Insertion réussie pour ${item.Nom}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }   
        }
        else{

            console.log("aucune données")
        } 
    },
    async  InsertArene() {
        const path = "./fichier_csv/initialarene.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Arene(Arene_ID, Nombre_de_places,Taille, Localisation_ID ,Nom) values (? , ? , ? , ? , ?)'
                    await pool.query(sqlQuery,
                        [   item.ID,
                            item['Nombre de place']?item['Nombre de place']: null,
                            item.Taille?item.Taille:null,
                            item.Localisation,
                            item.Nom
                        ])
                    console.log(`Insertion réussie pour ${item.Nom}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }  
        } 
        else{

            console.log("aucune données")
        } 
    },
    async  InsertEvenement() {
        const path = "./fichier_csv/initialevenement.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Evenement(Evenement_ID, Cout,Capacite, Arene_ID ,Nom , Date_de_debut, Date_de_fin ) values (? , ? , ? , ? , ? , ? , ?)'
                    await pool.query(sqlQuery,
                        [   item.ID,
                            item['Prix'],
                            item['capacite']? item['capacite'] : null ,
                            item['Arene'],
                            item.Nom,
                            item['Date de debut'],
                            item['Date de Fin']
                        ])
                    console.log(`Insertion réussie pour ${item.Nom}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }   
        }
        else{

            console.log("aucune données")
        } 
    },
    async  InsertEquipement() {
        const path = "./fichier_csv/initialequipement.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Equipement(Equipement_ID, Nom,Type_ID, Arene_ID ) values (? , ? , ? , ?)'
                    await pool.query(sqlQuery,
                        [   item.ID,
                            item.Nom,
                            item['Type'],
                            item['ID Arene']
                        ])
                    console.log(`Insertion réussie pour ${item.Nom}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }   
        }
        else{

            console.log("aucune données")
        } 
    },
    async  InsertDresseur() {
        const path = "./fichier_csv/initialdresseur.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Dresseur(Dresseur_ID, Nom, prenom ,Date_inscription, Est_professeur,Genre) values (? , ? , ? , ?  , ? , ? )'
                    await pool.query(sqlQuery,
                        [   item.ID,
                            item['Nom'],
                            item['Prenom'],
                            item['Date_inscription']?item['Date_inscription'] : null,
                            item['Est Professeur'] == "Oui"? true: false,
                            // item['ID Professeur']? item['ID Professeur'] : null,
                            item['Genre']
                        ])
                    console.log(`Insertion réussie pour ${item.Nom}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }   
        }
        else{

            console.log("aucune données")
        } 
    },
    async  InsertMonster() {
        const path = "./fichier_csv/initialmonster.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Monster(Monster_ID, Nom, Point_Experience ,Points_de_vie ,Type_ID , Espece_ID , Poids , Taille , Points_de_puissance,Niveau , Capturee , Date_Capture , Dresseur_ID) values (? , ? , ? , ?  , ? , ? , ?, ? , ? , ? , ? , ? , ? )'
                    await pool.query(sqlQuery,
                        [   item.ID,
                            item['Nom'],
                            item['Point Experience'],
                            item['Point de vie'],
                            item['Type'],
                            item['Espece'],
                            item['Poids'],
                            item['Taille'],
                            item['Points de puissance'],
                            item['Niveau'],
                            item['Capturee']=="Oui"? true: false,
                            item['Date de capture']? item['Date de capture'] : null,
                            item['ID Dresseur']? item['ID Dresseur'] : null                      
                        ])
                    console.log(`Insertion réussie pour ${item.Nom}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }   
        }
        else{

            console.log("aucune données")
        } 
    },
    async  InsertVente() {
        const path = "./fichier_csv/initialVente.csv"
        Results = await parserCSV(path)
        // console.log(Results)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Vente(Vente_ID, Numero_vente, Date ,Monster_ID, Dresseur_ID,Magasin_ID , Prix) values (? , ? , ? , ?  , ? , ? , ?)'
                    item['Numero de vente'] = generateRandomSalesNumber()
                    // console.log(item)
                    await pool.query(sqlQuery,
                        [   item.ID,
                            item['Numero de vente'],
                            item['Date de vente'],
                            item['monster ID'],
                            item['Dresseur ID'],
                            item['magasin ID'] ,
                            item['Prix']
                        ])
                    console.log(`Insertion réussie pour ${item.ID}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item.Nom}: ${error.message}`);
                }
            }   
        }
        else{

            console.log("aucune données")
        } 
    },
    async  InsertCombat() {
        const path = "./fichier_csv/initialcombat.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Combat( Combat_ID , Date , Evenement_ID ,Point_Gagnee ) values ( ? , ? , ? , ?)'
                    await pool.query(sqlQuery,
                        [   item['Combat ID'],
                            item['Date'],
                            item['Evenement ID']?item['Evenement ID']:null,
                            item['Point a gagner']
                        ])
                    console.log(`Insertion réussie pour ${item['Quete ID']}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item['Quete ID']}: ${error.message}`);
                }
            }
        }  
        else{

            console.log("aucune données")
        } 
    },
    async  InsertQuete() {
        const path = "./fichier_csv/initialquete.csv"
        Results = await parserCSV(path)
        console.log(Results)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into Quete( Quete_ID , Points_experience , Debut ,Fin , Localisation_ID ,Nom_de_la_Quete ) values (? , ? , ? , ?, ? , ?)'
                    await pool.query(sqlQuery,
                        [   item['ID'],
                            item['Point expérience gagné'],
                            item['Début'],
                            item['Fin']?item['Fin']:null,
                            item['Localisation'],
                            item['Nom de la Quête']
                        ])
                    console.log(`Insertion réussie pour ${item['ID']}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item['ID']}: ${error.message}`);
                }
            }
        }  
        else{

            console.log("aucune données")
        } 
    },
    async  InsertCombatMonster() {
        const path = "./fichier_csv/initialCombatMonstre.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into combat_monster( Combat_ID ,Monster_1_ID, Monster_2_ID , Gagner) values (? , ? , ? , ?)'
                    await pool.query(sqlQuery,
                        [   item['Combat ID'],
                            item['Monster 1 ID'],
                            item['Monster 2 ID'],
                            item['Gagner']=="Oui"? true: false
                        ])
                    console.log(`Insertion réussie pour ${item['Combat ID']}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item['Combat ID']}: ${error.message}`);
                }
            }
        }   
        else{

            console.log("aucune données")
        } 
    },
    async  InsertQueteMonster() {
        const path = "./fichier_csv/initialQueteMonstre.csv"
        Results = await parserCSV(path)
        if(Results){
            for (const item of Results) {
                try {
                    sqlQuery = 'insert into quete_monster( Monster_ID , Quete_ID , Acompli) values (? , ? , ?)'
                    await pool.query(sqlQuery,
                        [   item['Monster ID'],
                            item['Quete ID'],
                            item['acompli']=="Oui"?true : false
                        ])
                    console.log(`Insertion réussie pour ${item['Quete ID']}`);
                } catch(error) {
                console.error(`Erreur lors de l'insertion pour ${item['Quete ID']}: ${error.message}`);
                }
            }
        }  
        else{

            console.log("aucune données")
        } 
    },
}
