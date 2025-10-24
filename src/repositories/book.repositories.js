import db from "../database/index.js";

// Cria a tabela de livros se ela não existir
db.run(`CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY UNIQUE,
    titulo TEXT NOT NULL,
    num_paginas INTEGER NOT NULL,
    isbn TEXT NOT NULL,
    editora TEXT NOT NULL
    )
`);

const get = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM books`, [], (error, rows) => {
      if (error) reject(error);
      else resolve(rows);
    });
  });
};

const getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM books WHERE id = ?`, [id], (error, row) => {
      if (error) reject(error);
      else resolve(row);
    });
  });
};

const create = (book) => {
  return new Promise((resolve, reject) => {
    const { id, titulo, num_paginas, isbn, editora } = book;
    db.run(
      `INSERT INTO books (id, titulo, num_paginas, isbn, editora) VALUES (?, ?, ?, ?, ?)`,
      [id, titulo, num_paginas, isbn, editora],
      (error) => {
        if (error) reject(error);
        else resolve({ ...book });
      }
    );
  });
};

const update = (id, book) => {
  return new Promise((resolve, reject) => {
    const fields = ["titulo", "num_paginas", "isbn", "editora"];
    let query = "UPDATE books SET";
    const values = [];

    fields.forEach((field) => {
      if (book[field] !== undefined) {
        query += ` ${field} = ?,`;
        values.push(book[field]);
      }
    });

    query = query.slice(0, -1);

    query += " WHERE id = ?";
    values.push(id);

    db.run(query, values, (error) => {
      if (error) reject(error);
      else resolve({ mensagem: "Livro editado com sucesso" });
    });
  });
};

const deleteBook = (id) => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM books WHERE id = ?`, [id], function (error) {
      if (error) reject(error);
      else resolve({ mensagem: "Livro deletado com sucesso", id });
    });
  });
};

export default { get, getById, create, update, delete: deleteBook };
