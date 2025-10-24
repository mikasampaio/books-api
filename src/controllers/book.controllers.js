import { ZodError } from "zod";
import { createBookSchema, updateBookSchema } from "../schemas/book.schemas.js";
import bookService from "../services/book.services.js";

const create = async (req, res) => {
  try {
    const newBook = req.body;

    createBookSchema.parse(newBook);

    const createdBook = await bookService.create(newBook);

    res.status(201).send(createdBook);
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .send(error.issues.map((e) => e.message).join(", "));
    }

    res.status(400).send(error.message);
  }
};

const get = async (req, res) => {
  try {
    const books = await bookService.get();
    res.status(200).send(books);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const books = await bookService.getById(id);
    res.status(200).send(books);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

const update = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;

    updateBookSchema.parse({ ...data });

    const updateBook = await bookService.update(id, data);
    res.status(200).send(updateBook);
  } catch (error) {
    if (error instanceof ZodError) {
      return res
        .status(400)
        .send(error.issues.map((e) => e.message).join(", "));
    }
    res.status(400).send(error.message);
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await bookService.delete(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default { create, get, getById, update, delete: deleteBook };
