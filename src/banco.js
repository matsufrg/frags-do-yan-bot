const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ posts: [], user: {}, count: 0 })
    .write()

// Increment count
db.update('count', n => n + 1)
    .write()

// Add a post
const count = db.get('count')
    .write()

    console.log(count);