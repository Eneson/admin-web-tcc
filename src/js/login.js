function login(form_data){
    return new Promise((resolve, reject) => { 
        api.post('login',
            form_data,{
            headers: { 
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            var token = 'Beare ' + response.data.token
            api.get('session', {
                headers: { 
                'authorization': token
                }}).then((res) => {
                    console.log('res login.js')
                    console.log(res)
                if(res.data.admin == 1){
                    resolve({
                        'token': res.config.headers.authorization,
                        'status': res.status
                    })
                }else{                    
                    reject(new Error('Usuario não autorizado'))
                }
            })
        })  
        .catch(error => { 
            reject(new Error(error))
        })
    })
}