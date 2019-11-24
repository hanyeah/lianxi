<?php
/**
* 获取1970年以来的毫秒数。
*/
function getMillisecond(){
  list($s1,$s2)=explode(' ',microtime());
  return (float)sprintf('%.0f',(floatval($s1)+floatval($s2))*1000);
}

function connect(){
  $servername = "my0883158.xincache1.cn";
  $username = "my0883158";
  $password = "Hanyeah123";
  $dataBase = "my0883158";
  // 创建连接
  $conn = new mysqli($servername, $username, $password, $dataBase);
  // 检测连接
  if ($conn->connect_error) {
    die("{code: 10, msg:'连接失败: {$conn->connect_error}'}");
  }
  return $conn;
}

/**
 * 获取vip到期日期
 */
function getVipEndTime($conn, $userId, $prodId){
  $sql = "select vip_endtime from vip where user_id='{$userId}' and prod_id='{$prodId}'";
  $result = $conn->query($sql);
  if($result){
    $row = $result->fetch_row();
    if($row){
      // var_dump($row);
      return $row[0];
    }
  }
  return 0;
}
?>