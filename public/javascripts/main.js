tareas();

console.log(document.forms.formRegistrar.user.value);
//formulario para registrar
document.querySelector("#formRegistrar").addEventListener('submit', function (e) {
    e.preventDefault();
    let data = {
        Proveedor: document.forms.formRegistrar.Proveedor.value,
        Velocidad: document.forms.formRegistrar.Velocidad.value,
        Calidad: document.forms.formRegistrar.Calidad.value,
        Precio: document.forms.formRegistrar.Precio.value
    }
    console.log(data);
    fetch('/users', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Tarea insertada con exito");
            tareas();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});
//formulario para actualizar
document.forms.formUpdate.addEventListener("submit", function (e) {
    e.preventDefault();
    let data = {
        Proveedor:  document.forms.formUpdate.ProveedorU.value,
        Velocidad: document.forms.formUpdate.VelocidadU.value,
        Calidad: document.forms.formUpdate.CalidadU.value,
        Precio: document.forms.formUpdate.PrecioU.value
    }
    //peticion
    fetch('/users/' + document.forms.formUpdate._id.value, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .then(response => {
            alert("Tarea Actualizada con exito");
            tareas();
        })
        .catch(err => {
            alert("Por favor revise los datos ingresados");
            console.log(err);
        });
});
//crear tareas
function tareas() {
    fetch('/users',
        {
            method: 'GET'
        }).then(res => res.json())
        .then(data => {
            let filas = "";
            data.forEach(element => {
                //console.log(element);
                filas = filas + `<tr>
           <td>${element.ProveedorU}</td>
           <td>${element.Velocidad}</td>
           <td>${element.Calidad}</td>
           <td>${element.Precio}</td>
           <td>
            <a href="/users/${element._id}" class="update btn btn-warning" data-toggle="modal" data-target="#exampleModal">Actualizar</a>
            <a href="/users/${element._id}" class="delete btn btn-danger">Eliminar</a>
           </td>
           </tr>`
            });
            document.querySelector("#filas").innerHTML = filas;
            //agregando los eventos para actualizar 
            let btn_update = document.querySelectorAll('.update');
            btn_update.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    console.log(url);
                    fetch(url, {
                        method: "GET"
                    }).then(res => res.json())
                        .catch(err => console.error(err))
                        .then(response => {
                            document.forms.formUpdate._id.value = response._id;
                            document.forms.formUpdate.ProveedorU.value = response.Proveedor;
                            document.forms.formUpdate.VelocidadU.value = response.Velocidad;
                            document.forms.formUpdate.CalidadU.value = response.Calidad;
                            document.forms.formUpdate.PrecioU.value = response.Precio;
                        
                        });
                });
            });
            let btn_delete = document.querySelectorAll('.delete');
            btn_delete.forEach(item => {
                item.addEventListener("click", function (e) {
                    e.preventDefault();
                    let url = this["href"];
                    //peticion para eliminar
                    fetch(url, {
                        method: "DELETE",
                    }).then(res => res.json())
                        .then(response => {
                            alert("Tarea eliminada con exito");
                            tareas();
                        })
                        .catch(err => {
                            alert("Ocurrio un error al eliminar la tarea");
                            console.log(err);
                        });
                });
            })
        })
}