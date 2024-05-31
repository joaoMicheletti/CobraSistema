const connect = require('../database/conect/connection.js');
module.exports = {
   async ResgiterEmpresa(request, response){
    const {nome, cnpj, endereco, email, telefone} = request.body;
    var Data = {
        nome, cnpj, endereco, email, telefone
    };
    var resp = await connect('empresas').insert(Data);
     return response.json(resp);
   },
   async SearshEmpresas(request, response){
    var resp = await connect('empresas').select('*');
    return response.json(resp); 
   },
   async Deletar(request, response){
    const {token, id} = request.body;
    var conf = await connect('user').where('token', token);
    console.log(conf);
    if(conf.length > 0){
      var resp = await connect('empresas').where('id', id).delete();
      return response.json(resp);
    } else {
      return response.json("Acesso negado!!!");
    }
   },
}