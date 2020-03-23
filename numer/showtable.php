<?php

    require'./connect.php';
    $menu=$_GET['menu'];
    $sql="select * from bisection where menu='$menu'";
    $result=mysqli_query($connect, $sql);
    $resultArray = array();
    if($result){
        $outp = "[";
        while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
            if ($outp != "[") {$outp .= ",";}
            $outp .= '{"no":"'.$rs["No"].'",';
            $outp .= '"Eq":"'.$rs["Eq"].'"}';  //เก็บเป็น array object (obj อยู่ข้างใน)
            // $outp .= '"duration":"'.$rs["duration"].'",';
            // $outp .= '"genre":"'.$rs["genre"].'",';
            // $outp .= '"startDate":"'.$rs["startDate"].'",';
            // $outp .= '"endDate":"'.$rs["endDate"].'",';
            // $outp .= '"poster":"'.$rs["poster"].'"}';
            
        }
        $outp .="]";

    }else{
        $outp = '{"success":"0"}'; 
    }

    echo $outp;


?>