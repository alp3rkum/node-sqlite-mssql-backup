# node-sqlite-mssql-backup
 A small data backup/transfer demo on Node.js

This little demo consists of a small Node.js/Typescript example backend API that performs the function of transfering the backed-up datas to application's main database.

## What Does It Use?

This small demo makes use of these languages, frameworks and drivers:

- TypeScript
- SQLite (backup database) and SQLite3 driver for JavaScript (you need to install SQLite to your computer)
- MSSQL (main database) and MSNodeSQLV8 driver for JavaScript
- Express (backend framework)
- HTML (to give a very basic frontend to the API)
- fs module (to read and send HTML files to respective endpoints)

## Backend Architecture

The backend architecture has an index page that can perform various navigations and functions, thanks to a little HTML page (with no CSS styling) that was specifically made for it to include buttons to perform navigations and the transfer operation.

The datas from SQLite and MSSQL databases come as a JSON array in their respective endpoints (/sqlite and /mssql). You can also get a single record according to its id (/sqlite/id={id_value} or /mssql/id={id_value}).

The transfer function connects to the MSSQL database, fetches the results and then adds them to the SQLite database one by one.

## How To Create The Databases

For local testing, there are two files that can be used to create the example database. In the src/db/mssql file, there is an .sql (MS SQL) file that you can open and run in your MS SQL Server Management Studio. The SQLite database will be created via "Backup To SQLite" if it doesn't exist, and if it does, it will be truncated and the existing values in the MS SQL database will be added again (some sort of mimicking the event of backing up an updated database).