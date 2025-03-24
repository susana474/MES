// Backend básico para MES - Node.js + Express + MongoDB
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
mongoose.connect('mongodb+srv://susanalujan474:8DVyJy3AtEdHPTjI@cluster0.s7bkf.mongodb.net/mesdb?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

// Esquemas
const Variable = mongoose.model('Variable', new mongoose.Schema({
  nombre: String,
  valor: String,
  marca: String
}));

const Pedido = mongoose.model('Pedido', new mongoose.Schema({
  producto: String,
  cantidad: Number,
  fecha: { type: Date, default: Date.now }
}));

// Rutas
app.get('/api/variables', async (req, res) => {
  const variables = await Variable.find();
  res.json(variables);
});

app.post('/api/variables', async (req, res) => {
  const variable = new Variable(req.body);
  await variable.save();
  res.json({ mensaje: 'Variable guardada' });
});

app.post('/api/pedidos', async (req, res) => {
  const pedido = new Pedido(req.body);
  await pedido.save();
  res.json({ mensaje: 'Pedido recibido' });
});

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
