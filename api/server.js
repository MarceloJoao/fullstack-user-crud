import express from 'express'
import { PrismaClient } from './generated/prisma/index.js'
import cors from 'cors';

//iniciar o Prisma Client para interagir com o banco de dados
const prisma = new PrismaClient()
const app = express()

//analisar o corpo das requisições
app.use(express.json())

//permitir que o front se conecte ao back
app.use(cors())

// Criar usuário
app.post('/usuarios', async (req, res) => {
   //tenta criar um novo usuário no MongoDB usando o prisma 
  try {
    const user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      }
    })
    //deu certo
    res.status(201).json(user)
  } catch (error) {
    //aviso de erro
    console.error(error)
    res.status(500).json({ error: "Erro ao criar usuário" })
  }
})

// Listar usuários
app.get('/usuarios', async (req, res) => {
  try {
    //buscar todos os usuários cadastrados
    const users = await prisma.user.findMany()
    //deu certo
    res.status(200).json(users)
  } catch (error) {
    //aviso de erro
    console.error(error)
    res.status(500).json({ error: "Erro ao buscar usuários" })
  }
})

// update 
app.put('/usuarios/:id', async (req, res) => {
  try {
    //Localiza o usuário pelo ID vindo do parâmetro da URL
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
      }
    })
    res.status(201).json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Erro ao editar o usuario" })
  }
})

app.delete('/usuarios/:id', async (req, res) => {
  //Localiza o usuário pelo ID vindo do parâmetro da URL
   try {
    await prisma.user.delete({
    where: {
      id: req.params.id,
    }
  })
   } catch (error) {
    res.status(200).json({ message: "Usuário deletado com sucesso" })
   }
})
app.listen(3000, () => {
  console.log("🚀 Servidor rodando na porta 3000")
})
