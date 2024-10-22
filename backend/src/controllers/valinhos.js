const connect = require('../database/conect/connection.js');
module.exports = {
    async RegisterValinhos(request, response){
        const {nome, volume,motorista, placa, dia, mes, ano, os} = request.body;
        var Data = {
            nome, volume, motorista, placa, dia, mes, ano, os
        };
        //antes de inserir verificar se já não possui um valinho com a mesma os cadastrada !
        var verify = await connect('valinhos').where('nome', nome).where('os', os).select('*');
        console.log(verify.length);
        if(verify.length > 0){
            return response.json('Valinho já cadastrado');
        } else {
            var resp = await connect('valinhos').insert(Data);
            return response.json(resp);
        };
    },
}