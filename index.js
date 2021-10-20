require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");
var mensagem = "";
const Personagem = require("./models/personagem");
const Casa = require("./models/casa");
const Elenco = require("./models/elenco");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const personagens = await Personagem.findAll();
  const casas = await Casa.findAll();
  const elenco = await Elenco.findAll();
  setTimeout(() => {
    mensagem = "";
  }, 1000);
  res.render("index", {
    personagens,
    casas,
    elenco,
    mensagem: 'Bem vindo ao Catálogo Game of Thrones',
  });
});

app.get("/criar", (req, res) => {
  res.render("criar",{
    mensagem: 'Bem vindo ao Catálogo Game of Thrones',
  });
});
app.post("/criar", async (req, res) => {
  const { nome, casa, qtd_temporadas, imagem } = req.body;
  const personagem = await Personagem.create({
    nome,
    casa,
    qtd_temporadas,
    imagem,
  });
    res.render("criar", {
      personagem,
      mensagem: "Criado com sussesso!",
    });
});

app.get("/criarCasa", (req, res) => {
  res.render("criarCasa",{
    mensagem: 'Bem vindo ao Catálogo Game of Thrones',
  });
});
app.post("/criarCasa", async (req, res) => {
  const { nome, brasao, descricao} = req.body;
  const casa = await Casa.create({
    nome,
    brasao,
    descricao,
  });

  res.render("criarCasa", {
    casa,
    mensagem: "Criado com sussesso!",
  });
});

app.get("/criarElenco", (req, res) => {
  res.render("criarElenco",{
    mensagem: 'Bem vindo ao Catálogo Game of Thrones',
  });
});

app.post("/criarElenco", async (req, res) => {
  const { nome, funcao, nacionalidade, imagem} = req.body;
  const elenco = await Elenco.create({
    nome,
    funcao,
    nacionalidade,
    imagem,
  });

  res.render("criarElenco", {
    elenco,
    mensagem: "Criado com sussesso!",
  });
});

app.get("/detalhes/:id", async (req, res) => {
  const personagem = await Personagem.findByPk(req.params.id);

  res.render("detalhes", {
    personagem,
    mensagem: 'Bem vindo ao Catálogo Game of Thrones',
  });
});

app.get("/detalhesCasa/:id", async (req, res) => {
  const casa = await Casa.findByPk(req.params.id);

  res.render("detalhesCasa", {
    casa,
    mensagem: 'Bem vindo ao Catálogo Game of Thrones',
  });
});

app.get("/detalhesElenco/:id", async (req, res) => {
  const elenco = await Elenco.findByPk(req.params.id);

  res.render("detalhesElenco", {
    elenco,
    mensagem: 'Bem vindo ao Catálogo Game of Thrones',
  });
});

app.get("/editar/:id", async (req, res) => {
  const personagem = await Personagem.findByPk(req.params.id);
  if (!personagem) {
    res.render("editar", {
      mensagem: "Personagem não encontrado!",
    });
  }
  res.render("editar", {
    personagem,
    mensagem: "Editar Personagem!",
  });
});

app.post("/editar/:id", async (req, res) => {
  const personagem = await Personagem.findByPk(req.params.id);
  const { nome, casa, imagem } = req.body;

  personagem.nome = nome;
  personagem.casa = casa;
  personagem.imagem = imagem;

  const personagemEditado = await personagem.save();

  res.render("editar", {
    personagem: personagemEditado,
    mensagem: "Editado com sussesso!",
  });
});

app.get("/editarCasa/:id", async (req, res) => {
  const casa = await Casa.findByPk(req.params.id);

  if (!casa) {
    res.render("editarCasa", {
      mensagem: "Casa não encontrada!",
    });
  }

  res.render("editarCasa", {
    casa,
    mensagem: "Editar Casa!",
  });
});
app.post("/editarCasa/:id", async (req, res) => {
  const casa = await Casa.findByPk(req.params.id);
  const { nome, brasao, descricao } = req.body;

  casa.nome = nome;
  casa.brasao = brasao;
  casa.descricao = descricao;

  const casaEditado = await casa.save();

  res.render("editarCasa", {
    casa: casaEditado,
    mensagem: "Editado com sussesso!",
  });
});

app.get("/editarElenco/:id", async (req, res) => {
  const elenco = await Elenco.findByPk(req.params.id);

  if (!elenco) {
    res.render("editarElenco", {
      mensagem: "Componente não encontrado!",
    });
  }
  res.render("editarElenco", {
    elenco,
    mensagem: "Editar Elenco!",
  });
});

app.post("/editarElenco/:id", async (req, res) => {
  const elenco = await Elenco.findByPk(req.params.id);
  const { nome, funcao, nacionalidade, imagem } = req.body;

  elenco.nome = nome;
  elenco.funcao = funcao;
  elenco.nacionalidade = nacionalidade;
  elenco.imagem = imagem;

  const elencoEditado = await elenco.save();

  res.render("editarElenco", {
    elenco: elencoEditado,
    mensagem: "Editado com sussesso!",
  });
});

app.get("/deletar/:id", async (req, res) => {
  const personagem = await Personagem.findByPk(req.params.id);
  if (!personagem) {
    res.render("deletar", {
      mensagem: "Personagem não encontrado!",
    });
  }
  res.render("deletar", {
    personagem,
  });
});

app.post("/deletar/:id", async (req, res) => {
  const personagem = await Personagem.findByPk(req.params.id);

  if (!personagem) {
    res.render("deletar", {
      mensagem: "Personagem não encontrado!",
    });
  }
  await personagem.destroy();
  res.render("criar", {
    personagem,
    mensagem: `Personagem ${personagem.nome} deletado com sucesso!`,
  });
});

app.get("/deletarCasa/:id", async (req, res) => {
  const casa = await Casa.findByPk(req.params.id);
  if (!casa) {
    res.render("deletarCasa", {
      mensagem: "Casa não encontrada!",
    });
  }
  res.render("deletarCasa", {
    casa,
  });
});

app.post("/deletarCasa/:id", async (req, res) => {
  const casa = await Casa.findByPk(req.params.id);
  if (!casa) {
    res.render("deletarCasa", {
      mensagem: "Casa não encontrada!",
    });
  }
  await casa.destroy();
  res.render("criarCasa", {
    casa,
    mensagem: `Casa ${casa.nome} deletado com sucesso!`,
  });
});

app.get("/deletarElenco/:id", async (req, res) => {
  const elenco = await Elenco.findByPk(req.params.id);

  if (!elenco) {
    res.render("deletarElenco", {
      mensagem: "Componente não encontrado!",
    });
  }

  res.render("deletarElenco", {
    elenco,
  });
});

app.post("/deletarElenco/:id", async (req, res) => {
  const elenco = await Elenco.findByPk(req.params.id);
  if (!elenco) {
    res.render("criarElenco", {
      mensagem: "Componente não encontrado!",
    });
  }
  await elenco.destroy();
  res.render("criarElenco", {
    mensagem: `Componente ${elenco.nome} deletado com sucesso!`,
  });
});

app.get("/quemSomos", function (req, res) {
  res.render("quemSomos");
});

app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));