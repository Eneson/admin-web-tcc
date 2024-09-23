$("#InputFone, #NewInputFone").mask("(00) 0 0000-0000")    

        function ShowLoading(show){
            var div1 = document.getElementById("loading1");
            var div2 = document.getElementById("loading2");                
                
            if(show == true) {
                div1.style.display = "flex";
                div2.style.display = "flex";
            }else{
                div1.style.display = "none";
                div2.style.display = "none";
            }

        }

        imgInp.onchange = evt => {
            const [file] = imgInp.files
            if (file) {
                blah.src = URL.createObjectURL(file)
            }
        }

        //função pegar todos os usuarios users controller.js
        //Renderiza os usuários na pagina inicial
        
        //Reports
        var page_reports = 1;
        function render_all_reports(page_reports){
            Get_All_Reports(page_reports).then((data) => {
                console.log(page_reports)
                document.getElementById("reports_list").innerHTML = '';
    
                if(data.length == 0){
                    document.getElementById('pagination_report').style.display = "none";
                    return
                }
                
                const Page_list = document.getElementById("page_reports_1")
                
                for (let index = 0,page_reports = 1; index < data.Total_count ; index+=10, page_reports++) {
                    if(!Page_list){                    
                        const node = document.createElement("li");
                        node.setAttribute("id", "page_reports_"+page_reports);     
                        node.innerHTML = '<a id=id_page_'+page_reports+' onClick=render_all_reports('+page_reports+') class="page-link" href="#">'+page_reports+'</a>'
                        document.getElementById("pagination_report").appendChild(node);
                    }
                    document.getElementById("page_reports_"+page_reports).setAttribute("class", "")
                }
                
                
                if(!Page_list){                
                    const node4 = document.createElement('li');
                    node4.setAttribute("id", "page_NextPage_report");   
                    node4.innerHTML = '<a id="NextPage_report" class="page-link" href="#" aria-label="Next"> <span aria-hidden="true">»</span>'
                    document.getElementById("pagination_report").appendChild(node4);
                }
                
                //PreviousPage
                let PreviousPage = page_reports-1
                NextPage = page_reports+1   
                
                document.getElementById("PreviousPage_report").setAttribute("onClick", "render_all_reports("+PreviousPage+")");
                document.getElementById("NextPage_report").setAttribute("onClick", "render_all_reports("+NextPage+")");
                
                document.getElementById("page_reports_"+page_reports).setAttribute("class", "active")
                    
                
                
                if(Math.ceil(data.Total_count/10) == page_reports){
                    document.getElementById("page_NextPage_report").setAttribute("class", "disabled");
                }else{
                    document.getElementById("page_NextPage_report").setAttribute("class", "");
    
                }
                if(page_reports == 1){
                    document.getElementById("page_PreviousPage_report").setAttribute("class", "disabled");
                }else{                   
                    document.getElementById("page_PreviousPage_report").setAttribute("class", "");
                }
    
                if(data != undefined){
                    document.getElementById("count_reports").innerHTML = data.Total_count             
                }else{                
                    document.getElementById("count_reports").innerHTML = 0
                }
                console.log(data.data)
                if(data.data.length != 0){
                    data.data.forEach(async (item, indice) => {                    
                        const node = document.createElement("tr");
                        node.setAttribute("id", "user"+item.id);         
                        
                        node.innerHTML = '<td>'+item.reports_id+'</td> <td>'+ item.nome +' </td><td>'+item.id_user+'</td><td>'+ item.Nome +'</td><td>'+ item.animal_id+'</td><td>'+ item.desc+'</td><td> <div class="btn-group"> <a type="button" data-bs-toggle="dropdown" aria-expanded="false"><i style="font-size: 1.5em;" class="text-secondary bi bi-gear-fill"></i></a><ul class="dropdown-menu"><li><hr class="dropdown-divider"></li><li> <a id="DeleteButtonReport'+item.reports_id+'" class="dropdown-item btn btn-danger" href="#">Deletar</a></li></ul></div></td>'
                        
                        document.getElementById("reports_list").appendChild(node);
                        
                        //Deletar REPORTS
                        var DeleteButtonReport = document.getElementById("DeleteButtonReport"+item.reports_id)         
                        DeleteButtonReport.addEventListener(
                            "click", 
                            function(){
                                let text = "Tem certeza que seja apagar essa Denúncia?\nEssa ação não tem volta";
                                if (confirm(text) == true) {       
                                    ShowLoading(true)                    
                                    Delete_report(item).then(() => {
                                        alert("Removido com sucesso!");
                                    }).catch(err => {                
                                        alert(err);
                                    }).finally(() => {
                                        location.reload()
                                    })
                                } 
                            }
                        );
                    });
                }
                else{
                    document.getElementById("pet_list").innerHTML = ''  
                    const node = document.createElement("tr");
                    node.innerHTML = "<td>0 Animais Encontrado</td><td></td><td></td><td></td><td></td>"                
                    document.getElementById("pet_list").appendChild(node);  
                }
    
            })
        }
        render_all_reports(1)

        let page = 1       
        function render_all_pets(page) {
            Get_all_pets(page)
                .then((res) => {
                    document.getElementById("pet_list").innerHTML = ''

                    const {data, Total_count} = res
                    if(data != undefined){
                        document.getElementById("count_pets").innerHTML = Total_count                
                    }else{                
                        document.getElementById("count_pets").innerHTML = 0
                    }

                    if(data.length == 0){
                        document.getElementById('pagination').style.display = "none";
                        return
                    }
                    
                    const Page_list = document.getElementById("page_1")
                    
                    for (let index = 0,page = 1; index < Total_count; index+=10, page++) {
                        if(!Page_list){                    
                            const node = document.createElement("li");
                            node.setAttribute("id", "page_"+page);     
                            node.innerHTML = '<a id=id_page_'+page+' onClick=render_all_pets('+page+') class="page-link" href="#">'+page+'</a>'
                            document.getElementById("pagination").appendChild(node);
                            //<li class="page-item">  </a> </li>
                            
                        }
                        document.getElementById("page_"+page).setAttribute("class", "")
                    }

                    
                    if(!Page_list){                
                        const node4 = document.createElement('li');
                        node4.setAttribute("id", "page_NextPage");   
                        node4.innerHTML = '<a id="NextPage" class="page-link" href="#" aria-label="Next"> <span aria-hidden="true">»</span>'
                        document.getElementById("pagination").appendChild(node4);
                    }
                    
                    //PreviousPage
                    let PreviousPage = page-1
                    NextPage = page+1   
                    
                    document.getElementById("PreviousPage").setAttribute("onClick", "render_all_pets("+PreviousPage+")");
                    document.getElementById("NextPage").setAttribute("onClick", "render_all_pets("+NextPage+")");
                    
                    document.getElementById("page_"+page).setAttribute("class", "active")
                        
                    
                    
                    if(Math.ceil(Total_count/10) == page){
                        document.getElementById("page_NextPage").setAttribute("class", "disabled");
                    }else{
                        document.getElementById("page_NextPage").setAttribute("class", "");

                    }
                    if(page == 1){
                        //disabled
                        document.getElementById("page_PreviousPage").setAttribute("class", "disabled");
                    }else{
                       
                        document.getElementById("page_PreviousPage").setAttribute("class", "");
                    }
                            

                    if(data.length != 0){
                        data.forEach(async (item, indice) => {                    
                            const node = document.createElement("tr");
                            node.setAttribute("id", "user"+item.id);                    
                            const foto = item.FotoName.replaceAll(" ", "_");              
                            var report = await Get_Count_Reports(item.id)
                            
                            node.innerHTML = '<td>'+ item.id +'</td> <td> <img src="https://ik.imagekit.io/adote/'+foto+'" alt="Product 1" class="rounded-circle img-size-32 me-2"> '+item.Nome+'</td><td>'+item.nome+'</td><td>'+report+'</td><td> <div class="btn-group"> <a type="button" data-bs-toggle="dropdown" aria-expanded="false"><i style="font-size: 1.5em;" class="text-secondary bi bi-gear-fill"></i></a><ul class="dropdown-menu"><li><a class="dropdown-item" data-bs-toggle="modal" id="viewPetButton'+item.id+'" data-bs-target="#viewPet"  href="#" class="btn btn-sm btn-primary float-start">Visualizar</a></li><li> <a data-bs-toggle="modal" id="editPetButton'+item.id+'" data-bs-target="#editarPet"  href="#" class="dropdown-item" href="#">Editar</a> </li><li><hr class="dropdown-divider"></li><li> <a id="DeleteButtonPet'+item.id+'" class="dropdown-item btn btn-danger" href="#">Deletar</a> </li></ul></div>  </td>'
                            
                            document.getElementById("pet_list").appendChild(node);

                            //Vizualizar pet
                            var viewPetButton = document.getElementById("viewPetButton"+item.id)         
                            viewPetButton.addEventListener(
                                "click", 
                                function(){
                                    //petDonoModal
                                    document.getElementById('petNomeModal').innerHTML = item.Nome  
                                    document.getElementById('petDonoModal').innerHTML = item.nome  
                                    document.getElementById('petIdModal').innerHTML = item.id  
                                    document.getElementById('petTipoModal').innerHTML = item.Tipo   
                                    document.getElementById('petNascModal').innerHTML = item.DataNasc    
                                    document.getElementById('petSexoModal').innerHTML = item.Sexo    
                                    switch (item.Vacina) {
                                        case 0:                                    
                                            document.getElementById('petVacinadoModal').innerHTML = 'Não'  
                                            break;
                                        case 1:                                    
                                            document.getElementById('petVacinadoModal').innerHTML = 'Sim'  
                                            break;
                                    }  
                                    switch (item.Castrado) {
                                        case 0:                                    
                                            document.getElementById('petCastradoModal').innerHTML = 'Não'  
                                            break;
                                        case 1:                                    
                                            document.getElementById('petCastradoModal').innerHTML = 'Sim'  
                                            break;
                                    }
                                    switch (item.Vermifugado) {
                                        case 0:                                    
                                            document.getElementById('petVermifugadoModal').innerHTML = 'Não'  
                                            break;
                                        case 1:                                    
                                            document.getElementById('petVermifugadoModal').innerHTML = 'Sim'  
                                            break;
                                    }
                                    document.getElementById('petDescModal').innerHTML = item.Descricao
                                    document.getElementById('petImgModal').src = 'https://ik.imagekit.io/adote/'+foto+''
                                }   
                            );  
                            
                            // editar pet
                            var editPetButton = document.getElementById("editPetButton"+item.id)         
                            editPetButton.addEventListener(
                                "click", 
                                function(){
                                    document.getElementById('Edit_Pet_Name').value = item.Nome
                                    document.getElementById('Edit_Dono_Select_atual').innerHTML = item.nome
                                    document.getElementById('Edit_Dono_Select_atual').value = item.id_user
                                    document.getElementById('Edit_Pet_Id').value = item.id

                                    document.getElementById('Edit_Pet_Submit').setAttribute('idi', item.id)

                                    if(item.Sexo == 'Macho'){
                                        document.getElementById('Edit_Macho').checked = true;
                                    }else{
                                        document.getElementById('Edit_Femea').checked = true;
                                    }
                                    if(item.Tipo == 'Cão'){
                                        document.getElementById('Edit_Cao').checked = true;
                                    }else{
                                        document.getElementById('Edit_Gato').checked = true;
                                    }

                                    document.getElementById('blah').src = 'https://ik.imagekit.io/adote/'+foto
                                    
                                    document.getElementById('Edit_Data_nasc').value = item.DataNasc
                                    if(item.Vacina == 1){
                                        document.getElementById('Edit_Vacinado').checked = true
                                    }
                                    if(item.Vermifugado == 1){
                                        document.getElementById('Edit_Vermifugado').checked = true
                                    }
                                    if(item.Castrado == 1){
                                        document.getElementById('Edit_Castrado').checked = true
                                    }

                                    document.getElementById('New_Data_nasc').value
                                    document.getElementById('imgInp').value
                                    document.getElementById('Edit_Desc').value                        
                                }
                            );  
                            
                            //Deletar pet
                            var DeleteButtonPet = document.getElementById("DeleteButtonPet"+item.id)         
                            DeleteButtonPet.addEventListener(
                                "click", 
                                function(){
                                    let text = "Tem certeza que seja apagar o usuário?\nEssa ação não tem volta";
                                    if (confirm(text) == true) {       
                                        ShowLoading(true)                    
                                        Delete_Pet(item).then(() => {
                                            alert("Removido com sucesso!");
                                        }).catch(err => {                
                                            alert(err);
                                        }).finally(() => {
                                            location.reload()
                                        })
                                    } 
                                }
                            );  
                            
                        });
                    }
                    else{

                    document.getElementById("pet_list").innerHTML = ''  
                    const node = document.createElement("tr");
                    node.innerHTML = "<td>0 Animais Encontrado</td><td></td><td></td><td></td><td></td>"                
                    document.getElementById("pet_list").appendChild(node);  
                }
                })
                .catch(error => { 
                    document.getElementById("pet_list").innerHTML = ''  
                    const node = document.createElement("tr");
                    node.innerHTML = "<td>"+error+"</td><td></td><td></td><td></td><td></td>"                
                    document.getElementById("pet_list").appendChild(node);  
                })
            
        }
        
        render_all_pets(1)

        Get_all_users()
            .then((res) => {
                //Renderiza o contador de usuarios
                if(res != undefined){
                    document.getElementById("count_users").innerHTML = res.length
                }else{
                    
                    document.getElementById("count_users").innerHTML = 0
                }
                
                document.getElementById("user_list").innerHTML = '' 
                if(res.length != 0){
                    res.forEach((item, indice) => {
                        const node = document.createElement("tr");
                        node.setAttribute("id", "user"+item.id_user);
                        
                        var admin = item.admin
                        switch (admin) {
                            case 0:
                                admin = 'Não'
                                break;
                            case 1:                                
                                admin = 'Sim'
                                break;
                            default:
                                break;
                        }
                        node.innerHTML = '<td>'+ item.id_user +'</td> <td>'+ item.nome +'</td> <td>'+item.email +"</td><td>"+item.telefone +"</td><td>"+admin+"</td> <td> <div class='btn-group'> <a type='button' data-bs-toggle='dropdown' aria-expanded='false'> <i style='font-size: 2em;' class='text-secondary bi bi-person-fill-gear'></i></a> <ul class='dropdown-menu'> <li></li> <li> <a data-bs-toggle='modal' id='EditButton_"+item.id_user+"' data-bs-target='#staticBackdrop' class='dropdown-item' href='#'>Editar</a> </li> <li> <hr class='dropdown-divider'></li><li> <a id='DeleteButton_"+item.id_user+"' class='dropdown-item btn btn-danger' href='#''>Deletar</a></li></ul></div></td>"
                        
                        document.getElementById("user_list").appendChild(node);

                        var User_DeleteButton = document.getElementById("DeleteButton_"+item.id_user)                
                        User_DeleteButton.addEventListener(
                            "click", 
                            function(){
                                let text = "Tem certeza que seja apagar o usuário?\nEssa ação não tem volta";
                                if (confirm(text) == true) {  
                                    ShowLoading(true)                  
                                    Delete_User(item).catch(() => {
                                        let text = "ERROR Ao apagar usuário.\nUsuário não apagado";
                                        if (confirm(text) == true) { 
                                        }
                                    })
                                    location.reload()
                                } 
                            }
                        );  
                        
                        var User_EditButton = document.getElementById("EditButton_"+item.id_user)                
                        User_EditButton.addEventListener(
                            "click", 
                            function(){
                                document.getElementById("id_user").value = item.id_user
                                document.getElementById("Edit_InputName").value = item.nome
                                document.getElementById("Edit_InputEmail").value = item.email
                                document.getElementById("Edit_InputFone").value = item.telefone
                            }
                        ); 
                        
                        const User_Options = document.createElement("option");
                        User_Options.setAttribute("id", "user"+item.id_user);
                        User_Options.setAttribute("value", item.id_user);
                        User_Options.innerHTML = item.nome

                        const User_Options2 = document.createElement("option");
                        User_Options2.setAttribute("id", "user"+item.id_user);
                        User_Options2.setAttribute("value", item.id_user);
                        User_Options2.innerHTML = item.nome
                        
                        document.getElementById("New_Dono_Select").appendChild(User_Options2);
                        document.getElementById("Edit_Dono_Select").appendChild(User_Options);
                    });
                }
                else{
                    const node = document.createElement("tr");
                    node.innerHTML = "<td>0 Usuário Encontrado</td><td></td><td></td><td></td><td></td>"                
                    document.getElementById("user_list").appendChild(node);           
                        
                }
            })
            .catch((err) => {
                document.getElementById("user_list").innerHTML = '' 
                const node = document.createElement("tr");
                node.innerHTML = "<td>"+err+"<td><td></td><td></td><td></td><td></td>"                
                document.getElementById("user_list").appendChild(node);    
            })
        
        //Ligar FORMULARIO DE EDITAR USUÁRIO HTML Form com evento do botão e enviar para a funçao de enviar o form para o backend
        const Form_edit_user = document.querySelector("#Form_edit_user");
        Form_edit_user.addEventListener("submit", (event) => {
            ShowLoading(true)
            event.preventDefault();
            Send_form_User(event);
            $("#staticBackdrop").modal('hide');
        });

        //Ligar FORMULARIO DE NOVO USUÁRIO HTML Form com evento do botão e enviar para a funçao de enviar o form para o backend
        const Form_new_user = document.querySelector("#Form_new_user");
        Form_new_user.addEventListener("submit", (event) => {
            ShowLoading(true)
            event.preventDefault();
            Send_form_NewUser();
            $("#staticBackdrop").modal('hide');
        });
        
        //Ligar FORMULARIO DE NOVO PET HTML Form com evento do botão e enviar para a funçao de enviar o form para o backend
        const Form_new_pet = document.querySelector("#Form_new_pet");
        Form_new_pet.addEventListener("submit", (event) => {
            ShowLoading(true)
            event.preventDefault();
            const selectedFile = Form_new_pet.elements.New_FotoFile.files[0];
            Send_form_NewPet(selectedFile);
        });

        //Ligar FORMULARIO DE EDITAR PET HTML Form com evento do botão e enviar para a funçao de enviar o form para o backend
        const Form_edit_pet = document.querySelector("#Form_edit_pet");
        Form_edit_pet.addEventListener("submit", (event) => {
            ShowLoading(true)
            event.preventDefault();
            const selectedFile = Form_edit_pet.elements.imgInp.files[0];
            Send_form_EditPet(selectedFile);
        });
        
        //ENVIAR DADOS DO FORMULÁRIO FRONTEND PARA A FUNÇÃO DE NOVO PET EM PETS.JS
        async function Send_form_EditPet(file) {
            const form_data = new FormData(Form_new_pet);            
            const Edit_Pet_Name = document.getElementById('Edit_Pet_Name').value
            const Edit_Pet_Id = document.getElementById('Edit_Pet_Id').value
            const Edit_Dono_Select = document.getElementById('Edit_Dono_Select').value
            const id_pet = document.getElementById('Edit_Pet_Submit').getAttribute('idi');
            
            const Edit_Tipo = document.querySelector('input[name="Edit_Tipo"]:checked').value;
            const Edit_Sexo = document.querySelector('input[name="Edit_Sexo"]:checked').value;

            const Edit_Data_nasc = document.getElementById('Edit_Data_nasc').value

            var Edit_Vacinado;
            var Edit_Vermifugado;
            var Edit_Castrado;

            switch ($('#Edit_Vacinado').is(':checked')) {
                case false:                                    
                    Edit_Vacinado = 0
                    break;
                case true:                                    
                    Edit_Vacinado = 1  
                    break;
            }  
            switch ($('#Edit_Vermifugado').is(':checked')) {
                case false:                                    
                    Edit_Vermifugado = 0  
                    break;
                case true:                                    
                    Edit_Vermifugado = 1 
                    break;
            }
            switch ($('#Edit_Castrado').is(':checked')) {
                case false:                                    
                    Edit_Castrado = 0  
                    break;
                case true:                                    
                    Edit_Castrado = 1 
                    break;
            }
            

            const imgInp = document.getElementById('imgInp').value
            const Edit_Desc = document.getElementById('Edit_Desc').value

            let filename = imgInp.split("\\").pop(); 
            
            filename = new Date().toISOString().replace(/:/g, '-') + filename
            
                      
            const pet_id = document.getElementById('Edit_Pet_Id').value

            form_data.append('produto_imagem', file);
            form_data.append('id', pet_id);
            form_data.append('Nome', Edit_Pet_Name);
            form_data.append('DataNasc', Edit_Data_nasc);
            form_data.append('Sexo', Edit_Sexo);
            form_data.append('Tipo', Edit_Tipo);
            form_data.append('Vacina', Edit_Vacinado);
            form_data.append('id_user', Edit_Dono_Select);
            form_data.append('Vermifugado', Edit_Vermifugado);
            form_data.append('Castrado', Edit_Castrado)  
            form_data.append('FotoName', filename);
            form_data.append('Descricao', Edit_Desc);

            Edit_Pet(form_data).then((res) => {
                if(res.status == 200){
                    alert("Adicionado com sucesso!");
                }        
                location.reload()
            })            
        }
    
        //ENVIAR DADOS DO FORMULARIO FRONTEND PARA A FUNÇÃO DE ATUALIZAR USUARIO EM USERS.JS
        async function Send_form_User() {     
            const InputName = document.getElementById('Edit_InputName').value
            const id_user = document.getElementById('id_user').value
            const InputEmail = document.getElementById('Edit_InputEmail').value
            const InputFone = document.getElementById('Edit_InputFone').value
            
            const data = {
                'nome': InputName,
                'email': InputEmail,
                'telefone': InputFone,
                'id_user': id_user,
            }
            
            update_User(data).then((res) => {                
                alert("Editado com sucesso!");      
            }).catch((err) => {
                alert(err);
            }).finally(() => {
                location.reload()          
            })  
        }

        //ENVIAR DADOS DO FORMULÁRIO FRONTEND PARA A FUNÇÃO DE NOVO USUARIO EM USERS.JS
        async function Send_form_NewUser() {
            const form_data = new FormData();            
            const InputName = document.getElementById('NewInputName').value
            const InputEmail = document.getElementById('NewInputEmail').value
            const InputFone = document.getElementById('NewInputFone').value
            const InputSenha = document.getElementById('NewInputSenha').value
            //New_check_adm

            var New_check_adm = $('#New_check_adm').is(':checked')

            switch ($('#New_check_adm').is(':checked')) {
                case false:                                    
                    New_check_adm = 0
                    break;
                case true:                                    
                    New_check_adm = 1  
                    break;
            }  
            console.log(New_check_adm)
            form_data.append('nome', InputName);
            form_data.append('email', InputEmail);
            form_data.append('telefone', InputFone);
            form_data.append('senha', InputSenha);
            form_data.append('admin', New_check_adm);

            ShowLoading(false)

           New_User(form_data)
           .then(() => { alert("Adicionado com sucesso!")})
           .catch((err)=>{ alert(err)})         
        }
        
        //ENVIAR DADOS DO FORMULÁRIO FRONTEND PARA A FUNÇÃO DE NOVO PET EM PETS.JS
        async function Send_form_NewPet(file) {
            const form_data = new FormData(Form_new_pet);            
            const New_Pet_Name = document.getElementById('New_Pet_Name').value
            const New_Dono_Select = document.getElementById('New_Dono_Select').value
            const New_Tipo = document.querySelector('input[name="New_Tipo"]:checked').value;
            const New_Sexo = document.querySelector('input[name="New_Sexo"]:checked').value;
            const New_Data_nasc = document.getElementById('New_Data_nasc').value

            var New_Vacinado;
            var New_Vermifugado;
            var New_Castrado;

            switch ($('#New_Vacinado').is(':checked')) {
                case false:                                    
                    New_Vacinado = 0
                    break;
                case true:                                    
                    New_Vacinado = 1  
                    break;
            }  
            switch ($('#New_Vermifugado').is(':checked')) {
                case false:                                    
                    New_Vermifugado = 0  
                    break;
                case true:                                    
                    New_Vermifugado = 1 
                    break;
            }
            switch ($('#New_Castrado').is(':checked')) {
                case false:                                    
                    New_Castrado = 0  
                    break;
                case true:                                    
                    New_Castrado = 1 
                    break;
            }
            

            const New_FotoFile = document.getElementById('New_FotoFile').value
            const New_Desc = document.getElementById('New_Desc').value

            let filename = New_FotoFile.split("\\").pop(); 
            
            filename = new Date().toISOString().replace(/:/g, '-') + filename
            
            form_data.append('produto_imagem', file);
            form_data.append('Nome', New_Pet_Name);
            form_data.append('DataNasc', New_Data_nasc);
            form_data.append('Sexo', New_Sexo);
            form_data.append('Tipo', New_Tipo);
            form_data.append('Vacina', New_Vacinado);
            form_data.append('id_user', New_Dono_Select);
            form_data.append('Vermifugado', New_Vermifugado);
            form_data.append('Castrado', New_Castrado)        

            form_data.append('FotoName', filename);
            form_data.append('Descricao', New_Desc);

            New_Pet(form_data).then(() => {
                alert("Adicionado com sucesso!");
            }).catch(err => {                
                alert(err);
            }).finally(() => {
                location.reload()
            })
        }