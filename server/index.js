const express = require('express')
const cors = require('cors')
const {Pool} = require('pg');

const app = express();
app.use(cors());
app.use(express.json());//reading posted values from theclient as JSON.
app.use(express.urlencoded({extended: false}))

const port = 3001

/*app.get("/",(req,res) => {
    res.status(200).json({result:'success'})
});*/

app.get("/",(req,res) => {
    const pool = openDb()

    pool.query('SELECT * FROM task' , (error, result) => {
        if (error){
            res.status(500).json({error:error.message})
        }
        res.status(200).json(result.rows)
    })
});

const openDb = () => {
    const pool = new Pool ({
        user: 'postgres',
        host: 'localhost',
        database: 'todo',
        password: '1_oamkekataumagak',
        port: 5432
    })
    return pool
}

//Implement a post handler, which is used to receive value(s) from the client and execute insert into statement into the database. SQL contains some parameters ($1) which are provided as an array when calling the query method. 

app.post("/new",(req,res) => {
    const pool = openDb()

    pool.query('insert into task (description) values ($1) returning *',
    [req.body.description],
    (error,result) => {
        if (error) {
            res.status(500).json({error: error.message})
        }   else {
            res.status(200).json({id : result.rows[0].id})
        }
    })
})

//Implementing deletion functionality to the backend
app.delete("/delete/:id",async(req,res) => {
    const pool = openDb()
    const id = parseInt(req.params.id)
    pool.query('delete from task where id = $1',
    [id],
    (error,result) => {
        if(error) {
            res.status(500).json({error: error.message})
        } else {
            res.status(200).json({id:id})
        }
    })
})
app.listen(port)