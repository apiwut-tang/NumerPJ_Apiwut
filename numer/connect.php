<?php
    header("Access-Control-Allow-Origin:http://localhost:3000");
    $hostName="database";
    $user="root";
    $pass="1111";
    $dbName="datanumer";
    $connect=mysqli_connect($hostName,$user,$pass,$dbName) or die( mysqli_connect_error() );
    
?>