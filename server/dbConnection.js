const mysql = require("mysql")

const db = mysql.createConnection({
    host: "localhost",
    user: "dada",
    password: "585552015",
    database: "apartamentsmarket",
});
db.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database", err);
        return;
    }
    console.log("Successfully connected to MySQL database");
});

module.exports = db;