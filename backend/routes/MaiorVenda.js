const { Router } = require('express')
const express = require('express')
const router = express.Router();
const fs = require('fs')
const {join} = require('path')
const filePath =  join(__dirname, 'users.txt')
const getUsers = () =>{
    const data = fs.existsSync(filePath)
    ? fs.readFileSync(filePath)
    : {"NextId": 1, table : [],MaiorVenda:[]}

    try {
      return JSON.parse(data)
    }catch(error){
        return  {"NextId": 1, table : [],MaiorVenda:[]}
    }
  

}
router.get('/',(req,res,next)=>{
    const users = getUsers()

    const dados = users.MaiorVenda;
    console.log(dados);
    res.send({dados})

})
module.exports = router;