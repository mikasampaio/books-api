import bookRepository from "../repositories/book.repositories.js";

const create = async (data) => {
  if (data.id) {
    const book = await bookRepository.getById(data.id);

    if (book) throw new Error("Livro com o ID existente");
  }

  const response = await bookRepository.create(data);

  if (!response) throw new Error("Erro ao criar livro");

  return response;
};

const get = async () => {
  return await bookRepository.get();
};

const getById = async (id) => {
  const book = await bookRepository.getById(id);

  if (!book) throw new Error("Erro ao buscar livro");

  return book;
};

const update = async (id, data) => {
  if (!id) throw new Error("Informe o ID do livro");

  const book = await bookRepository.getById(id);

  if (!book) throw new Error("Livro não encontrado");

  const response = await bookRepository.update(id, data);

  return response;
};

const deleteBook = async (id) => {
  if (!id) throw new Error("Informe o ID do livro");

  const book = await bookRepository.getById(id);

  if (!book) throw new Error("Livro não encontrado");

  const response = await bookRepository.delete(id);

  return response;
};

export default { create, get, getById, update, delete: deleteBook };
