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
                if(res.data.admin == 1){
                    console.log('res.config.headers.authorization')
                    console.log(res.config.headers.authorization)
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
            console.log(error)
            reject(new Error(error))
        })
    })
}