const express = require('express');
const boom = require('@hapi/boom')
const cors = require('cors')
const routerApi = require('./routes')
const { logErros, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

const whitelist = ['http://localhost:8080']
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(boom.unauthorized())
    }
  }
}

app.use(cors(options))

app.get('/api', (req, res) => {
  res.send('Hola mi server en express')
})

// app.get('/new-endpoint', (req, res) => {
//   res.send('New Endpoint')
// })

routerApi(app);

app.use(logErros)
app.use(boomErrorHandler)
app.use(errorHandler)




app.listen(port, () => {
  console.log('Mi port ' + port);
})
