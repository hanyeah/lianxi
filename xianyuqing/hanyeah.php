<?php
class hanyeah{
  /**
  * 获取1970年以来的毫秒数。
  */
  static public function getMillisecond(){
    list($s1,$s2)=explode(' ',microtime());
    return (float)sprintf('%.0f',(floatval($s1)+floatval($s2))*1000);
  }
}
?>