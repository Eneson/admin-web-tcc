// //DELETAR USUÁRIO DO BANCO DE DADOS
var token = localStorage.getItem('token')

function Delete_Pet(item){ 
    return new Promise((resolve, reject) => {
        api.delete('animal/'+item.id, 
            {
                headers: {
                    authorization: "Admin "+token, 
                }
            }
        )
        .then(() => {
            resolve("Deletado com sucesso!")
        })
        .catch(error => reject(new Error('Não foi possível deletar o animal')))
    })        
}
// //LISTAR USUÁRIOS DO BANCO DE DADOS
function Get_all_pets(page) {
    return new Promise((resolve, reject) => {
        api.get('animal', {
            params: {
                page
            }  
        })
        .then(response => {
            const Total_count = response.headers['x-total-count']
            resolve({ 'data' :response.data, 'Total_count': Total_count })       
        })  
        .catch(error => {             
            reject(new Error('Não foi possível recuperar a lista de animais')) 
        })
    })
    
}
// //ATUALIZAR USUÁRIO DO BANCO DE DADOS
function Edit_Pet(data){
    return new Promise((resolve, reject) => {
        api.post('animal/update', data, {
            headers: { 
                'Content-Type': 'multipart/form-data',
                authorization: "Admin "+token, 
            }, 
        })
        .then(response => {
            resolve(response.data)       
        })  
        .catch(error => { reject(new Error(error)) })
            
    })
}

//ADICIONAR Pet AO BANCO DE DADOS
function New_Pet(form_data){
    return new Promise((resolve, reject) => { 
        api.post('animal',form_data,{
            headers: { 
                'Content-Type': 'multipart/form-data',
                authorization: "Admin "+token,  
            }
        })
        .then(response => {
            resolve(response)       
        })  
        .catch(error => { reject(new Error(error)) })
    })
}
