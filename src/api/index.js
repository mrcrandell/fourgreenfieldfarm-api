const express = require('express');
const helmet = require('helmet');
const nocache = require('nocache');
require('express-async-errors');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const errors = require('./errors');
const apiRoutes = require('./routes');
const logger = require('../../logger');

const app = express({
  limit: '100mb',
});
module.exports = app;
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'same-site' },
  })
);
app.use(nocache());
app.use(cors()); // Uncomment to enable cors *
app.use(logger.express());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    limits: { fileSize: 100 * 1024 * 1024 },
  })
);
app.options('*', cors());

app.use('/', apiRoutes);

app.use((err, req, res, next) => {
  const error = err?.errors?.[0] || err;
  const { code, report } = errors[error.message] || { code: 500, report: true };
  res.status(code).json({ error: error.message });
  next(report ? error : null);
});

app.get('/_healthz', (req, res) => {
  return res.send('OK');
});

app.get('/_readyz', (req, res) => {
  return res.send('OK');
});
