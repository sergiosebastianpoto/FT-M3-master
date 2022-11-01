// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
let nextId = 1;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }
  const newPost = {
    id: nextId,
    author,
    title,
    contents,
  };
  posts.push(newPost);
  nextId++;
  res.json(newPost);
});

server.post("/posts/author/:author", (req, res) => {
  const { title, contents } = req.body;
  const { author } = req.params;
  if (!author || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No se recibieron los parámetros necesarios para crear el Post",
    });
  }
  const newPost = {
    id: nextId,
    author,
    title,
    contents,
  };
  posts.push(newPost);
  nextId++;
  res.json(newPost);
});

server.get("/posts", (req, res) => {
  const { term } = req.query;
  if (term) {
    const filtrados = posts.filter(
      (p) => p.title.includes(term) || p.contents.includes(term)
    );
    return res.json(filtrados);
  }
  res.json(posts);
});

server.get("/posts/:author", (req, res) => {
  const { author } = req.params;
  const filtrados = posts.filter((p) => p.author === author);
  if (filtrados.length === 0) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe ningun post del autor indicado" });
  }
  res.json(filtrados);
});

server.get("/posts/:author/:title", (req, res) => {
  const { author, title } = req.params;
  const filtrados = posts.filter(
    (p) => p.author === author && p.title === title
  );
  if (filtrados.length === 0) {
    return res.status(STATUS_USER_ERROR).json({
      error: "No existe ningun post con dicho titulo y autor indicado",
    });
  }
  res.json(filtrados);
});

server.put("/posts", (req, res) => {
  const { id, title, contents } = req.body;
  if (!id || !title || !contents) {
    return res.status(STATUS_USER_ERROR).json({
      error:
        "No se recibieron los parámetros necesarios para modificar el Post",
    });
  }
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se encontro el post con ese Id" });
  }
  post.title = title;
  post.contents = contents;
  res.json(post);
});

server.delete("/posts", (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(STATUS_USER_ERROR).json({ error: "No se mando el Id" });
  }
  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se encontro el post con ese Id" });
  }
  posts = posts.filter((p) => p.id !== id);
  res.json({ success: true });
});

server.delete("/author", (req, res) => {
  const { author } = req.body;
  if (!author) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No se mando el Author" });
  }
  const postAuthor = posts.filter((p) => p.author === author);
  if (!postAuthor.length) {
    return res
      .status(STATUS_USER_ERROR)
      .json({ error: "No existe el autor indicado" });
  }
  posts = posts.filter((p) => p.author !== author);
  res.json(postAuthor);
});

module.exports = { posts, server };
