<?php
include("conexion.php");
    $sentencia = "SELECT * FROM tareas";
    //echo $sentencia;
    $resultado = mysqli_query($con,$sentencia);
    if(!$resultado){
        die("Error en Query". mysqli_error($con));
    }

    $json = array();
    while($row=mysqli_fetch_array($resultado)){
        $json[] = array ( // llenamos el Array con objetos de la base de datos
            'nombre' => $row["nombre"],
            'descripcion' => $row["descripcion"],
            'id' => $row["id"]
        );
    }
    $jsonstring=json_encode($json); // Codifica los valores en formato JSON
    echo $jsonstring;
?>