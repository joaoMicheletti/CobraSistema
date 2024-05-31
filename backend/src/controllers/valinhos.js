const connect = require('../database/conect/connection.js');
module.exports = {
    async RegisterValinhos(request, response){
        const {nome, volume,motorista, placa, dia, mes, ano, os} = request.body;
        var Data = {
            nome, volume, motorista, placa, dia, mes, ano, os
        };
        var resp = await connect('valinhos').insert(Data);
        return response.json(resp);
    },
}