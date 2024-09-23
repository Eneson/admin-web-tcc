//DELETAR USUÁRIO DO BANCO DE DADOS
const Delete_User = (item) => { 
    return new Promise((resolve, reject) => { 
        api.delete('user/'+item.telefone, {
            headers: {
                authorization: "Beare Admin", 
            },
            data: item
        })
        .then(res => {
            console.log(res)
            resolve()
        })
        .catch(error => { 
            console.log(error)
            reject(new Error('Não foi possível apagar o Usuário')) 
        })
        
            
    })
}
//LISTAR USUÁRIOS DO BANCO DE DADOS
function Get_all_users() {
    return new Promise((resolve, reject) => {
        api.get('user')
            .then(response => {
                resolve(response.data)       
            })  
            .catch(error => { reject(new Error('Não foi possível recuperar a lista de Usuários')) })
    })
}
//ATUALIZAR USUÁRIO DO BANCO DE DADOS
function update_User(form_data){
    return new Promise((resolve, reject) => {
        api.post('user/update', form_data, {
            headers: { 
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            resolve(response.data)       
        })
        .catch(error => { 
            reject(new Error('Não foi possível atualizar o Usuários'))
        })
    })
}
//ADICIONAR USUÁRIO AO BANCO DE DADOS
function New_User(form_data){
    return new Promise((resolve, reject) => {
        api.post('user', form_data, {
            headers: { 
                'Content-Type': 'application/json'
            }, 
        })
        .then(response => {
            resolve(response.data)       
        })  
        .catch(error => { 
            reject(new Error('Não foi possível Criar o Usuários'))
        })
    }) 
}
