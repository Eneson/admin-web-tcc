//LISTAR Reports DO BANCO DE DADOS
function Get_Count_Reports(animal_id) {
    return axios({
        method: "get",
        url: "http://192.168.3.7:3000/report/"+animal_id,                    
        })
        .then(response => {
            return response.data            
        })  
        .catch(error => { return error })
}
function Get_Count_Reports() {
    return axios({
        method: "get",
        url: "http://192.168.3.7:3000/report",                    
        })
        .then(response => {
            return response.data            
        })  
        .catch(error => { return error })
}