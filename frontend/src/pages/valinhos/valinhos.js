import React, {useEffect, useState} from 'react';
import './valinhos.css';
import HeaderComponent from "../componentes/header/header.js";
import Api from '../../services/api.js';

 export default function Valinhos(){
    const [nome, setNome] = useState('');
    const [volume, setVolume] = useState('');
    const [motorista, setMotorista] = useState('');
    const [placa, setPlaca] = useState('');
    const [data, setData] = useState('');
    const [os, setOs] = useState('');
    const [lista, setLista] = useState([]);

    useEffect(() =>{
        Api.get('/empresa').then((Response) =>{
            setLista(Response.data);
        }).catch((erro) => {
            alert('erro interno')
        })
    },[]);
    function Cad(){
        console.log(nome, volume, motorista, placa, data, os)
        if(nome === ''){
            alert('Preencha o campo Razão social!')
        } else if(volume === '') {
            alert("Preencha o campo Volume");
        } else if(motorista === ''){
            alert("Preencha o campo Motorista");
        } else if(placa === ''){
            alert('Preencha o campo Placa');
        } else if(placa.length > 7 || placa.length < 7){
            alert('Placa Incorreta');
        } else if(data === ''){
            alert('Preencha o campo Data');
        } else if(os === ''){
            alert('Preencha o campoi Número do Valinho')
        } else {
            var dataString = data.split('-');
            const Data = {
                nome, volume, placa, motorista, dia:dataString[2], mes:dataString[1], ano:dataString[0], os
            };
            Api.post('/valinhos', Data).then((Response) => {
                console.log(Response)
                if(Response.status === 200){
                    alert("Cadastrado!")
                }
            }).catch((erro) =>{
                alert('Erro ao cadastrar Valinho!')
            });
            
        }
    };
    
    return(
        <div className='valinhosCad'>
            <HeaderComponent/>
            <div className='valinho'>
                <p className='pValinho'> Cadastar Valinho</p>
                <div className='rasVolume'>
                    <label>
                        Razão social : 
                        <select className='inpValinho' onChange={(e) => setNome(e.target.value)}>
                            {lista.map((empresa, kei) =>{
                                return(
                                    <option key={empresa.id} value={empresa.nome}>{empresa.nome}</option>
                                );
                            })}
                        </select>
                    </label>
                    <label>
                        Volume :
                        <input className='inpValinho' type='number' placeholder='  Volume' onChange={(e) => setVolume(e.target.value)}/>
                    </label>
                </div>
                <div className='motPlac'>
                    <label>
                        Motorista :
                        <input className='inpValinho' type='text' placeholder='  Motorista'onChange={(e) => setMotorista(e.target.value)}/>
                    </label>
                    <label>
                        Placa :
                        <input className='inpValinho' type='text' placeholder='  Placa'onChange={(e) => setPlaca(e.target.value)}/>
                    </label>
                </div>
                <div className='datNum'>
                    <label>
                        Data :
                        <input className='inpValinho' type='date' placeholder='  Data' onChange={(e) => setData(e.target.value)}/>
                    </label>
                    <label>
                        Número do Valinho : 
                        <input className='inpValinho' type='text' placeholder='  Número do valinho' onChange={(e) => setOs(e.target.value)}/>
                    </label>
                </div>                
                
                <button className='btnValinho' onClick={Cad}>Cadastrar</button>
            </div>
        </div>
    );
 };