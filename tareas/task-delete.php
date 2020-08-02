<?php
include("conexion.php");
$id_tarea_eliminar = $_POST["id_tarea_eliminar"];
$sentencia = "DELETE FROM tareas WHERE id=$id_tarea_eliminar";
$resultado = mysqli_query($con,$sentencia) or die($con);
echo "Borrado correctamente e BD la tarea ".$id_tarea_eliminar;
?>