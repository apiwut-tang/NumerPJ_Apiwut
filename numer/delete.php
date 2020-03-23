<?php

    require'./connect.php';
    $menu=$_GET['menu'];
    $sql = "delete from bisection where menu='$menu'";
    $result = $connect->query("delete from bisection where menu='$menu'");

    if($result){
        echo '{"msg":"delete success"}';
    }else{
        echo '{"msg":"delete fail"}'; 
    }

?>   

