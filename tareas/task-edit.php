<?php
include("conexion.php");
$nombre = $_POST["nombre"];
$descripcion = $_POST["descripcion"];
$id = $_POST["id_tarea"];
//echo "Servidor:".$nombre." ".$descripcion." ".$id;
$sentencia = "UPDATE tareas SET nombre='$nombre', descripcion='$descripcion' WHERE id=$id";
$resultado = mysqli_query($con,$sentencia);
if(!$resultado) {
    die("Error al actualizar");
}
echo "Tarea actualizada";

