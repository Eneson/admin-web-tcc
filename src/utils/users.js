//DELETAR USUÁRIO DO BANCO DE DADOS
const Delete_User= (item) => { 
    return new Promise((resolve, reject) => { 
        axios({
            method: "delete",
            url: "http://192.168.3.7:3000/user/"+item.telefone,
            headers: {
                authorization: "Beare Admin", 
            },
            data: item
            })
            .then(res => {
                resolve()
            })
            .catch(error => { reject(new Error('Não foi possível apagar o Usuário')) })
    })
}
//LISTAR USUÁRIOS DO BANCO DE DADOS
function Get_all_users() {
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: "http://192.168.3.7:3000/user",                    
            })
            .then(response => {
                resolve(response.data)       
            })  
            .catch(error => { reject(new Error('Não foi possível recuperar a lista de Usuários')) })
    })
}
//ATUALIZAR USUÁRIO DO BANCO DE DADOS
function update_User(form_data){
    return axios({
        method: 'post',
        url: 'http://192.168.3.7:3000/user/update',
        data: form_data,  
        headers: { 
            'Content-Type': 'application/json'
        },              
    });   
}
//ADICIONAR USUÁRIO AO BANCO DE DADOS
function New_User(form_data){
    return axios({
        method: 'post',
        url: 'http://192.168.3.7:3000/user',
        data: form_data,  
        headers: { 
            'Content-Type': 'application/json'
        },              
    });   
}
