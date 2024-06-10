import { eliminar, getData, obtener, update, anadir } from "./firebase.js"

let id = 0

document.getElementById('btnGuardar').addEventListener('click', async () => {
    document.querySelectorAll('.form-control').forEach(item => {
        verificar(item.id)
    })
    if (document.querySelectorAll('.is-invalid').length == 0) {
        if (document.getElementById('btnGuardar').value == 'Guardar') {
            const reseña = {
                'run': document.getElementById('run').value,
                'nom': document.getElementById('nombre').value.trim(),
                'email': document.getElementById('email').value,
                'juego': document.getElementById('juego').value.trim(),
                'genero': document.getElementById('genero').value,
                'fecha': document.getElementById('fecha').value,
                'nota': document.getElementById('nota').value
            }
            
            const rese = await anadir(reseña);
            if(!rese){
                Swal.fire({
                    title: "Error",
                    text: "Ese juego ya fue reseñado",
                    icon: "error"
                })
            } else {
                Swal.fire({
                    title: "Enviado",
                    text: "Reseña terminada",
                    icon: "success"
                }).then(() => {
                    
                    limpiar()
                })
            }
            
        }else{
            const reseña = {
                'run': document.getElementById('run').value,
                'nom': document.getElementById('nombre').value.trim(),
                'email': document.getElementById('email').value,
                'juego': document.getElementById('juego').value.trim(),
                'genero': document.getElementById('genero').value,
                'fecha': document.getElementById('fecha').value,
                'nota': document.getElementById('nota').value
            }
            update(id,reseña)
            limpiar()
            id = 0
        }
    }
})

window.addEventListener('DOMContentLoaded', () => {
    getData((collection) => {
        let tabla = ''
        collection.forEach((doc) => {
            const item = doc.data()
            tabla += `<tr>
            <td>${item.run}</td>
            <td>${item.nom}</td>
            <td>${item.email}</td>
            <td>${item.juego}</td>
            <td>${item.genero}</td>
            <td>${item.fecha}</td>
            <td>${item.nota}</td>
            <td nowrap>
                <button class="btn btn-warning" id="${doc.id}">Editar</button>
                <button class="btn btn-danger" id="${doc.id}">Eliminar</button>
            </td>
        </tr>`
        })
        document.getElementById('contenido').innerHTML = tabla
        document.querySelectorAll('.btn-danger').forEach(btn => {
            btn.addEventListener('click', () => {
                Swal.fire({
                    title: "¿Estás seguro de eliminar el registro?",
                    text: "No podrás revertir los cambios",
                    icon: "error",
                    showCancelButton: true,
                    confirmButtonColor: "#d33",
                    cancelButtonColor: "#3085d6",
                    confirmButtonText: "Eliminar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        eliminar(btn.id)
                        Swal.fire({
                            title: "Eliminado",
                            text: "Su registro ha sido eliminado",
                            icon: "success"
                        })
                    }
                })
            })
        })

        
        document.querySelectorAll('.btn-warning').forEach( btn => {
            btn.addEventListener('click',async() =>{
                const doc = await obtener(btn.id)
                
                const d = doc.data()
                
                document.getElementById('run').value = d.run
                document.getElementById('nombre').value = d.nom
                document.getElementById('email').value = d.email
                document.getElementById('juego').value = d.juego
                document.getElementById('genero').value = d.genero
                document.getElementById('fecha').value = d.fecha
                document.getElementById('nota').value = d.nota
                document.getElementById('btnGuardar').value = 'Modificar'
                id = btn.id
            })
        })

    })
})