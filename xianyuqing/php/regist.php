<?php
include("hanyeah.php");

$conn = connect();
if($conn){
  $userName=$_POST['name'];
  $userEmail=$_POST['email'];
  $userPassword=$_POST['password'];

  $sql = "select user_nickname from user where user_nickname='{$userName}'";
  $result = $conn->query($sql);
  if($result){
    if($result->num_rows > 0){
      echo "{code:1,msg:'用户名已存在'}";
    } else {
      $sql = "insert into user (user_nickname,user_email,user_password) values ('{$userName}','{$userEmail}','{$userPassword}')";
      $result = $conn->query($sql);
      if($result){
        echo "{code:0,msg:'注册成功'}";
      }else{
        echo "{code:2,msg:'插入失败'}";
      }
    }
  } else {
    echo "{code:2,msg:'查询失败'}";
  }

  $conn->close();
}

?>