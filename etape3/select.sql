
-- 1. Obtenir la liste des monsters capturés classé par
-- la date de capture (Du plus récent au plus ancien)
select Nom , Date_Capture
from Monster
where Capturee = true
order by Date_Capture Desc;

+--------------+--------------+
| Nom          | Date_Capture |
+--------------+--------------+
| Sombrodeus   | 2023-09-11   |
| Phantasmagor | 2023-08-09   |
| Vortexar     | 2023-07-14   |
| Gorgonix     | 2023-06-28   |
| Nébulorok    | 2023-06-28   |
| Sylvarath    | 2023-03-29   |
| Infernion    | 2023-01-18   |
| Grizzlor     | 2022-12-14   |
| Glaciarax    | 2022-10-19   |
+--------------+--------------+
--2. Obtenir le nombre de monsters par type, vos deux
--  champs devront être nommé respectivement “Type” et “Nombre”

select t.Nom as Type , Count(mon.Monster_ID) as nombre
from Monster mon
inner join TypePower as t on t.Type_ID = mon.Type_ID
group by t.Nom;

| Type  | nombre |
+-------+--------+
| Air   |      6 |
| eau   |      2 |
| feu   |      6 |
| terre |      4 |

-- 3. Obtenir pour chaque monster, son dresseur en
--  affichant son nom et prénom dans le même champ nommé “dresseur” : 
--   si le monster n’est associé à aucun dresseur, 
-- vous devez afficher “aucun” dans ce même champ.

SELECT mon.Nom, 
       IFNULL(CONCAT(d.Nom, ' ', d.prenom), 'aucun') AS nom_prenom 
FROM Monster mon
LEFT JOIN Dresseur d ON d.Dresseur_ID = mon.Dresseur_ID;

+--------------+-----------------+
| Nom          | nom_prenom      |
+--------------+-----------------+
| Grizzlor     | Martinez Daniel |
| Azurika      | aucun           |
| Crépulor     | aucun           |
| Vortexar     | Johnson Olivia  |
| Gorgonix     | Smith Michael   |
| Zéphirium    | Nguyen Isabella |
| Krypthona    | Patel Harper    |
| Glaciarax    | Clark Mia       |
| Infernion    | Clark Mia       |
| Sylvarath    | Hall Charlotte  |
| Draconyx     | Anderson Ethan  |
| Abominix     | Johnson Olivia  |
| Hydrokhan    | aucun           |
| Sombrodeus   | Rodriguez Lucas |
| Nébulorok    | Rodriguez Lucas |
| Terramorth   | Rodriguez Lucas |
| Zombalith    | Williams James  |
| Phantasmagor | Brown Sophia    |
+--------------+-----------------+

-- 4. Obtenir la liste des ventes : chaque vente doit mentionner le magasin
SELECT v.Numero_vente, ma.Nom as Magasin, mon.Nom as Monster,
       CONCAT(d.Nom, ' ', d.prenom) AS dresseur, v.Prix, v.Date
FROM Vente v
INNER JOIN Dresseur d ON d.Dresseur_ID = v.Dresseur_ID
INNER JOIN Monster mon ON mon.Monster_ID = v.Monster_ID
INNER JOIN Magasin ma ON ma.Magasin_ID = v.Magasin_ID
ORDER BY v.Date DESC;

+--------------+------------+------------+------------------------------+---------------------+
| Numero_vente | Nom        | Nom        | CONCAT(d.Nom, ' ', d.prenom) | Date                |
+--------------+------------+------------+------------------------------+---------------------+
|     34645990 | EcoMonster | Nébulorok  | Rodriguez Lucas              | 2023-10-30 00:00:00 |
|     65649700 | EcoMonster | Sombrodeus | Rodriguez Lucas              | 2023-10-05 00:00:00 |
|     42988094 | MoCouture  | Gorgonix   | Smith Michael                | 2023-05-01 00:00:00 |
|     58249912 | LumierMart | Grizzlor   | Martinez Daniel              | 2023-04-23 00:00:00 |
|     17867989 | MoCouture  | Infernion  | Clark Mia                    | 2023-02-04 00:00:00 |
|     55973000 | MoCouture  | Glaciarax  | Clark Mia                    | 2022-12-12 00:00:00 |
|     65930152 | LumierMart | Vortexar   | Johnson Olivia               | 2022-04-24 00:00:00 |
+--------------+------------+------------+------------------------------+---------------------+

-- 5. Calcul du chiffre d'affaires total par magasin
Select ma.Nom as MagasinName , Sum(v.Prix) as CA
from Magasin ma
inner join Vente v on v.Magasin_ID = ma.Magasin_ID
group by ma.Nom
order by CA Desc;

+-------------+--------+
| MagasinName | CA     |
+-------------+--------+
| EcoMonster  | 700.00 |
| MoCouture   | 663.00 |
| LumierMart  | 278.00 |
+-------------+--------+

-- 6. Liste des monstres ayant ou n'ayant pas effectué des quêtes, triée par date

SELECT
    Monster.Nom,
    IFNULL(Quete.Nom_de_la_Quete, 'Aucune quête') AS Nom_de_la_Quete,
    IFNULL(quete_monster.Date, 'Pas de date') AS Date_Quete
FROM
    Monster
LEFT JOIN
    quete_monster ON Monster.Monster_ID = quete_monster.Monster_ID
LEFT JOIN
    Quete ON quete_monster.Quete_ID = Quete.Quete_ID
ORDER BY
    IFNULL(quete_monster.Date, '9999-12-31') DESC;

-- 7. Liste de tous les événements avec le nombre de participants, arène, équipements et combats, triée par le nombre croissant de participants
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
GROUP BY ev.Nom
ORDER BY NbParticipants ASC;


+----------------------------------+----------------+----------+--------------+----------+
| NomEvent                         | NbParticipants | NomArene | NbEquipement | NbCombat |
+----------------------------------+----------------+----------+--------------+----------+
| Championnat Mondial des Monsters |              0 | Eclair   |            1 |        0 |
| dressrosa                        |              0 | Sun      |            1 |        0 |
| L'Arène des Titans               |              2 | Eclair   |            2 |        2 |
| L'Ultimatum des Airs             |              0 | Eclair   |            1 |        0 |
| La Bataille des Rois             |              2 | Terra    |            0 |        1 |
| La Grande Joute des Héros        |              0 | Helicops |            2 |        0 |
| La Guerre des Monsters           |              0 | Helicops |            2 |        0 |
| Le Carnage des Monsteurs de Feu  |              0 | Terra    |            0 |        0 |
| Le Choc des Éléments             |              0 | Eclair   |            1 |        0 |
| Le Duel des Titan                |              0 | Helicops |            2 |        0 |
| Tournoi du Poing d'Acier         |              0 | Eclair   |            2 |        2 |
+----------------------------------+----------------+----------+--------------+----------+

'

-- 8. Liste des monstres de type feu non capturés, niveau 2 à 5, avec plus de 400 points de vie, triée par points de vie croissants
SELECT
    Monster.Nom,
    Monster.Points_de_vie
FROM
    Monster
JOIN
    TypePower ON Monster.Type_ID = TypePower.Type_ID
WHERE
    TypePower.Nom = 'feu' AND
    Monster.Capturee = FALSE AND
    Monster.Niveau BETWEEN 2 AND 5 AND
    Monster.Points_de_vie > 400
ORDER BY
    Monster.Points_de_vie ASC;

-- 9. Liste des espèces ayant au moins 4 monstres
Select e.Nom , count( mon.Espece_ID)  as nbMonsters
From Espece as e
Inner join Monster mon on mon.Espece_ID = e.Espece_ID
Group by e.Nom
having count( mon.Espece_ID) >= 4;

+--------------+------------+
| Nom          | nbMonsters |
+--------------+------------+
| Pyrovolcanix |          4 |
+--------------+------------+

------------------------------------------------------------------------------------
-- Partie 2
-- 1. Sélectionner les 3 plus grands acheteurs parmi les dresseurs
SELECT
    Dresseur.Nom,
    Dresseur.prenom,
    SUM(Vente.Prix) AS TotalAchats
FROM
    Dresseur
JOIN
    Vente ON Dresseur.Dresseur_ID = Vente.Dresseur_ID
GROUP BY
    Dresseur.Dresseur_ID, Dresseur.Nom, Dresseur.prenom
ORDER BY
    TotalAchats DESC
LIMIT 3;

--  2. Top 3 des espèces de monstres les plus fréquentes dans les événements
SELECT
    Espece.Nom,
    COUNT(DISTINCT Evenement.Evenement_ID) AS NombreEvenements
FROM
    Monster
JOIN
    Espece ON Monster.Espece_ID = Espece.Espece_ID
JOIN
    combat_monster ON Monster.Monster_ID = combat_monster.Monster_1_ID OR Monster.Monster_ID = combat_monster.Monster_2_ID
JOIN
    Combat ON combat_monster.Combat_ID = Combat.Combat_ID
JOIN
    Evenement ON Combat.Evenement_ID = Evenement.Evenement_ID
GROUP BY
    Espece.Nom
ORDER BY
    NombreEvenements DESC
LIMIT 3;

-- 3. Prix moyen des monstres par leur niveau et type
SELECT
    Monster.Niveau,
    TypePower.Nom AS Type,
    AVG(Vente.Prix) AS PrixMoyen
FROM
    Monster
JOIN
    TypePower ON Monster.Type_ID = TypePower.Type_ID
JOIN
    Vente ON Monster.Monster_ID = Vente.Monster_ID
GROUP BY
    Monster.Niveau, TypePower.Nom
ORDER BY
    Monster.Niveau, TypePower.Nom;

-- 4. Dresseurs avec la plus grande variété d'espèces de monstres
SELECT
    Dresseur.Nom,
    Dresseur.prenom,
    COUNT(DISTINCT Monster.Espece_ID) AS VarieteEspeces
FROM
    Monster
JOIN
    Dresseur ON Monster.Dresseur_ID = Dresseur.Dresseur_ID
GROUP BY
    Dresseur.Dresseur_ID, Dresseur.Nom, Dresseur.prenom
ORDER BY
    VarieteEspeces DESC
LIMIT 3;

-- 5. Arènes organisant des événements avec le niveau moyen le plus élevé de monstres
SELECT
    Arene.Nom,
    AVG(Monster.Niveau) AS NiveauMoyen
FROM
    Arene
JOIN
    Evenement ON Arene.Arene_ID = Evenement.Arene_ID
JOIN
    Combat ON Evenement.Evenement_ID = Combat.Evenement_ID
JOIN
    combat_monster ON Combat.Combat_ID = combat_monster.Combat_ID
JOIN
    Monster ON combat_monster.Monster_1_ID = Monster.Monster_ID OR combat_monster.Monster_2_ID = Monster.Monster_ID
GROUP BY
    Arene.Nom
ORDER BY
    NiveauMoyen DESC
LIMIT 3;