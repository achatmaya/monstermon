const insertDataQuery = require('./insertDataQuery')

async function insertData (){
    await insertDataQuery.InsertDataEspece();
    await insertDataQuery.InsertLocalisation();
    await insertDataQuery.InsertTypePower();
    await insertDataQuery.InsertMagasin();
    await insertDataQuery.InsertArene();
    await insertDataQuery.InsertEvenement()
    await insertDataQuery.InsertEquipement()
    await insertDataQuery.InsertDresseur() // update table to insert id professeur
    await insertDataQuery.InsertMonster()
    await insertDataQuery.InsertVente()
    await insertDataQuery.InsertQuete()
    await insertDataQuery.InsertCombat()
    await insertDataQuery.InsertCombatMonster()
    await insertDataQuery.InsertQueteMonster()
}

module.exports = insertData;
