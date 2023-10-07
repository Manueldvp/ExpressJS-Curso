const express = require('express');
const routerApi = require('./routes')


const app = express();
const port = 3000;

app.use(express.json())

// app.get('/', (req, res) => {
//   res.send('Hola mi server en express')
// })

// app.get('/new-endpoint', (req, res) => {
//   res.send('New Endpoint')
// })

routerApi(app);






app.listen(port, () => {
  console.log('Mi port ' + port);
})
