const express = require('express');
const cors = require('cors');

const workerRoutes = require('./routes/workers');
const timeLogRoutes = require('./routes/timeLogs');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/workers', workerRoutes);
app.use('/api/time-logs', timeLogRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
