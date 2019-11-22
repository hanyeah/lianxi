<meta charset="UTF-8">
<?php
$servername = "my0883158.xincache1.cn";
$username = "my0883158";
$password = "Hanyeah123";

// 创建连接
$conn = new mysqli($servername, $username, $password);
// 检测连接
if ($conn->connect_error) {
    die("连接失败: " . $conn->connect_error);
} 
echo "数据库连接成功";

$userName=$_POST['name'];
$userEmail=$_POST['email'];
$userPassword=$_POST['password'];

$selectSql = "select user_nickname from user where user_nickname='{$userName}'";
$insertSql = "insert into user (user_nickname,user_email,user_password,user_addtime,user_lasttime) value ('{$userName}', '{$userEmail}', '{$userPassword}')"
$sql = "if not exists({$selectSql}) insert";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    // 输出数据
    echo "结果:".($result->num_rows);
} else {
    echo "0 结果";
}

$conn->close();
?>