const fs = require("fs");
const csvParser = require("csv-parser");

function ParseCsv(path , separator = ';') 
    { return new Promise((resolve, reject)=>{
    const results = [];
    const ReturnResult = [];
    fs.createReadStream(path)
    .pipe(csvParser({ separator }))
    .on("data", (data) => {
        data?results.push(data): results.push(null);
    })
    .on("end", () => {
        resolve(results);
    })
    .on("error", (error) => {
        reject(error);
    });
    })
}

module.exports = ParseCsv
