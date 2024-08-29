import express from 'express';
import { buscarUfPorId, buscarUfs, buscarUfsPorNome } from './service/servico.js';

const app = express();

// Rota para listar todas as UFs
app.get('/ufs', (req, res) => {
  const nomeUF = req.query.busca;
  const resultado = nomeUF ? buscarUfsPorNome(nomeUF) : buscarUfs();

  // Retorna a lista de UFs ou uma mensagem de erro
  if (resultado.length > 0) {
    res.json(resultado);
  } else {
    res.status(404).send({ erro: 'UF não encontrada' });
  }
});

// Rota para buscar uma UF pelo ID
app.get('/ufs/:id', (req, res) => {
  const uf = buscarUfPorId(req.params.id);

  // Retorna a UF ou uma mensagem de erro
  if (uf) {
    res.json(uf);
  } else if (isNaN(parseInt(req.params.id))) {
    res.status(400).send({ erro: 'Requisição inválida' });
  } else {
    res.status(404).send({ erro: 'UF não encontrada' });
  }
});

// Inicia o servidor
app.listen(8080, () => {
  console.log('Aplicação rodando na porta 8080');
});
