import sqlite from "sqlite3";

const db = new sqlite.Database("library_db.sqlite", (err) => {
  if (err) return `Error connecting to DB: ${err}`;

  return "DB connected succesfully";
});

export default db;
