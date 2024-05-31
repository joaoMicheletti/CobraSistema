const connect = require('../database/conect/connection.js');

module.exports = {
    async Create(request, response){
        const {periodo, dia, mes, ano, nome} = request.body;

        if(periodo === 'Diário'){
            var resp = await connect('valinhos')
            .where('nome', nome)
            .where('dia', dia)
            .where('mes', mes)
            .where('ano', ano)
            .select('*');
            return response.json(resp);
        } else if(periodo === 'Quinzena'){
            if(dia === 1){
                var resp = await connect('valinhos')
                .where('nome', nome)
                .where('mes', mes)
                .where('ano', ano)
                .whereBetween('dia', [dia, 15])
                .select('*');
                return response.json(resp);
            } if(dia === 16){
                //verificação de ano bixexto
                var fimMes = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                var cMes = mes - 1;
                //console.log(fimMes.length)
                //console.log(mes)
                //console.log(fimMes[cMes])
                var resp = await connect('valinhos')
                .where('nome', nome)
                .where('mes', mes)
                .where('ano', ano)
                .whereBetween('dia', [dia, fimMes[cMes]])
                .select('*');
                return response.json(resp);
            } else {
                return response.json('Data Invalida');
            };
        } else if(periodo === 'Mensal'){
            var resp = await connect('valinhos')
            .where('nome', nome)
            .where('mes', mes)
            .where('ano', ano)
            .select('*');
            return response.json(resp);
        }if(periodo === 'Anoal'){
            var resp = await connect('valinhos')
            .where('nome', nome)
            .where('ano', ano)
            .select('*');
            return response.json(resp);
        };   
    }
   
}