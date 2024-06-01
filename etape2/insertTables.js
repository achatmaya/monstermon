const insertTables = require('./tablesQueries')

async function insert (){

    await insertTables.CreateEspece()
    await insertTables.CreateLocation()
    await insertTables.CreateTypePower()
    await insertTables.CreateMagazin()
    await insertTables.CreateArene()
    await insertTables.CreateEvenement()
    await insertTables.CreateEquipement()
    await insertTables.CreateDresseur()
    await insertTables.CreateMonster()
    await insertTables.CreateVente()
    await insertTables.CreateQuete()
    await insertTables.createCombat()
    await insertTables.createCombatMonster()
    await insertTables.CreateQueteMonster()
    
}
module.exports = insert;
