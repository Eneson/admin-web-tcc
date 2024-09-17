// //DELETAR USUÁRIO DO BANCO DE DADOS
function Delete_Pet(item){ 
    axios({
        method: "delete",
        url: "http://192.168.3.7:3000/user/"+item.id,
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
function Get_all_pets() {
    return axios({
        method: "get",
        url: "http://192.168.3.7:3000/animal",                    
        })
        .then(response => {
            return response.data            
        })  
        .catch(error => { return error })
}
// //ATUALIZAR USUÁRIO DO BANCO DE DADOS
// function update_User(form_data){
//     return axios({
//         method: 'post',
//         url: 'http://192.168.3.7:3000/user/update',
//         data: form_data,  
//         headers: { 
//             'Content-Type': 'application/json'
//         },              
//     });   
// }

//ADICIONAR USUÁRIO AO BANCO DE DADOS
function New_Pet(form_data){
    return axios({
        method: 'post',
        url: 'http://192.168.3.7:3000/animal',
        data: form_data,  
        headers: { 
            'Content-Type': 'multipart/form-data',
            authorization: "Beare Admin", 
        },              
    });   
}
