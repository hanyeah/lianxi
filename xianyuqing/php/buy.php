<?php
include("hanyeah.php");

$conn = connect();
if ($conn) {
  $userId=$_POST['userId'];
  $prodId=$_POST['prodId'];
  $buyWay=$_POST['buyWay'];
  $buyLen=$_POST['buyLen'];
  $buyPay=$_POST['buyPay'];
  
  $sql = "insert into buy (user_id,prod_id,buy_way,buy_length,buy_pay) values ({$userId},{$prodId},{$buyWay},{$buyLen},{$buyPay})";
  $result = $conn->query($sql);
  if($result){
    echo "{code:0,msg:'插入成功'}";
  } else {
    echo "{code:2,msg:'插入失败'}";
  }
  $conn->close();
}

?>