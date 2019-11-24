<?php
include("hanyeah.php");

$conn = connect();
if ($conn) {
  $userName=$_POST['name'];
  $userPassword=$_POST['password'];
  $sql = "select user_nickname from user where user_nickname='{$userName}' and user_password='{$userPassword}'";
  $result = $conn->query($sql);
  if($result){
    if($result->num_rows > 0){
      echo "{code:0,msg:'登陆成功'}";
    } else {
      echo "{code:1,msg:'用户名或密码错误'}";
    }
  } else {
    echo "{code:2,msg:'查询失败'}";
  }
  $conn->close();
}

?>