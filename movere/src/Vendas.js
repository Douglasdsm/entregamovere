import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Logo from './img/logo.png'
import './style.css'
const MaiorVenda = () =>{
    const [form,setForm] = useState({})
    

    const onChange = field =>evt =>{
        setForm({
            ...form,
           [field]: evt.target.value
        })
    }
    
 

const onSave=()=>{
        axios.post('/users',{
            form
        
        })
        .then(res=>{
            setData(res.data);
           
          
        })
}

const [data,setData] = useState([])
useEffect(()=>{
    axios.get('/users')
    .then(res=>{
        
        setData(res.data.users)
        
    })
},[])

const deleteCliente = id =>{
    axios.delete('/users/'+id)
     .then(res=>{
        console.log(res);
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

const Vazio=()=>{
        if(data.length === 0){
            return(
                <div className='container'>
                    <h1>Vendas</h1>
                    <div className='alert alert-warning' role='alert'>
                    Você não possui Vendas cadastrada!
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    <table className='table table-dark'>
                        <thead >
                            <tr>
                                <th scope='col'>ID</th>
                                <th scope='col'>Nome</th>
                                <th scope='col'>Data</th>
                                <th scope='col'>Valor</th>
                                <th scope='col'>Sações</th>
                            </tr>
                        </thead>
                        <tbody  >
                            {data.map(renderizaLinha)}
                        </tbody>
                    </table>
                </div>
            )
        }
    }

    return (
        <div className='container'>
            <div className='titulo'>
            <img src={Logo} alt='logo'/>
            <h1>Vendas</h1>
            </div>
            <form>
                <div className='form-group'>
                    <div className="nome">
                    <div className='tags'>
                        <label htmlFor='name'>Nome</label>
                        </div>
                        <input type='text' className='form-control' onChange={onChange('nome')} style={{width:750,height:40} } value={form.name} id='nome' aria-describedby='cliente' placeholder='Cliente'/>
                        
                        
                            
                </div>
                <div className='valor-data-button'>      
                    <div className='tags-data'>
                            <label htmlFor='date'>Data</label>
                            </div>
                            <input className='form-control' onChange={onChange('data')} style={{width:200}} value={form.date}type='date'  id="date"/>

                            <div className='tags-valor'>
                            <label htmlFor='valor'>R$</label>
                            </div>
                            <input type='text' className='form-control' onChange={onChange('valor')} style={{width:150}} value={form.valor} aria-label='Quantia'/>
                        <div className='tags-inserir'>
                            <button type='button' onClick={onSave} style={{width:200}}  class="btn btn-primary">Inserir</button>      
                        </div>          
                    </div>  
                </div>
                
            </form>
            <Vazio />
        </div>
    )
}
export default MaiorVenda