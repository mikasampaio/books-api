import z from "zod";

const schema = z.object({
  id: z.number({
    error: "ID inválido",
  }),
  titulo: z.string({ error: "Título é obrigatório" }),
  num_paginas: z.number({
    error: "Número de páginas inválido",
  }),
  isbn: z.string({ error: "ISBN é obrigatório" }),
  editora: z.string({ error: "Editora é obrigatório" }),
});

export const createBookSchema = schema;
export const updateBookSchema = schema.partial();
