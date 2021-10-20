const Sequelize = require("sequelize");
const database = require("../database");

const Personagem = database.define("personagens", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  casa: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  qtd_temporadas: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
},
{
  freezeTableName: true,
  timestamps: false, 
  createdAt: false,
  updatedAt: false,
});

module.exports = Personagem;