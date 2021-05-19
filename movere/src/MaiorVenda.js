import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Vendas= ()=>{
    const [data,setData] = useState([])
    useEffect(()=>{
        axios.get('/maior')
        .then(res=>{
            setData(res.data.dados)
        })
    },[])
    const deleteCliente = id =>{
        axios.delete('/users/'+id)
         .then(res=>{
            const filtrado = data.filter(item => item.id !== id)
            setData(filtrado)
         })
    }
    const renderizaLinha = record =>{
        return (
            <tr key={record.id}>
                <th scope='row'>{record.id}</th>
                <td>{record.nome}</td>
                <td>{record.data}</td>
                <td>R$ {record.valor}</td>   
                <td><button className="btn btn-danger" onClick={()=>deleteCliente(record.id)}>Remover</button>
                </td>
                
            </tr>

        )
    }
    if(data.length === 0){
        return(
            <div className='container'>
                <h1>Vendas</h1>
                <div className='alert alert-warning' role='alert'>
                Você não possui Vendas cadastrada!
                </div>
            </div>
        )
    }
    
    return (
        <div className='container'>
            <table className='table table-dark  '>
                <thead >
                    <tr>
                        <th scope='col'>ID</th>
                        <th scope='col'>Nome</th>
                        <th scope='col'>Data</th>
                        <th scope='col'>Valor</th>
                        <th scope='col'>ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(renderizaLinha)}
                </tbody>
            </table>
        </div>
    )
  }
  export default Vendas