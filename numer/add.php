<?php

    require'./connect.php';
    //$No=5;
    $menu=$_GET['menu'];
    $Eq=$_GET['Eq'];
    $Xl=$_GET['Xl'];
    $Xr=$_GET['Xr'];
    $Xm=$_GET['Xm'];
    $result = $connect->query("insert into bisection (menu,Eq,Xl,Xr,Xm)"
    ."values('$menu','$Eq',$Xl,$Xr,$Xm)");

    if($result){
        echo '{"success":"1"}';
        // echo"<a href='show.php'>showdata</a>";
    }else{
        echo '{"success":"0"}'; 
    }

    // $result=mysqli_query($connect, $sql);
    // echo '{"success":"'.$_GET['menu'].'"}';
    //$result = $connect->query("INSERT INTO 'bisection'( 'menu', 'Xl', 'Xr', 'Xm') VALUES ('".$_GET['menu']."',".$_GET['Xl'].",".$_GET['Xr'].",".$_GET['Xm'].")");

    // $sql = "INSERT INTO bisection (menu, Xl, Xr, Xm) VALUES ('".$_GET['menu']."',".$_GET['Xl'].",".$_GET['Xr'].",".$_GET['Xm'].")";
    // $result=mysqli_query($connect, $sql);

?>