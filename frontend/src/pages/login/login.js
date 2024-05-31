import React, {useState} from "react";
import api from "../../services/api";
import './login.css';

export default function Login(){
    var [adm, setUser] = useState();
    var [pass, setPass] = useState();

    function Logar(){
        if(adm === undefined){
            alert('Preencha o campo USER');
        } else if(pass === undefined){
            alert('Preencha o campo PASSWORD!')
        } else {
            var Data = {adm, pass};
            api.post('/', Data).then(Response =>{
                var token = Response.data[0].token
                localStorage.setItem('token', token);
                window.location.href = '/valinhos'
            }).catch((erro => {
                alert('Erro ao cominicar-se com o servidor');
            }))
            
        };
    };
    return(
        <>
            <div id="Login">
                <br/>
                <br/>
                <section>
                    <div id="Logo">
                    </div>
                    <div id="Form">
                        <h1>Login</h1>
                        <input
                            className="inpLogin"
                            type="text" 
                            placeholder="User"
                            onChange={(e) => setUser(e.target.value)}
                        />
                        <input 
                            className="inpLogin"
                            type="password" 
                            placeholder="Password"
                            onChange={(e) => setPass(e.target.value)}
                        />
                        <br/>
                        <button className="loginButton" onClick={Logar} >Login</button>
                    </div>
                </section>
            </div>
        </>
    );
};