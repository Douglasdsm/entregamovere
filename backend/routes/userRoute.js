
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


const saveUser = (users) => fs.writeFileSync(filePath,JSON.stringify(users,null,'\t'))

const userRoute=(app) =>{
    app.route('/users/:id?')
        .get((req,res)=>{
             const users = getUsers().table
             res.send({users})

        })
        .post((req,res)=>{
            const users = getUsers()
           
            req.body.form.id = users.NextId;
            users.NextId = users.NextId+1;
            console.log(`dado ${users.MaiorVenda.valor } > recebido ${ req.body.form.valor}`);
            console.log(users.MaiorVenda.length);
            if((users.MaiorVenda.length)!=0){
                if(parseFloat(users.MaiorVenda[0].valor) > parseFloat(req.body.form.valor)){
                    users.MaiorVenda = users.MaiorVenda
                }else{
                    const array = []
                    array.push(req.body.form)
                    users.MaiorVenda = array
                   // console.log( users.MaiorVenda);
                }
            }else{
                const array = []
                    array.push(req.body.form)
                    users.MaiorVenda = array
            }
            
            users.table.push(req.body.form)
            //console.log(req.body.form);
            
            saveUser(users)
            const dados = getUsers()
            res.status(201).send(dados.table)
        })
        .put((req,res)=>{
            const users = getUsers()
            saveUser(users.map(user =>{
                if(user.id === req.params.id){
                    return{
                        ...user,
                        ...req.body
                    } 
                }else{
                    return user
                }
                

            }))
            res.status(200).send('OK')
        })
        .delete((req,res)=>{
            const users = getUsers()
            var dadosDelete = new Object();
            dadosDelete.NextId = users.NextId;
            dadosDelete.table = users.table.filter(user => user.id != req.params.id)
            console.log(users.MaiorVenda.id);
            const maiorCompra = (compra,compraAtual)=>{
                if(parseFloat(compra.valor) > parseFloat(compraAtual.valor)){
                    return compra 
                }else{
                   return  compraAtual   
                }
                
            }
            const menosDelete = compra => compra.id != req.params.id
            const vendas =  users.table.filter(menosDelete)
            
            if(parseFloat(users.MaiorVenda[0].id) == parseFloat(req.params.id)){
                const array = vendas.reduce(maiorCompra,0);
                const dado=[]
                dado.push(array)
                dadosDelete.MaiorVenda = dado
                
                if(parseFloat( dadosDelete.MaiorVenda[0]) == 0){
                    dadosDelete.MaiorVenda = []
                    
                }
            }else{
                dadosDelete.MaiorVenda = users.MaiorVenda;
                console.log('segundo');
                console.log(dadosDelete.MaiorVenda);
            }
           
            saveUser(dadosDelete)
            res.status(200).send('OK')
            
        })
        app.route('/users/MaiorVenda')
        .get((req,res)=>{
             const users = getUsers().MaiorVenda
             res.send({users})

        })
}
module.exports = userRoute