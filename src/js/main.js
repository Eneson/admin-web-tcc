if(localStorage.getItem('acesso') != 'true'){
    alert('Faça login para acessar a pagina')
    window.location.href = '../pages/login.html'
}

var token = localStorage.getItem('token')

api.get('session', {
    headers: { 
        'authorization': token
    }})
    .then((res) => {
        //Nav_nome
        if(res.data.admin == 1){
            document.getElementById("Nav_nome").innerHTML = res.data.nome            
        }else{                    
            reject(new Error('Usuario não autorizado'))
        }
    })

function Logout() {
    localStorage.removeItem("acesso");
    localStorage.removeItem("token");
    window.location.href = '../pages/login.html'

}
