// //DELETAR USUÁRIO DO BANCO DE DADOS
function Delete_Pet(item){ 
    axios({
        method: "delete",
        url: "http://192.168.3.7:3000/animal/"+item.id,
        headers: {
            authorization: "Beare Admin", 
        },
        data: item
        })
        .then(response => {
            alert("Deletado com sucesso!");
            location.reload()
            })
        .catch(error => console.error(error))
}
// //LISTAR USUÁRIOS DO BANCO DE DADOS
function Get_all_pets(page) {
    console.log(page)
    return new Promise((resolve, reject) => {
        axios({
            method: "get",
            url: "http://192.168.3.7:3000/animal",  
            params: {
                page
            }                  
            })
            .then(response => {
                const Total_count = response.headers['x-total-count']
                resolve({ 'data' :response.data, 'Total_count': Total_count })       
            })  
            .catch(error => { reject(new Error('Não foi possível recuperar a lista de animais')) })
    })
    
}
// //ATUALIZAR USUÁRIO DO BANCO DE DADOS
function Edit_Pet(form_data){
    return new Promise((resolve, reject) => {
        axios({
                method: 'post',
                url: 'http://192.168.3.7:3000/animal/update',
                data: form_data,  
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    authorization: "Beare Admin", 
                },              
            })
            .then(response => {
                console.log(response)
                resolve(response.data)       
            })  
            .catch(error => { reject(new Error(error)) })
    })
}

//ADICIONAR Pet AO BANCO DE DADOS
function New_Pet(form_data){
    return new Promise((resolve, reject) => { 
        axios({
            method: 'post',
            url: 'http://192.168.3.7:3000/animal',
            data: form_data,  
            headers: { 
                'Content-Type': 'multipart/form-data',
                authorization: "Beare Admin", 
            },              
        }).then(response => {
            console.log(response)
            resolve(response)       
        })  
        .catch(error => { reject(new Error(error)) })
    })
}
