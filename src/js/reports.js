//LISTAR Reports DO BANCO DE DADOS
function Get_Count_Reports(animal_id) {
    return api.get('report/'+animal_id)
        .then(response => {
            console.log('response')
            return response.data            
        })  
        .catch(error => { return error })
}


function Get_All_Reports(page) {
    return api.get('report', {
        params: {
            page
        }  
    })                    
        .then(response => {
            const Total_count = response.headers['x-total-count']
            return ({ 'data' :response.data, 'Total_count': Total_count })         
        })  
        .catch(error => { return error })
}
//Delete_report
function Delete_report(item){ 
    return new Promise((resolve, reject) => {
        api.delete('report/'+item.reports_id, 
            {
                headers: {
                    authorization: "Beare Admin", 
                }
            }
        )
        .then(() => {
            resolve("Deletado com sucesso!")
        })
        .catch(error => reject(new Error('Não foi possível deletar o animal')))
    })        
}