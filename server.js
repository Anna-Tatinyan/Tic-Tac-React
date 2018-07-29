const express = require('express');

const app = express();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : "4DfehLz'fy",
  database : 'winners'
});

app.use(express.json());


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

connection.connect((err) => {
    if(err) throw(err);

    app.post('/', (req, res) => {
      const sqlInsert = `INSERT INTO winnersTable(id, currentTime, winnerCharacter) VALUES ('0','${req.body.formatedDate}', '${req.body.winner}')`;
      connection.query(sqlInsert, (err, result) => { //insert the winner into db table
          if (err) throw err;
        })
    })
    app.get('/', (req,res) => {

        const sqlSelect = "Select * from winnersTable";
        connection.query(sqlSelect, (err, result) => {
          if(err) throw (err);
          res.json(result)
        })
    })

})



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
