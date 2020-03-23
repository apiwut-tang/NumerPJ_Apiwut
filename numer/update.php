<?php

    require'./connect.php';
    //$No=5;
    $menu="bisection";
    $Xl=99;
    $Xr=99;
    $Xm=99;
    $sql = "update bisection set Xl=$Xl,Xr=$Xr,Xm=$Xm where menu='$menu'";
    $result = mysqli_query($connect, $sql);
    if($result){
        echo '{"success":"1"}';
    }else{
        echo '{"success":"0"}'; 
    }
?>