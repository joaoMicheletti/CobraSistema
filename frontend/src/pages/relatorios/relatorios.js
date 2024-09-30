import React, {useState, useEffect} from "react";
import Api from '../../services/api.js';
import './relatorios.css';
import HeaderComponent from "../componentes/header/header.js";
import jsPDF from 'jspdf';
import Logo from '../../image/cobraLogo.jpeg';

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
            console.log(Data)
            await Api.post('/relatorio', Data).then((Response) => {
                setRelatorio(Response.data);
            }).catch((erro) =>{
                alert('Erro ao gerar o relatório');
            });
        };
        console.log(relatorio)
    };
    async function Pdf(){
        var Data = new Date();
        var total = 0
        var doc = new jsPDF('p', 'pt');
        var img = new Image();
        img.src = Logo;

        img.onload = function(){
            var width = 100;
            var heigth = (width* img.height) / img.width;
            doc.addImage(img, "PNG", 450, 10, width, heigth);

            doc.text(20, 30, `Relatório: ${periodo}`);
            doc.text(20, 55, `Empresa: ${nome}`);
            doc.text(20, 80, `Quantidade de valinhos: ${relatorio.length}`);
            var y = 160;

            relatorio.forEach((valinho) => {
                total += valinho.volume;
                doc.text(`${valinho.dia}/${valinho.mes}/${valinho.ano} - Volume: ${valinho.volume}m³ - Placa: ${valinho.placa} - OS: ${valinho.os}`,
                    20, y
                ); y += 30;               
            });
            doc.text(20, 105, `Volume total: ${total}m³`);
            doc.text(20, 130, `Relatório gerado por: "Cobra d'água transportes"`);
            doc.text(20, 140, `---------------------------------------------------------------------------------------------------------     "`);
            var dia = Data.getDate();
            var mes = Data.getMonth() + 1;
            var ano = Data.getFullYear()
            var NomePdf = nome+"-"+dia+"/"+mes+"/"+ano;
            doc.save(`${NomePdf}.pdf`);
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
                            <option value='Quinzenal'>Quinzenal</option>
                            <option value='Mensal'>Mensal</option>
                            <option value='Anoal'>Anual</option>
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
                    <button className="btnPDF" onClick={Pdf} >Gerar PDF</button>
                    <div className="headerRelatorio">
                        <p>Empresa</p>
                        <p>Motorista</p>
                        <p>Data</p>
                        <p>Quantidade</p>
                        <p>N° Vale</p>
                    </div>
                    {relatorio.map((valinho, key) => {
                        console.log(relatorio);
                        return(
                            <div key={valinho.id} className="dadosRelatorio">
                                <p>{valinho.nome}</p>
                                <p>{valinho.motorista}</p>
                                <p>{valinho.dia}/{valinho.mes}/{valinho.ano}</p>
                                <p>{valinho.volume}³</p>
                                <p>{valinho.os}</p>
                                
                            </div>
                        );
                    })}
                </div>
                <br/>
            </div>
        </>
        
    );
};