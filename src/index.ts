import express, {Request, Response} from 'express';
import * as sqlite3 from 'sqlite3';
import * as msnodesqlv8 from 'msnodesqlv8';
import fs from 'fs';

const app = express();
const port = 8081;

interface SQLiteRow { //necessary interface to get records from the database
    id: number,
    product_name: string,
    category_name: string,
    price: number,
    quantity: number
}

const connect_to_sqlite = (): sqlite3.Database => { //the function to connect to the SQLite database
    const db = new sqlite3.Database('./src/db/sqlite/database.db',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        else
        {
            console.log('Connected to the SQLite database.');
        }
    });
    return db;
}

const mssql_connectionString = "Driver={SQL Server Native Client 11.0};Server=(localdb)\\MSSQLLocalDB;Database=sqlite_database;Trusted_Connection=Yes;"; //connecting string for MSSQL database
const mssql_queries = [
    'SELECT * from database_example', //select ALL products
    'SELECT * from database_example where id = ?' //select ONE product with a particular ID
]

const sqlite_queries = [
    'SELECT * from database', //select ALL products
    'SELECT * from database where id = ?' //select ONE product with a particular ID
]

app.get('/', (req: Request, res: Response) => { //index page
    fs.readFile('./src/html/index.html', 'utf8', (err, data) => { //reads the index.html source code in src/html folder and sends it to the client
        if (err) {
            console.error(err);
        }
        else
        {
            res.send(data);
        }
    })
})

app.get('/helo', (req: Request, res: Response) => {
    fs.readFile('./src/html/helo.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        }
        else
        {
            res.send(data);
        }
    })
})

app.get('/sqlite', (req: Request, res: Response) => { //gets the SQLite (backup data)
    const db = connect_to_sqlite();
    db.serialize(() => {
        db.all(sqlite_queries[0], (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            else
            {
                res.send(rows);
            }
        })
    })
})

app.get('/sqlite/id=:id', (req: Request, res: Response) => { 
    const {id} = req.params;
    const db = connect_to_sqlite();
    db.serialize(() => {
        db.all(sqlite_queries[1], [parseInt(id)], (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            else
            {
                res.send(rows);
            }
        })
    })
})

app.get('/mssql', (req: Request, res: Response) => { //gets the MSSQL (main data)
    msnodesqlv8.query(mssql_connectionString, mssql_queries[0], (err, rows) => {
        if (err) {
            console.error(err);
        }
        else
        {
            res.send(rows);
        }
    })
})

app.get('/mssql/id=:id', (req: Request, res: Response) => {
    const {id} = req.params;
    msnodesqlv8.query(mssql_connectionString, mssql_queries[1], [parseInt(id)], (err, rows) => {
        if (err) {
            console.error(err);
        }
        else
        {
            res.send(rows);
        }
    })
})

app.post('/transfer', async (req: Request, res: Response) => { //performs the transfer from backup database to main database
    let didTransfer:boolean = false;
    try
    {
        const sqlite_db = connect_to_sqlite();
        const sqlite_data: SQLiteRow[] = await new Promise((resolve, reject) => {
            sqlite_db.all(sqlite_queries[0], (err, rows) => {
                if (err) {
                    reject(err);
                }
                else
                {
                    resolve(rows as SQLiteRow[]);
                }
            })
        })
    
        for (const row of sqlite_data)
        {
            msnodesqlv8.query(mssql_connectionString, `INSERT INTO database_example (product_name, category_name, price, quantity) VALUES (?, ?, ?, ?)`, [row.product_name, row.category_name, row.price, row.quantity], (err, rows) => {
                if (err) {
                    console.error(err);
                }
            })
        }
        didTransfer = true;
        sqlite_db.close();
    }
    catch (err)
    {
        console.error(err);
    }
    finally
    {
        if(didTransfer === true)
        {
            res.send("You've successfully transferred the datas to MSSQL database");
        }
        else
        {
            res.send("The transfer was unsuccessful");
        }
    }
})

app.listen(port, () => {
    console.log(`Server is listening the port ${port}`);
})