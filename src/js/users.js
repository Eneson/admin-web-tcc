//DELETAR USUÁRIO DO BANCO DE DADOS

var token = localStorage.getItem('token')

const Delete_User = (item) => { 
    return new Promise((resolve, reject) => { 
        api.delete('user/'+item.telefone, {
            headers: {
                authorization: "Admin "+token, 
            },
            data: item
        })
        .then(res => {
            resolve()
        })
        .catch(error => { 
            reject(new Error('Não foi possível apagar o Usuário')) 
        })
        
            
    })
}
//LISTAR USUÁRIOS DO BANCO DE DADOS
function Get_all_users(page) {
    return new Promise((resolve, reject) => {
        api.get('user', {
            params: {
                page
            }  
        })
            .then(response => {
                const Total_count = response.headers['x-total-count']
                resolve({ 'data' :response.data, 'Total_count': Total_count })      
            })  
            .catch(error => { reject(new Error('Não foi possível recuperar a lista de Usuários')) })
    })
}
//ATUALIZAR USUÁRIO DO BANCO DE DADOS
function update_User(form_data){
    return new Promise((resolve, reject) => {
        api.post('user/update', form_data, {
            headers: { 
                'Content-Type': 'application/json',
                authorization: "Admin "+token,
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
                'Content-Type': 'application/json',
                authorization: "Admin "+token,
            }, 
        })
        .then(response => {
            resolve(response.data)       
        })  
        .catch(error => { 
            reject(new Error('Não foi possível Criar o Usuários:\n' + error.response.data.error))
        })
    }) 
}
