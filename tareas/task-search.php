<?php
include("conexion.php");
$busqueda=$_POST["search"];

if(!empty($busqueda)){
    $sentencia = "SELECT * FROM tareas where nombre like '%$busqueda%'";
    //echo $sentencia;
    $resultado = mysqli_query($con,$sentencia);
    if(!$resultado){
        die("Error en Query". mysqli_error($con));
    }

    $json = array();
    while($row=mysqli_fetch_array($resultado)){
        $json[] = array (
            'nombre' => $row["nombre"],
            'descripcion' => $row["descripcion"],
            'id' => $row["id"]
        );
    }
    $jsonstring=json_encode($json);
    echo $jsonstring;
}

?>