class SQLiteSingleton {
    constructor(databasePath) {
      if (!SQLiteSingleton.instance) {
        const sqlite3 = require('sqlite3').verbose();
        this.db = new sqlite3.Database(databasePath, (err) => {
          if (err) {
            console.error("Could not connect to database", err);
          } else {
            console.log("Connected to database");
            // Enable foreign key support
            this.db.run('PRAGMA foreign_keys = ON;', (err) => {
              if (err) {
                console.error("Error enabling foreign keys:", err);
              } else {
                console.log("Foreign keys enabled");
              }
            });
          }
        });
        SQLiteSingleton.instance = this;
      }
      return SQLiteSingleton.instance;
    }
  
    // SELECT query
    select(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.all(sql, params, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  
    // INSERT query
    insert(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.run(sql, params, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.lastID);
          }
        });
      });
    }
  
    // DELETE query
    delete(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.run(sql, params, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        });
      });
    }
  
    // UPDATE query
    update(sql, params = []) {
      return new Promise((resolve, reject) => {
        this.db.run(sql, params, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve(this.changes);
          }
        });
      });
    }
  }
  
  module.exports = SQLiteSingleton;