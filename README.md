<!-- Groupe d'achat_m 1012436 -->
Installation des dépendances
Pour installer les dépendances nécessaires, veuillez exécuter les commandes suivantes :

<!-- bash -->
Copy code
# npm install mysql
# npm install csv-parser
<!-- Configuration de la base de données -->
Dans le fichier database.js, veuillez ajouter vos configurations root et mot de passe.

<!-- etape1 -->
creation des tables suivantes 

localisation
espece
type_power
magazin
arene
equipement
quete
evenement
Dresseur
monster
vente
combat
combat_monster
quete_monster

<!-- Étape 2 -->
Dans le fichier main.js, vous trouverez les fonctions à exécuter : addTable, insertTable, et dropTables.

Chaque action a deux fichiers associés :

queries : Ce fichier contient des fonctions spécifiques pour chaque action si nécessaire.
executeQueries : Il permet d'appeler toutes les fonctions nécessaires dans un seul fichier.
Enfin, appelez la fonction executeQueries dans le fichier principal (main.js).

<!-- etap3 -->

select.txt ===>>> les selects que j'ai commencé par encore tester mais juste l'idée globale des select
