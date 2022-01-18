import sqlite3 from 'sqlite3'

const dbName = process.env['DB_NAME'] || 'server/db/videos.db'

export const getTable = table => {
    const db = new sqlite3.Database(dbName)

    let ret = []

    db.serialize(() => {
        // db.run("CREATE TABLE IF NOT EXISTS videos ( title varchar(128) );")
        // db.run("INSERT INTO videos VALUES ('Hello World');")
        db.all("SELECT * FROM videos;", (err, res) => {
            res.forEach((val) => ret.push(val))
        })
    })

    db.close()
    return ret
}

export const addToTable = (table, tableSpec, element) => {
    const db = new sqlite3.Database(dbName)

    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS ${table} (${tableSpec.join()});`)
        db.run(`INSERT INTO ${table} VALUES (${element.join()});`)
    })

    db.close()
}

addToTable('videos', ['title varchar(128)'], ["'hello world'"])
console.log(getTable('videos'))