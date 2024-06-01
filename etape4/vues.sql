-- Pagination example for Combat list
SELECT * FROM Combat
ORDER BY Combat_ID
LIMIT 10 OFFSET 0;

--Creating a View for Query 6
CREATE VIEW StatistiqueMonsterQuete AS
SELECT
    Monster.Nom,
    IFNULL(Quete.Nom_de_la_Quete, 'Aucune quête') AS Nom_de_la_Quete,
    IFNULL(quete_monster.Date, 'Pas de date') AS Date_Quete
FROM
    Monster
LEFT JOIN
    quete_monster ON Monster.Monster_ID = quete_monster.Monster_ID
LEFT JOIN
    Quete ON quete_monster.Quete_ID = Quete.Quete_ID;

--Creating a View for Query 7
CREATE VIEW StatistiqueEvenement AS
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
GROUP BY ev.Nom;
-----------------------------NOTE : FAUT LESW CREER DANS LA DB POUR POUOIR LES APPELER DANS LE MAIN-------------------------------------------
--proc 1
DELIMITER //
CREATE PROCEDURE MonsterType(IN TypeNom VARCHAR(255))
BEGIN
    SELECT * FROM Monster
    JOIN TypePower ON Monster.Type_ID = TypePower.Type_ID
    WHERE TypePower.Nom = TypeNom;
END //
DELIMITER ;

--proc 2
DELIMITER //
CREATE PROCEDURE MiseAJourMonster(IN MonsterID INT, IN PV INT, IN Niveau INT, IN PointsPuissance INT, IN PointExp INT)
BEGIN
    UPDATE Monster
    SET Points_de_vie = PV, Niveau = Niveau, Points_de_puissance = PointsPuissance, Point_Experience = PointExp
    WHERE Monster_ID = MonsterID;

    SELECT * FROM Monster WHERE Monster_ID = MonsterID;
END //
DELIMITER ;

-----------------------------------------------------------BONUS------------------------------------------------------------------------------------------
--Obtenir les Adresses Distinctes
SELECT DISTINCT Adresse FROM Localisation;

-- Insérez à nouveau les trois derniers équipements
INSERT INTO Equipement (Nom, Type_ID, Arene_ID)
SELECT Nom, Type_ID, Arene_ID
FROM (
    SELECT Nom, Type_ID, Arene_ID
    FROM Equipement
    ORDER BY Equipement_ID DESC
    LIMIT 3
) AS derniersEquipements;