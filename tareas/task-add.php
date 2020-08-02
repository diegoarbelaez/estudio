<?php

include("conexion.php");

$nombre = $_POST["nombre"];
$descripcion = $_POST["descripcion"];

$sentencia = "INSERT INTO tareas (nombre,descripcion) values ('$nombre', '$descripcion')";
$resultado = mysqli_query($con,$sentencia) or die($con);

echo "Agregado correctamente a la base de datos";



?>