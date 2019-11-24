<?php
include("hanyeah.php");

$conn = connect();
if ($conn) {
  $userId=$_POST['userId'];
  $prodId=$_POST['prodId'];

  $sql = "select vip_endtime from vip where user_id='{$userId}' and prod_id='{$prodId}'";
  $result = $conn->query($sql);
  if($result){
    $row = $result->fetch_row();
    if($row){
      var_dump($row);
      echo "{code:0,endtime:{$row[0]},msg:'vip'}";
    } else {
      echo "{code:0,endtime:0,msg:'非vip'}";
    }
  } else {
    echo "{code:2,msg:'查询失败'}";
  }
  $conn->close();
}

?>