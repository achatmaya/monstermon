const pool = require('./database')
module.exports = {
    async CreateDatabase(NameDB = "monstermon") {
        sql = `
        CREATE DATABASE  if not exists ${NameDB}`
        pool.query(sql, function (err, result) {
            if (err) throw err;
            console.log("DBcreated");

        });
        dataBaseISCreated = true
        pool.end()
    } ,
}
