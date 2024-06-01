function generateRandomSalesNumber() {
    // Génère un nombre aléatoire entre 100000 et 999999
    const randomNumber = Math.floor(Math.random() * 90000000) + 10000000;
    // Convertit le nombre en chaîne de caractères

    return randomNumber;
}
module.exports = generateRandomSalesNumber
