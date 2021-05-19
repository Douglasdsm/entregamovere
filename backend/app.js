const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const app = express()
const port = 3002
app.use(express.json())
const rotaMaiorVenda = require('./routes/MaiorVenda');
app.use('/maior', rotaMaiorVenda);
userRoute(app)


app.get('/',(req,res)=>res.send('Ola mundo pelo express'))
app.listen(port,()=>console.log('Api rodando na porta 3002'))