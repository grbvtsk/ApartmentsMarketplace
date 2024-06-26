const db = require("./dbConnection")

const getAllApartments = (req,res)=>{
    const query = "SELECT * FROM apartament";
    db.query(query,(err,results)=>{
        if (err) {
            console.error("Error executing MySQL query", err);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.json(results);
    })
}

const getApartmentById = (req,res)=>{
    const query = 'SELECT * FROM apartament WHERE id = ?';
    db.query(query, [req.params.id], (error, results) => {
        if (error) {
            console.error("Error executing query:", error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
}

const postApartment = (req,res)=>{
    const query = `INSERT INTO apartament(id,title,days,beds,rentPrice) VALUES ('${req.body.id}','${req.body.title}','${req.body.days}','${req.body.beds}','${req.body.rentPrice}')`
    db.query(query, (err) => {
        if (err) {
            console.error("Error executing MYSQL query:", err);
        }
    });
    res.json(req.body);
}

const deleteApartment = (req,res)=>{
    const query = `DELETE FROM apartament WHERE id = ${req.params.id}`;

    db.query(query,(err) => {
        if (err) {
            console.error("Error executing MYSQL query:", err);
            res.status(500).json({ error: 'Failed to delete apartament' });
            return;
        }
        res.json(req.params.id);
    });
}

const updateApartment = (req,res)=>{
    const query = `UPDATE apartament 
                   SET title = '${req.body.title}',
                       days = '${req.body.days}',
                       beds = '${req.body.beds}',
                       rentPrice = '${req.body.rentPrice}',
                       rentStatus = '${req.body.rentStatus}'
                   WHERE id = ${req.params.id}`;
    db.query(query, (err) => {
        if (err) {
            console.error("Error executing MYSQL query:", err);
            res.status(500).json({ error: "An error occurred while updating the apartment." });
            return;
        }
        res.json(req.body);
    });
}
module.exports = {getAllApartments,postApartment,deleteApartment,
    updateApartment,getApartmentById};