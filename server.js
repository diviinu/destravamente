const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname)); // serve arquivos HTML/CSS/JS

app.post('/guardar', (req, res) => {
  const { nombre, email, telefono } = req.body;
  const linea = `Nombre: ${nombre} | Email: ${email} | Teléfono: ${telefono}\n`;
  const filePath = path.join(__dirname, 'leads.txt');

  fs.appendFile(filePath, linea, err => {
    if (err) {
      console.error('Error al guardar los datos:', err);
      return res.status(500).send('Error interno');
    }
    res.sendStatus(200);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
