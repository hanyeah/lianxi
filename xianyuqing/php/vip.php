<?php
include("hanyeah.php");

$conn = connect();
if ($conn) {
  $userId=$_POST['userId'];
  $prodId=$_POST['prodId'];
  $endTime=$_POST['endTime'];
  $sql = "select * from vip where user_id='{$userId}' and prod_id='{$prodId}'";
  $result = $conn->query($sql);
  if($result){
    if($result->num_rows > 0){
      $sql = "update vip set vip_endtime='{$endTime}' where user_id='{$userId}' and prod_id='{$prodId}'";
      $result = $conn->query($sql);
      if($result){
        echo "{code:0,msg:'更新成功'}";
      } else {
        echo "{code:2,msg:'更新失败'}";
      }
    } else {
      $sql = "insert into vip (user_id,prod_id,vip_endtime) values ({$userId},{$prodId},{$endTime})";
      $result = $conn->query($sql);
      if($result){
        echo "{code:0,msg:'插入成功'}";
      } else {
        echo "{code:2,msg:'插入失败'}";
      }
    }
  } else {
    echo "{code:2,msg:'查询失败'}";
  }
  $conn->close();
}

?>