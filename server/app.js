const express = require('express');
const app = express();
const port = 3000;

const routes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', routes);

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on: http://localhost:${port}`);
});
