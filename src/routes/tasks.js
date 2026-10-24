const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const router = express.Router();
const prisma = new PrismaClient();

// Todas as rotas de tasks requerem autenticação
router.use(authenticateToken);

// GET /tasks
router.get('/', async (req, res) => {
  const tasks = await prisma.task.findMany({ where: { userId: req.user.id } });
  res.json(tasks);
});

// GET /tasks/:id
router.get('/:id', async (req, res) => {
  const task = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id },
  });
  if (!task) return res.status(404).json({ error: 'Tarefa não encontrada' });
  res.json(task);
});

// POST /tasks
router.post('/', async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'title é obrigatório' });

  const task = await prisma.task.create({
    data: { title, description, userId: req.user.id },
  });
  res.status(201).json(task);
});

// PUT /tasks/:id
router.put('/:id', async (req, res) => {
  const { title, description, done } = req.body;

  const existing = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ error: 'Tarefa não encontrada' });

  const task = await prisma.task.update({
    where: { id: Number(req.params.id) },
    data: { title, description, done },
  });
  res.json(task);
});

// DELETE /tasks/:id
router.delete('/:id', async (req, res) => {
  const existing = await prisma.task.findFirst({
    where: { id: Number(req.params.id), userId: req.user.id },
  });
  if (!existing) return res.status(404).json({ error: 'Tarefa não encontrada' });

  await prisma.task.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

module.exports = router;
