$(document).ready(function () {
    console.log("Jquery Funcionando");
    $('#resultado-busqueda').hide();
    listar_tareas();
    let editar = false;


    $('#search').keyup(function () {// Metodo que cuando una tecla es oprimida (levantada) busca en la base de datos
        if ($('#search').val()) {
            let search = $('#search').val();

            $.ajax({ // Objeto de Ajax que sirve para enviar y recibir datos de un servidor
                url: 'task-search.php',
                type: 'POST',
                data: { search },
                success: function (response) {
                    let tareas = JSON.parse(response);
                    let template = '';
                    tareas.forEach(tarea => {
                        template += `<li>${tarea.nombre}</li>`
                    });
                    $('#contenedor').html(template);
                    $('#resultado-busqueda').show();
                }
            })
        }
    })

    $('#task-form').submit(function (e) { //valido la función submit del formulario para capturar el evento y poder manejar las conexiones
        const datosPost = { //Construye un array para enviar los datos por POST
            nombre: $('#tarea').val(),
            descripcion: $('#descripcion').val(),
            id_tarea: $('#id_tarea').val()
        };

        let url = editar === false ? 'task-add.php': 'task-edit.php';
        
        console.log(url);

        $.post(url, datosPost, function (respuesta) { // Sirve para enviar al servidor la petición, el objeto respuesta es la respuesta recibida por el servidor
            listar_tareas();
            console.log(respuesta);
            $('#task-form').trigger('reset');
            editar = false;

        })
       // console.log(datosPost);
        e.preventDefault();
    });


    function listar_tareas() {
        $.ajax({ //llamo a el backend PHP para listar las tareas
            url: 'task-list.php',
            type: 'POST',
            success: function (respuesta) { //Rutina que prepara los datos de una tabla para pintarla como JSON
                let tareas = JSON.parse(respuesta);
                console.log(respuesta);
                let template = '';
                tareas.forEach(tarea => {
                    template += `
                            <tr id_tarea="${tarea.id}">
                                <td>${tarea.id}</td>
                                <td>
                                    <a href="#" class="task-item">${tarea.nombre}</a>
                                </td>
                                <td>${tarea.descripcion}</td>
                                <td><button class="eliminar-tarea btn btn-danger">Eliminar</button></td>
                            </tr>`
                });
                $('#tareas').html(template);
            }
        })
    }

    $(document).on('click', '.eliminar-tarea', function () { //leer los eventos de click del documento (toda la pagina) filtrando los que se hagan sobre el elemento boton eliminar-tarea
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('id_tarea');
        console.log(id);
        if (confirm("Está seguro que desea eliminar la tarea")) { //Ventana de alerta en Javascript para confirmación
            eliminar_tarea(id);
        }
    })


    $(document).on('click', '.task-item', function () {
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('id_tarea');
        //console.log(id);
        $.post('task-single.php', { id }, function (respuesta) {
            //console.log(respuesta);
            const task = JSON.parse(respuesta);
            //console.log(task);
            $('#tarea').val(task.nombre);
            $('#descripcion').val(task.descripcion);
            $('#id_tarea').val(task.id);
            editar = true;
            console.log(respuesta);
        })

    })

    function eliminar_tarea(id_tarea_eliminar) {

        $.ajax({ // Objeto de Ajax que sirve para enviar y recibir datos de un servidor
            url: 'task-delete.php',
            type: 'POST',
            data: { id_tarea_eliminar },
            success: function (response) {
                console.log(response);
                listar_tareas();
            }
        })


    }



});



