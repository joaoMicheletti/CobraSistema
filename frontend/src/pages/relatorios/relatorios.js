import React, {useState, useEffect} from "react";
import Api from '../../services/api.js';
import './relatorios.css';
import HeaderComponent from "../componentes/header/header.js";

export default function Relatorios(){
    const [relatorio, setRelatorio] = useState([]);
    const [periodo, setPeriodo] = useState('');
    const [data, setData] = useState('');
    const [nome, setNome] = useState('');
    const [lista, setLista] = useState([]);

    useEffect(() =>{
        Api.get('/empresa').then((Response) =>{
            setLista(Response.data);
        }).catch((erro) => {
            alert('erro interno')
        })
    },[]);
    async function Gerar(){
        console.log(periodo, data, nome);
        if(periodo === ''){
            alert('Selecione o Periodo');
        } else if(data === ''){
            alert('Selecione uma data');
        } else if(nome === ''){
            alert('Selecione a empresa');
        } else {
            var dataString = data.split('-');
            var dia = parseInt(dataString[2]);
            var mes = parseInt(dataString[1]);
            var ano = parseInt(dataString[0]);

            const Data = {
                nome,
                periodo,
                dia,
                mes, 
                ano,
            };
            await Api.post('/relatorio', Data).then((Response) => {
                setRelatorio(Response.data);
            }).catch((erro) =>{
                alert('Erro ao gerar o relatório');
            });
        };
    };
    return(
        <>
            <div className="corpoRelatorios">
                <HeaderComponent/>
                <p className="tituloRelatorio">Gerar Relatórios</p>
                <div className="formRelatorio">
                    <label className="select">
                        Selecionar Período : 
                        <select className="selectPeriodo" onChange={(e) => setPeriodo(e.target.value)}>
                            <option value='Selecionar um Período'>Selecione um Período</option>
                            <option value='Diário'>Diário</option>
                            <option value='Quinzena'>Quinzena</option>
                            <option value='Mensal'>Mensal</option>
                            <option value='Anoal'>Anoal</option>
                        </select>
                    </label>
                    <label className="select">
                        Selecionar Data : 
                        <input type="date" onChange={(e) => setData(e.target.value)}></input>
                    </label>
                    <label className="select">
                        Selecionar Empresa : 
                        <select className="selectPeriodo" onChange={(e) => setNome(e.target.value)}>
                            {lista.map((empresa, key) =>{
                                return(
                                    <option key={empresa.id} value={empresa.nome}>{empresa.nome}</option>
                                );
                            })}
                            
                        </select>
                    </label>
                    <button className="btnGerar" onClick={Gerar}>Gerar Relatório</button>
                </div>
                <br/>
                <div className="relatorio">
                    <button className="btnPDF" >Gerar PDF</button>
                    <div className="headerRelatorio">
                        <p>Data</p>
                        <p>Volume</p>
                        <p>Valor</p>
                        <p>Empresa</p>
                    </div>
                    {relatorio.map((valinho, key) => {
                        return(
                            <div key={valinho.id} className="dadosRelatorio">
                                <p> Data: {valinho.dia}/{valinho.mes}/{valinho.ano}</p>
                                <p>Volume: {valinho.volume}³</p>
                                <p>Empresa: {valinho.nome}</p>
                            </div>
                        );
                    })}
                </div>
                <br/>
            </div>
        </>
        
    );
};