import React, {useEffect, useState} from "react";
import './clientes.css';
import HeaderComponent from "../componentes/header/header.js";
import Api from '../../services/api.js';
 export default function Clientes(){
    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [telefone, setTelefone] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');
    const [lista, setLista] = useState([]);

    useEffect(() =>{
        Api.get('/empresa').then((Response) =>{
            setLista(Response.data);
        }).catch((erro) => {
            alert('erro interno')
        })
    },[]);
    
    function Register(){
        if(nome === ''){
            alert('Preencha o campo Razão Social');
        } if( endereco === ''){
            alert('Preencha o campo emdereço');
        } else if(email === ''){
            alert('Preencha o campo Email');
        } else if(cnpj.length <14 || cnpj.length > 14){
            alert('cnpj está invalido!');
        } else if(telefone.length > 11 || telefone.length < 11){
            alert('Telefone invalido');
        } else {
            const Data = {
                nome, 
                cnpj,
                telefone, 
                endereco,
                email
            };
            Api.post('/empresa', Data).then((Response) =>{
                console.log(Response.status);
                if(Response.status === 200){
                    alert('Cadastrado!');
                    window.location.reload(true);
                } else {
                    alert('Erro interno')
                }
            }).catch((erro) =>{
                alert('erro interno');
            })
        }
    };
    async function Deletar(Id){
        var resposta = window.prompt("gostaria de deletar?");
        if(resposta === 'sim'){
            try {
                const id = Id ; 
                const token = localStorage.getItem('token');
                const response = await  Api.delete('/deletar', {data: {token, id}}); 
                console.log(response.data);
                window.location.href ='/clientes';   
            } catch (error) {
                alert('Erro ao deleter empresa!');            
            };
        };        
    };

    return(
        <div className="clienteCorpo">
            <HeaderComponent/>
            <div className="cadCliente">
                <p className="tituloCad">Cadastro de Clientes Jurídico</p>
                <div className="infoCliente">
                    <label>
                        RAZÃO SOCIAL : 
                        <input className="inpCadCliente"  
                            type="text" 
                            placeholder="Razão Socila"
                            onChange={(e) => setNome(e.target.value)}
                            />
                    </label>
                    <label>
                        CNPJ : 
                        <input className="inpCadCliente" 
                        type="number" 
                        placeholder="CNPJ"
                        onChange={(e) => setCnpj(e.target.value)}
                        />
                    </label>
                </div>
                <div className="contatoCad">
                    <label>
                        ENDEREÇO : 
                        <input className="inpCadCliente"  
                        type="text"
                         placeholder="ENDEREÇO"
                         onChange={(e) => setEndereco(e.target.value)}/>
                    </label>
                    <label>
                        TELEFONE : 
                        <input className="inpCadCliente" 
                        type="number" 
                        placeholder="TELEFONE"
                        onChange={(e) => setTelefone(e.target.value)}/>
                    </label>
                    <label>
                        E-MAIL : 
                        <input className="inpCadCliente" 
                        type="email" 
                        placeholder="E-MAIL"
                        onChange={(e) => setEmail(e.target.value)}/>
                    </label>
                </div>
                <button className="btnCad" onClick={Register} >Cadastrar</button>
            </div>
            <div className="listClient">
                {lista.map((empresa, key) =>{
                    
                    return(
                        <div className="linhaCliente" key={empresa.id}>
                            <p>  {empresa.nome}</p>
                            <button className="btnDell" onClick={() => Deletar(empresa.id)}>Deletar</button>
                        </div>
                    );
                })}              
            </div><br/>
        </div>
    );
 };