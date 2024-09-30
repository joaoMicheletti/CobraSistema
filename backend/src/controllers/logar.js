const connect = require('../database/conect/connection.js');
const crypto = require('crypto'); // <<<<<<<<<<
module.exports = {
    async Login(request, response){
        const {adm, pass} = request.body;
        var cAdm = await connect('user').select('adm').where('adm', adm);
        var cPass = await connect('user').where('adm', adm).select('pass');
        console.log(cPass[0].pass); 
        if(pass === cPass[0].pass){
            var token = await connect('user').where('adm', adm).select('token');
            return response.json(token);
        } else{
            return response.json('senha invalida!');
        };
    },
    async Register(request, response){
        const {adm, pass} = request.body;
        
        var token = crypto.randomBytes(10).toString('HEX'); //<<<<<
        console.log(token. adm, pass); //<<<<<
        var Data = {adm, pass, token};
        await connect('user').insert(Data);
        return response.json('Cadastrado!');
    }
}