<?php
include("conexion.php");
$id=$_POST["id"];
$sentencia = "SELECT * FROM tareas where id=$id";
//echo $sentencia;
$resultado = mysqli_query($con,$sentencia);
$json = array();
while($row=mysqli_fetch_array($resultado)){
    $json [] = array ('nombre' => $row["nombre"],'descripcion' => $row["descripcion"],'id' => $row["id"]);
}
$jsonstring=json_encode($json[0]);
echo $jsonstring;

?>