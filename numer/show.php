<?php

    require'./connect.php';
    $sql="select * from bisection";
    $result=mysqli_query($connect, $sql);
    if($result){
        while($record=mysqli_fetch_array($result,MYSQLI_ASSOC)){
            echo"No. = ".$record["No"]."<br>";
            echo"Menu = ".$record["menu"]."<br>";
            echo"XL = ".$record["Xl"]."<br>";
            echo"XR = ".$record["Xr"]."<br>";
            echo"XM = ".$record["Xm"]."<br>";
            echo"<hr>";            
        }
    }else{
        echo"fail";
    }



?>